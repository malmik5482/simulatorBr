import React, { createContext, useReducer, useEffect } from 'react';
import { createInitialGameState, initialGameState, GameConstants } from '../types/game.js';
import { gameLogic } from '../utils/gameLogic.js';
import { initialFinanceState, financeHelpers, PersonalAccountTypes, BudgetCategories, IncomeTypes } from '../types/finance.js';
import { initialBankingState, bankingHelpers, BankAccountTypes, LoanTypes, DepositTypes, loanOffers, depositOffers } from '../types/banking.js';
import { initialGovernmentState, governmentHelpers, policyOptions, PositionLevels, GovernmentDepartments } from '../types/government.js';
import { initialInvestmentState, investmentHelpers, investmentOpportunities } from '../types/investments.js';
import { initialIndustryState, industryHelpers, industrialProjects, ProjectStatus } from '../types/industry.js';
import { initialSecurityState, securityHelpers, OperationTypes, InfluenceLevels, ThreatLevels } from '../types/security.js';
import { initialCitizensState, citizenHelpers, citizenIssues, ResponseTypes } from '../types/citizens.js';
import { initialTaxationState, taxationHelpers, taxPolicies, TaxTypes, RevenueCategories, ExpenditureCategories } from '../types/taxation.js';
import { initialConstructionState, constructionHelpers, constructionProjects, ConstructionPhases, utilityServices } from '../types/construction.js';
import { initialPersonalSpendingState, personalSpendingHelpers, personalSpendingOptions, SpendingTypes } from '../types/personalSpending.js';

// Создаем контекст
const GameContext = createContext();

// Типы действий для reducer
const GAME_ACTIONS = {
  LOAD_GAME: 'LOAD_GAME',
  UPDATE_GAME_STATE: 'UPDATE_GAME_STATE',
  PROCESS_EVENT_DECISION: 'PROCESS_EVENT_DECISION',
  START_PROJECT: 'START_PROJECT',
  CANCEL_PROJECT: 'CANCEL_PROJECT',
  TOGGLE_PAUSE: 'TOGGLE_PAUSE',
  SET_GAME_SPEED: 'SET_GAME_SPEED',
  SAVE_GAME: 'SAVE_GAME',
  RESET_GAME: 'RESET_GAME',
  CLEAR_ERROR: 'CLEAR_ERROR',
  // Новые действия для финансовой системы
  REALLOCATE_BUDGET: 'REALLOCATE_BUDGET',
  APPLY_BUDGET_CHANGES: 'APPLY_BUDGET_CHANGES',
  PERFORM_CORRUPTION: 'PERFORM_CORRUPTION',
  UPDATE_FINANCE_STATE: 'UPDATE_FINANCE_STATE',
  BUY_STOCK: 'BUY_STOCK',
  SELL_STOCK: 'SELL_STOCK',
  TRANSFER_FUNDS: 'TRANSFER_FUNDS',
  TAKE_LOAN: 'TAKE_LOAN',
  CREATE_DEPOSIT: 'CREATE_DEPOSIT',
  PROMOTE_EMPLOYEE: 'PROMOTE_EMPLOYEE',
  FIRE_EMPLOYEE: 'FIRE_EMPLOYEE',
  CHANGE_EMPLOYEE_SALARY: 'CHANGE_EMPLOYEE_SALARY',
  IMPLEMENT_POLICY: 'IMPLEMENT_POLICY',
  MAKE_GOVERNMENT_DECISION: 'MAKE_GOVERNMENT_DECISION',
  MAKE_INVESTMENT: 'MAKE_INVESTMENT',
  WITHDRAW_INVESTMENT: 'WITHDRAW_INVESTMENT',
  IMPLEMENT_INDUSTRIAL_PROJECT: 'IMPLEMENT_INDUSTRIAL_PROJECT',
  MODERNIZE_ENTERPRISE: 'MODERNIZE_ENTERPRISE',
  EXECUTE_SECURITY_OPERATION: 'EXECUTE_SECURITY_OPERATION',
  MITIGATE_THREAT: 'MITIGATE_THREAT',
  RESPOND_TO_ISSUE: 'RESPOND_TO_ISSUE',
  SCHEDULE_MEETING: 'SCHEDULE_MEETING',
  IMPLEMENT_TAX_POLICY: 'IMPLEMENT_TAX_POLICY',
  CHANGE_TAX_RATE: 'CHANGE_TAX_RATE',
  START_CONSTRUCTION_PROJECT: 'START_CONSTRUCTION_PROJECT',
  UPGRADE_UTILITY: 'UPGRADE_UTILITY',
  MAKE_PERSONAL_PURCHASE: 'MAKE_PERSONAL_PURCHASE'
};

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const clamp = (value, min = 0, max = 100) => {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
};

const buildPersonalFinancesSnapshot = (personalFinances) => ({
  personal_account: personalFinances?.accounts?.[PersonalAccountTypes.CHECKING] || 0,
  savings_account: personalFinances?.accounts?.[PersonalAccountTypes.SAVINGS] || 0,
  offshore_account: personalFinances?.accounts?.[PersonalAccountTypes.OFFSHORE] || 0,
  crypto_account: personalFinances?.accounts?.[PersonalAccountTypes.CRYPTO] || 0,
  cash: personalFinances?.accounts?.[PersonalAccountTypes.CASH] || 0,
  monthlyIncome: deepClone(personalFinances?.monthlyIncome || {}),
  monthlyExpenses: deepClone(personalFinances?.monthlyExpenses || {})
});

const PERSONAL_BANK_ACCOUNT_MAP = {
  [BankAccountTypes.PERSONAL_CHECKING]: PersonalAccountTypes.CHECKING,
  [BankAccountTypes.PERSONAL_SAVINGS]: PersonalAccountTypes.SAVINGS,
  [BankAccountTypes.PERSONAL_INVESTMENT]: PersonalAccountTypes.SAVINGS,
  [BankAccountTypes.OFFSHORE]: PersonalAccountTypes.OFFSHORE
};

const mergeGameState = (savedState = {}) => {
  const base = createInitialGameState();
  const incoming = deepClone(savedState);

  const merged = {
    ...base,
    ...incoming,
    financeState: { ...base.financeState, ...(incoming.financeState || {}) },
    bankingState: { ...base.bankingState, ...(incoming.bankingState || {}) },
    governmentState: { ...base.governmentState, ...(incoming.governmentState || {}) },
    investmentState: { ...base.investmentState, ...(incoming.investmentState || {}) },
    industryState: { ...base.industryState, ...(incoming.industryState || {}) },
    securityState: { ...base.securityState, ...(incoming.securityState || {}) },
    citizensState: { ...base.citizensState, ...(incoming.citizensState || {}) },
    taxationState: { ...base.taxationState, ...(incoming.taxationState || {}) },
    constructionState: { ...base.constructionState, ...(incoming.constructionState || {}) },
    personalSpendingState: { ...base.personalSpendingState, ...(incoming.personalSpendingState || {}) }
  };

  merged.personalFinances = incoming.personalFinances
    ? { ...base.personalFinances, ...incoming.personalFinances }
    : buildPersonalFinancesSnapshot(merged.financeState.personalFinances);

  merged.citizenGroups = incoming.citizenGroups
    ? { ...base.citizenGroups, ...incoming.citizenGroups }
    : deepClone(merged.citizensState.groups);

  if (!merged.citizensState.activeIssues || merged.citizensState.activeIssues.length === 0) {
    merged.citizensState = {
      ...merged.citizensState,
      activeIssues: citizenIssues.slice(0, 3).map((issue) => ({ ...issue }))
    };
  }

  return merged;
};

const handleBuyStock = (state, payload = {}) => {
  const { stockId, quantity, price, accountType, commission = 0 } = payload;

  if (!stockId || !quantity || quantity <= 0 || !price || !accountType) {
    return { ...state, errorMessage: 'Некорректные параметры операции' };
  }

  const bankingState = deepClone(state.bankingState || initialBankingState);
  const account = bankingState.accounts?.[accountType];

  if (!account) {
    return { ...state, errorMessage: 'Выбранный банковский счет недоступен' };
  }

  const totalCost = price * quantity + commission;
  if ((account.balance || 0) < totalCost) {
    return { ...state, errorMessage: 'Недостаточно средств на счете для покупки акций' };
  }

  bankingState.accounts[accountType] = {
    ...account,
    balance: account.balance - totalCost
  };

  const portfolioKey = accountType.includes('personal') ? 'personal' : 'city';
  const currentPortfolio = bankingState.stockPortfolio?.[portfolioKey] || {};
  const existing = currentPortfolio[stockId] || { quantity: 0, averagePrice: 0 };
  const newQuantity = existing.quantity + quantity;
  const newAveragePrice = newQuantity > 0
    ? ((existing.averagePrice * existing.quantity) + (price * quantity)) / newQuantity
    : price;

  bankingState.stockPortfolio = {
    ...bankingState.stockPortfolio,
    [portfolioKey]: {
      ...currentPortfolio,
      [stockId]: {
        quantity: newQuantity,
        averagePrice: newAveragePrice
      }
    }
  };

  bankingState.transactionHistory = [
    {
      id: Date.now(),
      type: 'buy_stock',
      stockId,
      quantity,
      price,
      commission,
      accountType,
      total: totalCost,
      timestamp: Date.now()
    },
    ...(bankingState.transactionHistory || [])
  ].slice(0, 100);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;

  if (portfolioKey === 'city') {
    financeState.cityBudget = {
      ...financeState.cityBudget,
      total: Math.max(0, (financeState.cityBudget.total || 0) - totalCost)
    };
    budget = Math.max(0, budget - totalCost);
  } else {
    const mappedAccount = PERSONAL_BANK_ACCOUNT_MAP[accountType];
    if (mappedAccount) {
      const current = financeState.personalFinances?.accounts?.[mappedAccount] || 0;
      financeState.personalFinances = {
        ...financeState.personalFinances,
        accounts: {
          ...financeState.personalFinances.accounts,
          [mappedAccount]: Math.max(0, current - totalCost)
        }
      };
    }
  }

  return {
    ...state,
    errorMessage: null,
    bankingState,
    financeState,
    budget,
    personalFinances: buildPersonalFinancesSnapshot(financeState.personalFinances)
  };
};

