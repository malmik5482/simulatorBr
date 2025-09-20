// Типы и константы для инвестиционных возможностей

export const InvestmentSectors = {
  TECHNOLOGY: 'technology',
  REAL_ESTATE: 'real_estate',
  INFRASTRUCTURE: 'infrastructure',
  ENERGY: 'energy',
  MANUFACTURING: 'manufacturing',
  AGRICULTURE: 'agriculture',
  TOURISM: 'tourism',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  RETAIL: 'retail',
  LOGISTICS: 'logistics',
  FINANCE: 'finance'
};

export const SectorLabels = {
  [InvestmentSectors.TECHNOLOGY]: 'Технологии и IT',
  [InvestmentSectors.REAL_ESTATE]: 'Недвижимость',
  [InvestmentSectors.INFRASTRUCTURE]: 'Инфраструктура',
  [InvestmentSectors.ENERGY]: 'Энергетика',
  [InvestmentSectors.MANUFACTURING]: 'Производство',
  [InvestmentSectors.AGRICULTURE]: 'Сельское хозяйство',
  [InvestmentSectors.TOURISM]: 'Туризм',
  [InvestmentSectors.EDUCATION]: 'Образование',
  [InvestmentSectors.HEALTHCARE]: 'Здравоохранение',
  [InvestmentSectors.RETAIL]: 'Торговля',
  [InvestmentSectors.LOGISTICS]: 'Логистика',
  [InvestmentSectors.FINANCE]: 'Финансы'
};

export const InvestmentTypes = {
  DIRECT: 'direct',
  FUND: 'fund',
  BOND: 'bond',
  STARTUP: 'startup',
  INFRASTRUCTURE_BOND: 'infrastructure_bond',
  MUNICIPAL_BOND: 'municipal_bond',
  VENTURE: 'venture',
  PRIVATE_EQUITY: 'private_equity'
};

export const InvestmentTypeLabels = {
  [InvestmentTypes.DIRECT]: 'Прямые инвестиции',
  [InvestmentTypes.FUND]: 'Инвестиционный фонд',
  [InvestmentTypes.BOND]: 'Облигации',
  [InvestmentTypes.STARTUP]: 'Стартап',
  [InvestmentTypes.INFRASTRUCTURE_BOND]: 'Инфраструктурные облигации',
  [InvestmentTypes.MUNICIPAL_BOND]: 'Муниципальные облигации',
  [InvestmentTypes.VENTURE]: 'Венчурные инвестиции',
  [InvestmentTypes.PRIVATE_EQUITY]: 'Частный капитал'
};

export const RiskLevels = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VERY_HIGH: 'very_high'
};

export const RiskLevelLabels = {
  [RiskLevels.LOW]: 'Низкий риск',
  [RiskLevels.MEDIUM]: 'Средний риск',
  [RiskLevels.HIGH]: 'Высокий риск',
  [RiskLevels.VERY_HIGH]: 'Очень высокий риск'
};

