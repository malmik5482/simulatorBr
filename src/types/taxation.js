// Типы и константы для налоговой системы и распределения доходов

export const TaxTypes = {
  INCOME_TAX: 'income_tax',
  PROPERTY_TAX: 'property_tax',
  LAND_TAX: 'land_tax',
  TRANSPORT_TAX: 'transport_tax',
  BUSINESS_TAX: 'business_tax',
  SALES_TAX: 'sales_tax',
  EXCISE_TAX: 'excise_tax',
  TOURIST_TAX: 'tourist_tax',
  ADVERTISING_TAX: 'advertising_tax',
  ENVIRONMENTAL_TAX: 'environmental_tax'
};

export const TaxTypeLabels = {
  [TaxTypes.INCOME_TAX]: 'Подоходный налог',
  [TaxTypes.PROPERTY_TAX]: 'Налог на имущество',
  [TaxTypes.LAND_TAX]: 'Земельный налог',
  [TaxTypes.TRANSPORT_TAX]: 'Транспортный налог',
  [TaxTypes.BUSINESS_TAX]: 'Налог на бизнес',
  [TaxTypes.SALES_TAX]: 'Налог с продаж',
  [TaxTypes.EXCISE_TAX]: 'Акцизы',
  [TaxTypes.TOURIST_TAX]: 'Туристический налог',
  [TaxTypes.ADVERTISING_TAX]: 'Налог на рекламу',
  [TaxTypes.ENVIRONMENTAL_TAX]: 'Экологический налог'
};

export const RevenueCategories = {
  FEDERAL_TRANSFERS: 'federal_transfers',
  REGIONAL_TRANSFERS: 'regional_transfers',
  LOCAL_TAXES: 'local_taxes',
  BUSINESS_INCOME: 'business_income',
  PROPERTY_INCOME: 'property_income',
  FINES_PENALTIES: 'fines_penalties',
  LICENSES_PERMITS: 'licenses_permits',
  MUNICIPAL_SERVICES: 'municipal_services',
  GRANTS_SUBSIDIES: 'grants_subsidies',
  BORROWING: 'borrowing'
};

export const RevenueCategoryLabels = {
  [RevenueCategories.FEDERAL_TRANSFERS]: 'Федеральные трансферты',
  [RevenueCategories.REGIONAL_TRANSFERS]: 'Региональные трансферты',
  [RevenueCategories.LOCAL_TAXES]: 'Местные налоги',
  [RevenueCategories.BUSINESS_INCOME]: 'Доходы от предпринимательства',
  [RevenueCategories.PROPERTY_INCOME]: 'Доходы от имущества',
  [RevenueCategories.FINES_PENALTIES]: 'Штрафы и пени',
  [RevenueCategories.LICENSES_PERMITS]: 'Лицензии и разрешения',
  [RevenueCategories.MUNICIPAL_SERVICES]: 'Муниципальные услуги',
  [RevenueCategories.GRANTS_SUBSIDIES]: 'Гранты и субсидии',
  [RevenueCategories.BORROWING]: 'Заимствования'
};

export const ExpenditureCategories = {
  ADMINISTRATION: 'administration',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  SOCIAL_SERVICES: 'social_services',
  INFRASTRUCTURE: 'infrastructure',
  TRANSPORT: 'transport',
  HOUSING_UTILITIES: 'housing_utilities',
  CULTURE_SPORTS: 'culture_sports',
  ENVIRONMENT: 'environment',
  SECURITY: 'security',
  DEBT_SERVICE: 'debt_service',
  RESERVES: 'reserves'
};

export const ExpenditureCategoryLabels = {
  [ExpenditureCategories.ADMINISTRATION]: 'Государственное управление',
  [ExpenditureCategories.EDUCATION]: 'Образование',
  [ExpenditureCategories.HEALTHCARE]: 'Здравоохранение',
  [ExpenditureCategories.SOCIAL_SERVICES]: 'Социальные услуги',
  [ExpenditureCategories.INFRASTRUCTURE]: 'Инфраструктура',
  [ExpenditureCategories.TRANSPORT]: 'Транспорт',
  [ExpenditureCategories.HOUSING_UTILITIES]: 'ЖКХ',
  [ExpenditureCategories.CULTURE_SPORTS]: 'Культура и спорт',
  [ExpenditureCategories.ENVIRONMENT]: 'Экология',
  [ExpenditureCategories.SECURITY]: 'Безопасность',
  [ExpenditureCategories.DEBT_SERVICE]: 'Обслуживание долга',
  [ExpenditureCategories.RESERVES]: 'Резервы'
};