const handleSellStock = (state, payload = {}) => {
  const { stockId, quantity, price, accountType, commission = 0 } = payload;

  if (!stockId || !quantity || quantity <= 0 || !price || !accountType) {
    return { ...state, errorMessage: 'Некорректные параметры операции продажи' };
  }

  const bankingState = deepClone(state.bankingState || initialBankingState);
  const portfolioKey = accountType.includes('personal') ? 'personal' : 'city';
  const currentPortfolio = bankingState.stockPortfolio?.[portfolioKey] || {};
  const existing = currentPortfolio[stockId];

  if (!existing || existing.quantity < quantity) {
    return { ...state, errorMessage: 'Недостаточно акций для продажи' };
  }

  const account = bankingState.accounts?.[accountType];
  if (!account) {
    return { ...state, errorMessage: 'Счет для зачисления средств не найден' };
  }

  const grossAmount = price * quantity;
  const netAmount = Math.max(0, grossAmount - commission);
  const newQuantity = existing.quantity - quantity;

  const updatedPortfolio = { ...currentPortfolio };
  if (newQuantity > 0) {
    updatedPortfolio[stockId] = {
      ...existing,
      quantity: newQuantity
    };
  } else {
    delete updatedPortfolio[stockId];
  }

  bankingState.stockPortfolio = {
    ...bankingState.stockPortfolio,
    [portfolioKey]: updatedPortfolio
  };

  bankingState.accounts[accountType] = {
    ...account,
    balance: (account.balance || 0) + netAmount
  };

  bankingState.transactionHistory = [
    {
      id: Date.now(),
      type: 'sell_stock',
      stockId,
      quantity,
      price,
      commission,
      accountType,
      total: netAmount,
      timestamp: Date.now()
    },
    ...(bankingState.transactionHistory || [])
  ].slice(0, 100);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;

  if (portfolioKey === 'city') {
    financeState.cityBudget = {
      ...financeState.cityBudget,
      total: (financeState.cityBudget.total || 0) + netAmount
    };
    budget += netAmount;
  } else {
    const mappedAccount = PERSONAL_BANK_ACCOUNT_MAP[accountType];
    if (mappedAccount) {
      const current = financeState.personalFinances?.accounts?.[mappedAccount] || 0;
      financeState.personalFinances = {
        ...financeState.personalFinances,
        accounts: {
          ...financeState.personalFinances.accounts,
          [mappedAccount]: current + netAmount
        }
      };
    }
  }

  return {
    ...state,
    errorMessage: null,
    bankingState,
    financeState,
    budget,
    personalFinances: buildPersonalFinancesSnapshot(financeState.personalFinances)
  };
};

const appendTransaction = (history = [], entry) => [entry, ...history].slice(0, 100);

const isCityAccount = (accountType) => accountType?.startsWith('city');

const applyBankAccountChange = (financeStateInput, accountType, delta, currentBudget = 0) => {
  const financeState = financeStateInput ? deepClone(financeStateInput) : deepClone(initialFinanceState);
  let budget = currentBudget ?? 0;

  if (!accountType) {
    return {
      financeState,
      budget,
      personalFinances: buildPersonalFinancesSnapshot(financeState.personalFinances)
    };
  }

  if (isCityAccount(accountType)) {
    const total = (financeState.cityBudget.total || 0) + delta;

    financeState.cityBudget = {
      ...financeState.cityBudget,
      total: total < 0 ? 0 : total
    };

    budget = (budget || 0) + delta;
    if (budget < 0) budget = 0;
  } else {
    const mappedAccount = PERSONAL_BANK_ACCOUNT_MAP[accountType] || PersonalAccountTypes.CHECKING;
    const current = financeState.personalFinances?.accounts?.[mappedAccount] || 0;

    financeState.personalFinances = {
      ...financeState.personalFinances,
      accounts: {
        ...financeState.personalFinances.accounts,
        [mappedAccount]: Math.max(0, current + delta)
      }
    };
  }

  return {
    financeState,
    budget,
    personalFinances: buildPersonalFinancesSnapshot(financeState.personalFinances)
  };
};

const adjustBankAccountBalance = (bankingStateInput, accountType, delta) => {
  const bankingState = bankingStateInput ? deepClone(bankingStateInput) : deepClone(initialBankingState);

  if (!accountType || !bankingState.accounts?.[accountType]) {
    return bankingState;
  }

  const account = bankingState.accounts[accountType];
  bankingState.accounts[accountType] = {
    ...account,
    balance: Math.max(0, (account.balance || 0) + delta)
  };

  return bankingState;
};

const handleTransferFunds = (state, payload = {}) => {
  const { fromAccount, toAccount, amount } = payload;

  if (!fromAccount || !toAccount || fromAccount === toAccount || !amount || amount <= 0) {
    return { ...state, errorMessage: 'Некорректные параметры перевода' };
  }

  const bankingState = deepClone(state.bankingState || initialBankingState);
  const from = bankingState.accounts?.[fromAccount];
  const to = bankingState.accounts?.[toAccount];

  if (!from || !to) {
    return { ...state, errorMessage: 'Выбранный счет недоступен' };
  }

  if ((from.balance || 0) < amount) {
    return { ...state, errorMessage: 'Недостаточно средств для перевода' };
  }

  bankingState.accounts[fromAccount] = {
    ...from,
    balance: from.balance - amount
  };

  bankingState.accounts[toAccount] = {
    ...to,
    balance: (to.balance || 0) + amount
  };

  bankingState.transactionHistory = appendTransaction(bankingState.transactionHistory, {
    id: Date.now(),
    type: 'transfer',
    fromAccount,
    toAccount,
    amount,
    timestamp: Date.now()
  });

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances = buildPersonalFinancesSnapshot(financeState.personalFinances);

  ({ financeState, budget, personalFinances } = applyBankAccountChange(financeState, fromAccount, -amount, budget));
  ({ financeState, budget, personalFinances } = applyBankAccountChange(financeState, toAccount, amount, budget));

  return {
    ...state,
    errorMessage: null,
    bankingState,
    financeState,
    budget,
    personalFinances
  };
};

const resolveLoanAccount = (loan) => {
  if (!loan) return BankAccountTypes.CITY_CHECKING;

  if (loan.type === LoanTypes.PERSONAL) {
    return BankAccountTypes.PERSONAL_CHECKING;
  }

  if (loan.type === LoanTypes.BUSINESS) {
    return BankAccountTypes.PERSONAL_CHECKING;
  }

  return BankAccountTypes.CITY_CHECKING;
};

const handleTakeLoan = (state, payload = {}) => {
  const { loanId } = payload;
  const loanOffer = loanOffers.find((loan) => loan.id === loanId);

  if (!loanOffer) {
    return { ...state, errorMessage: 'Кредитное предложение не найдено' };
  }

  const creditRating = bankingHelpers.checkCreditRating(state);
  if (loanOffer.requirements?.minRating && creditRating < loanOffer.requirements.minRating) {
    return { ...state, errorMessage: 'Недостаточный кредитный рейтинг для данного кредита' };
  }

  const accountType = resolveLoanAccount(loanOffer);
  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const account = bankingState.accounts?.[accountType];

  if (!account) {
    return { ...state, errorMessage: 'Счет для зачисления кредита недоступен' };
  }

  const updatedBankingState = adjustBankAccountBalance(bankingState, accountType, loanOffer.amount);
  const monthlyPayment = bankingHelpers.calculateLoanPayment(loanOffer.amount, loanOffer.interestRate, loanOffer.term);

  const loanEntry = {
    id: `${loanOffer.id}_${Date.now()}`,
    offerId: loanOffer.id,
    type: loanOffer.type,
    bank: loanOffer.bank,
    amount: loanOffer.amount,
    interestRate: loanOffer.interestRate,
    term: loanOffer.term,
    remainingAmount: loanOffer.amount,
    remainingMonths: loanOffer.term,
    issueDate: Date.now(),
    monthlyPayment,
    status: 'active',
    accountType,
    isPersonal: !isCityAccount(accountType)
  };

  updatedBankingState.loans = [loanEntry, ...(updatedBankingState.loans || [])];
  updatedBankingState.transactionHistory = appendTransaction(updatedBankingState.transactionHistory, {
    id: Date.now(),
    type: 'loan_taken',
    loanId: loanOffer.id,
    amount: loanOffer.amount,
    bank: loanOffer.bank,
    accountType,
    timestamp: Date.now()
  });

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(financeState, accountType, loanOffer.amount, budget));

  return {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances
  };
};

const resolveDepositAccount = (depositId) => {
  if (!depositId) return BankAccountTypes.CITY_CHECKING;
  if (depositId.includes('personal')) return BankAccountTypes.PERSONAL_SAVINGS;
  if (depositId.includes('offshore')) return BankAccountTypes.OFFSHORE;
  if (depositId.includes('city')) return BankAccountTypes.CITY_SAVINGS;
  return BankAccountTypes.CITY_CHECKING;
};

const handleCreateDeposit = (state, payload = {}) => {
  const { depositId, amount } = payload;
  const depositOffer = depositOffers.find((deposit) => deposit.id === depositId);

  const depositAmount = Number(amount || 0);

  if (!depositOffer) {
    return { ...state, errorMessage: 'Депозит не найден' };
  }

  if (!depositAmount || depositAmount < depositOffer.minAmount) {
    return { ...state, errorMessage: `Минимальная сумма для депозита: ${depositOffer.minAmount.toLocaleString('ru-RU')} ₽` };
  }

  if (depositOffer.maxAmount && depositAmount > depositOffer.maxAmount) {
    return { ...state, errorMessage: `Максимальная сумма для депозита: ${depositOffer.maxAmount.toLocaleString('ru-RU')} ₽` };
  }

  const accountType = resolveDepositAccount(depositOffer.id);
  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const account = bankingState.accounts?.[accountType];

  if (!account || (account.balance || 0) < depositAmount) {
    return { ...state, errorMessage: 'Недостаточно средств для открытия депозита' };
  }

  const updatedBankingState = adjustBankAccountBalance(bankingState, accountType, -depositAmount);
  const depositEntry = {
    id: `${depositOffer.id}_${Date.now()}`,
    offerId: depositOffer.id,
    bank: depositOffer.bank,
    interestRate: depositOffer.interestRate,
    term: depositOffer.term,
    amount: depositAmount,
    startDate: Date.now(),
    maturityDate: Date.now() + depositOffer.term * 30 * 24 * 60 * 60 * 1000,
    accruedInterest: 0,
    accountType,
    type: depositOffer.type,
    remainingMonths: depositOffer.term
  };

  updatedBankingState.deposits = [depositEntry, ...(updatedBankingState.deposits || [])];
  updatedBankingState.transactionHistory = appendTransaction(updatedBankingState.transactionHistory, {
    id: Date.now(),
    type: 'deposit_opened',
    depositId: depositOffer.id,
    amount: depositAmount,
    bank: depositOffer.bank,
    accountType,
    timestamp: Date.now()
  });

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(financeState, accountType, -depositAmount, budget));

  return {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances
  };
};

const POSITION_ORDER = [
  PositionLevels.ASSISTANT,
  PositionLevels.SPECIALIST,
  PositionLevels.DEPARTMENT_HEAD,
  PositionLevels.DEPUTY,
  PositionLevels.HEAD
];

const findGovernmentEmployee = (governmentState, employeeId) => {
  if (!governmentState?.employees) return null;

  for (const [department, employees] of Object.entries(governmentState.employees)) {
    const index = employees.findIndex((emp) => emp.id === employeeId);
    if (index !== -1) {
      return { department, index, employee: employees[index] };
    }
  }

  return null;
};