// Данные инвестиционных возможностей
export const investmentOpportunities = [
  // Технологии и IT
  {
    id: 'tech_park_bryansk',
    name: 'IT-парк "Брянск Цифровой"',
    sector: InvestmentSectors.TECHNOLOGY,
    type: InvestmentTypes.DIRECT,
    description: 'Создание современного IT-парка для привлечения технологических компаний',
    minInvestment: 500000000,
    maxInvestment: 2000000000,
    expectedReturn: 18,
    riskLevel: RiskLevels.MEDIUM,
    duration: 36, // месяцы
    cityBenefits: {
      unemployment: -8,
      infrastructure: 15,
      mayorRating: 12,
      taxRevenue: 25000000
    },
    personalBenefits: {
      kickbackPercent: 5,
      reputationBonus: 10
    },
    requirements: {
      mayorRating: 60,
      infrastructure: 50
    },
    milestones: [
      { month: 6, description: 'Получение разрешений', completion: 15 },
      { month: 12, description: 'Начало строительства', completion: 30 },
      { month: 24, description: 'Первые резиденты', completion: 70 },
      { month: 36, description: 'Полная загрузка', completion: 100 }
    ]
  },
  {
    id: 'ai_research_center',
    name: 'Центр исследований ИИ',
    sector: InvestmentSectors.TECHNOLOGY,
    type: InvestmentTypes.VENTURE,
    description: 'Создание центра исследований искусственного интеллекта в партнерстве с МГУ',
    minInvestment: 200000000,
    maxInvestment: 800000000,
    expectedReturn: 25,
    riskLevel: RiskLevels.HIGH,
    duration: 48,
    cityBenefits: {
      education: 20,
      infrastructure: 10,
      mayorRating: 15,
      innovation: 30
    },
    personalBenefits: {
      kickbackPercent: 3,
      reputationBonus: 20,
      connections: 15
    },
    requirements: {
      mayorRating: 70,
      education: 60
    }
  },

  // Недвижимость
  {
    id: 'residential_complex',
    name: 'ЖК "Брянские высоты"',
    sector: InvestmentSectors.REAL_ESTATE,
    type: InvestmentTypes.DIRECT,
    description: 'Строительство современного жилого комплекса с развитой инфраструктурой',
    minInvestment: 1000000000,
    maxInvestment: 5000000000,
    expectedReturn: 22,
    riskLevel: RiskLevels.MEDIUM,
    duration: 30,
    cityBenefits: {
      happiness: 10,
      infrastructure: 8,
      unemployment: -5,
      taxRevenue: 15000000
    },
    personalBenefits: {
      kickbackPercent: 8,
      personalProperty: 50000000
    },
    requirements: {
      mayorRating: 50
    }
  },
  {
    id: 'shopping_mall',
    name: 'ТРЦ "Брянск Молл"',
    sector: InvestmentSectors.RETAIL,
    type: InvestmentTypes.DIRECT,
    description: 'Крупный торгово-развлекательный центр европейского уровня',
    minInvestment: 800000000,
    maxInvestment: 3000000000,
    expectedReturn: 20,
    riskLevel: RiskLevels.MEDIUM,
    duration: 24,
    cityBenefits: {
      happiness: 15,
      unemployment: -10,
      taxRevenue: 20000000
    },
    personalBenefits: {
      kickbackPercent: 6,
      personalShares: 2
    },
    requirements: {
      mayorRating: 45,
      infrastructure: 40
    }
  },

  // Инфраструктура
  {
    id: 'transport_hub',
    name: 'Транспортно-логистический хаб',
    sector: InvestmentSectors.LOGISTICS,
    type: InvestmentTypes.INFRASTRUCTURE_BOND,
    description: 'Современный логистический центр на пересечении федеральных трасс',
    minInvestment: 2000000000,
    maxInvestment: 8000000000,
    expectedReturn: 15,
    riskLevel: RiskLevels.LOW,
    duration: 42,
    cityBenefits: {
      infrastructure: 25,
      unemployment: -15,
      ecology: -5,
      taxRevenue: 40000000
    },
    personalBenefits: {
      kickbackPercent: 4,
      federalConnections: 10
    },
    requirements: {
      mayorRating: 65,
      infrastructure: 55
    }
  },
  {
    id: 'renewable_energy',
    name: 'Парк возобновляемой энергетики',
    sector: InvestmentSectors.ENERGY,
    type: InvestmentTypes.FUND,
    description: 'Солнечные и ветровые электростанции для экологически чистой энергии',
    minInvestment: 1500000000,
    maxInvestment: 6000000000,
    expectedReturn: 12,
    riskLevel: RiskLevels.LOW,
    duration: 60,
    cityBenefits: {
      ecology: 30,
      infrastructure: 15,
      mayorRating: 18,
      energyIndependence: 40
    },
    personalBenefits: {
      kickbackPercent: 2,
      greenReputation: 25
    },
    requirements: {
      mayorRating: 60,
      ecology: 30
    }
  },

  // Производство
  {
    id: 'automotive_plant',
    name: 'Автомобильный завод',
    sector: InvestmentSectors.MANUFACTURING,
    type: InvestmentTypes.DIRECT,
    description: 'Современное производство электромобилей в партнерстве с китайскими инвесторами',
    minInvestment: 3000000000,
    maxInvestment: 12000000000,
    expectedReturn: 28,
    riskLevel: RiskLevels.HIGH,
    duration: 48,
    cityBenefits: {
      unemployment: -25,
      infrastructure: 20,
      mayorRating: 20,
      taxRevenue: 80000000
    },
    personalBenefits: {
      kickbackPercent: 7,
      internationalConnections: 20
    },
    requirements: {
      mayorRating: 70,
      infrastructure: 60,
      unemployment: 10
    }
  },
  {
    id: 'food_processing',
    name: 'Агропромышленный комплекс',
    sector: InvestmentSectors.AGRICULTURE,
    type: InvestmentTypes.DIRECT,
    description: 'Переработка сельхозпродукции и производство экологически чистых продуктов',
    minInvestment: 800000000,
    maxInvestment: 3500000000,
    expectedReturn: 16,
    riskLevel: RiskLevels.MEDIUM,
    duration: 30,
    cityBenefits: {
      unemployment: -12,
      ecology: 5,
      happiness: 8,
      taxRevenue: 25000000
    },
    personalBenefits: {
      kickbackPercent: 5,
      ruralSupport: 15
    },
    requirements: {
      mayorRating: 55
    }
  },

  // Туризм
  {
    id: 'cultural_quarter',
    name: 'Культурно-туристический квартал',
    sector: InvestmentSectors.TOURISM,
    type: InvestmentTypes.DIRECT,
    description: 'Реконструкция исторического центра для развития туризма',
    minInvestment: 1200000000,
    maxInvestment: 4000000000,
    expectedReturn: 14,
    riskLevel: RiskLevels.MEDIUM,
    duration: 36,
    cityBenefits: {
      happiness: 20,
      mayorRating: 15,
      culture: 25,
      taxRevenue: 18000000
    },
    personalBenefits: {
      kickbackPercent: 4,
      culturalReputation: 20
    },
    requirements: {
      mayorRating: 60,
      culture: 40
    }
  },

  // Стартапы
  {
    id: 'fintech_startup',
    name: 'Финтех стартап "БрянскПэй"',
    sector: InvestmentSectors.FINANCE,
    type: InvestmentTypes.STARTUP,
    description: 'Платформа для цифровых платежей и финансовых услуг',
    minInvestment: 50000000,
    maxInvestment: 300000000,
    expectedReturn: 45,
    riskLevel: RiskLevels.VERY_HIGH,
    duration: 18,
    cityBenefits: {
      innovation: 15,
      infrastructure: 5
    },
    personalBenefits: {
      kickbackPercent: 10,
      techReputation: 15,
      personalShares: 5
    },
    requirements: {
      mayorRating: 50
    }
  },
  {
    id: 'biotech_startup',
    name: 'Биотех стартап "БрянскБио"',
    sector: InvestmentSectors.HEALTHCARE,
    type: InvestmentTypes.STARTUP,
    description: 'Разработка инновационных медицинских препаратов',
    minInvestment: 100000000,
    maxInvestment: 500000000,
    expectedReturn: 40,
    riskLevel: RiskLevels.VERY_HIGH,
    duration: 24,
    cityBenefits: {
      healthcare: 15,
      innovation: 20,
      mayorRating: 10
    },
    personalBenefits: {
      kickbackPercent: 8,
      healthReputation: 20
    },
    requirements: {
      mayorRating: 65,
      healthcare: 50
    }
  }
];