export const TaxPolicyTypes = {
  RATE_INCREASE: 'rate_increase',
  RATE_DECREASE: 'rate_decrease',
  NEW_TAX: 'new_tax',
  TAX_EXEMPTION: 'tax_exemption',
  COLLECTION_IMPROVEMENT: 'collection_improvement',
  AMNESTY: 'amnesty',
  PENALTY_INCREASE: 'penalty_increase',
  SIMPLIFIED_PROCEDURE: 'simplified_procedure'
};

export const TaxPolicyLabels = {
  [TaxPolicyTypes.RATE_INCREASE]: 'Повышение ставки',
  [TaxPolicyTypes.RATE_DECREASE]: 'Снижение ставки',
  [TaxPolicyTypes.NEW_TAX]: 'Введение нового налога',
  [TaxPolicyTypes.TAX_EXEMPTION]: 'Налоговые льготы',
  [TaxPolicyTypes.COLLECTION_IMPROVEMENT]: 'Улучшение сбора',
  [TaxPolicyTypes.AMNESTY]: 'Налоговая амнистия',
  [TaxPolicyTypes.PENALTY_INCREASE]: 'Увеличение штрафов',
  [TaxPolicyTypes.SIMPLIFIED_PROCEDURE]: 'Упрощение процедур'
};

// Данные налоговой системы
export const taxSystemData = {
  // Текущие налоговые ставки (в процентах)
  currentRates: {
    [TaxTypes.INCOME_TAX]: 13,
    [TaxTypes.PROPERTY_TAX]: 0.3,
    [TaxTypes.LAND_TAX]: 0.5,
    [TaxTypes.TRANSPORT_TAX]: 25, // за л.с.
    [TaxTypes.BUSINESS_TAX]: 6,
    [TaxTypes.SALES_TAX]: 0,
    [TaxTypes.EXCISE_TAX]: 15,
    [TaxTypes.TOURIST_TAX]: 0,
    [TaxTypes.ADVERTISING_TAX]: 5,
    [TaxTypes.ENVIRONMENTAL_TAX]: 2
  },

  // Налоговая база (в рублях)
  taxBase: {
    [TaxTypes.INCOME_TAX]: 45000000000, // общий доход населения
    [TaxTypes.PROPERTY_TAX]: 120000000000, // стоимость недвижимости
    [TaxTypes.LAND_TAX]: 25000000000, // стоимость земли
    [TaxTypes.TRANSPORT_TAX]: 180000, // количество л.с.
    [TaxTypes.BUSINESS_TAX]: 15000000000, // оборот бизнеса
    [TaxTypes.SALES_TAX]: 8000000000, // розничные продажи
    [TaxTypes.EXCISE_TAX]: 2000000000, // подакцизные товары
    [TaxTypes.TOURIST_TAX]: 500000, // туристы в год
    [TaxTypes.ADVERTISING_TAX]: 800000000, // рекламные расходы
    [TaxTypes.ENVIRONMENTAL_TAX]: 5000000000 // промышленные выбросы
  },

  // Эффективность сбора (в процентах)
  collectionEfficiency: {
    [TaxTypes.INCOME_TAX]: 85,
    [TaxTypes.PROPERTY_TAX]: 70,
    [TaxTypes.LAND_TAX]: 75,
    [TaxTypes.TRANSPORT_TAX]: 80,
    [TaxTypes.BUSINESS_TAX]: 65,
    [TaxTypes.SALES_TAX]: 90,
    [TaxTypes.EXCISE_TAX]: 95,
    [TaxTypes.TOURIST_TAX]: 60,
    [TaxTypes.ADVERTISING_TAX]: 70,
    [TaxTypes.ENVIRONMENTAL_TAX]: 55
  }
};

