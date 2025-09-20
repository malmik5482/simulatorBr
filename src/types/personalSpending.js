// Типы и константы для системы траты личных денег мэра

export const SpendingCategories = {
  LUXURY_GOODS: 'luxury_goods',
  REAL_ESTATE: 'real_estate',
  VEHICLES: 'vehicles',
  TRAVEL: 'travel',
  ENTERTAINMENT: 'entertainment',
  FAMILY: 'family',
  INVESTMENTS: 'investments',
  SECURITY: 'security',
  LIFESTYLE: 'lifestyle',
  CHARITY: 'charity'
};

export const SpendingCategoryLabels = {
  [SpendingCategories.LUXURY_GOODS]: 'Предметы роскоши',
  [SpendingCategories.REAL_ESTATE]: 'Недвижимость',
  [SpendingCategories.VEHICLES]: 'Транспорт',
  [SpendingCategories.TRAVEL]: 'Путешествия',
  [SpendingCategories.ENTERTAINMENT]: 'Развлечения',
  [SpendingCategories.FAMILY]: 'Семья',
  [SpendingCategories.INVESTMENTS]: 'Инвестиции',
  [SpendingCategories.SECURITY]: 'Безопасность',
  [SpendingCategories.LIFESTYLE]: 'Образ жизни',
  [SpendingCategories.CHARITY]: 'Благотворительность'
};

export const RiskLevels = {
  VERY_LOW: 'very_low',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VERY_HIGH: 'very_high'
};

export const RiskLevelLabels = {
  [RiskLevels.VERY_LOW]: 'Очень низкий',
  [RiskLevels.LOW]: 'Низкий',
  [RiskLevels.MEDIUM]: 'Средний',
  [RiskLevels.HIGH]: 'Высокий',
  [RiskLevels.VERY_HIGH]: 'Очень высокий'
};

export const SpendingTypes = {
  ONE_TIME: 'one_time',
  RECURRING: 'recurring',
  INVESTMENT: 'investment'
};

export const SpendingTypeLabels = {
  [SpendingTypes.ONE_TIME]: 'Разовая покупка',
  [SpendingTypes.RECURRING]: 'Регулярные расходы',
  [SpendingTypes.INVESTMENT]: 'Инвестиция'
};

