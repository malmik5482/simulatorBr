// Типы и константы для финансовой системы

export const BudgetCategories = {
  INFRASTRUCTURE: 'infrastructure',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  SOCIAL: 'social',
  CULTURE: 'culture',
  SPORTS: 'sports',
  ECOLOGY: 'ecology',
  SECURITY: 'security',
  ADMINISTRATION: 'administration',
  EMERGENCY: 'emergency'
};

export const BudgetCategoryLabels = {
  [BudgetCategories.INFRASTRUCTURE]: 'Инфраструктура',
  [BudgetCategories.EDUCATION]: 'Образование',
  [BudgetCategories.HEALTHCARE]: 'Здравоохранение',
  [BudgetCategories.SOCIAL]: 'Социальная сфера',
  [BudgetCategories.CULTURE]: 'Культура',
  [BudgetCategories.SPORTS]: 'Спорт',
  [BudgetCategories.ECOLOGY]: 'Экология',
  [BudgetCategories.SECURITY]: 'Безопасность',
  [BudgetCategories.ADMINISTRATION]: 'Администрация',
  [BudgetCategories.EMERGENCY]: 'Чрезвычайные ситуации'
};

export const IncomeTypes = {
  FEDERAL_GRANTS: 'federal_grants',
  REGIONAL_SUBSIDIES: 'regional_subsidies',
  LOCAL_TAXES: 'local_taxes',
  BUSINESS_TAXES: 'business_taxes',
  PROPERTY_TAXES: 'property_taxes',
  FINES: 'fines',
  INVESTMENTS: 'investments',
  LOANS: 'loans'
};

export const IncomeTypeLabels = {
  [IncomeTypes.FEDERAL_GRANTS]: 'Федеральные гранты',
  [IncomeTypes.REGIONAL_SUBSIDIES]: 'Региональные субсидии',
  [IncomeTypes.LOCAL_TAXES]: 'Местные налоги',
  [IncomeTypes.BUSINESS_TAXES]: 'Налоги с бизнеса',
  [IncomeTypes.PROPERTY_TAXES]: 'Налог на имущество',
  [IncomeTypes.FINES]: 'Штрафы',
  [IncomeTypes.INVESTMENTS]: 'Инвестиции',
  [IncomeTypes.LOANS]: 'Займы'
};

export const CorruptionTypes = {
  KICKBACKS: 'kickbacks',
  EMBEZZLEMENT: 'embezzlement',
  BRIBES: 'bribes',
  FAKE_CONTRACTS: 'fake_contracts',
  OVERPRICING: 'overpricing'
};

export const CorruptionTypeLabels = {
  [CorruptionTypes.KICKBACKS]: 'Откаты',
  [CorruptionTypes.EMBEZZLEMENT]: 'Растрата',
  [CorruptionTypes.BRIBES]: 'Взятки',
  [CorruptionTypes.FAKE_CONTRACTS]: 'Фиктивные контракты',
  [CorruptionTypes.OVERPRICING]: 'Завышение цен'
};

export const PersonalAccountTypes = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  OFFSHORE: 'offshore',
  CRYPTO: 'crypto',
  CASH: 'cash'
};

export const PersonalAccountLabels = {
  [PersonalAccountTypes.CHECKING]: 'Текущий счет',
  [PersonalAccountTypes.SAVINGS]: 'Сберегательный счет',
  [PersonalAccountTypes.OFFSHORE]: 'Оффшорный счет',
  [PersonalAccountTypes.CRYPTO]: 'Криптовалюта',
  [PersonalAccountTypes.CASH]: 'Наличные'
};