// Структура доходов бюджета
export const revenueStructure = {
  [RevenueCategories.FEDERAL_TRANSFERS]: {
    amount: 8500000000,
    percentage: 42,
    controllable: false,
    description: 'Дотации и субвенции из федерального бюджета'
  },
  [RevenueCategories.REGIONAL_TRANSFERS]: {
    amount: 2800000000,
    percentage: 14,
    controllable: false,
    description: 'Трансферты из областного бюджета'
  },
  [RevenueCategories.LOCAL_TAXES]: {
    amount: 4200000000,
    percentage: 21,
    controllable: true,
    description: 'Местные налоги и сборы'
  },
  [RevenueCategories.BUSINESS_INCOME]: {
    amount: 1800000000,
    percentage: 9,
    controllable: true,
    description: 'Доходы от муниципальных предприятий'
  },
  [RevenueCategories.PROPERTY_INCOME]: {
    amount: 1200000000,
    percentage: 6,
    controllable: true,
    description: 'Аренда муниципального имущества'
  },
  [RevenueCategories.FINES_PENALTIES]: {
    amount: 800000000,
    percentage: 4,
    controllable: true,
    description: 'Штрафы и административные платежи'
  },
  [RevenueCategories.LICENSES_PERMITS]: {
    amount: 400000000,
    percentage: 2,
    controllable: true,
    description: 'Лицензии и разрешения'
  },
  [RevenueCategories.MUNICIPAL_SERVICES]: {
    amount: 300000000,
    percentage: 1.5,
    controllable: true,
    description: 'Платные муниципальные услуги'
  },
  [RevenueCategories.GRANTS_SUBSIDIES]: {
    amount: 100000000,
    percentage: 0.5,
    controllable: false,
    description: 'Гранты и целевые субсидии'
  }
};

// Структура расходов бюджета
export const expenditureStructure = {
  [ExpenditureCategories.ADMINISTRATION]: {
    amount: 2500000000,
    percentage: 12.5,
    mandatory: true,
    description: 'Содержание органов местного самоуправления'
  },
  [ExpenditureCategories.EDUCATION]: {
    amount: 6000000000,
    percentage: 30,
    mandatory: true,
    description: 'Дошкольное и общее образование'
  },
  [ExpenditureCategories.HEALTHCARE]: {
    amount: 3200000000,
    percentage: 16,
    mandatory: true,
    description: 'Первичная медико-санитарная помощь'
  },
  [ExpenditureCategories.SOCIAL_SERVICES]: {
    amount: 2800000000,
    percentage: 14,
    mandatory: true,
    description: 'Социальная поддержка населения'
  },
  [ExpenditureCategories.INFRASTRUCTURE]: {
    amount: 2000000000,
    percentage: 10,
    mandatory: false,
    description: 'Дороги, мосты, коммуникации'
  },
  [ExpenditureCategories.TRANSPORT]: {
    amount: 1200000000,
    percentage: 6,
    mandatory: false,
    description: 'Общественный транспорт'
  },
  [ExpenditureCategories.HOUSING_UTILITIES]: {
    amount: 1000000000,
    percentage: 5,
    mandatory: false,
    description: 'ЖКХ и благоустройство'
  },
  [ExpenditureCategories.CULTURE_SPORTS]: {
    amount: 600000000,
    percentage: 3,
    mandatory: false,
    description: 'Культура, спорт, молодежная политика'
  },
  [ExpenditureCategories.ENVIRONMENT]: {
    amount: 400000000,
    percentage: 2,
    mandatory: false,
    description: 'Охрана окружающей среды'
  },
  [ExpenditureCategories.SECURITY]: {
    amount: 200000000,
    percentage: 1,
    mandatory: false,
    description: 'Обеспечение безопасности'
  },
  [ExpenditureCategories.DEBT_SERVICE]: {
    amount: 100000000,
    percentage: 0.5,
    mandatory: true,
    description: 'Обслуживание муниципального долга'
  }
};

