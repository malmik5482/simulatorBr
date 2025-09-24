import { gameStateHelpers, GameConstants, ProjectCategories, ProjectStatus } from '../types/game.js';
import { eventHelpers } from '../data/events.js';
import { projectHelpers, cityProjects } from '../data/projects.js';
import { initialFinanceState, financeHelpers, PersonalAccountTypes, IncomeTypes, BudgetCategories } from '../types/finance.js';
import { initialBankingState, bankingHelpers, BankAccountTypes } from '../types/banking.js';
import { initialGovernmentState, governmentHelpers } from '../types/government.js';
import { initialInvestmentState, investmentHelpers, investmentOpportunities } from '../types/investments.js';
import { initialIndustryState, industryHelpers, industrialProjects, ProjectStatus as IndustryProjectStatus } from '../types/industry.js';
import { initialSecurityState, securityHelpers, ThreatLevels } from '../types/security.js';
import { initialCitizensState, citizenHelpers } from '../types/citizens.js';
import { initialTaxationState, taxationHelpers } from '../types/taxation.js';
import { initialConstructionState, constructionHelpers, constructionProjects, ConstructionPhases } from '../types/construction.js';
import { initialPersonalSpendingState, personalSpendingHelpers } from '../types/personalSpending.js';

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const clamp = (value, min = 0, max = 100) => {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
};

const PERSONAL_BANK_ACCOUNT_MAP = {
  [BankAccountTypes.PERSONAL_CHECKING]: PersonalAccountTypes.CHECKING,
  [BankAccountTypes.PERSONAL_SAVINGS]: PersonalAccountTypes.SAVINGS,
  [BankAccountTypes.PERSONAL_INVESTMENT]: PersonalAccountTypes.SAVINGS,
  [BankAccountTypes.OFFSHORE]: PersonalAccountTypes.OFFSHORE
};

const isCityAccount = (accountType) => accountType?.startsWith('city');

const adjustBankAccountBalance = (bankingState, accountType, delta) => {
  if (!accountType || !bankingState?.accounts?.[accountType]) {
    return 0;
  }

  const account = bankingState.accounts[accountType];
  account.balance = Math.max(0, (account.balance || 0) + delta);
  return account.balance;
};

const applyFinanceAccountChange = (financeState, accountType, delta) => {
  let budgetDelta = 0;

  if (!accountType || !financeState) {
    return budgetDelta;
  }

  if (isCityAccount(accountType)) {
    financeState.cityBudget.total = Math.max(0, (financeState.cityBudget.total || 0) + delta);
    budgetDelta = delta;
  } else {
    const mappedAccount = PERSONAL_BANK_ACCOUNT_MAP[accountType] || PersonalAccountTypes.CHECKING;
    const accounts = financeState.personalFinances.accounts || {};
    accounts[mappedAccount] = Math.max(0, (accounts[mappedAccount] || 0) + delta);
    financeState.personalFinances.accounts = accounts;
  }

  return budgetDelta;
};

const appendTransaction = (history, entry) => [entry, ...(history || [])].slice(0, 100);

const buildPersonalFinancesSnapshot = (personalFinances) => ({
  personal_account: personalFinances?.accounts?.[PersonalAccountTypes.CHECKING] || 0,
  savings_account: personalFinances?.accounts?.[PersonalAccountTypes.SAVINGS] || 0,
  offshore_account: personalFinances?.accounts?.[PersonalAccountTypes.OFFSHORE] || 0,
  crypto_account: personalFinances?.accounts?.[PersonalAccountTypes.CRYPTO] || 0,
  cash: personalFinances?.accounts?.[PersonalAccountTypes.CASH] || 0,
  monthlyIncome: deepClone(personalFinances?.monthlyIncome || {}),
  monthlyExpenses: deepClone(personalFinances?.monthlyExpenses || {})
});

const PROJECT_CATEGORY_TO_BUDGET = {
  [ProjectCategories.INFRASTRUCTURE]: BudgetCategories.INFRASTRUCTURE,
  [ProjectCategories.ECOLOGY]: BudgetCategories.ECOLOGY,
  [ProjectCategories.SOCIAL]: BudgetCategories.SOCIAL,
  [ProjectCategories.CULTURE]: BudgetCategories.CULTURE,
  [ProjectCategories.SAFETY]: BudgetCategories.SECURITY,
  [ProjectCategories.ECONOMY]: BudgetCategories.ADMINISTRATION
};

const getBudgetCategoryForProject = (category) => {
  return PROJECT_CATEGORY_TO_BUDGET[category] || BudgetCategories.INFRASTRUCTURE;
};