// Данные возможностей трат личных денег
export const personalSpendingOptions = [
  // Предметы роскоши
  {
    id: 'luxury_watch',
    name: 'Швейцарские часы Patek Philippe',
    category: SpendingCategories.LUXURY_GOODS,
    type: SpendingTypes.ONE_TIME,
    cost: 15000000,
    description: 'Эксклюзивные швейцарские часы ручной работы',
    risk_level: RiskLevels.HIGH,
    detection_probability: 35,
    benefits: {
      status_boost: 15,
      networking_opportunities: 10,
      personal_satisfaction: 20
    },
    consequences: {
      media_attention: 25,
      corruption_suspicion: 20,
      citizen_disapproval: { workers: -15, pensioners: -20 }
    },
    requirements: {
      min_personal_funds: 15000000,
      corruption_level_max: 80
    }
  },

  {
    id: 'luxury_jewelry',
    name: 'Ювелирные украшения для супруги',
    category: SpendingCategories.LUXURY_GOODS,
    type: SpendingTypes.ONE_TIME,
    cost: 8000000,
    description: 'Эксклюзивные ювелирные украшения от известных брендов',
    risk_level: RiskLevels.MEDIUM,
    detection_probability: 25,
    benefits: {
      family_happiness: 25,
      status_boost: 10,
      personal_satisfaction: 15
    },
    consequences: {
      media_attention: 15,
      corruption_suspicion: 15,
      citizen_disapproval: { families: -10, pensioners: -15 }
    },
    requirements: {
      min_personal_funds: 8000000
    }
  },

  // Недвижимость
  {
    id: 'moscow_apartment',
    name: 'Квартира в центре Москвы',
    category: SpendingCategories.REAL_ESTATE,
    type: SpendingTypes.INVESTMENT,
    cost: 120000000,
    description: 'Элитная квартира в центре Москвы площадью 200 кв.м',
    risk_level: RiskLevels.VERY_HIGH,
    detection_probability: 60,
    benefits: {
      asset_value: 120000000,
      annual_appreciation: 8000000,
      status_boost: 30,
      moscow_connections: 20
    },
    consequences: {
      media_attention: 50,
      corruption_suspicion: 40,
      federal_investigation_risk: 25,
      citizen_disapproval: { workers: -25, pensioners: -30, unemployed: -35 }
    },
    requirements: {
      min_personal_funds: 120000000,
      corruption_level_max: 70
    }
  },

  {
    id: 'country_house',
    name: 'Загородный дом в Подмосковье',
    category: SpendingCategories.REAL_ESTATE,
    type: SpendingTypes.INVESTMENT,
    cost: 80000000,
    description: 'Роскошный загородный дом с участком 2 га',
    risk_level: RiskLevels.HIGH,
    detection_probability: 45,
    benefits: {
      asset_value: 80000000,
      annual_appreciation: 4000000,
      family_happiness: 20,
      privacy: 25
    },
    consequences: {
      media_attention: 35,
      corruption_suspicion: 30,
      citizen_disapproval: { workers: -20, pensioners: -25 }
    },
    requirements: {
      min_personal_funds: 80000000
    }
  },

  {
    id: 'commercial_property',
    name: 'Коммерческая недвижимость в Брянске',
    category: SpendingCategories.REAL_ESTATE,
    type: SpendingTypes.INVESTMENT,
    cost: 45000000,
    description: 'Торговый центр в центре Брянска',
    risk_level: RiskLevels.MEDIUM,
    detection_probability: 30,
    benefits: {
      asset_value: 45000000,
      monthly_income: 2000000,
      local_influence: 15,
      business_connections: 20
    },
    consequences: {
      media_attention: 20,
      corruption_suspicion: 25,
      conflict_of_interest: 30
    },
    requirements: {
      min_personal_funds: 45000000
    }
  },

  // Транспорт
  {
    id: 'luxury_car',
    name: 'Mercedes-Maybach S-Class',
    category: SpendingCategories.VEHICLES,
    type: SpendingTypes.ONE_TIME,
    cost: 25000000,
    description: 'Роскошный автомобиль представительского класса',
    risk_level: RiskLevels.HIGH,
    detection_probability: 40,
    benefits: {
      status_boost: 25,
      comfort: 20,
      security_features: 15
    },
    consequences: {
      media_attention: 30,
      corruption_suspicion: 25,
      citizen_disapproval: { workers: -20, unemployed: -25 }
    },
    requirements: {
      min_personal_funds: 25000000
    }
  },

  {
    id: 'yacht',
    name: 'Яхта класса люкс',
    category: SpendingCategories.VEHICLES,
    type: SpendingTypes.ONE_TIME,
    cost: 150000000,
    description: 'Роскошная яхта длиной 30 метров',
    risk_level: RiskLevels.VERY_HIGH,
    detection_probability: 70,
    benefits: {
      status_boost: 40,
      entertainment_value: 30,
      business_meetings: 25
    },
    consequences: {
      media_attention: 60,
      corruption_suspicion: 50,
      federal_investigation_risk: 35,
      citizen_disapproval: { workers: -35, pensioners: -40, unemployed: -45 }
    },
    requirements: {
      min_personal_funds: 150000000,
      corruption_level_max: 60
    }
  },

  {
    id: 'private_jet',
    name: 'Частный самолет',
    category: SpendingCategories.VEHICLES,
    type: SpendingTypes.ONE_TIME,
    cost: 300000000,
    description: 'Частный реактивный самолет для деловых поездок',
    risk_level: RiskLevels.VERY_HIGH,
    detection_probability: 80,
    benefits: {
      status_boost: 50,
      time_efficiency: 40,
      privacy: 35,
      international_connections: 30
    },
    consequences: {
      media_attention: 80,
      corruption_suspicion: 70,
      federal_investigation_risk: 50,
      international_attention: 25,
      citizen_disapproval: { workers: -45, pensioners: -50, unemployed: -55 }
    },
    requirements: {
      min_personal_funds: 300000000,
      corruption_level_max: 50
    }
  },

  // Путешествия
  {
    id: 'luxury_vacation',
    name: 'Отдых на Мальдивах',
    category: SpendingCategories.TRAVEL,
    type: SpendingTypes.ONE_TIME,
    cost: 3000000,
    description: 'Роскошный отдых в президентском номере на Мальдивах',
    risk_level: RiskLevels.MEDIUM,
    detection_probability: 20,
    benefits: {
      family_happiness: 30,
      stress_relief: 25,
      personal_satisfaction: 20
    },
    consequences: {
      media_attention: 15,
      citizen_disapproval: { workers: -10, unemployed: -15 }
    },
    requirements: {
      min_personal_funds: 3000000
    }
  },

  {
    id: 'world_tour',
    name: 'Кругосветное путешествие',
    category: SpendingCategories.TRAVEL,
    type: SpendingTypes.ONE_TIME,
    cost: 12000000,
    description: 'Роскошное кругосветное путешествие на частном самолете',
    risk_level: RiskLevels.HIGH,
    detection_probability: 45,
    benefits: {
      family_happiness: 40,
      international_connections: 25,
      cultural_experience: 30
    },
    consequences: {
      media_attention: 35,
      corruption_suspicion: 20,
      citizen_disapproval: { workers: -20, pensioners: -25, unemployed: -30 }
    },
    requirements: {
      min_personal_funds: 12000000
    }
  },

  // Развлечения
  {
    id: 'private_concert',
    name: 'Частный концерт звезды',
    category: SpendingCategories.ENTERTAINMENT,
    type: SpendingTypes.ONE_TIME,
    cost: 5000000,
    description: 'Частный концерт известного исполнителя',
    risk_level: RiskLevels.MEDIUM,
    detection_probability: 30,
    benefits: {
      status_boost: 20,
      entertainment_value: 35,
      networking_opportunities: 15
    },
    consequences: {
      media_attention: 25,
      citizen_disapproval: { intellectuals: -15, workers: -10 }
    },
    requirements: {
      min_personal_funds: 5000000
    }
  },

  {
    id: 'vip_sports_events',
    name: 'VIP-ложи на спортивных событиях',
    category: SpendingCategories.ENTERTAINMENT,
    type: SpendingTypes.RECURRING,
    cost: 2000000,
    description: 'Годовая подписка на VIP-ложи на крупных спортивных событиях',
    risk_level: RiskLevels.LOW,
    detection_probability: 15,
    benefits: {
      entertainment_value: 25,
      networking_opportunities: 20,
      business_connections: 15
    },
    consequences: {
      media_attention: 10
    },
    requirements: {
      min_personal_funds: 2000000
    }
  },

  // Семья
  {
    id: 'children_education',
    name: 'Элитное образование для детей',
    category: SpendingCategories.FAMILY,
    type: SpendingTypes.RECURRING,
    cost: 8000000,
    description: 'Обучение детей в престижных зарубежных университетах',
    risk_level: RiskLevels.MEDIUM,
    detection_probability: 25,
    benefits: {
      family_happiness: 40,
      children_future: 50,
      international_connections: 20
    },
    consequences: {
      media_attention: 20,
      corruption_suspicion: 15
    },
    requirements: {
      min_personal_funds: 8000000
    }
  },

  {
    id: 'family_business',
    name: 'Бизнес для родственников',
    category: SpendingCategories.FAMILY,
    type: SpendingTypes.INVESTMENT,
    cost: 30000000,
    description: 'Покупка готового бизнеса для родственников',
    risk_level: RiskLevels.HIGH,
    detection_probability: 50,
    benefits: {
      family_happiness: 35,
      monthly_income: 1500000,
      family_security: 30
    },
    consequences: {
      media_attention: 40,
      corruption_suspicion: 35,
      nepotism_accusations: 45
    },
    requirements: {
      min_personal_funds: 30000000
    }
  },

  // Инвестиции
  {
    id: 'offshore_accounts',
    name: 'Оффшорные счета',
    category: SpendingCategories.INVESTMENTS,
    type: SpendingTypes.INVESTMENT,
    cost: 50000000,
    description: 'Размещение средств в оффшорных юрисдикциях',
    risk_level: RiskLevels.VERY_HIGH,
    detection_probability: 60,
    benefits: {
      asset_protection: 40,
      tax_optimization: 30,
      financial_security: 35
    },
    consequences: {
      federal_investigation_risk: 40,
      international_attention: 30,
      corruption_suspicion: 50
    },
    requirements: {
      min_personal_funds: 50000000,
      corruption_level_max: 70
    }
  },

  {
    id: 'cryptocurrency',
    name: 'Криптовалютные инвестиции',
    category: SpendingCategories.INVESTMENTS,
    type: SpendingTypes.INVESTMENT,
    cost: 20000000,
    description: 'Инвестиции в различные криптовалюты',
    risk_level: RiskLevels.HIGH,
    detection_probability: 30,
    benefits: {
      potential_returns: 40,
      anonymity: 25,
      modern_image: 15
    },
    consequences: {
      volatility_risk: 50,
      regulatory_risk: 30,
      media_attention: 20
    },
    requirements: {
      min_personal_funds: 20000000
    }
  },

  // Безопасность
  {
    id: 'personal_security',
    name: 'Личная охрана',
    category: SpendingCategories.SECURITY,
    type: SpendingTypes.RECURRING,
    cost: 6000000,
    description: 'Профессиональная служба личной охраны',
    risk_level: RiskLevels.LOW,
    detection_probability: 10,
    benefits: {
      personal_safety: 40,
      family_safety: 35,
      peace_of_mind: 30
    },
    consequences: {
      media_attention: 15,
      intimidation_perception: 20
    },
    requirements: {
      min_personal_funds: 6000000
    }
  },

  {
    id: 'secure_communications',
    name: 'Защищенные коммуникации',
    category: SpendingCategories.SECURITY,
    type: SpendingTypes.ONE_TIME,
    cost: 2000000,
    description: 'Система защищенной связи и шифрования',
    risk_level: RiskLevels.MEDIUM,
    detection_probability: 20,
    benefits: {
      communication_security: 40,
      privacy: 35,
      operational_security: 30
    },
    consequences: {
      suspicion_increase: 15,
      paranoia_perception: 10
    },
    requirements: {
      min_personal_funds: 2000000
    }
  },

  // Образ жизни
  {
    id: 'personal_chef',
    name: 'Личный повар',
    category: SpendingCategories.LIFESTYLE,
    type: SpendingTypes.RECURRING,
    cost: 3000000,
    description: 'Профессиональный повар для дома',
    risk_level: RiskLevels.LOW,
    detection_probability: 15,
    benefits: {
      lifestyle_quality: 25,
      health_benefits: 20,
      time_savings: 15
    },
    consequences: {
      media_attention: 10,
      elitism_perception: 15
    },
    requirements: {
      min_personal_funds: 3000000
    }
  },

  {
    id: 'personal_trainer',
    name: 'Личный тренер и спа',
    category: SpendingCategories.LIFESTYLE,
    type: SpendingTypes.RECURRING,
    cost: 1500000,
    description: 'Персональный фитнес-тренер и спа-процедуры',
    risk_level: RiskLevels.VERY_LOW,
    detection_probability: 5,
    benefits: {
      health_benefits: 30,
      stress_relief: 25,
      public_image: 15
    },
    consequences: {},
    requirements: {
      min_personal_funds: 1500000
    }
  },

  // Благотворительность
  {
    id: 'charity_foundation',
    name: 'Благотворительный фонд',
    category: SpendingCategories.CHARITY,
    type: SpendingTypes.INVESTMENT,
    cost: 25000000,
    description: 'Создание собственного благотворительного фонда',
    risk_level: RiskLevels.LOW,
    detection_probability: 5,
    benefits: {
      public_image: 40,
      tax_benefits: 20,
      social_impact: 35,
      citizen_approval: { all_groups: 15 }
    },
    consequences: {
      positive_media: 30
    },
    requirements: {
      min_personal_funds: 25000000
    }
  },

  {
    id: 'anonymous_donations',
    name: 'Анонимные пожертвования',
    category: SpendingCategories.CHARITY,
    type: SpendingTypes.RECURRING,
    cost: 5000000,
    description: 'Регулярные анонимные пожертвования на социальные нужды',
    risk_level: RiskLevels.VERY_LOW,
    detection_probability: 2,
    benefits: {
      personal_satisfaction: 30,
      karma_boost: 25,
      social_impact: 20
    },
    consequences: {},
    requirements: {
      min_personal_funds: 5000000
    }
  }
];

