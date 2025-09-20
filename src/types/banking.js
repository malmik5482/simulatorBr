// Типы и константы для банковской системы

export const BankAccountTypes = {
  CITY_CHECKING: 'city_checking',
  CITY_SAVINGS: 'city_savings',
  CITY_INVESTMENT: 'city_investment',
  PERSONAL_CHECKING: 'personal_checking',
  PERSONAL_SAVINGS: 'personal_savings',
  PERSONAL_INVESTMENT: 'personal_investment',
  OFFSHORE: 'offshore'
};

export const BankAccountLabels = {
  [BankAccountTypes.CITY_CHECKING]: 'Городской расчетный счет',
  [BankAccountTypes.CITY_SAVINGS]: 'Городской сберегательный счет',
  [BankAccountTypes.CITY_INVESTMENT]: 'Городской инвестиционный счет',
  [BankAccountTypes.PERSONAL_CHECKING]: 'Личный расчетный счет',
  [BankAccountTypes.PERSONAL_SAVINGS]: 'Личный сберегательный счет',
  [BankAccountTypes.PERSONAL_INVESTMENT]: 'Личный инвестиционный счет',
  [BankAccountTypes.OFFSHORE]: 'Оффшорный счет'
};

export const StockSectors = {
  ENERGY: 'energy',
  TECHNOLOGY: 'technology',
  FINANCE: 'finance',
  INDUSTRY: 'industry',
  REAL_ESTATE: 'real_estate',
  AGRICULTURE: 'agriculture',
  TRANSPORT: 'transport',
  RETAIL: 'retail'
};

export const StockSectorLabels = {
  [StockSectors.ENERGY]: 'Энергетика',
  [StockSectors.TECHNOLOGY]: 'Технологии',
  [StockSectors.FINANCE]: 'Финансы',
  [StockSectors.INDUSTRY]: 'Промышленность',
  [StockSectors.REAL_ESTATE]: 'Недвижимость',
  [StockSectors.AGRICULTURE]: 'Сельское хозяйство',
  [StockSectors.TRANSPORT]: 'Транспорт',
  [StockSectors.RETAIL]: 'Розничная торговля'
};

export const LoanTypes = {
  INFRASTRUCTURE: 'infrastructure',
  DEVELOPMENT: 'development',
  EMERGENCY: 'emergency',
  REFINANCING: 'refinancing',
  PERSONAL: 'personal',
  BUSINESS: 'business'
};

export const LoanTypeLabels = {
  [LoanTypes.INFRASTRUCTURE]: 'Инфраструктурный кредит',
  [LoanTypes.DEVELOPMENT]: 'Кредит на развитие',
  [LoanTypes.EMERGENCY]: 'Экстренный кредит',
  [LoanTypes.REFINANCING]: 'Рефинансирование',
  [LoanTypes.PERSONAL]: 'Личный кредит',
  [LoanTypes.BUSINESS]: 'Бизнес-кредит'
};

export const DepositTypes = {
  SHORT_TERM: 'short_term',
  MEDIUM_TERM: 'medium_term',
  LONG_TERM: 'long_term',
  FLEXIBLE: 'flexible'
};

export const DepositTypeLabels = {
  [DepositTypes.SHORT_TERM]: 'Краткосрочный (3-6 мес)',
  [DepositTypes.MEDIUM_TERM]: 'Среднесрочный (1-2 года)',
  [DepositTypes.LONG_TERM]: 'Долгосрочный (3-5 лет)',
  [DepositTypes.FLEXIBLE]: 'Гибкий'
};