// Начальное состояние финансовой системы
export const initialFinanceState = {
  // Городской бюджет
  cityBudget: {
    total: 50000000, // 50 млн рублей
    allocated: {
      [BudgetCategories.INFRASTRUCTURE]: 15000000,
      [BudgetCategories.EDUCATION]: 8000000,
      [BudgetCategories.HEALTHCARE]: 7000000,
      [BudgetCategories.SOCIAL]: 5000000,
      [BudgetCategories.CULTURE]: 2000000,
      [BudgetCategories.SPORTS]: 1500000,
      [BudgetCategories.ECOLOGY]: 3000000,
      [BudgetCategories.SECURITY]: 4000000,
      [BudgetCategories.ADMINISTRATION]: 3500000,
      [BudgetCategories.EMERGENCY]: 1000000
    },
    spent: {
      [BudgetCategories.INFRASTRUCTURE]: 0,
      [BudgetCategories.EDUCATION]: 0,
      [BudgetCategories.HEALTHCARE]: 0,
      [BudgetCategories.SOCIAL]: 0,
      [BudgetCategories.CULTURE]: 0,
      [BudgetCategories.SPORTS]: 0,
      [BudgetCategories.ECOLOGY]: 0,
      [BudgetCategories.SECURITY]: 0,
      [BudgetCategories.ADMINISTRATION]: 0,
      [BudgetCategories.EMERGENCY]: 0
    },
    monthlyIncome: {
      [IncomeTypes.FEDERAL_GRANTS]: 8000000,
      [IncomeTypes.REGIONAL_SUBSIDIES]: 3000000,
      [IncomeTypes.LOCAL_TAXES]: 12000000,
      [IncomeTypes.BUSINESS_TAXES]: 15000000,
      [IncomeTypes.PROPERTY_TAXES]: 5000000,
      [IncomeTypes.FINES]: 500000,
      [IncomeTypes.INVESTMENTS]: 1000000,
      [IncomeTypes.LOANS]: 0
    },
    monthlyExpenses: {
      [BudgetCategories.INFRASTRUCTURE]: 2500000,
      [BudgetCategories.EDUCATION]: 1800000,
      [BudgetCategories.HEALTHCARE]: 1600000,
      [BudgetCategories.SOCIAL]: 1200000,
      [BudgetCategories.CULTURE]: 400000,
      [BudgetCategories.SPORTS]: 300000,
      [BudgetCategories.ECOLOGY]: 600000,
      [BudgetCategories.SECURITY]: 800000,
      [BudgetCategories.ADMINISTRATION]: 700000,
      [BudgetCategories.EMERGENCY]: 200000
    }
  },

  // Личные финансы мэра
  personalFinances: {
    accounts: {
      [PersonalAccountTypes.CHECKING]: 500000, // 500 тыс рублей
      [PersonalAccountTypes.SAVINGS]: 2000000, // 2 млн рублей
      [PersonalAccountTypes.OFFSHORE]: 0,
      [PersonalAccountTypes.CRYPTO]: 0,
      [PersonalAccountTypes.CASH]: 100000 // 100 тыс рублей
    },
    monthlyIncome: {
      salary: 300000, // Зарплата мэра
      bonuses: 0,
      corruption: 0,
      investments: 0
    },
    monthlyExpenses: {
      living: 150000, // Расходы на жизнь
      luxury: 0,
      bribes: 0,
      investments: 0
    }
  },

  // История коррупционных операций
  corruptionHistory: [],

  // Риски и расследования
  risks: {
    investigationRisk: 0, // Риск расследования (0-100%)
    publicSuspicion: 0, // Подозрения общественности (0-100%)
    federalAttention: 0, // Внимание федеральных органов (0-100%)
    mediaAttention: 0 // Внимание СМИ (0-100%)
  },

  // Настройки коррупции
  corruptionSettings: {
    enabled: true,
    riskTolerance: 50, // Толерантность к риску (0-100%)
    maxMonthlyAmount: 1000000, // Максимальная сумма в месяц
    preferredMethods: [CorruptionTypes.KICKBACKS, CorruptionTypes.OVERPRICING]
  }
};