const handlePromoteEmployee = (state, payload = {}) => {
  const { employeeId } = payload;
  const governmentState = state.governmentState ? deepClone(state.governmentState) : deepClone(initialGovernmentState);
  const found = findGovernmentEmployee(governmentState, employeeId);

  if (!found) {
    return { ...state, errorMessage: 'Сотрудник не найден' };
  }

  const { department, index, employee } = found;
  const currentLevelIndex = POSITION_ORDER.indexOf(employee.level);

  if (currentLevelIndex === -1 || currentLevelIndex >= POSITION_ORDER.length - 1) {
    return { ...state, errorMessage: 'Повышение невозможно' };
  }

  const newLevel = POSITION_ORDER[currentLevelIndex + 1];
  const salaryIncrease = Math.round(employee.salary * 0.2);

  const promotedEmployee = {
    ...employee,
    level: newLevel,
    salary: employee.salary + salaryIncrease,
    mood: clamp((employee.mood || 70) + 10),
    workload: clamp((employee.workload || 70) - 10),
    lastPromotion: new Date().toISOString()
  };

  governmentState.employees[department] = [...governmentState.employees[department]];
  governmentState.employees[department][index] = promotedEmployee;

  governmentState.performanceMetrics = {
    ...governmentState.performanceMetrics,
    decisionsPerMonth: (governmentState.performanceMetrics?.decisionsPerMonth || 0) + 1,
    employeeSatisfaction: clamp((governmentState.performanceMetrics?.employeeSatisfaction || 70) + 2),
    departmentEfficiency: clamp((governmentState.performanceMetrics?.departmentEfficiency || 70) + 1)
  };

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  const adminExpenses = financeState.cityBudget?.monthlyExpenses?.[BudgetCategories.ADMINISTRATION] || 0;
  financeState.cityBudget = {
    ...financeState.cityBudget,
    monthlyExpenses: {
      ...financeState.cityBudget.monthlyExpenses,
      [BudgetCategories.ADMINISTRATION]: Math.max(0, adminExpenses + salaryIncrease)
    }
  };

  return {
    ...state,
    errorMessage: null,
    mayorRating: clamp((state.mayorRating || 0) + 2, GameConstants.MIN_MAYOR_RATING, GameConstants.MAX_MAYOR_RATING),
    governmentState,
    financeState
  };
};

const handleFireEmployee = (state, payload = {}) => {
  const { employeeId } = payload;
  const governmentState = state.governmentState ? deepClone(state.governmentState) : deepClone(initialGovernmentState);
  const found = findGovernmentEmployee(governmentState, employeeId);

  if (!found) {
    return { ...state, errorMessage: 'Сотрудник не найден' };
  }

  const { department, index, employee } = found;
  governmentState.employees[department] = governmentState.employees[department]
    .filter((_, empIndex) => empIndex !== index);

  governmentState.performanceMetrics = {
    ...governmentState.performanceMetrics,
    employeeSatisfaction: clamp((governmentState.performanceMetrics?.employeeSatisfaction || 70) - 5),
    corruptionIncidents: (governmentState.performanceMetrics?.corruptionIncidents || 0) + 1
  };

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  const adminExpenses = financeState.cityBudget?.monthlyExpenses?.[BudgetCategories.ADMINISTRATION] || 0;
  financeState.cityBudget = {
    ...financeState.cityBudget,
    monthlyExpenses: {
      ...financeState.cityBudget.monthlyExpenses,
      [BudgetCategories.ADMINISTRATION]: Math.max(0, adminExpenses - employee.salary)
    }
  };

  return {
    ...state,
    errorMessage: null,
    mayorRating: clamp((state.mayorRating || 0) - 3, GameConstants.MIN_MAYOR_RATING, GameConstants.MAX_MAYOR_RATING),
    governmentState,
    financeState
  };
};

const handleChangeEmployeeSalary = (state, payload = {}) => {
  const { employeeId, salary } = payload;
  const newSalary = Number(salary);

  if (!newSalary || newSalary <= 0) {
    return { ...state, errorMessage: 'Некорректная зарплата' };
  }

  const governmentState = state.governmentState ? deepClone(state.governmentState) : deepClone(initialGovernmentState);
  const found = findGovernmentEmployee(governmentState, employeeId);

  if (!found) {
    return { ...state, errorMessage: 'Сотрудник не найден' };
  }

  const { department, index, employee } = found;
  const salaryDelta = newSalary - employee.salary;

  const updatedEmployee = {
    ...employee,
    salary: newSalary,
    mood: clamp((employee.mood || 70) + (salaryDelta > 0 ? 5 : -5))
  };

  governmentState.employees[department] = [...governmentState.employees[department]];
  governmentState.employees[department][index] = updatedEmployee;

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  const adminExpenses = financeState.cityBudget?.monthlyExpenses?.[BudgetCategories.ADMINISTRATION] || 0;
  financeState.cityBudget = {
    ...financeState.cityBudget,
    monthlyExpenses: {
      ...financeState.cityBudget.monthlyExpenses,
      [BudgetCategories.ADMINISTRATION]: Math.max(0, adminExpenses + salaryDelta)
    }
  };

  return {
    ...state,
    errorMessage: null,
    governmentState,
    financeState
  };
};

const handleImplementPolicy = (state, payload = {}) => {
  const { policyId } = payload;
  const policy = policyOptions.find((option) => option.id === policyId);

  if (!policy) {
    return { ...state, errorMessage: 'Политика не найдена' };
  }

  const governmentState = state.governmentState ? deepClone(state.governmentState) : deepClone(initialGovernmentState);
  if (governmentState.activePolicies?.some((active) => active.policyId === policy.id)) {
    return { ...state, errorMessage: 'Политика уже активна' };
  }

  const departmentEmployees = governmentState.employees?.[policy.department] || [];
  const canImplement = governmentHelpers.canImplementPolicy(policy, policy.department, departmentEmployees);
  if (!canImplement.canImplement) {
    return { ...state, errorMessage: canImplement.reason };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < policy.cost) {
    return { ...state, errorMessage: 'Недостаточно средств для реализации политики' };
  }

  const updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -policy.cost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(financeState, BankAccountTypes.CITY_CHECKING, -policy.cost, budget));

  const policyEntry = {
    id: `${policy.id}_${Date.now()}`,
    policyId: policy.id,
    startDate: Date.now(),
    remainingDuration: policy.duration || 0,
    effects: policy.effects
  };

  governmentState.activePolicies = [policyEntry, ...(governmentState.activePolicies || [])];
  governmentState.performanceMetrics = {
    ...governmentState.performanceMetrics,
    decisionsPerMonth: (governmentState.performanceMetrics?.decisionsPerMonth || 0) + 1,
    departmentEfficiency: clamp((governmentState.performanceMetrics?.departmentEfficiency || 70) + (policy.effects?.efficiency || 0))
  };

  if (policy.effects?.employeeMood) {
    governmentState.employees[policy.department] = (governmentState.employees[policy.department] || []).map((emp) => ({
      ...emp,
      mood: clamp((emp.mood || 70) + policy.effects.employeeMood)
    }));
  }

  if (policy.effects?.corruptionRisk && financeState.risks) {
    financeState.risks = {
      ...financeState.risks,
      publicSuspicion: clamp((financeState.risks.publicSuspicion || 0) + policy.effects.corruptionRisk),
      investigationRisk: clamp((financeState.risks.investigationRisk || 0) + policy.effects.corruptionRisk)
    };
  }

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    governmentState
  };

  if (policy.effects?.mayorRating) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + policy.effects.mayorRating,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  if (policy.effects?.happiness) {
    updatedState.happiness = clamp((state.happiness || 0) + policy.effects.happiness);
  }

  if (policy.effects?.infrastructure) {
    updatedState.infrastructure = clamp((state.infrastructure || 0) + policy.effects.infrastructure);
  }

  if (policy.effects?.unemployment) {
    updatedState.unemployment = Math.max(0, (state.unemployment || 0) + policy.effects.unemployment);
  }

  return updatedState;
};

const handleMakeGovernmentDecision = (state, payload = {}) => {
  const { decisionType, data = {} } = payload;
  const governmentState = state.governmentState ? deepClone(state.governmentState) : deepClone(initialGovernmentState);

  const decisionRecord = {
    id: Date.now(),
    type: decisionType,
    data,
    timestamp: Date.now()
  };

  governmentState.pendingDecisions = [decisionRecord, ...(governmentState.pendingDecisions || [])].slice(0, 20);
  governmentState.performanceMetrics = {
    ...governmentState.performanceMetrics,
    decisionsPerMonth: (governmentState.performanceMetrics?.decisionsPerMonth || 0) + 1
  };

  let bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances = state.personalFinances || buildPersonalFinancesSnapshot(financeState.personalFinances);

  if (data.budgetChange) {
    const budgetChange = Number(data.budgetChange);
    if (!Number.isNaN(budgetChange) && budgetChange !== 0) {
      bankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, budgetChange);
      ({ financeState, budget, personalFinances } = applyBankAccountChange(
        financeState,
        BankAccountTypes.CITY_CHECKING,
        budgetChange,
        budget
      ));
    }
  }

  if (data.department && governmentState.departmentSettings?.[data.department]) {
    governmentState.departmentSettings[data.department] = {
      ...governmentState.departmentSettings[data.department],
      ...data.departmentUpdate
    };
  }

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState,
    financeState,
    budget,
    personalFinances,
    governmentState
  };

  if (data.ratingChange) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + data.ratingChange,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  return updatedState;
};

const handleMakeInvestment = (state, payload = {}) => {
  const { investmentId, amount } = payload;
  const investment = investmentOpportunities.find((item) => item.id === investmentId);
  const investmentAmount = Number(amount || 0);

  if (!investment) {
    return { ...state, errorMessage: 'Инвестиционное предложение не найдено' };
  }

  if (!investmentAmount || investmentAmount <= 0) {
    return { ...state, errorMessage: 'Некорректная сумма инвестиций' };
  }

  const canInvest = investmentHelpers.canInvest(investment, investmentAmount, state);
  if (!canInvest.canInvest) {
    return { ...state, errorMessage: canInvest.reason };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < investmentAmount) {
    return { ...state, errorMessage: 'Недостаточно средств для инвестиций' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -investmentAmount);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -investmentAmount,
    budget
  ));

  let kickbackAmount = 0;
  if (investment.personalBenefits?.kickbackPercent) {
    kickbackAmount = Math.round(investmentAmount * investment.personalBenefits.kickbackPercent / 100);
  }

  if (investment.personalBenefits?.personalProperty) {
    kickbackAmount += investment.personalBenefits.personalProperty;
  }

  if (kickbackAmount > 0) {
    updatedBankingState = adjustBankAccountBalance(updatedBankingState, BankAccountTypes.PERSONAL_SAVINGS, kickbackAmount);
    ({ financeState, budget, personalFinances } = applyBankAccountChange(
      financeState,
      BankAccountTypes.PERSONAL_SAVINGS,
      kickbackAmount,
      budget
    ));
  }

  const investmentState = state.investmentState ? deepClone(state.investmentState) : deepClone(initialInvestmentState);

  const existingActive = investmentState.activeInvestments?.filter((inv) => inv.id !== investment.id) || [];
  const newInvestment = {
    id: investment.id,
    amount: investmentAmount,
    startDate: Date.now(),
    monthsPassed: 0,
    expectedReturn: investment.expectedReturn,
    riskLevel: investment.riskLevel,
    sector: investment.sector,
    status: 'active'
  };

  investmentState.activeInvestments = [newInvestment, ...existingActive];
  investmentState.portfolio = {
    ...investmentState.portfolio,
    totalInvested: (investmentState.portfolio?.totalInvested || 0) + investmentAmount,
    activeValue: (investmentState.portfolio?.activeValue || 0) + investmentAmount,
    sectorDistribution: {
      ...(investmentState.portfolio?.sectorDistribution || {}),
      [investment.sector]: ((investmentState.portfolio?.sectorDistribution || {})[investment.sector] || 0) + investmentAmount
    }
  };

  const riskScore = investmentHelpers.calculateInvestmentRisk(investment, state);
  investmentState.investmentMetrics = {
    ...investmentState.investmentMetrics,
    totalProjects: (investmentState.investmentMetrics?.totalProjects || 0) + 1,
    riskScore: Math.round((investmentState.investmentMetrics?.riskScore || 0) * 0.7 + riskScore * 0.3),
    averageReturn: Math.round(((investmentState.investmentMetrics?.averageReturn || 0) + investment.expectedReturn) / 2)
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    investmentState
  };

  if (investment.cityBenefits?.mayorRating) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + Math.round(investment.cityBenefits.mayorRating * 0.2),
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  return updatedState;
};