// Данные акций
export const stocksData = [
  // Энергетика
  {
    id: 'gazprom',
    name: 'Газпром',
    ticker: 'GAZP',
    sector: StockSectors.ENERGY,
    price: 180.50,
    change: 2.3,
    changePercent: 1.29,
    volume: 15420000,
    marketCap: 4250000000000,
    dividend: 8.2,
    volatility: 'medium',
    description: 'Крупнейшая энергетическая компания России'
  },
  {
    id: 'lukoil',
    name: 'Лукойл',
    ticker: 'LKOH',
    sector: StockSectors.ENERGY,
    price: 6420.00,
    change: -45.20,
    changePercent: -0.70,
    volume: 890000,
    marketCap: 4680000000000,
    dividend: 6.8,
    volatility: 'medium',
    description: 'Вертикально интегрированная нефтяная компания'
  },
  
  // Технологии
  {
    id: 'yandex',
    name: 'Яндекс',
    ticker: 'YNDX',
    sector: StockSectors.TECHNOLOGY,
    price: 2850.00,
    change: 125.40,
    changePercent: 4.60,
    volume: 2340000,
    marketCap: 920000000000,
    dividend: 0,
    volatility: 'high',
    description: 'Технологическая компания, поисковые и интернет-сервисы'
  },
  {
    id: 'mail_ru',
    name: 'VK',
    ticker: 'VKCO',
    sector: StockSectors.TECHNOLOGY,
    price: 580.20,
    change: -12.80,
    changePercent: -2.16,
    volume: 1560000,
    marketCap: 315000000000,
    dividend: 2.1,
    volatility: 'high',
    description: 'Интернет-холдинг, социальные сети и игры'
  },
  
  // Финансы
  {
    id: 'sberbank',
    name: 'Сбербанк',
    ticker: 'SBER',
    sector: StockSectors.FINANCE,
    price: 285.40,
    change: 8.60,
    changePercent: 3.11,
    volume: 45600000,
    marketCap: 6200000000000,
    dividend: 12.5,
    volatility: 'low',
    description: 'Крупнейший банк России'
  },
  {
    id: 'vtb',
    name: 'ВТБ',
    ticker: 'VTBR',
    sector: StockSectors.FINANCE,
    price: 0.0892,
    change: 0.0023,
    changePercent: 2.65,
    volume: 125000000,
    marketCap: 650000000000,
    dividend: 0,
    volatility: 'medium',
    description: 'Второй по величине банк России'
  },
  
  // Промышленность
  {
    id: 'nlmk',
    name: 'НЛМК',
    ticker: 'NLMK',
    sector: StockSectors.INDUSTRY,
    price: 185.60,
    change: -3.40,
    changePercent: -1.80,
    volume: 8900000,
    marketCap: 2100000000000,
    dividend: 15.2,
    volatility: 'medium',
    description: 'Металлургическая компания'
  },
  {
    id: 'severstal',
    name: 'Северсталь',
    ticker: 'CHMF',
    sector: StockSectors.INDUSTRY,
    price: 1420.00,
    change: 25.80,
    changePercent: 1.85,
    volume: 1200000,
    marketCap: 1180000000000,
    dividend: 18.5,
    volatility: 'medium',
    description: 'Горно-металлургическая компания'
  }
];

// Данные кредитов
export const loanOffers = [
  {
    id: 'infrastructure_loan_1',
    type: LoanTypes.INFRASTRUCTURE,
    bank: 'Сбербанк',
    amount: 500000000,
    interestRate: 8.5,
    term: 60, // месяцы
    requirements: {
      minRating: 60,
      collateral: true,
      guarantees: true
    },
    description: 'Кредит на развитие городской инфраструктуры',
    benefits: ['Льготная ставка', 'Отсрочка платежей', 'Гибкий график']
  },
  {
    id: 'development_loan_1',
    type: LoanTypes.DEVELOPMENT,
    bank: 'ВЭБ.РФ',
    amount: 1000000000,
    interestRate: 6.8,
    term: 84,
    requirements: {
      minRating: 70,
      collateral: true,
      guarantees: true,
      federalApproval: true
    },
    description: 'Льготный кредит на социально-экономическое развитие',
    benefits: ['Государственная поддержка', 'Низкая ставка', 'Длительный срок']
  },
  {
    id: 'emergency_loan_1',
    type: LoanTypes.EMERGENCY,
    bank: 'ВТБ',
    amount: 200000000,
    interestRate: 12.0,
    term: 24,
    requirements: {
      minRating: 40,
      emergencyStatus: true
    },
    description: 'Экстренный кредит для ликвидации чрезвычайных ситуаций',
    benefits: ['Быстрое одобрение', 'Минимальные требования']
  },
  {
    id: 'personal_loan_1',
    type: LoanTypes.PERSONAL,
    bank: 'Альфа-Банк',
    amount: 10000000,
    interestRate: 15.5,
    term: 36,
    requirements: {
      income: 500000,
      creditHistory: true
    },
    description: 'Личный кредит для мэра',
    benefits: ['Без поручителей', 'Быстрое оформление']
  }
];