// Данные инвестиционных фондов
export const investmentFunds = [
  {
    id: 'regional_development_fund',
    name: 'Фонд развития Брянской области',
    type: 'regional',
    description: 'Государственный фонд для поддержки региональных проектов',
    totalCapital: 10000000000,
    availableCapital: 3000000000,
    focusSectors: [
      InvestmentSectors.INFRASTRUCTURE,
      InvestmentSectors.MANUFACTURING,
      InvestmentSectors.AGRICULTURE
    ],
    requirements: {
      mayorRating: 60,
      projectSize: 500000000,
      cofinancing: 30
    },
    benefits: {
      interestRate: 5,
      gracePeriod: 12,
      federalSupport: true
    }
  },
  {
    id: 'innovation_fund',
    name: 'Фонд инноваций и технологий',
    type: 'innovation',
    description: 'Частный фонд для поддержки высокотехнологичных проектов',
    totalCapital: 5000000000,
    availableCapital: 2000000000,
    focusSectors: [
      InvestmentSectors.TECHNOLOGY,
      InvestmentSectors.HEALTHCARE,
      InvestmentSectors.EDUCATION
    ],
    requirements: {
      mayorRating: 70,
      innovation: 60,
      projectSize: 100000000
    },
    benefits: {
      mentorship: true,
      networkAccess: true,
      acceleratedPermits: true
    }
  },
  {
    id: 'green_investment_fund',
    name: 'Зеленый инвестиционный фонд',
    type: 'environmental',
    description: 'Международный фонд для экологических проектов',
    totalCapital: 8000000000,
    availableCapital: 4000000000,
    focusSectors: [
      InvestmentSectors.ENERGY,
      InvestmentSectors.INFRASTRUCTURE,
      InvestmentSectors.AGRICULTURE
    ],
    requirements: {
      ecology: 50,
      environmentalImpact: true,
      projectSize: 200000000
    },
    benefits: {
      grantComponent: 20,
      carbonCredits: true,
      internationalRecognition: true
    }
  }
];