// Основная игровая логика
export const gameLogic = {
  // Обновление игрового состояния (вызывается каждый игровой день)
  updateGameState: (currentState) => {
    let newState = { ...currentState };

    // Обновляем день
    newState = gameLogic.advanceTime(newState);

    // Обновляем проекты
    newState = projectHelpers.updateProjectsProgress(newState);
    newState = projectHelpers.applyCompletedProjectEffects(newState);

    // Ежемесячные расчеты
    if (newState.currentDay === 1) {
      newState = gameLogic.processMonthlyUpdates(newState);
    }

    // Обновляем рейтинг мэра
    newState.mayorRating = gameStateHelpers.calculateMayorRating(newState);

    // Проверяем условия окончания игры
    newState = gameLogic.checkGameEndConditions(newState);

    return newState;
  },

  // Продвижение времени
  advanceTime: (state) => {
    let newDay = state.currentDay + 1;
    let newMonth = state.currentMonth;
    let newYear = state.currentYear;

    if (newDay > GameConstants.DAYS_PER_MONTH) {
      newDay = 1;
      newMonth += 1;
      
      if (newMonth > GameConstants.MONTHS_PER_YEAR) {
        newMonth = 1;
        newYear += 1;
      }
    }

    return {
      ...state,
      currentDay: newDay,
      currentMonth: newMonth,
      currentYear: newYear
    };
  },

  // Ежемесячные обновления
  processMonthlyUpdates: (state) => {
    const updatedState = { ...state };

    const financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
    const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
    const governmentState = state.governmentState ? deepClone(state.governmentState) : deepClone(initialGovernmentState);
    const investmentState = state.investmentState ? deepClone(state.investmentState) : deepClone(initialInvestmentState);
    const industryState = state.industryState ? deepClone(state.industryState) : deepClone(initialIndustryState);
    const securityState = state.securityState ? deepClone(state.securityState) : deepClone(initialSecurityState);
    const citizensState = state.citizensState ? deepClone(state.citizensState) : deepClone(initialCitizensState);
    const taxationState = state.taxationState ? deepClone(state.taxationState) : deepClone(initialTaxationState);
    const constructionState = state.constructionState ? deepClone(state.constructionState) : deepClone(initialConstructionState);
    const personalSpendingState = state.personalSpendingState ? deepClone(state.personalSpendingState) : deepClone(initialPersonalSpendingState);

    const activeProjects = (state.activeProjects || []).filter((project) => project.status === ProjectStatus.IN_PROGRESS);
    const projectExpensesMap = {};

    activeProjects.forEach((project) => {
      const monthlyCost = project.financials?.monthlyCost ?? project.monthlyCost ?? 0;
      if (!monthlyCost) return;

      const category = project.budgetCategory || getBudgetCategoryForProject(project.category);
      projectExpensesMap[project.id] = {
        projectId: project.id,
        title: project.title,
        category,
        monthlyCost
      };
    });

    financeState.cityBudget.projectExpenses = projectExpensesMap;

    let budget = state.budget ?? 0;

    const monthMs = GameConstants.DAYS_PER_MONTH * 24 * 60 * 60 * 1000;
    updatedState.currentTimestamp = (state.currentTimestamp || Date.now()) + monthMs;

    // Финансовые потоки
    const monthlyIncome = financeHelpers.getMonthlyIncome(financeState.cityBudget);
    const monthlyExpenses = financeHelpers.getMonthlyExpenses(financeState.cityBudget);
    const netIncome = monthlyIncome - monthlyExpenses;

    financeState.cityBudget.total = Math.max(0, (financeState.cityBudget.total || 0) + netIncome);
    budget = Math.max(0, budget + netIncome);
    updatedState.budget_balance = netIncome;

    const expenseBreakdown = financeHelpers.getMonthlyExpenseBreakdown(financeState.cityBudget);
    const updatedSpent = { ...(financeState.cityBudget.spent || {}) };

    Object.entries(expenseBreakdown).forEach(([category, expense]) => {
      const allocated = financeState.cityBudget.allocated?.[category];
      const previous = updatedSpent[category] || 0;
      updatedSpent[category] = allocated !== undefined
        ? Math.min(allocated, previous + expense)
        : previous + expense;
    });

    financeState.cityBudget.spent = updatedSpent;

    // Личные финансы мэра
    const personalIncomeSum = Object.values(financeState.personalFinances.monthlyIncome || {}).reduce((sum, value) => sum + value, 0);
    const recurringExpenses = personalSpendingHelpers.calculateMonthlyExpenses(personalSpendingState.recurringExpenses || []);
    const personalExpensesSum = Object.values(financeState.personalFinances.monthlyExpenses || {}).reduce((sum, value) => sum + value, 0) + recurringExpenses;
    const personalNet = personalIncomeSum - personalExpensesSum;

    financeState.personalFinances.accounts[PersonalAccountTypes.CHECKING] = Math.max(
      0,
      (financeState.personalFinances.accounts[PersonalAccountTypes.CHECKING] || 0) + personalNet
    );
    financeState.personalFinances.monthlyExpenses = {
      ...(financeState.personalFinances.monthlyExpenses || {}),
      luxury: recurringExpenses
    };

    // Обработка кредитов
    const updatedLoans = [];
    (bankingState.loans || []).forEach((loan) => {
      const loanEntry = { ...loan };
      if (loanEntry.status && loanEntry.status !== 'active') {
        updatedLoans.push(loanEntry);
        return;
      }

      const paymentAmount = loanEntry.monthlyPayment || bankingHelpers.calculateLoanPayment(
        loanEntry.remainingAmount || loanEntry.amount,
        loanEntry.interestRate,
        loanEntry.remainingMonths || loanEntry.term
      );
      const account = bankingState.accounts?.[loanEntry.accountType];

      if (!account || (account.balance || 0) < paymentAmount) {
        loanEntry.status = 'overdue';
        loanEntry.missedPayments = (loanEntry.missedPayments || 0) + 1;
        securityState.securityMetrics.investigationProbability = clamp(
          (securityState.securityMetrics?.investigationProbability || 0) + 3,
          0,
          100
        );
        updatedLoans.push(loanEntry);
        return;
      }

      account.balance = Math.max(0, (account.balance || 0) - paymentAmount);

      const monthlyRate = loanEntry.interestRate / 100 / 12;
      const interestPortion = (loanEntry.remainingAmount || loanEntry.amount) * monthlyRate;
      const principalPayment = Math.max(0, paymentAmount - interestPortion);

      loanEntry.remainingAmount = Math.max(0, (loanEntry.remainingAmount || loanEntry.amount) + interestPortion - paymentAmount);
      loanEntry.remainingMonths = Math.max(0, (loanEntry.remainingMonths || loanEntry.term) - 1);
      loanEntry.paymentHistory = [
        {
          id: Date.now(),
          amount: paymentAmount,
          interest: interestPortion,
          principal: principalPayment,
          timestamp: Date.now()
        },
        ...((loanEntry.paymentHistory || []).slice(0, 11))
      ];

      budget += applyFinanceAccountChange(financeState, loanEntry.accountType, -paymentAmount);

      bankingState.transactionHistory = appendTransaction(bankingState.transactionHistory, {
        id: Date.now(),
        type: 'loan_payment',
        loanId: loanEntry.offerId || loanEntry.id,
        amount: paymentAmount,
        accountType: loanEntry.accountType,
        timestamp: Date.now()
      });

      if (loanEntry.remainingAmount <= 1 || loanEntry.remainingMonths === 0) {
        loanEntry.remainingAmount = 0;
        loanEntry.status = 'completed';
        loanEntry.completedAt = Date.now();
      }

      updatedLoans.push(loanEntry);
    });
    bankingState.loans = updatedLoans;

    // Обработка депозитов
    const activeDeposits = [];
    const maturedDeposits = [];
    (bankingState.deposits || []).forEach((deposit) => {
      const depositEntry = { ...deposit };
      const monthlyRate = depositEntry.interestRate / 100 / 12;
      const interest = depositEntry.amount * monthlyRate;

      depositEntry.accruedInterest = (depositEntry.accruedInterest || 0) + interest;
      depositEntry.remainingMonths = Math.max(0, (depositEntry.remainingMonths ?? depositEntry.term ?? 1) - 1);

      if (isCityAccount(depositEntry.accountType)) {
        financeState.cityBudget.monthlyIncome[IncomeTypes.INVESTMENTS] =
          (financeState.cityBudget.monthlyIncome?.[IncomeTypes.INVESTMENTS] || 0) + Math.round(interest);
      } else {
        const currentInvestmentIncome = financeState.personalFinances.monthlyIncome?.investments || 0;
        financeState.personalFinances.monthlyIncome = {
          ...(financeState.personalFinances.monthlyIncome || {}),
          investments: Math.round(currentInvestmentIncome + interest)
        };
      }

      if (depositEntry.remainingMonths <= 0) {
        const payout = depositEntry.amount + depositEntry.accruedInterest;
        adjustBankAccountBalance(bankingState, depositEntry.accountType, payout);
        budget += applyFinanceAccountChange(financeState, depositEntry.accountType, payout);

        bankingState.transactionHistory = appendTransaction(bankingState.transactionHistory, {
          id: Date.now(),
          type: 'deposit_matured',
          depositId: depositEntry.offerId || depositEntry.id,
          amount: payout,
          accountType: depositEntry.accountType,
          timestamp: Date.now()
        });

        depositEntry.status = 'completed';
        depositEntry.completedAt = Date.now();
        maturedDeposits.push(depositEntry);
      } else {
        activeDeposits.push(depositEntry);
      }
    });
    bankingState.deposits = activeDeposits;
    if (maturedDeposits.length > 0) {
      bankingState.completedDeposits = [
        ...maturedDeposits,
        ...(bankingState.completedDeposits || [])
      ].slice(0, 20);
    }

    // Обновление состояния правительства
    const departmentEfficiencies = [];
    let totalMood = 0;
    let employeeCount = 0;

    Object.entries(governmentState.employees || {}).forEach(([department, employees]) => {
      const updatedEmployees = employees.map((employee) => {
        const updated = { ...employee };
        updated.workload = clamp((employee.workload || 50) - 5);
        updated.mood = clamp((employee.mood || 70) - 2);
        totalMood += updated.mood;
        employeeCount += 1;
        return updated;
      });

      governmentState.employees[department] = updatedEmployees;
      const efficiency = governmentHelpers.calculateDepartmentEfficiency(department, updatedEmployees);
      departmentEfficiencies.push(efficiency);
      if (governmentState.departmentSettings?.[department]) {
        governmentState.departmentSettings[department] = {
          ...governmentState.departmentSettings[department],
          efficiency
        };
      }
    });

    if (employeeCount > 0) {
      governmentState.performanceMetrics.employeeSatisfaction = Math.round(totalMood / employeeCount);
    }
    if (departmentEfficiencies.length > 0) {
      governmentState.performanceMetrics.departmentEfficiency = Math.round(
        departmentEfficiencies.reduce((sum, value) => sum + value, 0) / departmentEfficiencies.length
      );
    }
    governmentState.performanceMetrics.decisionsPerMonth = 0;

    // Инвестиции
    const activeInvestments = [];
    const completedInvestments = [];
    (investmentState.activeInvestments || []).forEach((investment) => {
      const opportunity = investmentOpportunities.find((item) => item.id === investment.id);
      if (!opportunity) {
        activeInvestments.push(investment);
        return;
      }

      const investmentEntry = { ...investment };
      investmentEntry.monthsPassed = (investmentEntry.monthsPassed || 0) + 1;

      const progress = investmentHelpers.simulateInvestmentProgress(opportunity, investmentEntry.monthsPassed);
      investmentEntry.progress = progress.progressPercent;
      investmentEntry.remainingMonths = progress.remainingMonths;

      if (progress.isCompleted) {
        const payout = investmentHelpers.calculateCurrentValue(opportunity, investmentEntry.monthsPassed, investmentEntry.amount);
        adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, payout);
        budget += applyFinanceAccountChange(financeState, BankAccountTypes.CITY_CHECKING, payout);

        const profit = payout - investmentEntry.amount;
        investmentState.portfolio.totalReturns = (investmentState.portfolio?.totalReturns || 0) + Math.max(0, profit);

        completedInvestments.push({
          id: `${investmentEntry.id}_${Date.now()}`,
          investmentId: investmentEntry.id,
          amount: investmentEntry.amount,
          returned: payout,
          profit,
          completedAt: Date.now()
        });

        if (opportunity.cityBenefits?.unemployment) {
          updatedState.unemployment = Math.max(0, (updatedState.unemployment || 0) + opportunity.cityBenefits.unemployment);
        }
        if (opportunity.cityBenefits?.infrastructure) {
          updatedState.infrastructure = clamp((updatedState.infrastructure || 0) + opportunity.cityBenefits.infrastructure);
        }
        if (opportunity.cityBenefits?.happiness) {
          updatedState.happiness = clamp((updatedState.happiness || 0) + opportunity.cityBenefits.happiness);
        }
      } else {
        activeInvestments.push(investmentEntry);
      }
    });
    investmentState.activeInvestments = activeInvestments;
    if (completedInvestments.length > 0) {
      investmentState.completedInvestments = [
        ...completedInvestments,
        ...(investmentState.completedInvestments || [])
      ].slice(0, 25);
    }

    let totalInvested = 0;
    let activeValue = 0;
    investmentState.activeInvestments.forEach((investment) => {
      const opportunity = investmentOpportunities.find((item) => item.id === investment.id);
      totalInvested += investment.amount;
      if (opportunity) {
        activeValue += investmentHelpers.calculateCurrentValue(opportunity, investment.monthsPassed || 0, investment.amount);
      }
    });
    investmentState.portfolio.totalInvested = totalInvested;
    investmentState.portfolio.activeValue = activeValue;

    const totalProjectsCount = investmentState.activeInvestments.length + (investmentState.completedInvestments?.length || 0);
    if (totalProjectsCount > 0) {
      investmentState.investmentMetrics.successRate = Math.round(((investmentState.completedInvestments?.length || 0) / totalProjectsCount) * 100);
    }
    if (totalInvested > 0) {
      investmentState.investmentMetrics.averageReturn = Math.round(((investmentState.portfolio.totalReturns || 0) / totalInvested) * 100);
    }

    // Промышленные проекты
    const runningIndustryProjects = [];
    (industryState.activeProjects || []).forEach((project) => {
      const data = industrialProjects.find((item) => item.id === project.id);
      if (!data) {
        runningIndustryProjects.push(project);
        return;
      }

      const projectEntry = { ...project };
      projectEntry.monthsPassed = (projectEntry.monthsPassed || 0) + 1;

      const progress = industryHelpers.simulateConstructionProgress(data, projectEntry.monthsPassed);
      projectEntry.progress = progress.progressPercent;
      projectEntry.remainingMonths = progress.remainingMonths;
      projectEntry.status = progress.isCompleted ? IndustryProjectStatus.OPERATIONAL : progress.currentPhase;

      if (progress.isCompleted) {
        industryState.completedProjects = [
          {
            id: `${projectEntry.id}_${Date.now()}`,
            projectId: projectEntry.id,
            completedAt: Date.now(),
            kickbacksReceived: projectEntry.kickbacksReceived || 0,
            totalCost: projectEntry.totalCost || data.totalCost
          },
          ...(industryState.completedProjects || [])
        ].slice(0, 25);

        industryState.industryMetrics.totalEmployment = (industryState.industryMetrics?.totalEmployment || 0) + (data.jobs || 0);
        industryState.industryMetrics.totalRevenue = (industryState.industryMetrics?.totalRevenue || 0) + (data.annualRevenue || 0);
        industryState.industryMetrics.totalTaxRevenue = (industryState.industryMetrics?.totalTaxRevenue || 0) + (data.taxRevenue || 0);
        industryState.industryMetrics.industrialCapacity = clamp((industryState.industryMetrics?.industrialCapacity || 0) + (data.benefits?.industrialCapacity || 0));

        if (data.benefits?.unemployment) {
          updatedState.unemployment = Math.max(0, (updatedState.unemployment || 0) + data.benefits.unemployment);
        }
        if (data.benefits?.infrastructure) {
          updatedState.infrastructure = clamp((updatedState.infrastructure || 0) + data.benefits.infrastructure);
        }
        if (data.benefits?.mayorRating) {
          updatedState.mayorRating = clamp(
            (updatedState.mayorRating || 0) + data.benefits.mayorRating,
            GameConstants.MIN_MAYOR_RATING,
            GameConstants.MAX_MAYOR_RATING
          );
        }
        if (data.benefits?.ecology) {
          updatedState.ecology = clamp((updatedState.ecology || 0) + data.benefits.ecology);
        }

        if (data.benefits?.taxRevenue) {
          financeState.cityBudget.monthlyIncome[IncomeTypes.BUSINESS_TAXES] =
            (financeState.cityBudget.monthlyIncome?.[IncomeTypes.BUSINESS_TAXES] || 0) + Math.round(data.benefits.taxRevenue / 12);
        }
      } else {
        runningIndustryProjects.push(projectEntry);
      }
    });
    industryState.activeProjects = runningIndustryProjects;

    // Силовые структуры
    const activeThreats = [];
    (securityState.activeThreats || []).forEach((threat) => {
      const threatEntry = { ...threat };
      threatEntry.age = (threatEntry.age || 0) + 1;
      threatEntry.progress = clamp((threatEntry.progress || 50) - 10);
      if (threatEntry.escalation) {
        threatEntry.progress = clamp(threatEntry.progress + 15);
      }
      if (threatEntry.progress <= 0 && !threatEntry.escalation) {
        return;
      }
      activeThreats.push(threatEntry);
    });
    securityState.activeThreats = activeThreats;

    const generatedThreat = securityHelpers.generateRandomThreat({
      ...updatedState,
      securityState,
      financeState,
      industryState
    });
    if (generatedThreat) {
      securityState.activeThreats = [
        {
          ...generatedThreat,
          id: `${generatedThreat.id}_${Date.now()}`,
          detectedAt: Date.now(),
          progress: 60
        },
        ...securityState.activeThreats
      ].slice(0, 5);
      updatedState.media_attention = (updatedState.media_attention || 0) + 10;
    }

    const investigationRisk = securityHelpers.calculateInvestigationRisk({
      ...updatedState,
      industryState,
      securityState,
      financeState
    });
    securityState.securityMetrics = {
      ...securityState.securityMetrics,
      investigationProbability: clamp(investigationRisk, 0, 100),
      corruptionRisk: clamp((securityState.securityMetrics?.corruptionRisk || 0) + securityState.activeThreats.length * 5, 0, 100),
      overallThreatLevel: (() => {
        if (securityState.activeThreats.some((threat) => threat.threat_level === ThreatLevels.CRITICAL)) return ThreatLevels.CRITICAL;
        if (securityState.activeThreats.some((threat) => threat.threat_level === ThreatLevels.HIGH)) return ThreatLevels.HIGH;
        if (securityState.activeThreats.length > 0) return ThreatLevels.MEDIUM;
        return ThreatLevels.LOW;
      })(),
      protectionLevel: securityHelpers.calculateProtectionLevel(securityState.agencies || {})
    };

    // Граждане
    const newIssue = citizenHelpers.generateRandomIssue({
      ...updatedState,
      citizensState
    });
    if (newIssue) {
      citizensState.activeIssues = [newIssue, ...(citizensState.activeIssues || [])].slice(0, 10);
      citizensState.communicationStats = {
        ...(citizensState.communicationStats || {}),
        totalIssues: (citizensState.communicationStats?.totalIssues || 0) + 1
      };
    }

    const overallSatisfaction = citizenHelpers.calculateOverallSatisfaction(citizensState.groups);
    citizensState.citizenMetrics = {
      ...citizensState.citizenMetrics,
      overallSatisfaction: clamp(overallSatisfaction),
      complaintRate: clamp((citizensState.activeIssues?.length || 0) * 2, 0, 100)
    };
    updatedState.happiness = clamp((updatedState.happiness || 0) * 0.7 + overallSatisfaction * 0.3);

    // Налоговая система
    const totalRevenue = taxationHelpers.calculateTotalTaxRevenue(
      taxationState.currentRates,
      taxationState.taxBase,
      taxationState.collectionEfficiency
    );
    taxationState.taxMetrics = {
      ...taxationState.taxMetrics,
      totalRevenue,
      collectionRate: Math.round(
        Object.values(taxationState.collectionEfficiency || {}).reduce((sum, efficiency) => sum + efficiency, 0) /
        Math.max(1, Object.keys(taxationState.collectionEfficiency || {}).length)
      )
    };
    taxationState.debt.debtToRevenue = totalRevenue > 0
      ? Math.round((taxationState.debt.totalDebt / totalRevenue) * 100)
      : taxationState.debt.debtToRevenue;

    const totalExpenditure = Object.values(taxationState.expenditureStructure || {}).reduce((sum, entry) => sum + (entry.amount || 0), 0);
    taxationState.expenditureStructure = Object.fromEntries(
      Object.entries(taxationState.expenditureStructure || {}).map(([key, entry]) => [
        key,
        { ...entry, percentage: totalExpenditure > 0 ? (entry.amount / totalExpenditure) * 100 : 0 }
      ])
    );
    const totalRevenueStructure = Object.values(taxationState.revenueStructure || {}).reduce((sum, entry) => sum + (entry.amount || 0), 0);
    taxationState.revenueStructure = Object.fromEntries(
      Object.entries(taxationState.revenueStructure || {}).map(([key, entry]) => [
        key,
        { ...entry, percentage: totalRevenueStructure > 0 ? (entry.amount / totalRevenueStructure) * 100 : 0 }
      ])
    );

    // Строительные проекты
    const runningConstructionProjects = [];
    (constructionState.activeProjects || []).forEach((project) => {
      const data = constructionProjects.find((item) => item.id === project.id);
      if (!data) {
        runningConstructionProjects.push(project);
        return;
      }

      const projectEntry = { ...project };
      projectEntry.monthsPassed = (projectEntry.monthsPassed || 0) + 1;

      const progressPercent = Math.min(100, (projectEntry.monthsPassed / data.duration) * 100);
      projectEntry.progress = progressPercent;

      let phase = ConstructionPhases.PLANNING;
      if (progressPercent >= 15) phase = ConstructionPhases.PERMITS;
      if (progressPercent >= 35) phase = ConstructionPhases.FOUNDATION;
      if (progressPercent >= 65) phase = ConstructionPhases.CONSTRUCTION;
      if (progressPercent >= 85) phase = ConstructionPhases.FINISHING;
      if (progressPercent >= 95) phase = ConstructionPhases.COMMISSIONING;
      if (progressPercent >= 100) phase = ConstructionPhases.COMPLETED;
      projectEntry.status = phase;

      if (phase === ConstructionPhases.COMPLETED) {
        constructionState.completedProjects = [
          {
            id: `${projectEntry.id}_${Date.now()}`,
            projectId: projectEntry.id,
            completedAt: Date.now(),
            kickbacksReceived: projectEntry.kickbacksReceived || 0
          },
          ...(constructionState.completedProjects || [])
        ].slice(0, 25);

        if (data.benefits?.infrastructure) {
          updatedState.infrastructure = clamp((updatedState.infrastructure || 0) + data.benefits.infrastructure);
        }
        if (data.benefits?.environmental) {
          updatedState.ecology = clamp((updatedState.ecology || 0) + data.benefits.environmental);
        }
        if (data.benefits?.jobs_permanent) {
          updatedState.unemployment = Math.max(0, (updatedState.unemployment || 0) - data.benefits.jobs_permanent * 0.01);
        }
      } else {
        runningConstructionProjects.push(projectEntry);
      }
    });
    constructionState.activeProjects = runningConstructionProjects;
    constructionState.constructionMetrics.infrastructureIndex = constructionHelpers.calculateUtilityQuality(constructionState.utilities || {});

    // Личные траты
    personalSpendingState.totalSpent = (personalSpendingState.totalSpent || 0) + recurringExpenses;
    personalSpendingState.monthlyExpenses = recurringExpenses;
    personalSpendingState.totalAssets = personalSpendingHelpers.calculateAssetValue(personalSpendingState.assets || [], {
      ...updatedState,
      currentTimestamp: updatedState.currentTimestamp
    });
    personalSpendingState.detectionRisk = personalSpendingHelpers.calculateDetectionRisk(
      personalSpendingState.spendingHistory || [],
      {
        ...updatedState,
        financeState,
        personalSpendingState
      }
    );
    personalSpendingState.lifestyleQuality = personalSpendingHelpers.calculateLifestyleQuality(
      personalSpendingState.assets || [],
      personalSpendingState.recurringExpenses || []
    );
    personalSpendingState.familyHappiness = personalSpendingHelpers.calculateFamilyHappiness(
      personalSpendingState.spendingHistory || [],
      personalSpendingState.assets || []
    );

    // Финальные присваивания
    updatedState.budget = Math.max(0, Math.round(budget));
    updatedState.financeState = financeState;
    updatedState.bankingState = bankingState;
    updatedState.governmentState = governmentState;
    updatedState.investmentState = investmentState;
    updatedState.industryState = industryState;
    updatedState.securityState = securityState;
    updatedState.citizensState = citizensState;
    updatedState.taxationState = taxationState;
    updatedState.constructionState = constructionState;
    updatedState.personalSpendingState = personalSpendingState;
    updatedState.personalFinances = {
      personal_account: financeState.personalFinances.accounts?.[PersonalAccountTypes.CHECKING] || 0,
      savings_account: financeState.personalFinances.accounts?.[PersonalAccountTypes.SAVINGS] || 0,
      offshore_account: financeState.personalFinances.accounts?.[PersonalAccountTypes.OFFSHORE] || 0,
      crypto_account: financeState.personalFinances.accounts?.[PersonalAccountTypes.CRYPTO] || 0,
      cash: financeState.personalFinances.accounts?.[PersonalAccountTypes.CASH] || 0,
      monthlyIncome: { ...(financeState.personalFinances.monthlyIncome || {}) },
      monthlyExpenses: { ...(financeState.personalFinances.monthlyExpenses || {}) }
    };
    updatedState.citizenGroups = { ...citizensState.groups };
    updatedState.corruption_level = clamp(
      ((financeState.risks?.investigationRisk || 0) + (financeState.risks?.publicSuspicion || 0)) / 2
    );
    updatedState.media_attention = clamp((updatedState.media_attention || 0) - 2 + securityState.activeThreats.length * 3, 0, 100);

    // Естественные изменения показателей и случайные события
    const decayedState = gameLogic.applyNaturalDecay(updatedState);

    if (Math.random() < 0.3) {
      const randomEvent = eventHelpers.getRandomEvent(decayedState);
      if (randomEvent) {
        decayedState.pendingEvent = randomEvent;
      }
    }

    return decayedState;
  },

  // Естественное ухудшение показателей
  applyNaturalDecay: (state) => {
    const decayRates = {
      infrastructure: -0.5, // инфраструктура изнашивается
      ecology: -0.3, // экология ухудшается без вмешательства
      happiness: -0.2 // счастье снижается без улучшений
    };

    const newState = { ...state };

    Object.entries(decayRates).forEach(([key, rate]) => {
      newState[key] = Math.max(0, newState[key] + rate);
    });

    // Безработица может расти
    if (Math.random() < 0.1) { // 10% шанс роста безработицы
      newState.unemployment = Math.min(20, newState.unemployment + 0.1);
    }

    return newState;
  },

  // Обработка решения игрока по событию
  processEventDecision: (state, eventId, optionId) => {
    const event = state.pendingEvent;
    if (!event || event.id !== eventId) return state;

    const option = event.options.find(opt => opt.id === optionId);
    if (!option) return state;

    // Проверяем, может ли игрок позволить себе это действие
    if (option.cost && !gameStateHelpers.canAffordAction(state, option.cost)) {
      return {
        ...state,
        errorMessage: 'Недостаточно средств в бюджете'
      };
    }

    // Применяем эффекты
    let newState = eventHelpers.applyEventEffects(state, option.effects);

    // Добавляем событие в историю
    const eventRecord = {
      id: event.id,
      title: event.title,
      option: option.text,
      date: {
        day: state.currentDay,
        month: state.currentMonth,
        year: state.currentYear
      },
      effects: option.effects
    };

    newState.eventHistory = [eventRecord, ...newState.eventHistory.slice(0, 49)]; // Храним последние 50 событий
    newState.totalDecisions += 1;
    newState.pendingEvent = null;

    // Если у опции есть длительность, создаем проект
    if (option.duration) {
      const project = {
        id: `event_${eventId}_${Date.now()}`,
        title: `${event.title}: ${option.text}`,
        description: option.description || event.description,
        category: event.category,
        status: 'in_progress',
        startDate: {
          day: state.currentDay,
          month: state.currentMonth,
          year: state.currentYear
        },
        remainingDays: option.duration,
        isEventProject: true,
        budgetCategory: getBudgetCategoryForProject(event.category),
        financials: {
          upfrontCost: option.cost || 0,
          monthlyCost: 0,
          funding: []
        }
      };

      newState.activeProjects = [...newState.activeProjects, project];
    }

    return newState;
  },

  // Запуск проекта
  startProject: (state, projectId) => {
    const project = cityProjects.find((item) => item.id === projectId);
    if (!project) {
      return { ...state, errorMessage: 'Проект не найден' };
    }

    const activeCount = (state.activeProjects || []).filter((item) => item.status === ProjectStatus.IN_PROGRESS).length;
    if (activeCount >= GameConstants.MAX_ACTIVE_PROJECTS) {
      return { ...state, errorMessage: 'Достигнут лимит активных проектов' };
    }

    if (!projectHelpers.canStartProject(project, state)) {
      return { ...state, errorMessage: 'Условия для запуска проекта не выполнены' };
    }

    const financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
    const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);

    const budgetCategory = getBudgetCategoryForProject(project.category);
    const fundingAccounts = [
      BankAccountTypes.CITY_CHECKING,
      BankAccountTypes.CITY_SAVINGS,
      BankAccountTypes.CITY_INVESTMENT
    ];

    const totalAvailable = fundingAccounts.reduce((sum, accountType) => {
      const account = bankingState.accounts?.[accountType];
      return sum + (account?.balance || 0);
    }, 0);

    if (totalAvailable < project.cost) {
      return { ...state, errorMessage: 'Недостаточно средств для запуска проекта' };
    }

    let budget = state.budget ?? financeState.cityBudget.total ?? 0;
    let remainingCost = project.cost;
    const funding = [];

    fundingAccounts.forEach((accountType) => {
      if (remainingCost <= 0) return;
      const account = bankingState.accounts?.[accountType];
      if (!account) return;

      const available = account.balance || 0;
      if (available <= 0) return;

      const deduction = Math.min(available, remainingCost);
      if (deduction <= 0) return;

      adjustBankAccountBalance(bankingState, accountType, -deduction);
      budget += applyFinanceAccountChange(financeState, accountType, -deduction);
      funding.push({ accountType, amount: deduction });
      remainingCost -= deduction;
    });

    if (remainingCost > 0) {
      adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -remainingCost);
      budget += applyFinanceAccountChange(financeState, BankAccountTypes.CITY_CHECKING, -remainingCost);
      funding.push({ accountType: BankAccountTypes.CITY_CHECKING, amount: remainingCost });
      remainingCost = 0;
    }

    financeState.cityBudget.spent = {
      ...(financeState.cityBudget.spent || {}),
      [budgetCategory]: Math.min(
        (financeState.cityBudget.allocated?.[budgetCategory] || Infinity),
        (financeState.cityBudget.spent?.[budgetCategory] || 0) + project.cost
      )
    };

    if (project.monthlyCost) {
      financeState.cityBudget.projectExpenses = {
        ...(financeState.cityBudget.projectExpenses || {}),
        [project.id]: {
          projectId: project.id,
          title: project.title,
          category: budgetCategory,
          monthlyCost: project.monthlyCost
        }
      };
    }

    bankingState.transactionHistory = appendTransaction(bankingState.transactionHistory, {
      id: Date.now(),
      type: 'start_city_project',
      projectId: project.id,
      amount: project.cost,
      funding,
      timestamp: Date.now()
    });

    const newProject = {
      ...project,
      status: ProjectStatus.IN_PROGRESS,
      startDate: {
        day: state.currentDay,
        month: state.currentMonth,
        year: state.currentYear
      },
      remainingDays: project.duration,
      totalSpent: project.cost,
      effectsApplied: false,
      budgetCategory,
      financials: {
        upfrontCost: project.cost,
        monthlyCost: project.monthlyCost || 0,
        funding
      }
    };

    const updatedProjects = [...(state.activeProjects || []), newProject];
    const budgetDelta = (budget || 0) - (state.budget || 0);

    return {
      ...state,
      errorMessage: null,
      activeProjects: updatedProjects,
      budget: Math.max(0, Math.round(budget)),
      budget_balance: budgetDelta,
      financeState,
      bankingState,
      personalFinances: buildPersonalFinancesSnapshot(financeState.personalFinances)
    };
  },

  // Отмена проекта
  cancelProject: (state, projectId) => {
    const project = state.activeProjects.find((p) => p.id === projectId);
    if (!project || project.status !== ProjectStatus.IN_PROGRESS) {
      return state;
    }

    const baseSpent = project.totalSpent || project.cost || 0;
    const refund = Math.floor(baseSpent * 0.5);

    const financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
    const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);

    let budget = state.budget ?? financeState.cityBudget.total ?? 0;
    const funding = project.financials?.funding || [
      { accountType: BankAccountTypes.CITY_CHECKING, amount: baseSpent }
    ];
    const totalFunding = funding.reduce((sum, entry) => sum + (entry.amount || 0), 0) || refund;
    let remainingRefund = refund;

    funding.forEach((entry, index) => {
      if (remainingRefund <= 0) return;

      const share = index === funding.length - 1
        ? remainingRefund
        : Math.min(remainingRefund, Math.round((refund * (entry.amount || 0)) / totalFunding));

      adjustBankAccountBalance(bankingState, entry.accountType, share);
      budget += applyFinanceAccountChange(financeState, entry.accountType, share);
      remainingRefund -= share;
    });

    if (remainingRefund > 0) {
      adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, remainingRefund);
      budget += applyFinanceAccountChange(financeState, BankAccountTypes.CITY_CHECKING, remainingRefund);
      remainingRefund = 0;
    }

    if (project.budgetCategory) {
      const currentSpent = financeState.cityBudget.spent?.[project.budgetCategory] || 0;
      financeState.cityBudget.spent = {
        ...(financeState.cityBudget.spent || {}),
        [project.budgetCategory]: Math.max(0, currentSpent - refund)
      };
    }

    if (financeState.cityBudget.projectExpenses?.[project.id]) {
      const updatedProjectExpenses = { ...financeState.cityBudget.projectExpenses };
      delete updatedProjectExpenses[project.id];
      financeState.cityBudget.projectExpenses = updatedProjectExpenses;
    }

    bankingState.transactionHistory = appendTransaction(bankingState.transactionHistory, {
      id: Date.now(),
      type: 'cancel_city_project',
      projectId: project.id,
      amount: refund,
      timestamp: Date.now()
    });

    const updatedProjects = state.activeProjects.map((p) =>
      p.id === projectId
        ? { ...p, status: ProjectStatus.CANCELLED, remainingDays: 0 }
        : p
    );

    const budgetDelta = (budget || 0) - (state.budget || 0);

    return {
      ...state,
      errorMessage: null,
      activeProjects: updatedProjects,
      budget: Math.max(0, Math.round(budget)),
      budget_balance: budgetDelta,
      financeState,
      bankingState,
      personalFinances: buildPersonalFinancesSnapshot(financeState.personalFinances),
      failedProjects: (state.failedProjects || 0) + 1,
      mayorRating: Math.max(0, state.mayorRating - 5)
    };
  },

  // Проверка условий окончания игры
  checkGameEndConditions: (state) => {
    const newState = { ...state };

    // Критически низкий рейтинг
    if (state.mayorRating <= 10) {
      newState.gameOver = true;
      newState.gameOverReason = 'Ваш рейтинг упал критически низко. Вас отстранили от должности.';
      newState.gameResult = 'defeat';
    }

    // Банкротство
    if (state.budget < -10000000) { // долг больше 10 млн
      newState.gameOver = true;
      newState.gameOverReason = 'Город обанкротился. Вы не смогли управлять бюджетом.';
      newState.gameResult = 'defeat';
    }

    // Успешное завершение (высокие показатели в течение года)
    if (state.currentYear > 2025 && 
        state.mayorRating >= 80 && 
        state.happiness >= 75 && 
        state.ecology >= 70 && 
        state.infrastructure >= 70) {
      newState.gameOver = true;
      newState.gameOverReason = 'Поздравляем! Вы успешно развили Брянск и стали народным мэром.';
      newState.gameResult = 'victory';
    }

    return newState;
  },

  // Получение статистики игры
  getGameStats: (state) => {
    const totalProjects = state.activeProjects.length + state.successfulProjects + state.failedProjects;
    const projectSuccessRate = totalProjects > 0 ? 
      Math.round((state.successfulProjects / totalProjects) * 100) : 0;

    const timeInOffice = {
      days: (state.currentYear - 2025) * 365 + (state.currentMonth - 1) * 30 + state.currentDay - 1,
      months: (state.currentYear - 2025) * 12 + state.currentMonth - 1,
      years: state.currentYear - 2025
    };

    return {
      timeInOffice,
      totalDecisions: state.totalDecisions,
      projectStats: {
        total: totalProjects,
        successful: state.successfulProjects,
        failed: state.failedProjects,
        active: state.activeProjects.filter(p => p.status === 'in_progress').length,
        successRate: projectSuccessRate
      },
      currentRatings: {
        mayor: state.mayorRating,
        happiness: state.happiness,
        ecology: state.ecology,
        infrastructure: state.infrastructure,
        unemployment: state.unemployment
      },
      budget: state.budget,
      population: state.population
    };
  },

  // Сохранение игры
  saveGame: (state) => {
    try {
      const saveData = {
        ...state,
        saveDate: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem('bryansk_mayor_save', JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения игры:', error);
      return false;
    }
  },

  // Загрузка игры
  loadGame: () => {
    try {
      const saveData = localStorage.getItem('bryansk_mayor_save');
      if (!saveData) return null;

      const parsedData = JSON.parse(saveData);
      
      // Проверяем версию сохранения
      if (parsedData.version !== '1.0') {
        console.warn('Несовместимая версия сохранения');
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error('Ошибка загрузки игры:', error);
      return null;
    }
  },

  // Сброс игры
  resetGame: () => {
    localStorage.removeItem('bryansk_mayor_save');
  },

  // Получение подсказок для игрока
  getGameTips: (state) => {
    const tips = [];

    if (state.budget < 10000000) {
      tips.push('Бюджет на исходе. Рассмотрите проекты, приносящие доход.');
    }

    if (state.mayorRating < 30) {
      tips.push('Ваш рейтинг критически низок. Займитесь проблемами, волнующими жителей.');
    }

    if (state.ecology < 40) {
      tips.push('Экологическая ситуация требует внимания. Инвестируйте в зеленые проекты.');
    }

    if (state.infrastructure < 40) {
      tips.push('Инфраструктура города нуждается в модернизации.');
    }

    if (state.unemployment > 10) {
      tips.push('Высокий уровень безработицы. Создавайте рабочие места.');
    }

    if (state.activeProjects.length === 0) {
      tips.push('У вас нет активных проектов. Время планировать развитие города.');
    }

    return tips;
  }
};