// Данные депозитов
export const depositOffers = [
  {
    id: 'city_deposit_short',
    type: DepositTypes.SHORT_TERM,
    bank: 'Сбербанк',
    interestRate: 7.2,
    term: 6,
    minAmount: 10000000,
    maxAmount: 1000000000,
    description: 'Краткосрочный депозит для городских средств',
    features: ['Ежемесячная капитализация', 'Возможность пополнения']
  },
  {
    id: 'city_deposit_medium',
    type: DepositTypes.MEDIUM_TERM,
    bank: 'ВТБ',
    interestRate: 8.8,
    term: 18,
    minAmount: 50000000,
    maxAmount: 2000000000,
    description: 'Среднесрочный депозит с повышенной доходностью',
    features: ['Высокая ставка', 'Защита от инфляции']
  },
  {
    id: 'personal_deposit_flexible',
    type: DepositTypes.FLEXIBLE,
    bank: 'Тинькофф',
    interestRate: 6.5,
    term: 12,
    minAmount: 100000,
    maxAmount: 50000000,
    description: 'Гибкий депозит для личных средств',
    features: ['Частичное снятие', 'Пополнение в любое время']
  },
  {
    id: 'offshore_deposit',
    type: DepositTypes.LONG_TERM,
    bank: 'Swiss Bank',
    interestRate: 4.2,
    term: 60,
    minAmount: 1000000,
    maxAmount: 100000000,
    description: 'Оффшорный депозит в швейцарском банке',
    features: ['Конфиденциальность', 'Валютная диверсификация'],
    currency: 'CHF',
    risk: 'high' // Высокий риск обнаружения
  }
];

// Начальное состояние банковской системы
export const initialBankingState = {
  // Банковские счета
  accounts: {
    [BankAccountTypes.CITY_CHECKING]: {
      balance: 50000000,
      bank: 'Сбербанк',
      accountNumber: '40701810000000000001',
      interestRate: 0.1
    },
    [BankAccountTypes.CITY_SAVINGS]: {
      balance: 0,
      bank: 'ВТБ',
      accountNumber: '40701810000000000002',
      interestRate: 5.5
    },
    [BankAccountTypes.PERSONAL_CHECKING]: {
      balance: 500000,
      bank: 'Сбербанк',
      accountNumber: '40817810000000000001',
      interestRate: 0.1
    },
    [BankAccountTypes.PERSONAL_SAVINGS]: {
      balance: 2000000,
      bank: 'Альфа-Банк',
      accountNumber: '40817810000000000002',
      interestRate: 6.8
    },
    [BankAccountTypes.OFFSHORE]: {
      balance: 0,
      bank: 'Swiss Bank',
      accountNumber: 'CH9300762011623852957',
      interestRate: 2.5,
      currency: 'CHF'
    }
  },

  // Портфель акций
  stockPortfolio: {
    city: {}, // Городские инвестиции
    personal: {} // Личные инвестиции
  },

  // Активные депозиты
  deposits: [],

  // Активные кредиты
  loans: [],

  // История операций
  transactionHistory: [],

  // Настройки инвестирования
  investmentSettings: {
    riskTolerance: 'medium', // low, medium, high
    autoRebalance: false,
    dividendReinvestment: true,
    maxPositionSize: 0.2 // Максимальная доля одной акции в портфеле
  }
};