const handleWithdrawInvestment = (state, payload = {}) => {
  const { investmentId, amount } = payload;
  const investmentState = state.investmentState ? deepClone(state.investmentState) : deepClone(initialInvestmentState);
  const activeInvestment = investmentState.activeInvestments?.find((inv) => inv.id === investmentId);
  const investment = investmentOpportunities.find((item) => item.id === investmentId);

  if (!activeInvestment || !investment) {
    return { ...state, errorMessage: 'Активная инвестиция не найдена' };
  }

  const withdrawAmount = Number(amount || activeInvestment.amount);
  if (!withdrawAmount || withdrawAmount <= 0) {
    return { ...state, errorMessage: 'Некорректная сумма вывода' };
  }

  const currentValue = investmentHelpers.calculateCurrentValue(
    investment,
    activeInvestment.monthsPassed || 0,
    activeInvestment.amount
  );

  const payout = Math.min(currentValue, withdrawAmount + Math.max(0, currentValue - activeInvestment.amount));
  let bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  bankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, payout);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    payout,
    budget
  ));

  const profit = payout - activeInvestment.amount;
  investmentState.activeInvestments = investmentState.activeInvestments.filter((inv) => inv.id !== investmentId);
  investmentState.completedInvestments = [
    {
      id: `${investmentId}_${Date.now()}`,
      investmentId,
      amount: activeInvestment.amount,
      returned: payout,
      profit,
      completedAt: Date.now()
    },
    ...(investmentState.completedInvestments || [])
  ];

  investmentState.portfolio = {
    ...investmentState.portfolio,
    totalInvested: Math.max(0, (investmentState.portfolio?.totalInvested || 0) - activeInvestment.amount),
    activeValue: Math.max(0, (investmentState.portfolio?.activeValue || 0) - activeInvestment.amount),
    totalReturns: (investmentState.portfolio?.totalReturns || 0) + Math.max(0, profit),
    sectorDistribution: {
      ...(investmentState.portfolio?.sectorDistribution || {}),
      [investment.sector]: Math.max(
        0,
        ((investmentState.portfolio?.sectorDistribution || {})[investment.sector] || 0) - activeInvestment.amount
      )
    }
  };

  if (investment.cityBenefits?.taxRevenue) {
    const monthlyIncome = financeState.cityBudget?.monthlyIncome?.[IncomeTypes.BUSINESS_TAXES] || 0;
    financeState.cityBudget = {
      ...financeState.cityBudget,
      monthlyIncome: {
        ...financeState.cityBudget.monthlyIncome,
        [IncomeTypes.BUSINESS_TAXES]: monthlyIncome + Math.round(investment.cityBenefits.taxRevenue / 12)
      }
    };
  }

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState,
    financeState,
    budget,
    personalFinances,
    investmentState
  };

  if (investment.cityBenefits?.mayorRating) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + investment.cityBenefits.mayorRating,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  if (investment.cityBenefits?.happiness) {
    updatedState.happiness = clamp((state.happiness || 0) + investment.cityBenefits.happiness);
  }

  if (investment.cityBenefits?.infrastructure) {
    updatedState.infrastructure = clamp((state.infrastructure || 0) + investment.cityBenefits.infrastructure);
  }

  if (investment.cityBenefits?.unemployment) {
    updatedState.unemployment = Math.max(0, (state.unemployment || 0) + investment.cityBenefits.unemployment);
  }

  if (investment.personalBenefits?.personalShares) {
    const personalBonus = Math.round(payout * (investment.personalBenefits.personalShares / 100));
    if (personalBonus > 0) {
      updatedState.bankingState = adjustBankAccountBalance(updatedState.bankingState, BankAccountTypes.PERSONAL_SAVINGS, personalBonus);
      ({ financeState: updatedState.financeState, budget: updatedState.budget, personalFinances: updatedState.personalFinances } = applyBankAccountChange(
        updatedState.financeState,
        BankAccountTypes.PERSONAL_SAVINGS,
        personalBonus,
        updatedState.budget
      ));
    }
  }

  return updatedState;
};

const handleImplementIndustrialProject = (state, payload = {}) => {
  const { projectId, kickbacks = [] } = payload;
  const project = industrialProjects.find((item) => item.id === projectId);

  if (!project) {
    return { ...state, errorMessage: 'Промышленный проект не найден' };
  }

  const canImplement = industryHelpers.canImplementProject(project, state);
  if (!canImplement.canImplement) {
    return { ...state, errorMessage: canImplement.reason };
  }

  const kickbackTotal = kickbacks.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalCost = project.totalCost + kickbackTotal;

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < totalCost) {
    return { ...state, errorMessage: 'Недостаточно средств для реализации проекта' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -totalCost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -totalCost,
    budget
  ));

  if (kickbackTotal > 0) {
    updatedBankingState = adjustBankAccountBalance(updatedBankingState, BankAccountTypes.OFFSHORE, kickbackTotal);
    ({ financeState, budget, personalFinances } = applyBankAccountChange(
      financeState,
      BankAccountTypes.OFFSHORE,
      kickbackTotal,
      budget
    ));
  }

  const industryState = state.industryState ? deepClone(state.industryState) : deepClone(initialIndustryState);
  const activeProject = {
    id: project.id,
    startDate: Date.now(),
    monthsPassed: 0,
    status: ProjectStatus.CONSTRUCTION,
    kickbacksSelected: kickbacks.map((item) => item.type),
    kickbacksReceived: kickbackTotal,
    totalCost: project.totalCost
  };

  industryState.activeProjects = [activeProject, ...(industryState.activeProjects || [])];
  industryState.kickbacks = {
    ...industryState.kickbacks,
    total: (industryState.kickbacks?.total || 0) + kickbackTotal,
    byType: kickbacks.reduce((acc, item) => ({
      ...acc,
      [item.type]: (industryState.kickbacks?.byType?.[item.type] || 0) + (item.amount || 0)
    }), { ...(industryState.kickbacks?.byType || {}) }),
    byProject: {
      ...(industryState.kickbacks?.byProject || {}),
      [project.id]: ((industryState.kickbacks?.byProject || {})[project.id] || 0) + kickbackTotal
    },
    history: [
      {
        id: Date.now(),
        projectId: project.id,
        amount: kickbackTotal,
        types: kickbacks.map((item) => item.type),
        timestamp: Date.now()
      },
      ...((industryState.kickbacks?.history || []).slice(0, 49))
    ]
  };

  industryState.industryMetrics = {
    ...industryState.industryMetrics,
    totalInvestment: (industryState.industryMetrics?.totalInvestment || 0) + project.totalCost,
    industrialCapacity: clamp((industryState.industryMetrics?.industrialCapacity || 0) + (project.benefits?.industrialCapacity || 0))
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    industryState
  };

  if (project.benefits?.mayorRating) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + Math.round(project.benefits.mayorRating * 0.3),
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  return updatedState;
};

const handleModernizeEnterprise = (state, payload = {}) => {
  const { enterpriseId } = payload;
  const industryState = state.industryState ? deepClone(state.industryState) : deepClone(initialIndustryState);
  const enterpriseIndex = industryState.enterprises?.findIndex((item) => item.id === enterpriseId) ?? -1;

  if (enterpriseIndex === -1) {
    return { ...state, errorMessage: 'Предприятие не найдено' };
  }

  const enterprise = industryState.enterprises[enterpriseIndex];
  if (!enterprise.modernizationNeeded) {
    return { ...state, errorMessage: 'Предприятие не требует модернизации' };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < enterprise.modernizationCost) {
    return { ...state, errorMessage: 'Недостаточно средств для модернизации' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -enterprise.modernizationCost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -enterprise.modernizationCost,
    budget
  ));

  const modernizationKickback = Math.round(enterprise.modernizationCost * 0.05);
  if (modernizationKickback > 0) {
    updatedBankingState = adjustBankAccountBalance(updatedBankingState, BankAccountTypes.OFFSHORE, modernizationKickback);
    ({ financeState, budget, personalFinances } = applyBankAccountChange(
      financeState,
      BankAccountTypes.OFFSHORE,
      modernizationKickback,
      budget
    ));
  }

  const modernizedEnterprise = {
    ...enterprise,
    modernizationNeeded: false,
    status: 'modernized',
    employees: (enterprise.employees || 0) + (enterprise.modernizationBenefits?.jobs || 0),
    annualRevenue: (enterprise.annualRevenue || 0) + (enterprise.modernizationBenefits?.revenue || 0),
    taxContribution: (enterprise.taxContribution || 0) + Math.round((enterprise.modernizationBenefits?.revenue || 0) * 0.1)
  };

  industryState.enterprises = [...industryState.enterprises];
  industryState.enterprises[enterpriseIndex] = modernizedEnterprise;
  industryState.industryMetrics = {
    ...industryState.industryMetrics,
    totalEmployment: (industryState.industryMetrics?.totalEmployment || 0) + (enterprise.modernizationBenefits?.jobs || 0),
    totalRevenue: (industryState.industryMetrics?.totalRevenue || 0) + (enterprise.modernizationBenefits?.revenue || 0),
    totalTaxRevenue: (industryState.industryMetrics?.totalTaxRevenue || 0) + Math.round((enterprise.modernizationBenefits?.revenue || 0) * 0.1)
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    industryState
  };

  if (enterprise.modernizationBenefits?.efficiency) {
    updatedState.infrastructure = clamp((state.infrastructure || 0) + enterprise.modernizationBenefits.efficiency);
  }

  if (enterprise.modernizationBenefits?.ecology) {
    updatedState.ecology = clamp((state.ecology || 0) + enterprise.modernizationBenefits.ecology);
  }

  return updatedState;
};

const PERSONAL_OPERATION_TYPES = new Set([
  OperationTypes.BRIBE,
  OperationTypes.BLACKMAIL,
  OperationTypes.FAVOR,
  OperationTypes.CASE_DISMISSAL
]);