// Возможные налоговые политики
export const taxPolicies = [
  {
    id: 'increase_property_tax',
    type: TaxPolicyTypes.RATE_INCREASE,
    name: 'Повышение налога на имущество',
    description: 'Увеличить ставку налога на имущество с 0.3% до 0.5%',
    targetTax: TaxTypes.PROPERTY_TAX,
    rateChange: 0.2,
    cost: 50000000,
    implementation_time: 3,
    consequences: {
      revenue_change: 240000000,
      citizen_satisfaction: { entrepreneurs: -15, pensioners: -10 },
      business_climate: -8,
      property_values: -3
    },
    political_cost: 15
  },

  {
    id: 'introduce_tourist_tax',
    type: TaxPolicyTypes.NEW_TAX,
    name: 'Введение туристического налога',
    description: 'Ввести налог 100 рублей с туриста за сутки',
    targetTax: TaxTypes.TOURIST_TAX,
    rateChange: 100,
    cost: 25000000,
    implementation_time: 2,
    consequences: {
      revenue_change: 50000000,
      citizen_satisfaction: { entrepreneurs: 5 },
      tourism_impact: -5,
      city_budget: 50000000
    },
    political_cost: 5
  },

  {
    id: 'business_tax_reduction',
    type: TaxPolicyTypes.RATE_DECREASE,
    name: 'Снижение налога на бизнес',
    description: 'Снизить ставку налога на бизнес с 6% до 4%',
    targetTax: TaxTypes.BUSINESS_TAX,
    rateChange: -2,
    cost: 30000000,
    implementation_time: 1,
    consequences: {
      revenue_change: -300000000,
      citizen_satisfaction: { entrepreneurs: 25, workers: 8 },
      business_climate: 15,
      investment_attraction: 20
    },
    political_cost: -10
  },

  {
    id: 'improve_collection',
    type: TaxPolicyTypes.COLLECTION_IMPROVEMENT,
    name: 'Улучшение налогового администрирования',
    description: 'Модернизация налоговых служб и цифровизация процессов',
    targetTax: 'all',
    rateChange: 0,
    cost: 150000000,
    implementation_time: 6,
    consequences: {
      revenue_change: 800000000,
      collection_efficiency: 10,
      citizen_satisfaction: { entrepreneurs: -5 },
      corruption_risk: -15
    },
    political_cost: 8
  },

  {
    id: 'environmental_tax_new',
    type: TaxPolicyTypes.NEW_TAX,
    name: 'Экологический налог для предприятий',
    description: 'Ввести налог на промышленные выбросы',
    targetTax: TaxTypes.ENVIRONMENTAL_TAX,
    rateChange: 5,
    cost: 40000000,
    implementation_time: 4,
    consequences: {
      revenue_change: 250000000,
      citizen_satisfaction: { intellectuals: 15, workers: -5 },
      environmental_impact: 10,
      business_climate: -5
    },
    political_cost: 10
  },

  {
    id: 'tax_amnesty',
    type: TaxPolicyTypes.AMNESTY,
    name: 'Налоговая амнистия',
    description: 'Списание пеней и штрафов при погашении основного долга',
    targetTax: 'all',
    rateChange: 0,
    cost: 20000000,
    implementation_time: 2,
    consequences: {
      revenue_change: 600000000,
      citizen_satisfaction: { entrepreneurs: 20, workers: 10 },
      collection_efficiency: 5,
      future_compliance: -5
    },
    political_cost: -5
  },

  {
    id: 'advertising_tax_increase',
    type: TaxPolicyTypes.RATE_INCREASE,
    name: 'Повышение налога на рекламу',
    description: 'Увеличить налог на рекламу с 5% до 8%',
    targetTax: TaxTypes.ADVERTISING_TAX,
    rateChange: 3,
    cost: 15000000,
    implementation_time: 1,
    consequences: {
      revenue_change: 24000000,
      citizen_satisfaction: { intellectuals: 5 },
      business_climate: -3,
      city_aesthetics: 5
    },
    political_cost: 3
  },

  {
    id: 'small_business_exemption',
    type: TaxPolicyTypes.TAX_EXEMPTION,
    name: 'Льготы для малого бизнеса',
    description: 'Освобождение от местных налогов для стартапов на 2 года',
    targetTax: TaxTypes.BUSINESS_TAX,
    rateChange: 0,
    cost: 80000000,
    implementation_time: 3,
    consequences: {
      revenue_change: -150000000,
      citizen_satisfaction: { entrepreneurs: 30, students: 15 },
      business_climate: 25,
      innovation_index: 20,
      new_businesses: 40
    },
    political_cost: -15
  }
];