// Утилиты для работы с финансами
export const financeHelpers = {
  // Форматирование денег
  formatMoney: (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} млрд ₽`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} млн ₽`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)} тыс ₽`;
    }
    return `${amount.toLocaleString('ru-RU')} ₽`;
  },

  // Расчет общего бюджета
  getTotalBudget: (budgetState) => {
    return Object.values(budgetState.allocated).reduce((sum, amount) => sum + amount, 0);
  },

  // Расчет потраченного бюджета
  getTotalSpent: (budgetState) => {
    return Object.values(budgetState.spent).reduce((sum, amount) => sum + amount, 0);
  },

  // Расчет оставшегося бюджета
  getRemainingBudget: (budgetState) => {
    const total = financeHelpers.getTotalBudget(budgetState);
    const spent = financeHelpers.getTotalSpent(budgetState);
    return total - spent;
  },

  // Расчет месячного дохода
  getMonthlyIncome: (budgetState) => {
    return Object.values(budgetState.monthlyIncome).reduce((sum, amount) => sum + amount, 0);
  },

  // Расчет месячных расходов
  getMonthlyExpenses: (budgetState) => {
    return Object.values(budgetState.monthlyExpenses).reduce((sum, amount) => sum + amount, 0);
  },

  // Расчет общих личных средств
  getTotalPersonalWealth: (personalFinances) => {
    return Object.values(personalFinances.accounts).reduce((sum, amount) => sum + amount, 0);
  },

  // Расчет риска коррупции
  calculateCorruptionRisk: (corruptionHistory, risks) => {
    const recentOperations = corruptionHistory.filter(op => 
      Date.now() - op.timestamp < 30 * 24 * 60 * 60 * 1000 // Последние 30 дней
    );
    
    const totalAmount = recentOperations.reduce((sum, op) => sum + op.amount, 0);
    const operationCount = recentOperations.length;
    
    let riskScore = 0;
    
    // Риск от суммы
    if (totalAmount > 5000000) riskScore += 30;
    else if (totalAmount > 2000000) riskScore += 20;
    else if (totalAmount > 1000000) riskScore += 10;
    
    // Риск от количества операций
    if (operationCount > 10) riskScore += 25;
    else if (operationCount > 5) riskScore += 15;
    else if (operationCount > 2) riskScore += 5;
    
    // Базовый риск
    riskScore += risks.publicSuspicion * 0.3;
    riskScore += risks.mediaAttention * 0.2;
    
    return Math.min(100, Math.max(0, riskScore));
  },

  // Проверка возможности коррупционной операции
  canPerformCorruption: (amount, type, financeState) => {
    const currentRisk = financeHelpers.calculateCorruptionRisk(
      financeState.corruptionHistory, 
      financeState.risks
    );
    
    if (currentRisk > financeState.corruptionSettings.riskTolerance) {
      return { canPerform: false, reason: 'Слишком высокий риск' };
    }
    
    if (amount > financeState.corruptionSettings.maxMonthlyAmount) {
      return { canPerform: false, reason: 'Превышен месячный лимит' };
    }
    
    if (!financeState.corruptionSettings.preferredMethods.includes(type)) {
      return { canPerform: false, reason: 'Неподходящий метод' };
    }
    
    return { canPerform: true };
  },

  // Расчет процента от бюджетной категории
  getBudgetCategoryPercentage: (category, budgetState) => {
    const total = financeHelpers.getTotalBudget(budgetState);
    const categoryAmount = budgetState.allocated[category] || 0;
    return total > 0 ? (categoryAmount / total) * 100 : 0;
  },

  // Проверка достаточности средств в категории
  hasSufficientFunds: (category, amount, budgetState) => {
    const allocated = budgetState.allocated[category] || 0;
    const spent = budgetState.spent[category] || 0;
    const available = allocated - spent;
    return available >= amount;
  }
};

export default {
  BudgetCategories,
  BudgetCategoryLabels,
  IncomeTypes,
  IncomeTypeLabels,
  CorruptionTypes,
  CorruptionTypeLabels,
  PersonalAccountTypes,
  PersonalAccountLabels,
  initialFinanceState,
  financeHelpers
};