const handleExecuteSecurityOperation = (state, payload = {}) => {
  const { agencyId, operation } = payload;

  if (!agencyId || !operation) {
    return { ...state, errorMessage: 'Некорректные параметры операции' };
  }

  const securityState = state.securityState ? deepClone(state.securityState) : deepClone(initialSecurityState);
  const agency = securityState.agencies?.[agencyId];

  if (!agency) {
    return { ...state, errorMessage: 'Силовое ведомство не найдено' };
  }

  const cost = Number(operation.cost || 0);
  const usePersonalFunds = PERSONAL_OPERATION_TYPES.has(operation.type);
  const accountType = usePersonalFunds ? BankAccountTypes.PERSONAL_CHECKING : BankAccountTypes.CITY_CHECKING;

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const account = bankingState.accounts?.[accountType];
  if (!account || (account.balance || 0) < cost) {
    return { ...state, errorMessage: 'Недостаточно средств для проведения операции' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, accountType, -cost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    accountType,
    -cost,
    budget
  ));

  const successRate = securityHelpers.calculateOperationSuccess(operation, agency, state);
  const success = Math.random() * 100 < successRate;

  const agencyEntry = {
    ...agency,
    lastInteraction: Date.now(),
    totalBribes: (agency.totalBribes || 0) + (operation.type === OperationTypes.BRIBE ? cost : 0),
    operationHistory: [
      {
        id: Date.now(),
        type: operation.type,
        cost,
        success,
        timestamp: Date.now()
      },
      ...((agency.operationHistory || []).slice(0, 19))
    ]
  };

  if (success) {
    const influenceOrder = [
      InfluenceLevels.HOSTILE,
      InfluenceLevels.UNFRIENDLY,
      InfluenceLevels.NEUTRAL,
      InfluenceLevels.FRIENDLY,
      InfluenceLevels.CONTROLLED
    ];
    const currentIndex = influenceOrder.indexOf(agencyEntry.influence);
    if (currentIndex < influenceOrder.length - 1 && currentIndex !== -1) {
      agencyEntry.influence = influenceOrder[currentIndex + 1];
    }
  } else {
    const influenceOrder = [
      InfluenceLevels.CONTROLLED,
      InfluenceLevels.FRIENDLY,
      InfluenceLevels.NEUTRAL,
      InfluenceLevels.UNFRIENDLY,
      InfluenceLevels.HOSTILE
    ];
    const currentIndex = influenceOrder.indexOf(agencyEntry.influence);
    if (currentIndex < influenceOrder.length - 1 && currentIndex !== -1) {
      agencyEntry.influence = influenceOrder[currentIndex + 1];
    }
  }

  securityState.agencies = {
    ...securityState.agencies,
    [agencyId]: agencyEntry
  };

  securityState.operationHistory = [
    {
      id: Date.now(),
      agencyId,
      type: operation.type,
      cost,
      success,
      successRate,
      timestamp: Date.now()
    },
    ...((securityState.operationHistory || []).slice(0, 49))
  ];

  securityState.securityMetrics = {
    ...securityState.securityMetrics,
    investigationProbability: clamp(
      (securityState.securityMetrics?.investigationProbability || 0) + (success ? -5 : 5),
      0,
      100
    ),
    protectionLevel: clamp(
      (securityState.securityMetrics?.protectionLevel || 0) + (success ? 5 : -2),
      0,
      100
    )
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    securityState
  };

  if (!success && operation.type === OperationTypes.BRIBE) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) - 3,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  return updatedState;
};

const handleMitigateThreat = (state, payload = {}) => {
  const { threatId, mitigationOption = {} } = payload;
  const securityState = state.securityState ? deepClone(state.securityState) : deepClone(initialSecurityState);
  const threatIndex = securityState.activeThreats?.findIndex((threat) => threat.id === threatId) ?? -1;

  if (threatIndex === -1) {
    return { ...state, errorMessage: 'Угроза не найдена' };
  }

  const threat = securityState.activeThreats[threatIndex];
  const cost = Number(mitigationOption.cost || 0);
  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < cost) {
    return { ...state, errorMessage: 'Недостаточно средств для противодействия угрозе' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -cost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -cost,
    budget
  ));

  const successRate = mitigationOption.success_rate || 60;
  const success = Math.random() * 100 < successRate;

  if (success) {
    securityState.activeThreats = securityState.activeThreats.filter((item, index) => index !== threatIndex);
    securityState.securityMetrics = {
      ...securityState.securityMetrics,
      overallThreatLevel: ThreatLevels.LOW,
      investigationProbability: clamp((securityState.securityMetrics?.investigationProbability || 0) - 10, 0, 100)
    };
  } else {
    securityState.activeThreats[threatIndex] = {
      ...threat,
      escalation: true,
      probability: Math.min(1, (threat.probability || 0) + 0.1)
    };
    securityState.securityMetrics = {
      ...securityState.securityMetrics,
      overallThreatLevel: ThreatLevels.HIGH
    };
  }

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    securityState
  };

  if (success) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + 2,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  } else {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) - 2,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  return updatedState;
};

const handleRespondToIssue = (state, payload = {}) => {
  const { issueId, response = {} } = payload;
  const citizensState = state.citizensState ? deepClone(state.citizensState) : deepClone(initialCitizensState);
  const issueIndex = citizensState.activeIssues?.findIndex((issue) => issue.id === issueId) ?? -1;

  if (issueIndex === -1) {
    return { ...state, errorMessage: 'Обращение не найдено' };
  }

  const issue = citizensState.activeIssues[issueIndex];
  const groupId = issue.group;
  const group = citizensState.groups?.[groupId];

  if (!group) {
    return { ...state, errorMessage: 'Группа граждан не найдена' };
  }

  const amount = Number(response.amount || 0);
  let bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances = state.personalFinances || buildPersonalFinancesSnapshot(financeState.personalFinances);

  if (amount > 0) {
    const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
    if (!cityAccount || (cityAccount.balance || 0) < amount) {
      return { ...state, errorMessage: 'Недостаточно средств для ответа' };
    }

    bankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -amount);
    ({ financeState, budget, personalFinances } = applyBankAccountChange(
      financeState,
      BankAccountTypes.CITY_CHECKING,
      -amount,
      budget
    ));
  }

  const satisfactionChange = citizenHelpers.calculateSatisfactionChange(response, issue, group, state);
  citizensState.groups[groupId] = {
    ...group,
    satisfaction: clamp((group.satisfaction || 0) + satisfactionChange)
  };

  const resolvedIssue = {
    ...issue,
    resolvedAt: Date.now(),
    response
  };

  citizensState.activeIssues = citizensState.activeIssues.filter((item) => item.id !== issueId);
  citizensState.resolvedIssues = [resolvedIssue, ...(citizensState.resolvedIssues || [])].slice(0, 50);

  citizensState.communicationStats = {
    ...citizensState.communicationStats,
    totalIssues: (citizensState.communicationStats?.totalIssues || 0) + 1,
    resolvedIssues: (citizensState.communicationStats?.resolvedIssues || 0) + 1,
    satisfactionRate: clamp((citizensState.communicationStats?.satisfactionRate || 50) + Math.sign(satisfactionChange) * 5)
  };

  citizensState.citizenMetrics = {
    ...citizensState.citizenMetrics,
    overallSatisfaction: clamp(citizenHelpers.calculateOverallSatisfaction(citizensState.groups))
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    citizensState,
    bankingState,
    financeState,
    budget,
    personalFinances
  };

  updatedState.happiness = clamp((state.happiness || 0) + satisfactionChange * 0.2);
  updatedState.mayorRating = clamp(
    (state.mayorRating || 0) + Math.round(satisfactionChange * 0.3),
    GameConstants.MIN_MAYOR_RATING,
    GameConstants.MAX_MAYOR_RATING
  );

  return updatedState;
};

const handleScheduleMeeting = (state, payload = {}) => {
  const { groupId } = payload;
  const citizensState = state.citizensState ? deepClone(state.citizensState) : deepClone(initialCitizensState);
  const group = citizensState.groups?.[groupId];

  if (!group) {
    return { ...state, errorMessage: 'Группа граждан не найдена' };
  }

  const updatedGroup = {
    ...group,
    lastInteraction: Date.now(),
    satisfaction: clamp((group.satisfaction || 0) + 3),
    communicationHistory: [
      {
        id: Date.now(),
        type: 'meeting',
        timestamp: Date.now()
      },
      ...((group.communicationHistory || []).slice(0, 19))
    ]
  };

  citizensState.groups[groupId] = updatedGroup;
  citizensState.citizenMetrics = {
    ...citizensState.citizenMetrics,
    participationRate: clamp((citizensState.citizenMetrics?.participationRate || 0) + 2)
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    citizensState
  };

  updatedState.happiness = clamp((state.happiness || 0) + 1);
  updatedState.mayorRating = clamp(
    (state.mayorRating || 0) + 1,
    GameConstants.MIN_MAYOR_RATING,
    GameConstants.MAX_MAYOR_RATING
  );

  return updatedState;
};

const TAX_INCOME_MAP = {
  [TaxTypes.INCOME_TAX]: IncomeTypes.LOCAL_TAXES,
  [TaxTypes.PROPERTY_TAX]: IncomeTypes.PROPERTY_TAXES,
  [TaxTypes.LAND_TAX]: IncomeTypes.LOCAL_TAXES,
  [TaxTypes.TRANSPORT_TAX]: IncomeTypes.FINES,
  [TaxTypes.BUSINESS_TAX]: IncomeTypes.BUSINESS_TAXES,
  [TaxTypes.SALES_TAX]: IncomeTypes.LOCAL_TAXES,
  [TaxTypes.EXCISE_TAX]: IncomeTypes.FINES,
  [TaxTypes.TOURIST_TAX]: IncomeTypes.INVESTMENTS,
  [TaxTypes.ADVERTISING_TAX]: IncomeTypes.BUSINESS_TAXES,
  [TaxTypes.ENVIRONMENTAL_TAX]: IncomeTypes.FINES
};

const EXPENDITURE_TO_BUDGET = {
  [ExpenditureCategories.ADMINISTRATION]: BudgetCategories.ADMINISTRATION,
  [ExpenditureCategories.EDUCATION]: BudgetCategories.EDUCATION,
  [ExpenditureCategories.HEALTHCARE]: BudgetCategories.HEALTHCARE,
  [ExpenditureCategories.SOCIAL_SERVICES]: BudgetCategories.SOCIAL,
  [ExpenditureCategories.INFRASTRUCTURE]: BudgetCategories.INFRASTRUCTURE,
  [ExpenditureCategories.TRANSPORT]: BudgetCategories.INFRASTRUCTURE,
  [ExpenditureCategories.HOUSING_UTILITIES]: BudgetCategories.EMERGENCY,
  [ExpenditureCategories.CULTURE_SPORTS]: BudgetCategories.CULTURE,
  [ExpenditureCategories.ENVIRONMENT]: BudgetCategories.ECOLOGY,
  [ExpenditureCategories.SECURITY]: BudgetCategories.SECURITY,
  [ExpenditureCategories.RESERVES]: BudgetCategories.EMERGENCY
};