// Утилиты для банковской системы
export const bankingHelpers = {
  // Форматирование денег с валютой
  formatMoney: (amount, currency = 'RUB') => {
    const symbols = {
      'RUB': '₽',
      'USD': '$',
      'EUR': '€',
      'CHF': 'CHF'
    };
    
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} млрд ${symbols[currency]}`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} млн ${symbols[currency]}`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)} тыс ${symbols[currency]}`;
    }
    return `${amount.toLocaleString('ru-RU')} ${symbols[currency]}`;
  },

  // Расчет общего баланса
  getTotalBalance: (accounts, accountType = null) => {
    if (accountType) {
      return accounts[accountType]?.balance || 0;
    }
    return Object.values(accounts).reduce((sum, account) => sum + (account.balance || 0), 0);
  },

  // Расчет стоимости портфеля
  getPortfolioValue: (portfolio, stocksData) => {
    return Object.entries(portfolio).reduce((total, [stockId, quantity]) => {
      const stock = stocksData.find(s => s.id === stockId);
      return total + (stock ? stock.price * quantity : 0);
    }, 0);
  },

  // Расчет доходности портфеля
  getPortfolioReturn: (portfolio, stocksData) => {
    let totalValue = 0;
    let totalReturn = 0;
    
    Object.entries(portfolio).forEach(([stockId, data]) => {
      const stock = stocksData.find(s => s.id === stockId);
      if (stock && data.quantity > 0) {
        const currentValue = stock.price * data.quantity;
        const purchaseValue = data.averagePrice * data.quantity;
        totalValue += currentValue;
        totalReturn += (currentValue - purchaseValue);
      }
    });
    
    return totalValue > 0 ? (totalReturn / (totalValue - totalReturn)) * 100 : 0;
  },

  // Расчет ежемесячного платежа по кредиту
  calculateLoanPayment: (amount, rate, term) => {
    const monthlyRate = rate / 100 / 12;
    const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    return payment;
  },

  // Расчет доходности депозита
  calculateDepositReturn: (amount, rate, term) => {
    const monthlyRate = rate / 100 / 12;
    return amount * Math.pow(1 + monthlyRate, term) - amount;
  },

  // Проверка возможности покупки акций
  canBuyStock: (stockId, quantity, price, accountBalance) => {
    const totalCost = quantity * price;
    return accountBalance >= totalCost;
  },

  // Расчет комиссии за операцию
  calculateCommission: (amount, operationType) => {
    const rates = {
      'stock_buy': 0.003, // 0.3%
      'stock_sell': 0.003,
      'transfer': 0.001, // 0.1%
      'currency_exchange': 0.005 // 0.5%
    };
    
    return amount * (rates[operationType] || 0);
  },

  // Генерация номера счета
  generateAccountNumber: (bankCode, accountType) => {
    const prefix = accountType.includes('city') ? '40701' : '40817';
    const random = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    return `${prefix}${bankCode}${random}`;
  },

  // Проверка кредитного рейтинга
  checkCreditRating: (gameState) => {
    const { mayorRating, budget, financeState } = gameState;
    const corruptionRisk = financeState?.risks?.investigationRisk || 0;
    
    let rating = mayorRating;
    
    // Корректировка на основе бюджета
    if (budget > 100000000) rating += 10;
    else if (budget < 10000000) rating -= 20;
    
    // Корректировка на основе коррупционных рисков
    rating -= corruptionRisk * 0.5;
    
    return Math.max(0, Math.min(100, rating));
  },

  // Симуляция изменения цен акций
  simulateStockPriceChange: (stock) => {
    const volatilityMultiplier = {
      'low': 0.02,
      'medium': 0.05,
      'high': 0.08
    };
    
    const maxChange = volatilityMultiplier[stock.volatility] || 0.05;
    const change = (Math.random() - 0.5) * 2 * maxChange;
    
    return {
      ...stock,
      price: Math.max(0.01, stock.price * (1 + change)),
      change: stock.price * change,
      changePercent: change * 100
    };
  }
};

export default {
  BankAccountTypes,
  BankAccountLabels,
  StockSectors,
  StockSectorLabels,
  LoanTypes,
  LoanTypeLabels,
  DepositTypes,
  DepositTypeLabels,
  stocksData,
  loanOffers,
  depositOffers,
  initialBankingState,
  bankingHelpers
};