// Начальное состояние личных трат
export const initialPersonalSpendingState = {
  // История трат
  spendingHistory: [],
  
  // Активные регулярные расходы
  recurringExpenses: [],
  
  // Активы
  assets: [],
  
  // Общая статистика
  totalSpent: 0,
  totalAssets: 0,
  monthlyExpenses: 0,
  
  // Риски
  detectionRisk: 0,
  suspicionLevel: 0,
  
  // Показатели
  lifestyleQuality: 50,
  familyHappiness: 50,
  personalSecurity: 50,
  socialStatus: 50
};

// Утилиты для работы с личными тратами
export const personalSpendingHelpers = {
  // Расчет риска обнаружения
  calculateDetectionRisk: (spendingHistory, gameState) => {
    let baseRisk = 0;
    
    // Суммируем риски от всех трат
    spendingHistory.forEach(spending => {
      const option = personalSpendingOptions.find(opt => opt.id === spending.optionId);
      if (option) {
        baseRisk += option.detection_probability * (spending.amount / option.cost);
      }
    });
    
    // Модификаторы риска
    if (gameState.media_attention > 70) baseRisk *= 1.3;
    if (gameState.corruption_level > 60) baseRisk *= 1.2;
    if (gameState.mayorRating < 40) baseRisk *= 1.15;
    
    return Math.min(100, baseRisk);
  },

  // Расчет влияния на рейтинг
  calculateRatingImpact: (option, gameState) => {
    let impact = 0;
    
    if (option.consequences.citizen_disapproval) {
      Object.entries(option.consequences.citizen_disapproval).forEach(([group, disapproval]) => {
        const groupSize = gameState.citizenGroups?.[group]?.size || 50000;
        const groupInfluence = gameState.citizenGroups?.[group]?.influence || 1;
        impact += (disapproval * groupSize * groupInfluence) / 1000000;
      });
    }
    
    if (option.benefits.citizen_approval) {
      Object.entries(option.benefits.citizen_approval).forEach(([group, approval]) => {
        const groupSize = gameState.citizenGroups?.[group]?.size || 50000;
        const groupInfluence = gameState.citizenGroups?.[group]?.influence || 1;
        impact += (approval * groupSize * groupInfluence) / 1000000;
      });
    }
    
    return impact;
  },

  // Проверка доступности опции
  checkAvailability: (option, gameState) => {
    const checks = {};
    
    // Проверка средств
    checks.funds = gameState.personalFinances?.personal_account >= option.cost;
    
    // Проверка уровня коррупции
    if (option.requirements.corruption_level_max) {
      checks.corruption = gameState.corruption_level <= option.requirements.corruption_level_max;
    } else {
      checks.corruption = true;
    }
    
    // Проверка минимальных средств
    if (option.requirements.min_personal_funds) {
      checks.min_funds = gameState.personalFinances?.personal_account >= option.requirements.min_personal_funds;
    } else {
      checks.min_funds = true;
    }
    
    checks.available = Object.values(checks).every(check => check);
    
    return checks;
  },

  // Расчет ежемесячных расходов
  calculateMonthlyExpenses: (recurringExpenses) => {
    return recurringExpenses.reduce((total, expense) => {
      const option = personalSpendingOptions.find(opt => opt.id === expense.optionId);
      return total + (option ? option.cost : 0);
    }, 0);
  },

  // Расчет стоимости активов
  calculateAssetValue: (assets, gameState) => {
    return assets.reduce((total, asset) => {
      let currentValue = asset.purchase_price;
      
      // Учитываем изменение стоимости
      if (asset.annual_appreciation) {
        const yearsOwned = (gameState.currentDate - asset.purchase_date) / (365 * 24 * 60 * 60 * 1000);
        currentValue += asset.annual_appreciation * yearsOwned;
      }
      
      return total + currentValue;
    }, 0);
  },

  // Генерация события расследования
  generateInvestigationEvent: (spendingHistory, gameState) => {
    const detectionRisk = personalSpendingHelpers.calculateDetectionRisk(spendingHistory, gameState);
    
    if (detectionRisk > 60 && Math.random() < 0.3) {
      const suspiciousSpending = spendingHistory
        .filter(spending => {
          const option = personalSpendingOptions.find(opt => opt.id === spending.optionId);
          return option && option.detection_probability > 30;
        })
        .sort((a, b) => b.amount - a.amount)[0];
      
      if (suspiciousSpending) {
        const option = personalSpendingOptions.find(opt => opt.id === suspiciousSpending.optionId);
        
        return {
          type: 'investigation',
          title: 'Расследование личных трат мэра',
          description: `СМИ обратили внимание на покупку: ${option.name}`,
          consequences: {
            media_attention: 30,
            corruption_suspicion: 25,
            rating_impact: -15
          },
          options: [
            {
              text: 'Объяснить законность покупки',
              consequences: { media_attention: -10, corruption_suspicion: -5 }
            },
            {
              text: 'Проигнорировать',
              consequences: { media_attention: 10, corruption_suspicion: 15 }
            },
            {
              text: 'Подкупить журналистов',
              cost: 5000000,
              consequences: { media_attention: -20, corruption_level: 10 }
            }
          ]
        };
      }
    }
    
    return null;
  },

  // Расчет качества жизни
  calculateLifestyleQuality: (assets, recurringExpenses) => {
    let quality = 50; // базовое качество
    
    // Влияние активов
    assets.forEach(asset => {
      const option = personalSpendingOptions.find(opt => opt.id === asset.optionId);
      if (option && option.benefits.lifestyle_quality) {
        quality += option.benefits.lifestyle_quality;
      }
    });
    
    // Влияние регулярных расходов
    recurringExpenses.forEach(expense => {
      const option = personalSpendingOptions.find(opt => opt.id === expense.optionId);
      if (option && option.benefits.lifestyle_quality) {
        quality += option.benefits.lifestyle_quality;
      }
    });
    
    return Math.min(100, quality);
  },

  // Расчет семейного счастья
  calculateFamilyHappiness: (spendingHistory, assets) => {
    let happiness = 50; // базовое счастье
    
    // Влияние всех трат на семью
    spendingHistory.forEach(spending => {
      const option = personalSpendingOptions.find(opt => opt.id === spending.optionId);
      if (option && option.benefits.family_happiness) {
        happiness += option.benefits.family_happiness * 0.5; // уменьшенное влияние от истории
      }
    });
    
    // Влияние активов
    assets.forEach(asset => {
      const option = personalSpendingOptions.find(opt => opt.id === asset.optionId);
      if (option && option.benefits.family_happiness) {
        happiness += option.benefits.family_happiness;
      }
    });
    
    return Math.min(100, happiness);
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
      [RiskLevels.VERY_LOW]: 'text-green-600',
      [RiskLevels.LOW]: 'text-green-500',
      [RiskLevels.MEDIUM]: 'text-yellow-600',
      [RiskLevels.HIGH]: 'text-orange-600',
      [RiskLevels.VERY_HIGH]: 'text-red-600'
    };
    return colors[riskLevel] || 'text-gray-600';
  },

  // Получение цвета фона риска
  getRiskBgColor: (riskLevel) => {
    const colors = {
      [RiskLevels.VERY_LOW]: 'bg-green-100 text-green-800',
      [RiskLevels.LOW]: 'bg-green-50 text-green-700',
      [RiskLevels.MEDIUM]: 'bg-yellow-100 text-yellow-800',
      [RiskLevels.HIGH]: 'bg-orange-100 text-orange-800',
      [RiskLevels.VERY_HIGH]: 'bg-red-100 text-red-800'
    };
    return colors[riskLevel] || 'bg-gray-100 text-gray-800';
  },

  // Рекомендации по тратам
  generateSpendingRecommendations: (gameState) => {
    const recommendations = [];
    
    const personalFinances = gameState.personalFinances || {};
    const personalAccount = personalFinances.personal_account || 0;
    const detectionRisk = personalSpendingHelpers.calculateDetectionRisk(
      gameState.personalSpendingState?.spendingHistory || [], 
      gameState
    );
    
    if (personalAccount > 100000000 && detectionRisk < 30) {
      recommendations.push({
        type: 'opportunity',
        title: 'Возможность крупных инвестиций',
        description: 'У вас достаточно средств для крупных инвестиций в недвижимость',
        suggested_options: ['moscow_apartment', 'country_house']
      });
    }
    
    if (gameState.mayorRating < 40) {
      recommendations.push({
        type: 'warning',
        title: 'Осторожность с тратами',
        description: 'При низком рейтинге лучше избегать заметных трат',
        avoid_categories: [SpendingCategories.LUXURY_GOODS, SpendingCategories.VEHICLES]
      });
    }
    
    if (detectionRisk > 60) {
      recommendations.push({
        type: 'danger',
        title: 'Высокий риск расследования',
        description: 'Рекомендуется временно воздержаться от крупных трат',
        suggested_actions: ['Благотворительность', 'Инвестиции в образование']
      });
    }
    
    if (gameState.familyHappiness < 40) {
      recommendations.push({
        type: 'family',
        title: 'Внимание к семье',
        description: 'Стоит потратиться на семью для улучшения отношений',
        suggested_options: ['children_education', 'luxury_vacation']
      });
    }
    
    return recommendations;
  },

  // Анализ портфеля активов
  analyzeAssetPortfolio: (assets) => {
    const analysis = {
      total_value: 0,
      diversification: {},
      risk_distribution: {},
      income_generating: 0,
      appreciation_potential: 0
    };
    
    assets.forEach(asset => {
      const option = personalSpendingOptions.find(opt => opt.id === asset.optionId);
      if (option) {
        analysis.total_value += asset.current_value || asset.purchase_price;
        
        // Диверсификация по категориям
        analysis.diversification[option.category] = 
          (analysis.diversification[option.category] || 0) + 1;
        
        // Распределение по рискам
        analysis.risk_distribution[option.risk_level] = 
          (analysis.risk_distribution[option.risk_level] || 0) + 1;
        
        // Доходные активы
        if (asset.monthly_income || option.benefits.monthly_income) {
          analysis.income_generating += asset.monthly_income || option.benefits.monthly_income;
        }
        
        // Потенциал роста
        if (asset.annual_appreciation || option.benefits.annual_appreciation) {
          analysis.appreciation_potential += asset.annual_appreciation || option.benefits.annual_appreciation;
        }
      }
    });
    
    return analysis;
  }
};

export default {
  SpendingCategories,
  SpendingCategoryLabels,
  RiskLevels,
  RiskLevelLabels,
  SpendingTypes,
  SpendingTypeLabels,
  personalSpendingOptions,
  initialPersonalSpendingState,
  personalSpendingHelpers
};