const handleImplementTaxPolicy = (state, payload = {}) => {
  const { policyId } = payload;
  const policy = taxPolicies.find((item) => item.id === policyId);

  if (!policy) {
    return { ...state, errorMessage: 'Налоговая политика не найдена' };
  }

  const taxationState = state.taxationState ? deepClone(state.taxationState) : deepClone(initialTaxationState);
  if (taxationState.activePolicies?.some((active) => active.policyId === policy.id)) {
    return { ...state, errorMessage: 'Политика уже активна' };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < policy.cost) {
    return { ...state, errorMessage: 'Недостаточно средств для реализации налоговой политики' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -policy.cost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -policy.cost,
    budget
  ));

  const policyEntry = {
    id: `${policy.id}_${Date.now()}`,
    policyId: policy.id,
    startDate: Date.now(),
    remainingDuration: policy.implementation_time || 0,
    effects: policy.consequences || {}
  };

  taxationState.activePolicies = [policyEntry, ...(taxationState.activePolicies || [])];
  taxationState.policyHistory = [
    {
      id: policyEntry.id,
      policyId: policy.id,
      timestamp: Date.now()
    },
    ...(taxationState.policyHistory || [])
  ];

  if (policy.consequences?.revenue_change) {
    const revenueChange = policy.consequences.revenue_change;
    taxationState.taxMetrics = {
      ...taxationState.taxMetrics,
      totalRevenue: (taxationState.taxMetrics?.totalRevenue || 0) + revenueChange
    };
    taxationState.revenueStructure = {
      ...taxationState.revenueStructure,
      [RevenueCategories.LOCAL_TAXES]: {
        ...(taxationState.revenueStructure?.[RevenueCategories.LOCAL_TAXES] || {}),
        amount: (taxationState.revenueStructure?.[RevenueCategories.LOCAL_TAXES]?.amount || 0) + revenueChange
      }
    };

    const monthlyIncrease = Math.round(revenueChange / 12);
    financeState.cityBudget = {
      ...financeState.cityBudget,
      monthlyIncome: {
        ...financeState.cityBudget.monthlyIncome,
        [IncomeTypes.LOCAL_TAXES]: (financeState.cityBudget.monthlyIncome?.[IncomeTypes.LOCAL_TAXES] || 0) + monthlyIncrease
      }
    };
  }

  if (policy.consequences?.citizen_satisfaction && state.citizensState) {
    const citizensState = state.citizensState ? deepClone(state.citizensState) : deepClone(initialCitizensState);
    Object.entries(policy.consequences.citizen_satisfaction).forEach(([groupKey, change]) => {
      const key = Object.keys(citizensState.groups).find((id) => id.includes(groupKey));
      if (key && citizensState.groups[key]) {
        citizensState.groups[key] = {
          ...citizensState.groups[key],
          satisfaction: clamp((citizensState.groups[key].satisfaction || 0) + change)
        };
      }
    });

    return {
      ...state,
      errorMessage: null,
      bankingState: updatedBankingState,
      financeState,
      budget,
      personalFinances,
      taxationState,
      citizensState
    };
  }

  return {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    taxationState
  };
};

const handleChangeTaxRate = (state, payload = {}) => {
  const { taxType, newRate } = payload;
  if (!taxType || newRate === undefined) {
    return { ...state, errorMessage: 'Некорректные параметры изменения ставки' };
  }

  const taxationState = state.taxationState ? deepClone(state.taxationState) : deepClone(initialTaxationState);
  const currentRate = taxationState.currentRates?.[taxType];

  if (currentRate === undefined) {
    return { ...state, errorMessage: 'Налог не найден' };
  }

  taxationState.currentRates = {
    ...taxationState.currentRates,
    [taxType]: Number(newRate)
  };

  const base = taxationState.taxBase?.[taxType] || 0;
  const efficiency = taxationState.collectionEfficiency?.[taxType] || 0;
  const newRevenue = taxationHelpers.calculateTaxRevenue(taxType, Number(newRate), base, efficiency);
  const incomeKey = TAX_INCOME_MAP[taxType];

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);

  if (incomeKey) {
    financeState.cityBudget = {
      ...financeState.cityBudget,
      monthlyIncome: {
        ...financeState.cityBudget.monthlyIncome,
        [incomeKey]: Math.round(newRevenue / 12)
      }
    };
  }

  taxationState.taxMetrics = {
    ...taxationState.taxMetrics,
    totalRevenue: Object.keys(taxationState.currentRates).reduce((total, typeKey) => {
      const rate = taxationState.currentRates[typeKey];
      const baseValue = taxationState.taxBase?.[typeKey] || 0;
      const eff = taxationState.collectionEfficiency?.[typeKey] || 0;
      return total + taxationHelpers.calculateTaxRevenue(typeKey, rate, baseValue, eff);
    }, 0)
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    financeState,
    taxationState
  };

  if (Number(newRate) > currentRate) {
    updatedState.mayorRating = clamp((state.mayorRating || 0) - 2, GameConstants.MIN_MAYOR_RATING, GameConstants.MAX_MAYOR_RATING);
  } else if (Number(newRate) < currentRate) {
    updatedState.mayorRating = clamp((state.mayorRating || 0) + 2, GameConstants.MIN_MAYOR_RATING, GameConstants.MAX_MAYOR_RATING);
  }

  return updatedState;
};

const handleApplyBudgetChanges = (state, payload = {}) => {
  const { changes = {} } = payload;
  const taxationState = state.taxationState ? deepClone(state.taxationState) : deepClone(initialTaxationState);
  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);

  Object.entries(changes).forEach(([category, amount]) => {
    if (taxationState.expenditureStructure?.[category]) {
      taxationState.expenditureStructure[category] = {
        ...taxationState.expenditureStructure[category],
        amount: Number(amount)
      };

      const mappedCategory = EXPENDITURE_TO_BUDGET[category];
      if (mappedCategory && financeState.cityBudget?.allocated) {
        financeState.cityBudget.allocated = {
          ...financeState.cityBudget.allocated,
          [mappedCategory]: Number(amount)
        };
      }
    }
  });

  const total = Object.values(taxationState.expenditureStructure).reduce((sum, entry) => sum + (entry.amount || 0), 0);
  taxationState.expenditureStructure = Object.entries(taxationState.expenditureStructure).reduce((acc, [key, entry]) => {
    acc[key] = {
      ...entry,
      percentage: total > 0 ? (entry.amount / total) * 100 : 0
    };
    return acc;
  }, {});

  return {
    ...state,
    errorMessage: null,
    taxationState,
    financeState
  };
};

const handleStartConstructionProject = (state, payload = {}) => {
  const { projectId, kickbacks = [] } = payload;
  const project = constructionProjects.find((item) => item.id === projectId);

  if (!project) {
    return { ...state, errorMessage: 'Строительный проект не найден' };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];

  const projectCostInfo = constructionHelpers.calculateProjectCost(project, kickbacks.map((item) => item.type || item));
  const totalCost = projectCostInfo.total_cost;
  const kickbackAmount = projectCostInfo.kickback_amount;

  if (!cityAccount || (cityAccount.balance || 0) < totalCost) {
    return { ...state, errorMessage: 'Недостаточно средств для строительства' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -totalCost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -totalCost,
    budget
  ));

  if (kickbackAmount > 0) {
    updatedBankingState = adjustBankAccountBalance(updatedBankingState, BankAccountTypes.OFFSHORE, kickbackAmount);
    ({ financeState, budget, personalFinances } = applyBankAccountChange(
      financeState,
      BankAccountTypes.OFFSHORE,
      kickbackAmount,
      budget
    ));
  }

  const constructionState = state.constructionState ? deepClone(state.constructionState) : deepClone(initialConstructionState);
  const newProject = {
    id: project.id,
    startDate: Date.now(),
    monthsPassed: 0,
    status: ConstructionPhases.PLANNING,
    kickbacksSelected: kickbacks.map((item) => item.type || item),
    kickbacksReceived: kickbackAmount,
    totalCost: project.cost
  };

  constructionState.activeProjects = [newProject, ...(constructionState.activeProjects || [])];
  constructionState.constructionMetrics = {
    ...constructionState.constructionMetrics,
    totalProjects: (constructionState.constructionMetrics?.totalProjects || 0) + 1,
    totalInvestment: (constructionState.constructionMetrics?.totalInvestment || 0) + project.cost
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    constructionState
  };

  if (project.benefits?.tax_revenue_annual) {
    financeState.cityBudget = {
      ...financeState.cityBudget,
      monthlyIncome: {
        ...financeState.cityBudget.monthlyIncome,
        [IncomeTypes.LOCAL_TAXES]: (financeState.cityBudget.monthlyIncome?.[IncomeTypes.LOCAL_TAXES] || 0) + Math.round(project.benefits.tax_revenue_annual / 12)
      }
    };
  }

  if (project.benefits?.jobs_permanent) {
    updatedState.unemployment = Math.max(0, (state.unemployment || 0) - project.benefits.jobs_permanent * 0.01);
  }

  return updatedState;
};

const handleUpgradeUtility = (state, payload = {}) => {
  const { utilityId } = payload;
  const service = utilityServices.find((item) => item.id === utilityId);

  if (!service) {
    return { ...state, errorMessage: 'Коммунальная услуга не найдена' };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const cityAccount = bankingState.accounts?.[BankAccountTypes.CITY_CHECKING];
  if (!cityAccount || (cityAccount.balance || 0) < service.cost) {
    return { ...state, errorMessage: 'Недостаточно средств для модернизации услуги' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.CITY_CHECKING, -service.cost);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.CITY_CHECKING,
    -service.cost,
    budget
  ));

  const constructionState = state.constructionState ? deepClone(state.constructionState) : deepClone(initialConstructionState);
  const utilityState = constructionState.utilities?.[service.type] || { coverage: 0, quality: 0, satisfaction: 0 };
  constructionState.utilities = {
    ...constructionState.utilities,
    [service.type]: {
      ...utilityState,
      coverage: clamp(utilityState.coverage + (service.benefits?.coverage_increase || 0)),
      quality: clamp(utilityState.quality + (service.benefits?.quality_increase || 0)),
      satisfaction: clamp(utilityState.satisfaction + (service.benefits?.citizen_satisfaction ? Object.values(service.benefits.citizen_satisfaction).reduce((sum, value) => sum + value, 0) / 2 : 5))
    }
  };

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    constructionState
  };

  if (service.benefits?.citizen_satisfaction && state.citizensState) {
    const citizensState = state.citizensState ? deepClone(state.citizensState) : deepClone(initialCitizensState);
    Object.entries(service.benefits.citizen_satisfaction).forEach(([groupKey, change]) => {
      const key = Object.keys(citizensState.groups).find((id) => id.includes(groupKey));
      if (key && citizensState.groups[key]) {
        citizensState.groups[key] = {
          ...citizensState.groups[key],
          satisfaction: clamp((citizensState.groups[key].satisfaction || 0) + change)
        };
      }
    });
    updatedState.citizensState = citizensState;
  }

  updatedState.infrastructure = clamp((state.infrastructure || 0) + (service.benefits?.quality_increase || 5));

  return updatedState;
};