// Начальное состояние налоговой системы
export const initialTaxationState = {
  // Текущие налоговые ставки
  currentRates: { ...taxSystemData.currentRates },
  
  // Налоговая база
  taxBase: { ...taxSystemData.taxBase },
  
  // Эффективность сбора
  collectionEfficiency: { ...taxSystemData.collectionEfficiency },
  
  // Структура доходов
  revenueStructure: { ...revenueStructure },
  
  // Структура расходов
  expenditureStructure: { ...expenditureStructure },
  
  // Активные налоговые политики
  activePolicies: [],
  
  // История изменений
  policyHistory: [],
  
  // Налоговые показатели
  taxMetrics: {
    totalRevenue: 20000000000,
    taxBurden: 28, // процент от ВВП
    collectionRate: 75,
    taxpayerSatisfaction: 45,
    businessClimate: 60
  },
  
  // Долговые обязательства
  debt: {
    totalDebt: 2000000000,
    debtToRevenue: 10,
    interestRate: 8.5,
    annualService: 170000000
  }
};

// Утилиты для работы с налоговой системой
export const taxationHelpers = {
  // Расчет налоговых поступлений
  calculateTaxRevenue: (taxType, rate, base, efficiency) => {
    return (base * rate / 100) * (efficiency / 100);
  },

  // Расчет общих налоговых поступлений
  calculateTotalTaxRevenue: (rates, bases, efficiencies) => {
    return Object.keys(rates).reduce((total, taxType) => {
      return total + taxationHelpers.calculateTaxRevenue(
        taxType, 
        rates[taxType], 
        bases[taxType], 
        efficiencies[taxType]
      );
    }, 0);
  },

  // Расчет налогового бремени
  calculateTaxBurden: (totalRevenue, cityGDP) => {
    return (totalRevenue / cityGDP) * 100;
  },

  // Оценка влияния налоговой политики
  evaluatePolicyImpact: (policy, currentState) => {
    let impact = {
      revenue_change: 0,
      satisfaction_change: {},
      economic_impact: 0,
      implementation_cost: policy.cost
    };

    if (policy.type === TaxPolicyTypes.RATE_INCREASE) {
      const currentRate = currentState.currentRates[policy.targetTax];
      const newRate = currentRate + policy.rateChange;
      const base = currentState.taxBase[policy.targetTax];
      const efficiency = currentState.collectionEfficiency[policy.targetTax];
      
      const oldRevenue = taxationHelpers.calculateTaxRevenue(policy.targetTax, currentRate, base, efficiency);
      const newRevenue = taxationHelpers.calculateTaxRevenue(policy.targetTax, newRate, base, efficiency);
      
      impact.revenue_change = newRevenue - oldRevenue;
    }

    if (policy.consequences) {
      impact = { ...impact, ...policy.consequences };
    }

    return impact;
  },

  // Расчет оптимальной налоговой ставки (кривая Лаффера)
  calculateOptimalRate: (taxType, base, currentEfficiency) => {
    // Упрощенная модель кривой Лаффера
    const maxRate = 50; // максимальная эффективная ставка
    const optimalRate = maxRate * 0.6; // оптимум около 60% от максимума
    
    return {
      optimal_rate: optimalRate,
      current_position: 'below_optimal', // или 'above_optimal', 'at_optimal'
      revenue_potential: base * (optimalRate / 100) * (currentEfficiency / 100)
    };
  },

  // Прогноз доходов на следующий период
  forecastRevenue: (currentState, policies = []) => {
    let forecast = { ...currentState.revenueStructure };
    
    policies.forEach(policy => {
      const impact = taxationHelpers.evaluatePolicyImpact(policy, currentState);
      
      // Применяем изменения к прогнозу
      if (impact.revenue_change) {
        forecast[RevenueCategories.LOCAL_TAXES].amount += impact.revenue_change;
      }
    });
    
    return forecast;
  },

  // Анализ бюджетного баланса
  analyzeBudgetBalance: (revenues, expenditures) => {
    const totalRevenue = Object.values(revenues).reduce((sum, item) => sum + item.amount, 0);
    const totalExpenditure = Object.values(expenditures).reduce((sum, item) => sum + item.amount, 0);
    const balance = totalRevenue - totalExpenditure;
    
    return {
      total_revenue: totalRevenue,
      total_expenditure: totalExpenditure,
      balance: balance,
      balance_percentage: (balance / totalRevenue) * 100,
      status: balance >= 0 ? 'surplus' : 'deficit'
    };
  },

  // Расчет долговой нагрузки
  calculateDebtBurden: (debt, revenue) => {
    return {
      debt_to_revenue: (debt.totalDebt / revenue) * 100,
      debt_service_ratio: (debt.annualService / revenue) * 100,
      sustainability: debt.totalDebt / revenue < 0.5 ? 'sustainable' : 'risky'
    };
  },

  // Получение цвета для показателей
  getMetricColor: (value, type) => {
    const thresholds = {
      satisfaction: { good: 70, medium: 50 },
      efficiency: { good: 80, medium: 60 },
      burden: { good: 25, medium: 35 }, // обратная логика
      balance: { good: 0, medium: -5 } // процент от доходов
    };
    
    const threshold = thresholds[type];
    if (!threshold) return 'text-gray-600';
    
    if (type === 'burden') {
      // Для налогового бремени меньше = лучше
      if (value <= threshold.good) return 'text-green-600';
      if (value <= threshold.medium) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      // Для остальных показателей больше = лучше
      if (value >= threshold.good) return 'text-green-600';
      if (value >= threshold.medium) return 'text-yellow-600';
      return 'text-red-600';
    }
  },

  // Форматирование суммы
  formatAmount: (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} млрд ₽`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} млн ₽`;
    }
    return `${amount.toLocaleString('ru-RU')} ₽`;
  },

  // Форматирование процентов
  formatPercentage: (value, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
  },

  // Расчет эффективности налоговой политики
  calculatePolicyEffectiveness: (policy, actualResults, timeElapsed) => {
    const expectedRevenue = policy.consequences.revenue_change || 0;
    const actualRevenue = actualResults.revenue_change || 0;
    
    const effectiveness = expectedRevenue !== 0 ? (actualRevenue / expectedRevenue) * 100 : 100;
    
    return {
      effectiveness_percentage: Math.min(150, Math.max(0, effectiveness)),
      time_factor: Math.min(1, timeElapsed / policy.implementation_time),
      overall_score: effectiveness * Math.min(1, timeElapsed / policy.implementation_time)
    };
  },

  // Генерация рекомендаций по налоговой политике
  generateTaxRecommendations: (currentState, gameState) => {
    const recommendations = [];
    
    // Анализ бюджетного баланса
    const balance = taxationHelpers.analyzeBudgetBalance(
      currentState.revenueStructure, 
      currentState.expenditureStructure
    );
    
    if (balance.status === 'deficit') {
      recommendations.push({
        type: 'revenue_increase',
        priority: 'high',
        title: 'Увеличение доходов',
        description: 'Бюджет имеет дефицит, необходимо увеличить доходы',
        suggested_policies: ['increase_property_tax', 'improve_collection']
      });
    }
    
    // Анализ удовлетворенности граждан
    if (currentState.taxMetrics.taxpayerSatisfaction < 40) {
      recommendations.push({
        type: 'satisfaction_improvement',
        priority: 'medium',
        title: 'Улучшение отношения к налогам',
        description: 'Низкая удовлетворенность налогоплательщиков',
        suggested_policies: ['tax_amnesty', 'small_business_exemption']
      });
    }
    
    // Анализ бизнес-климата
    if (currentState.taxMetrics.businessClimate < 50) {
      recommendations.push({
        type: 'business_support',
        priority: 'medium',
        title: 'Поддержка бизнеса',
        description: 'Неблагоприятный бизнес-климат',
        suggested_policies: ['business_tax_reduction', 'small_business_exemption']
      });
    }
    
    return recommendations;
  }
};

export default {
  TaxTypes,
  TaxTypeLabels,
  RevenueCategories,
  RevenueCategoryLabels,
  ExpenditureCategories,
  ExpenditureCategoryLabels,
  TaxPolicyTypes,
  TaxPolicyLabels,
  taxSystemData,
  revenueStructure,
  expenditureStructure,
  taxPolicies,
  initialTaxationState,
  taxationHelpers
};