// Начальное состояние инвестиций
export const initialInvestmentState = {
  // Активные инвестиции
  activeInvestments: [],
  
  // Завершенные инвестиции
  completedInvestments: [],
  
  // Портфель инвестиций
  portfolio: {
    totalInvested: 0,
    totalReturns: 0,
    activeValue: 0,
    sectorDistribution: {}
  },
  
  // Доступные возможности (обновляются динамически)
  availableOpportunities: investmentOpportunities,
  
  // Статистика
  investmentMetrics: {
    totalProjects: 0,
    successRate: 0,
    averageReturn: 0,
    riskScore: 0
  },
  
  // Настройки инвестирования
  investmentSettings: {
    riskTolerance: RiskLevels.MEDIUM,
    preferredSectors: [],
    maxInvestmentPerProject: 1000000000,
    diversificationTarget: 5
  }
};

// Утилиты для инвестиций
export const investmentHelpers = {
  // Расчет ожидаемой доходности с учетом рисков
  calculateExpectedReturn: (investment, gameState) => {
    let baseReturn = investment.expectedReturn;
    
    // Корректировка на основе рейтинга мэра
    const ratingBonus = (gameState.mayorRating - 50) * 0.1;
    baseReturn += ratingBonus;
    
    // Корректировка на основе состояния города
    if (investment.sector === InvestmentSectors.TECHNOLOGY && gameState.infrastructure > 70) {
      baseReturn += 2;
    }
    if (investment.sector === InvestmentSectors.TOURISM && gameState.culture > 60) {
      baseReturn += 1.5;
    }
    
    // Риск-корректировка
    const riskMultiplier = {
      [RiskLevels.LOW]: 0.9,
      [RiskLevels.MEDIUM]: 1.0,
      [RiskLevels.HIGH]: 1.2,
      [RiskLevels.VERY_HIGH]: 1.5
    };
    
    return baseReturn * (riskMultiplier[investment.riskLevel] || 1.0);
  },

  // Проверка возможности инвестирования
  canInvest: (investment, amount, gameState) => {
    // Проверка минимальной суммы
    if (amount < investment.minInvestment) {
      return { 
        canInvest: false, 
        reason: `Минимальная сумма инвестиций: ${investment.minInvestment.toLocaleString('ru-RU')} ₽` 
      };
    }
    
    // Проверка максимальной суммы
    if (amount > investment.maxInvestment) {
      return { 
        canInvest: false, 
        reason: `Максимальная сумма инвестиций: ${investment.maxInvestment.toLocaleString('ru-RU')} ₽` 
      };
    }
    
    // Проверка требований
    if (investment.requirements) {
      for (const [requirement, minValue] of Object.entries(investment.requirements)) {
        if (gameState[requirement] < minValue) {
          return { 
            canInvest: false, 
            reason: `Требуется ${requirement}: ${minValue}` 
          };
        }
      }
    }
    
    // Проверка наличия средств
    const availableFunds = gameState.financeState?.cityBudget?.total || 0;
    if (amount > availableFunds) {
      return { 
        canInvest: false, 
        reason: 'Недостаточно средств в городском бюджете' 
      };
    }
    
    return { canInvest: true };
  },

  // Расчет рисков инвестиции
  calculateInvestmentRisk: (investment, gameState) => {
    let riskScore = 0;
    
    // Базовый риск по уровню
    const baseRisk = {
      [RiskLevels.LOW]: 10,
      [RiskLevels.MEDIUM]: 25,
      [RiskLevels.HIGH]: 45,
      [RiskLevels.VERY_HIGH]: 70
    };
    
    riskScore = baseRisk[investment.riskLevel] || 25;
    
    // Корректировка на основе состояния города
    if (gameState.mayorRating < 50) riskScore += 10;
    if (gameState.corruption > 50) riskScore += 15;
    if (gameState.infrastructure < 40) riskScore += 10;
    
    // Корректировка по сектору
    if (investment.sector === InvestmentSectors.TECHNOLOGY && gameState.education < 50) {
      riskScore += 10;
    }
    
    return Math.min(100, Math.max(0, riskScore));
  },

  // Симуляция прогресса инвестиции
  simulateInvestmentProgress: (investment, monthsPassed) => {
    const totalMonths = investment.duration;
    const progressPercent = (monthsPassed / totalMonths) * 100;
    
    // Находим текущий этап
    let currentMilestone = null;
    for (const milestone of investment.milestones || []) {
      if (monthsPassed >= milestone.month) {
        currentMilestone = milestone;
      } else {
        break;
      }
    }
    
    return {
      progressPercent: Math.min(100, progressPercent),
      currentMilestone,
      isCompleted: monthsPassed >= totalMonths,
      remainingMonths: Math.max(0, totalMonths - monthsPassed)
    };
  },

  // Расчет текущей стоимости инвестиции
  calculateCurrentValue: (investment, monthsPassed, initialAmount) => {
    const progress = investmentHelpers.simulateInvestmentProgress(investment, monthsPassed);
    
    if (progress.isCompleted) {
      // Инвестиция завершена, возвращаем полную стоимость
      return initialAmount * (1 + investment.expectedReturn / 100);
    }
    
    // Частичная стоимость на основе прогресса
    const partialReturn = (investment.expectedReturn / 100) * (progress.progressPercent / 100);
    return initialAmount * (1 + partialReturn * 0.7); // 70% от ожидаемой доходности
  },

  // Генерация случайных событий для инвестиций
  generateInvestmentEvent: (investment) => {
    const events = [
      {
        type: 'regulatory_change',
        title: 'Изменение регулирования',
        description: 'Новые государственные требования влияют на проект',
        probability: 0.1,
        impact: -5
      },
      {
        type: 'market_boom',
        title: 'Рыночный подъем',
        description: 'Благоприятная рыночная конъюнктура',
        probability: 0.15,
        impact: 8
      },
      {
        type: 'competitor_entry',
        title: 'Появление конкурентов',
        description: 'На рынок выходят новые игроки',
        probability: 0.12,
        impact: -3
      },
      {
        type: 'technology_breakthrough',
        title: 'Технологический прорыв',
        description: 'Инновации ускоряют развитие проекта',
        probability: 0.08,
        impact: 12
      },
      {
        type: 'supply_chain_disruption',
        title: 'Нарушение поставок',
        description: 'Проблемы с поставщиками замедляют проект',
        probability: 0.1,
        impact: -7
      }
    ];
    
    const availableEvents = events.filter(event => Math.random() < event.probability);
    return availableEvents.length > 0 ? availableEvents[Math.floor(Math.random() * availableEvents.length)] : null;
  },

  // Расчет диверсификации портфеля
  calculatePortfolioDiversification: (investments) => {
    const sectorCounts = {};
    const typeCounts = {};
    let totalValue = 0;
    
    investments.forEach(inv => {
      sectorCounts[inv.sector] = (sectorCounts[inv.sector] || 0) + inv.amount;
      typeCounts[inv.type] = (typeCounts[inv.type] || 0) + inv.amount;
      totalValue += inv.amount;
    });
    
    // Расчет индекса Херфиндаля-Хиршмана для диверсификации
    let sectorHHI = 0;
    let typeHHI = 0;
    
    Object.values(sectorCounts).forEach(value => {
      const share = value / totalValue;
      sectorHHI += share * share;
    });
    
    Object.values(typeCounts).forEach(value => {
      const share = value / totalValue;
      typeHHI += share * share;
    });
    
    // Нормализация (0 = максимальная диверсификация, 100 = концентрация)
    const sectorDiversification = (1 - sectorHHI) * 100;
    const typeDiversification = (1 - typeHHI) * 100;
    
    return {
      sectorDiversification,
      typeDiversification,
      overallDiversification: (sectorDiversification + typeDiversification) / 2
    };
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

  // Получение цвета риска
  getRiskColor: (riskLevel) => {
    const colors = {
      [RiskLevels.LOW]: 'text-green-600',
      [RiskLevels.MEDIUM]: 'text-yellow-600',
      [RiskLevels.HIGH]: 'text-orange-600',
      [RiskLevels.VERY_HIGH]: 'text-red-600'
    };
    return colors[riskLevel] || 'text-gray-600';
  },

  // Получение иконки сектора
  getSectorIcon: (sector) => {
    const icons = {
      [InvestmentSectors.TECHNOLOGY]: '💻',
      [InvestmentSectors.REAL_ESTATE]: '🏢',
      [InvestmentSectors.INFRASTRUCTURE]: '🏗️',
      [InvestmentSectors.ENERGY]: '⚡',
      [InvestmentSectors.MANUFACTURING]: '🏭',
      [InvestmentSectors.AGRICULTURE]: '🌾',
      [InvestmentSectors.TOURISM]: '🏛️',
      [InvestmentSectors.EDUCATION]: '🎓',
      [InvestmentSectors.HEALTHCARE]: '🏥',
      [InvestmentSectors.RETAIL]: '🛒',
      [InvestmentSectors.LOGISTICS]: '🚛',
      [InvestmentSectors.FINANCE]: '💰'
    };
    return icons[sector] || '📈';
  }
};

export default {
  InvestmentSectors,
  SectorLabels,
  InvestmentTypes,
  InvestmentTypeLabels,
  RiskLevels,
  RiskLevelLabels,
  investmentOpportunities,
  investmentFunds,
  initialInvestmentState,
  investmentHelpers
};