const handleMakePersonalPurchase = (state, payload = {}) => {
  const { optionId, customAmount = null } = payload;
  const option = personalSpendingOptions.find((item) => item.id === optionId);
  const amount = Number(customAmount || option?.cost || 0);

  if (!option) {
    return { ...state, errorMessage: 'Опция траты не найдена' };
  }

  if (!amount || amount <= 0) {
    return { ...state, errorMessage: 'Некорректная сумма покупки' };
  }

  const bankingState = state.bankingState ? deepClone(state.bankingState) : deepClone(initialBankingState);
  const personalAccount = bankingState.accounts?.[BankAccountTypes.PERSONAL_CHECKING];
  if (!personalAccount || (personalAccount.balance || 0) < amount) {
    return { ...state, errorMessage: 'Недостаточно личных средств' };
  }

  let updatedBankingState = adjustBankAccountBalance(bankingState, BankAccountTypes.PERSONAL_CHECKING, -amount);

  let financeState = state.financeState ? deepClone(state.financeState) : deepClone(initialFinanceState);
  let budget = state.budget || 0;
  let personalFinances;

  ({ financeState, budget, personalFinances } = applyBankAccountChange(
    financeState,
    BankAccountTypes.PERSONAL_CHECKING,
    -amount,
    budget
  ));

  const personalSpendingState = state.personalSpendingState ? deepClone(state.personalSpendingState) : deepClone(initialPersonalSpendingState);
  personalSpendingState.spendingHistory = [
    {
      id: Date.now(),
      optionId,
      amount,
      type: option.type,
      timestamp: Date.now()
    },
    ...(personalSpendingState.spendingHistory || [])
  ].slice(0, 50);

  if (option.type === SpendingTypes.RECURRING) {
    personalSpendingState.recurringExpenses = [
      { optionId, amount },
      ...(personalSpendingState.recurringExpenses || [])
    ];
  }

  if (option.type === SpendingTypes.INVESTMENT) {
    personalSpendingState.assets = [
      {
        optionId,
        purchase_price: amount,
        purchase_date: Date.now(),
        annual_appreciation: option.benefits?.annual_appreciation || 0
      },
      ...(personalSpendingState.assets || [])
    ];
  }

  personalSpendingState.totalSpent = (personalSpendingState.totalSpent || 0) + amount;
  personalSpendingState.totalAssets = personalSpendingHelpers.calculateAssetValue(personalSpendingState.assets, state);
  personalSpendingState.monthlyExpenses = personalSpendingHelpers.calculateMonthlyExpenses(personalSpendingState.recurringExpenses);
  personalSpendingState.detectionRisk = personalSpendingHelpers.calculateDetectionRisk(personalSpendingState.spendingHistory, state);
  personalSpendingState.lifestyleQuality = personalSpendingHelpers.calculateLifestyleQuality(personalSpendingState.assets, personalSpendingState.recurringExpenses);
  personalSpendingState.familyHappiness = personalSpendingHelpers.calculateFamilyHappiness(personalSpendingState.spendingHistory, personalSpendingState.assets);

  const updatedState = {
    ...state,
    errorMessage: null,
    bankingState: updatedBankingState,
    financeState,
    budget,
    personalFinances,
    personalSpendingState
  };

  if (option.benefits?.family_happiness) {
    updatedState.familyHappiness = clamp((state.familyHappiness || 0) + option.benefits.family_happiness);
  }

  if (option.benefits?.status_boost) {
    updatedState.mayorRating = clamp(
      (state.mayorRating || 0) + option.benefits.status_boost * 0.2,
      GameConstants.MIN_MAYOR_RATING,
      GameConstants.MAX_MAYOR_RATING
    );
  }

  if (option.consequences?.media_attention) {
    updatedState.media_attention = (state.media_attention || 0) + option.consequences.media_attention;
  }

  if (option.consequences?.corruption_suspicion && financeState.risks) {
    financeState.risks = {
      ...financeState.risks,
      mediaAttention: clamp((financeState.risks.mediaAttention || 0) + option.consequences.corruption_suspicion)
    };
  }

  return updatedState;
};

// Reducer для управления состоянием игры
const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.LOAD_GAME:
      return mergeGameState(action.payload);

    case GAME_ACTIONS.UPDATE_GAME_STATE:
      return mergeGameState(gameLogic.updateGameState(state));

    case GAME_ACTIONS.PROCESS_EVENT_DECISION:
      return gameLogic.processEventDecision(state, action.eventId, action.optionId);

    case GAME_ACTIONS.START_PROJECT:
      return gameLogic.startProject(state, action.projectId);

    case GAME_ACTIONS.CANCEL_PROJECT:
      return gameLogic.cancelProject(state, action.projectId);

    case GAME_ACTIONS.TOGGLE_PAUSE:
      return {
        ...state,
        isPaused: !state.isPaused
      };

    case GAME_ACTIONS.SET_GAME_SPEED:
      return {
        ...state,
        gameSpeed: action.speed
      };

    case GAME_ACTIONS.SAVE_GAME:
      gameLogic.saveGame(state);
      return {
        ...state,
        lastSaved: new Date().toISOString()
      };

    case GAME_ACTIONS.RESET_GAME:
      gameLogic.resetGame();
      return mergeGameState();

    case GAME_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null
      };

    case GAME_ACTIONS.REALLOCATE_BUDGET: {
      const { fromCategory, toCategory, amount } = action.payload || {};
      const currentFinanceState = state.financeState || initialFinanceState;

      if (!fromCategory || !toCategory || !amount || amount <= 0) {
        return {
          ...state,
          errorMessage: 'Некорректные параметры перераспределения бюджета'
        };
      }

      const fromAllocated = currentFinanceState.cityBudget.allocated[fromCategory] || 0;
      const fromSpent = currentFinanceState.cityBudget.spent[fromCategory] || 0;
      const availableFromCategory = fromAllocated - fromSpent;

      if (availableFromCategory < amount) {
        return {
          ...state,
          errorMessage: 'Недостаточно свободных средств в исходной категории'
        };
      }

      return {
        ...state,
        financeState: {
          ...currentFinanceState,
          cityBudget: {
            ...currentFinanceState.cityBudget,
            allocated: {
              ...currentFinanceState.cityBudget.allocated,
              [fromCategory]: fromAllocated - amount,
              [toCategory]: (currentFinanceState.cityBudget.allocated[toCategory] || 0) + amount
            }
          }
        }
      };
    }

    case GAME_ACTIONS.PERFORM_CORRUPTION: {
      const { type, amount: corruptionAmount, category } = action.payload || {};
      const financeState = state.financeState || initialFinanceState;

      if (!type || !category || !corruptionAmount || corruptionAmount <= 0) {
        return {
          ...state,
          errorMessage: 'Некорректные параметры коррупционной операции'
        };
      }

      const canPerform = financeHelpers.canPerformCorruption(
        corruptionAmount,
        type,
        financeState
      );

      if (!canPerform.canPerform) {
        return {
          ...state,
          errorMessage: canPerform.reason
        };
      }

      const categoryAllocated = financeState.cityBudget.allocated[category] || 0;
      const categorySpentCurrent = financeState.cityBudget.spent[category] || 0;
      const availableInCategory = categoryAllocated - categorySpentCurrent;

      if (availableInCategory < corruptionAmount) {
        return {
          ...state,
          errorMessage: 'Недостаточно средств в выбранной категории'
        };
      }

      const riskIncrease = Math.min(20, corruptionAmount / 100000);
      const newRisks = {
        ...financeState.risks,
        investigationRisk: Math.min(100, (financeState.risks.investigationRisk || 0) + riskIncrease),
        publicSuspicion: Math.min(100, (financeState.risks.publicSuspicion || 0) + riskIncrease * 0.5),
        federalAttention: Math.min(100, (financeState.risks.federalAttention || 0) + riskIncrease * 0.3)
      };

      let targetAccount = 'checking';
      if (type === 'kickbacks') targetAccount = 'cash';
      if (type === 'embezzlement') targetAccount = 'offshore';

      return {
        ...state,
        financeState: {
          ...financeState,
          cityBudget: {
            ...financeState.cityBudget,
            spent: {
              ...financeState.cityBudget.spent,
              [category]: categorySpentCurrent + corruptionAmount
            }
          },
          personalFinances: {
            ...financeState.personalFinances,
            accounts: {
              ...financeState.personalFinances.accounts,
              [targetAccount]: (financeState.personalFinances.accounts[targetAccount] || 0) +
                              corruptionAmount * 0.8
            }
          },
          corruptionHistory: [
            ...financeState.corruptionHistory,
            {
              id: Date.now(),
              type,
              amount: corruptionAmount,
              category,
              timestamp: Date.now(),
              risk: riskIncrease
            }
          ],
          risks: newRisks
        },
        mayorRating: Math.max(0, state.mayorRating - riskIncrease * 0.1)
      };
    }

    case GAME_ACTIONS.UPDATE_FINANCE_STATE:
      return {
        ...state,
        financeState: {
          ...(state.financeState || initialFinanceState),
          ...action.payload
        }
      };

    case GAME_ACTIONS.BUY_STOCK:
      return handleBuyStock(state, action.payload);

    case GAME_ACTIONS.SELL_STOCK:
      return handleSellStock(state, action.payload);

    case GAME_ACTIONS.TRANSFER_FUNDS:
      return handleTransferFunds(state, action.payload);

    case GAME_ACTIONS.TAKE_LOAN:
      return handleTakeLoan(state, action.payload);

    case GAME_ACTIONS.CREATE_DEPOSIT:
      return handleCreateDeposit(state, action.payload);

    case GAME_ACTIONS.PROMOTE_EMPLOYEE:
      return handlePromoteEmployee(state, action.payload);

    case GAME_ACTIONS.FIRE_EMPLOYEE:
      return handleFireEmployee(state, action.payload);

    case GAME_ACTIONS.CHANGE_EMPLOYEE_SALARY:
      return handleChangeEmployeeSalary(state, action.payload);

    case GAME_ACTIONS.IMPLEMENT_POLICY:
      return handleImplementPolicy(state, action.payload);

    case GAME_ACTIONS.MAKE_GOVERNMENT_DECISION:
      return handleMakeGovernmentDecision(state, action.payload);

    case GAME_ACTIONS.MAKE_INVESTMENT:
      return handleMakeInvestment(state, action.payload);

    case GAME_ACTIONS.WITHDRAW_INVESTMENT:
      return handleWithdrawInvestment(state, action.payload);

    case GAME_ACTIONS.IMPLEMENT_INDUSTRIAL_PROJECT:
      return handleImplementIndustrialProject(state, action.payload);

    case GAME_ACTIONS.MODERNIZE_ENTERPRISE:
      return handleModernizeEnterprise(state, action.payload);

    case GAME_ACTIONS.EXECUTE_SECURITY_OPERATION:
      return handleExecuteSecurityOperation(state, action.payload);

    case GAME_ACTIONS.MITIGATE_THREAT:
      return handleMitigateThreat(state, action.payload);

    case GAME_ACTIONS.RESPOND_TO_ISSUE:
      return handleRespondToIssue(state, action.payload);

    case GAME_ACTIONS.SCHEDULE_MEETING:
      return handleScheduleMeeting(state, action.payload);

    case GAME_ACTIONS.IMPLEMENT_TAX_POLICY:
      return handleImplementTaxPolicy(state, action.payload);

    case GAME_ACTIONS.CHANGE_TAX_RATE:
      return handleChangeTaxRate(state, action.payload);

    case GAME_ACTIONS.APPLY_BUDGET_CHANGES:
      return handleApplyBudgetChanges(state, action.payload);

    case GAME_ACTIONS.START_CONSTRUCTION_PROJECT:
      return handleStartConstructionProject(state, action.payload);

    case GAME_ACTIONS.UPGRADE_UTILITY:
      return handleUpgradeUtility(state, action.payload);

    case GAME_ACTIONS.MAKE_PERSONAL_PURCHASE:
      return handleMakePersonalPurchase(state, action.payload);

    default:
      return state;
  }
};

// Провайдер контекста
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
    financeState: initialFinanceState
  });

  // Загрузка сохраненной игры при инициализации
  useEffect(() => {
    const savedGame = gameLogic.loadGame();
    if (savedGame) {
      dispatch({ type: GAME_ACTIONS.LOAD_GAME, payload: savedGame });
    }
  }, []);

  // Автоматическое обновление игры
  useEffect(() => {
    if (gameState.isPaused || gameState.gameOver) return;

    const interval = setInterval(() => {
      dispatch({ type: GAME_ACTIONS.UPDATE_GAME_STATE });
    }, 3000 / gameState.gameSpeed); // Базовая скорость: 1 игровой день = 3 секунды

    return () => clearInterval(interval);
  }, [gameState.isPaused, gameState.gameSpeed, gameState.gameOver]);

  // Автосохранение каждые 5 минут
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (!gameState.gameOver) {
        dispatch({ type: GAME_ACTIONS.SAVE_GAME });
      }
    }, 300000); // 5 минут

    return () => clearInterval(autoSaveInterval);
  }, [gameState.gameOver]);

  // Действия для компонентов
  const actions = {
    // Обработка решения по событию
    processEventDecision: (eventId, optionId) => {
      dispatch({ 
        type: GAME_ACTIONS.PROCESS_EVENT_DECISION, 
        eventId, 
        optionId 
      });
    },

    // Запуск проекта
    startProject: (projectId) => {
      dispatch({ 
        type: GAME_ACTIONS.START_PROJECT, 
        projectId 
      });
    },

    // Отмена проекта
    cancelProject: (projectId) => {
      dispatch({ 
        type: GAME_ACTIONS.CANCEL_PROJECT, 
        projectId 
      });
    },

    // Управление игрой
    togglePause: () => {
      dispatch({ type: GAME_ACTIONS.TOGGLE_PAUSE });
    },

    setGameSpeed: (speed) => {
      dispatch({ 
        type: GAME_ACTIONS.SET_GAME_SPEED, 
        speed: Math.max(0.5, Math.min(3, speed)) // Ограничиваем скорость
      });
    },

    // Сохранение и загрузка
    saveGame: () => {
      dispatch({ type: GAME_ACTIONS.SAVE_GAME });
    },

    resetGame: () => {
      if (window.confirm('Вы уверены, что хотите начать новую игру? Текущий прогресс будет потерян.')) {
        dispatch({ type: GAME_ACTIONS.RESET_GAME });
      }
    },

    // Очистка ошибок
    clearError: () => {
      dispatch({ type: GAME_ACTIONS.CLEAR_ERROR });
    },

    // Принудительное обновление состояния (для отладки)
    forceUpdate: () => {
      dispatch({ type: GAME_ACTIONS.UPDATE_GAME_STATE });
    },

    // Финансовые операции
    reallocateBudget: (fromOrChanges, maybeTo, maybeAmount) => {
      if (typeof fromOrChanges === 'object' && fromOrChanges !== null && !Array.isArray(fromOrChanges)) {
        dispatch({
          type: GAME_ACTIONS.APPLY_BUDGET_CHANGES,
          payload: { changes: fromOrChanges }
        });
        return;
      }

      dispatch({
        type: GAME_ACTIONS.REALLOCATE_BUDGET,
        payload: {
          fromCategory: fromOrChanges,
          toCategory: maybeTo,
          amount: maybeAmount
        }
      });
    },

    performCorruption: (type, amount, category) => {
      const financeState = gameState.financeState || initialFinanceState;
      const canPerform = financeHelpers.canPerformCorruption(amount, type, financeState);

      let success = canPerform.canPerform;
      let error;

      if (success) {
        const allocated = financeState.cityBudget?.allocated?.[category] || 0;
        const spent = financeState.cityBudget?.spent?.[category] || 0;
        if (allocated - spent < amount) {
          success = false;
          error = 'Недостаточно средств в выбранной категории';
        }
      } else {
        error = canPerform.reason;
      }

      dispatch({
        type: GAME_ACTIONS.PERFORM_CORRUPTION,
        payload: { type, amount, category }
      });

      return { success, error };
    },

    updateFinanceState: (financeUpdate) => {
      dispatch({
        type: GAME_ACTIONS.UPDATE_FINANCE_STATE,
        payload: financeUpdate
      });
    },

    buyStock: (stockId, quantity, price, accountType, commission = 0) => {
      dispatch({
        type: GAME_ACTIONS.BUY_STOCK,
        payload: { stockId, quantity: Number(quantity), price, accountType, commission }
      });
    },

    sellStock: (stockId, quantity, price, accountType, commission = 0) => {
      dispatch({
        type: GAME_ACTIONS.SELL_STOCK,
        payload: { stockId, quantity: Number(quantity), price, accountType, commission }
      });
    },

    transferFunds: (fromAccount, toAccount, amount) => {
      dispatch({
        type: GAME_ACTIONS.TRANSFER_FUNDS,
        payload: { fromAccount, toAccount, amount: Number(amount) }
      });
    },

    takeLoan: (loanId) => {
      dispatch({
        type: GAME_ACTIONS.TAKE_LOAN,
        payload: { loanId }
      });
    },

    createDeposit: (depositId, amount) => {
      dispatch({
        type: GAME_ACTIONS.CREATE_DEPOSIT,
        payload: { depositId, amount: Number(amount) }
      });
    },

    promoteEmployee: (employeeId) => {
      dispatch({
        type: GAME_ACTIONS.PROMOTE_EMPLOYEE,
        payload: { employeeId }
      });
    },

    fireEmployee: (employeeId) => {
      dispatch({
        type: GAME_ACTIONS.FIRE_EMPLOYEE,
        payload: { employeeId }
      });
    },

    changeEmployeeSalary: (employeeId, salary) => {
      dispatch({
        type: GAME_ACTIONS.CHANGE_EMPLOYEE_SALARY,
        payload: { employeeId, salary }
      });
    },

    implementPolicy: (policyId) => {
      dispatch({
        type: GAME_ACTIONS.IMPLEMENT_POLICY,
        payload: { policyId }
      });
    },

    makeGovernmentDecision: (decisionType, data) => {
      dispatch({
        type: GAME_ACTIONS.MAKE_GOVERNMENT_DECISION,
        payload: { decisionType, data }
      });
    },

    makeInvestment: (investmentId, amount) => {
      dispatch({
        type: GAME_ACTIONS.MAKE_INVESTMENT,
        payload: { investmentId, amount: Number(amount) }
      });
    },

    withdrawInvestment: (investmentId, amount) => {
      dispatch({
        type: GAME_ACTIONS.WITHDRAW_INVESTMENT,
        payload: { investmentId, amount: Number(amount) }
      });
    },

    implementIndustrialProject: (projectId, kickbacks) => {
      dispatch({
        type: GAME_ACTIONS.IMPLEMENT_INDUSTRIAL_PROJECT,
        payload: { projectId, kickbacks }
      });
    },

    modernizeEnterprise: (enterpriseId) => {
      dispatch({
        type: GAME_ACTIONS.MODERNIZE_ENTERPRISE,
        payload: { enterpriseId }
      });
    },

    executeSecurityOperation: (agencyId, operation) => {
      dispatch({
        type: GAME_ACTIONS.EXECUTE_SECURITY_OPERATION,
        payload: { agencyId, operation }
      });
    },

    mitigateThreat: (threatId, mitigationOption) => {
      dispatch({
        type: GAME_ACTIONS.MITIGATE_THREAT,
        payload: { threatId, mitigationOption }
      });
    },

    respondToIssue: (issueId, response) => {
      dispatch({
        type: GAME_ACTIONS.RESPOND_TO_ISSUE,
        payload: { issueId, response }
      });
    },

    scheduleMeeting: (groupId) => {
      dispatch({
        type: GAME_ACTIONS.SCHEDULE_MEETING,
        payload: { groupId }
      });
    },

    implementTaxPolicy: (policyId) => {
      dispatch({
        type: GAME_ACTIONS.IMPLEMENT_TAX_POLICY,
        payload: { policyId }
      });
    },

    changeTaxRate: (taxType, newRate) => {
      dispatch({
        type: GAME_ACTIONS.CHANGE_TAX_RATE,
        payload: { taxType, newRate }
      });
    },

    startConstructionProject: (projectId, kickbacks) => {
      dispatch({
        type: GAME_ACTIONS.START_CONSTRUCTION_PROJECT,
        payload: { projectId, kickbacks }
      });
    },

    upgradeUtility: (utilityId) => {
      dispatch({
        type: GAME_ACTIONS.UPGRADE_UTILITY,
        payload: { utilityId }
      });
    },

    makePersonalPurchase: (optionId, amount) => {
      dispatch({
        type: GAME_ACTIONS.MAKE_PERSONAL_PURCHASE,
        payload: { optionId, amount: Number(amount) }
      });
    }
  };

  // Вычисляемые значения
  const computed = {
    // Статистика игры
    gameStats: gameLogic.getGameStats(gameState),
    
    // Подсказки для игрока
    gameTips: gameLogic.getGameTips(gameState),
    
    // Доступные проекты
    availableProjects: gameState.activeProjects?.length < 10 ? 
      [] : [], // Будет реализовано в компонентах
    
    // Форматированная дата
    currentDate: `${gameState.currentDay}.${gameState.currentMonth.toString().padStart(2, '0')}.${gameState.currentYear}`,
    
    // Статус бюджета
    budgetStatus: (() => {
      const financeState = gameState.financeState || initialFinanceState;
      const totalBudget = financeHelpers.getTotalBudget(financeState.cityBudget);
      const totalSpent = financeHelpers.getTotalSpent(financeState.cityBudget);
      const remaining = totalBudget - totalSpent;
      
      if (remaining < totalBudget * 0.1) return 'critical';
      if (remaining < totalBudget * 0.3) return 'warning';
      return 'good';
    })(),
    
    // Общий статус города
    cityStatus: (() => {
      const avg = (gameState.happiness + gameState.ecology + gameState.infrastructure) / 3;
      if (avg >= 70) return 'excellent';
      if (avg >= 50) return 'good';
      if (avg >= 30) return 'poor';
      return 'critical';
    })(),

    // Финансовые показатели
    totalPersonalWealth: financeHelpers.getTotalPersonalWealth(
      gameState.financeState?.personalFinances || initialFinanceState.personalFinances
    ),
    
    corruptionRisk: financeHelpers.calculateCorruptionRisk(
      gameState.financeState?.corruptionHistory || [],
      gameState.financeState?.risks || initialFinanceState.risks
    ),

    monthlyIncome: financeHelpers.getMonthlyIncome(
      gameState.financeState?.cityBudget || initialFinanceState.cityBudget
    ),

    monthlyExpenses: financeHelpers.getMonthlyExpenses(
      gameState.financeState?.cityBudget || initialFinanceState.cityBudget
    )
  };

  const value = {
    gameState,
    actions,
    computed,
    GAME_ACTIONS
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
