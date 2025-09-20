// Типы и константы для управления силовыми структурами

export const SecurityAgencies = {
  POLICE: 'police',
  FSB: 'fsb',
  PROSECUTOR: 'prosecutor',
  INVESTIGATIVE_COMMITTEE: 'investigative_committee',
  ROSGVARDIA: 'rosgvardia',
  EMERGENCY_MINISTRY: 'emergency_ministry',
  CUSTOMS: 'customs',
  TAX_SERVICE: 'tax_service',
  ANTI_CORRUPTION: 'anti_corruption'
};

export const SecurityAgencyLabels = {
  [SecurityAgencies.POLICE]: 'МВД (Полиция)',
  [SecurityAgencies.FSB]: 'ФСБ',
  [SecurityAgencies.PROSECUTOR]: 'Прокуратура',
  [SecurityAgencies.INVESTIGATIVE_COMMITTEE]: 'Следственный комитет',
  [SecurityAgencies.ROSGVARDIA]: 'Росгвардия',
  [SecurityAgencies.EMERGENCY_MINISTRY]: 'МЧС',
  [SecurityAgencies.CUSTOMS]: 'Таможенная служба',
  [SecurityAgencies.TAX_SERVICE]: 'Налоговая служба',
  [SecurityAgencies.ANTI_CORRUPTION]: 'Антикоррупционное управление'
};

export const InfluenceLevels = {
  HOSTILE: 'hostile',
  UNFRIENDLY: 'unfriendly',
  NEUTRAL: 'neutral',
  FRIENDLY: 'friendly',
  CONTROLLED: 'controlled'
};

export const InfluenceLevelLabels = {
  [InfluenceLevels.HOSTILE]: 'Враждебные',
  [InfluenceLevels.UNFRIENDLY]: 'Недружелюбные',
  [InfluenceLevels.NEUTRAL]: 'Нейтральные',
  [InfluenceLevels.FRIENDLY]: 'Дружелюбные',
  [InfluenceLevels.CONTROLLED]: 'Под контролем'
};

export const OperationTypes = {
  BRIBE: 'bribe',
  BLACKMAIL: 'blackmail',
  FAVOR: 'favor',
  APPOINTMENT: 'appointment',
  INVESTIGATION_STOP: 'investigation_stop',
  CASE_DISMISSAL: 'case_dismissal',
  PROTECTION: 'protection',
  INFORMATION: 'information'
};

export const OperationTypeLabels = {
  [OperationTypes.BRIBE]: 'Взятка',
  [OperationTypes.BLACKMAIL]: 'Шантаж',
  [OperationTypes.FAVOR]: 'Услуга',
  [OperationTypes.APPOINTMENT]: 'Назначение',
  [OperationTypes.INVESTIGATION_STOP]: 'Остановка расследования',
  [OperationTypes.CASE_DISMISSAL]: 'Закрытие дела',
  [OperationTypes.PROTECTION]: 'Защита',
  [OperationTypes.INFORMATION]: 'Получение информации'
};

export const ThreatLevels = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const ThreatLevelLabels = {
  [ThreatLevels.LOW]: 'Низкий',
  [ThreatLevels.MEDIUM]: 'Средний',
  [ThreatLevels.HIGH]: 'Высокий',
  [ThreatLevels.CRITICAL]: 'Критический'
};

// Данные силовых структур
export const securityAgenciesData = [
  {
    id: 'bryansk_police',
    agency: SecurityAgencies.POLICE,
    name: 'УМВД по Брянской области',
    head: {
      name: 'Генерал-майор Сергей Петрович Волков',
      position: 'Начальник УМВД',
      loyalty: 45,
      corruptibility: 60,
      competence: 70,
      connections: 65,
      background: 'Служит в МВД 25 лет, имеет связи в Москве'
    },
    influence: InfluenceLevels.NEUTRAL,
    budget: 2500000000,
    personnel: 8500,
    capabilities: [
      'Уголовные расследования',
      'Охрана общественного порядка',
      'Борьба с преступностью',
      'Дорожная полиция',
      'Экономическая безопасность'
    ],
    currentInvestigations: [
      {
        id: 'corruption_case_1',
        name: 'Дело о коррупции в мэрии',
        target: 'Городская администрация',
        progress: 25,
        threat: ThreatLevels.HIGH,
        canInfluence: true,
        cost: 50000000
      },
      {
        id: 'business_case_1',
        name: 'Налоговые нарушения ООО "СтройИнвест"',
        target: 'Строительная компания',
        progress: 60,
        threat: ThreatLevels.MEDIUM,
        canInfluence: true,
        cost: 25000000
      }
    ],
    availableOperations: [
      {
        type: OperationTypes.BRIBE,
        cost: 30000000,
        success_rate: 70,
        consequences: { loyalty: 15, corruption_risk: 20 }
      },
      {
        type: OperationTypes.FAVOR,
        cost: 10000000,
        success_rate: 85,
        consequences: { loyalty: 8, corruption_risk: 5 }
      },
      {
        type: OperationTypes.APPOINTMENT,
        cost: 100000000,
        success_rate: 40,
        consequences: { loyalty: 30, corruption_risk: 40 }
      }
    ]
  },

  {
    id: 'bryansk_fsb',
    agency: SecurityAgencies.FSB,
    name: 'УФСБ по Брянской области',
    head: {
      name: 'Полковник Александр Иванович Морозов',
      position: 'Начальник УФСБ',
      loyalty: 30,
      corruptibility: 25,
      competence: 85,
      connections: 80,
      background: 'Кадровый чекист, имеет связи в центральном аппарате ФСБ'
    },
    influence: InfluenceLevels.UNFRIENDLY,
    budget: 1800000000,
    personnel: 1200,
    capabilities: [
      'Контрразведка',
      'Борьба с терроризмом',
      'Экономическая безопасность',
      'Защита государственной тайны',
      'Оперативно-розыскная деятельность'
    ],
    currentInvestigations: [
      {
        id: 'federal_case_1',
        name: 'Проверка федеральных контрактов',
        target: 'Городские подрядчики',
        progress: 40,
        threat: ThreatLevels.CRITICAL,
        canInfluence: false,
        cost: 200000000
      }
    ],
    availableOperations: [
      {
        type: OperationTypes.INFORMATION,
        cost: 50000000,
        success_rate: 60,
        consequences: { loyalty: 5, corruption_risk: 30 }
      },
      {
        type: OperationTypes.PROTECTION,
        cost: 150000000,
        success_rate: 30,
        consequences: { loyalty: 20, corruption_risk: 50 }
      }
    ]
  },

  {
    id: 'bryansk_prosecutor',
    agency: SecurityAgencies.PROSECUTOR,
    name: 'Прокуратура Брянской области',
    head: {
      name: 'Государственный советник юстиции 3 класса Елена Викторовна Кузнецова',
      position: 'Прокурор области',
      loyalty: 55,
      corruptibility: 40,
      competence: 80,
      connections: 70,
      background: 'Работает в прокуратуре 20 лет, известна принципиальностью'
    },
    influence: InfluenceLevels.NEUTRAL,
    budget: 800000000,
    personnel: 450,
    capabilities: [
      'Надзор за исполнением законов',
      'Уголовное преследование',
      'Антикоррупционная деятельность',
      'Защита прав граждан',
      'Надзор за следствием'
    ],
    currentInvestigations: [
      {
        id: 'procurement_case',
        name: 'Нарушения в госзакупках',
        target: 'Городские закупки',
        progress: 70,
        threat: ThreatLevels.HIGH,
        canInfluence: true,
        cost: 75000000
      }
    ],
    availableOperations: [
      {
        type: OperationTypes.CASE_DISMISSAL,
        cost: 80000000,
        success_rate: 50,
        consequences: { loyalty: 10, corruption_risk: 35 }
      },
      {
        type: OperationTypes.FAVOR,
        cost: 20000000,
        success_rate: 75,
        consequences: { loyalty: 12, corruption_risk: 10 }
      }
    ]
  },

  {
    id: 'bryansk_investigative',
    agency: SecurityAgencies.INVESTIGATIVE_COMMITTEE,
    name: 'СУ СК России по Брянской области',
    head: {
      name: 'Полковник юстиции Дмитрий Алексеевич Соколов',
      position: 'Руководитель СУ СК',
      loyalty: 40,
      corruptibility: 35,
      competence: 75,
      connections: 60,
      background: 'Опытный следователь, ведет резонансные дела'
    },
    influence: InfluenceLevels.NEUTRAL,
    budget: 600000000,
    personnel: 280,
    capabilities: [
      'Расследование тяжких преступлений',
      'Коррупционные дела',
      'Экономические преступления',
      'Должностные преступления',
      'Следственные действия'
    ],
    currentInvestigations: [
      {
        id: 'embezzlement_case',
        name: 'Растрата бюджетных средств',
        target: 'Городской бюджет',
        progress: 35,
        threat: ThreatLevels.HIGH,
        canInfluence: true,
        cost: 100000000
      }
    ],
    availableOperations: [
      {
        type: OperationTypes.INVESTIGATION_STOP,
        cost: 120000000,
        success_rate: 45,
        consequences: { loyalty: 15, corruption_risk: 45 }
      }
    ]
  },

  {
    id: 'bryansk_rosgvardia',
    agency: SecurityAgencies.ROSGVARDIA,
    name: 'Управление Росгвардии по Брянской области',
    head: {
      name: 'Полковник Игорь Сергеевич Белов',
      position: 'Начальник управления',
      loyalty: 65,
      corruptibility: 50,
      competence: 70,
      connections: 55,
      background: 'Бывший спецназовец, лоялен к власти'
    },
    influence: InfluenceLevels.FRIENDLY,
    budget: 1200000000,
    personnel: 2800,
    capabilities: [
      'Охрана общественного порядка',
      'Борьба с экстремизмом',
      'Охрана объектов',
      'Специальные операции',
      'Контроль за оружием'
    ],
    currentInvestigations: [],
    availableOperations: [
      {
        type: OperationTypes.PROTECTION,
        cost: 40000000,
        success_rate: 90,
        consequences: { loyalty: 20, corruption_risk: 15 }
      },
      {
        type: OperationTypes.FAVOR,
        cost: 15000000,
        success_rate: 95,
        consequences: { loyalty: 10, corruption_risk: 5 }
      }
    ]
  },

  {
    id: 'bryansk_mchs',
    agency: SecurityAgencies.EMERGENCY_MINISTRY,
    name: 'ГУ МЧС России по Брянской области',
    head: {
      name: 'Полковник внутренней службы Андрей Владимирович Орлов',
      position: 'Начальник ГУ МЧС',
      loyalty: 70,
      corruptibility: 30,
      competence: 85,
      connections: 50,
      background: 'Профессиональный спасатель, пользуется уважением'
    },
    influence: InfluenceLevels.FRIENDLY,
    budget: 900000000,
    personnel: 1500,
    capabilities: [
      'Чрезвычайные ситуации',
      'Пожарная безопасность',
      'Спасательные операции',
      'Гражданская оборона',
      'Профилактика ЧС'
    ],
    currentInvestigations: [],
    availableOperations: [
      {
        type: OperationTypes.FAVOR,
        cost: 25000000,
        success_rate: 85,
        consequences: { loyalty: 15, corruption_risk: 8 }
      }
    ]
  },

  {
    id: 'bryansk_tax',
    agency: SecurityAgencies.TAX_SERVICE,
    name: 'УФНС России по Брянской области',
    head: {
      name: 'Наталья Петровна Васильева',
      position: 'Руководитель УФНС',
      loyalty: 50,
      corruptibility: 55,
      competence: 75,
      connections: 60,
      background: 'Опытный налоговик, знает все схемы'
    },
    influence: InfluenceLevels.NEUTRAL,
    budget: 400000000,
    personnel: 800,
    capabilities: [
      'Налоговые проверки',
      'Взыскание задолженности',
      'Камеральные проверки',
      'Выездные проверки',
      'Налоговые расследования'
    ],
    currentInvestigations: [
      {
        id: 'tax_evasion_case',
        name: 'Уклонение от налогов крупных предприятий',
        target: 'Городские предприятия',
        progress: 50,
        threat: ThreatLevels.MEDIUM,
        canInfluence: true,
        cost: 60000000
      }
    ],
    availableOperations: [
      {
        type: OperationTypes.BRIBE,
        cost: 45000000,
        success_rate: 80,
        consequences: { loyalty: 20, corruption_risk: 25 }
      },
      {
        type: OperationTypes.FAVOR,
        cost: 18000000,
        success_rate: 90,
        consequences: { loyalty: 12, corruption_risk: 8 }
      }
    ]
  }
];

// Типы угроз и рисков
export const securityThreats = [
  {
    id: 'corruption_investigation',
    name: 'Антикоррупционное расследование',
    description: 'ФСБ и прокуратура проводят проверку коррупционных схем в мэрии',
    threat_level: ThreatLevels.CRITICAL,
    probability: 0.15,
    consequences: {
      mayorRating: -30,
      corruption_exposure: 80,
      criminal_case: true
    },
    mitigation_options: [
      {
        type: 'cover_up',
        cost: 500000000,
        success_rate: 40,
        description: 'Попытаться замять дело'
      },
      {
        type: 'scapegoat',
        cost: 100000000,
        success_rate: 70,
        description: 'Найти козла отпущения'
      }
    ]
  },
  {
    id: 'federal_audit',
    name: 'Федеральная проверка',
    description: 'Счетная палата проверяет расходование федеральных средств',
    threat_level: ThreatLevels.HIGH,
    probability: 0.25,
    consequences: {
      mayorRating: -15,
      budget_freeze: true,
      federal_attention: true
    }
  },
  {
    id: 'media_investigation',
    name: 'Журналистское расследование',
    description: 'СМИ готовят материал о коррупции в городской власти',
    threat_level: ThreatLevels.MEDIUM,
    probability: 0.3,
    consequences: {
      mayorRating: -20,
      public_attention: true,
      investigation_trigger: true
    }
  }
];

// Начальное состояние безопасности
export const initialSecurityState = {
  // Состояние агентств
  agencies: securityAgenciesData.reduce((acc, agency) => {
    acc[agency.id] = {
      ...agency,
      lastInteraction: null,
      totalBribes: 0,
      operationHistory: []
    };
    return acc;
  }, {}),
  
  // Активные угрозы
  activeThreats: [],
  
  // Общие показатели безопасности
  securityMetrics: {
    overallThreatLevel: ThreatLevels.MEDIUM,
    corruptionRisk: 45,
    investigationProbability: 20,
    protectionLevel: 60
  },
  
  // История операций
  operationHistory: [],
  
  // Компромат и информация
  intelligence: {
    onOfficials: [],
    onBusinessmen: [],
    onJournalists: []
  },
  
  // Настройки безопасности
  securitySettings: {
    paranoia_level: 'medium',
    counter_intelligence: true,
    information_control: false
  }
};

// Утилиты для работы с силовыми структурами
export const securityHelpers = {
  // Расчет общего уровня влияния
  calculateOverallInfluence: (agencies) => {
    const influences = Object.values(agencies).map(agency => {
      const influenceScore = {
        [InfluenceLevels.HOSTILE]: -2,
        [InfluenceLevels.UNFRIENDLY]: -1,
        [InfluenceLevels.NEUTRAL]: 0,
        [InfluenceLevels.FRIENDLY]: 1,
        [InfluenceLevels.CONTROLLED]: 2
      };
      return influenceScore[agency.influence] || 0;
    });
    
    const average = influences.reduce((sum, score) => sum + score, 0) / influences.length;
    
    if (average >= 1.5) return InfluenceLevels.CONTROLLED;
    if (average >= 0.5) return InfluenceLevels.FRIENDLY;
    if (average >= -0.5) return InfluenceLevels.NEUTRAL;
    if (average >= -1.5) return InfluenceLevels.UNFRIENDLY;
    return InfluenceLevels.HOSTILE;
  },

  // Расчет вероятности успеха операции
  calculateOperationSuccess: (operation, agency, gameState) => {
    let baseRate = operation.success_rate;
    
    // Корректировка на основе лояльности руководителя
    const loyaltyBonus = (agency.head.loyalty - 50) * 0.3;
    baseRate += loyaltyBonus;
    
    // Корректировка на основе коррумпированности
    if (operation.type === OperationTypes.BRIBE) {
      const corruptibilityBonus = (agency.head.corruptibility - 50) * 0.4;
      baseRate += corruptibilityBonus;
    }
    
    // Корректировка на основе рейтинга мэра
    const ratingBonus = (gameState.mayorRating - 50) * 0.2;
    baseRate += ratingBonus;
    
    // Корректировка на основе предыдущих взаимодействий
    if (agency.totalBribes > 100000000) {
      baseRate += 10; // легче работать с уже коррумпированными
    }
    
    return Math.max(5, Math.min(95, baseRate));
  },

  // Расчет риска расследования
  calculateInvestigationRisk: (gameState) => {
    let risk = 0;
    
    // Базовый риск от коррупции
    risk += (gameState.corruption || 0) * 0.3;
    
    // Риск от низкого рейтинга
    if (gameState.mayorRating < 40) {
      risk += 20;
    }
    
    // Риск от крупных откатов
    const totalKickbacks = gameState.industryState?.kickbacks?.total || 0;
    if (totalKickbacks > 1000000000) {
      risk += 15;
    }
    
    // Риск от враждебных силовиков
    const hostileAgencies = Object.values(gameState.securityState?.agencies || {})
      .filter(agency => agency.influence === InfluenceLevels.HOSTILE).length;
    risk += hostileAgencies * 10;
    
    return Math.min(100, risk);
  },

  // Генерация случайных угроз
  generateRandomThreat: (gameState) => {
    const investigationRisk = securityHelpers.calculateInvestigationRisk(gameState);
    const threshold = investigationRisk / 100;
    
    const availableThreats = securityThreats.filter(threat => 
      Math.random() < threat.probability * threshold
    );
    
    return availableThreats.length > 0 ? 
      availableThreats[Math.floor(Math.random() * availableThreats.length)] : null;
  },

  // Расчет стоимости операции с учетом инфляции влияния
  calculateOperationCost: (operation, agency) => {
    let baseCost = operation.cost;
    
    // Увеличение стоимости при повторных операциях
    const operationCount = agency.operationHistory?.filter(op => op.type === operation.type).length || 0;
    const inflationMultiplier = 1 + (operationCount * 0.2);
    
    return Math.floor(baseCost * inflationMultiplier);
  },

  // Получение цвета уровня влияния
  getInfluenceColor: (influence) => {
    const colors = {
      [InfluenceLevels.HOSTILE]: 'text-red-600',
      [InfluenceLevels.UNFRIENDLY]: 'text-orange-600',
      [InfluenceLevels.NEUTRAL]: 'text-gray-600',
      [InfluenceLevels.FRIENDLY]: 'text-green-600',
      [InfluenceLevels.CONTROLLED]: 'text-blue-600'
    };
    return colors[influence] || 'text-gray-600';
  },

  // Получение цвета уровня угрозы
  getThreatColor: (threat) => {
    const colors = {
      [ThreatLevels.LOW]: 'text-green-600',
      [ThreatLevels.MEDIUM]: 'text-yellow-600',
      [ThreatLevels.HIGH]: 'text-orange-600',
      [ThreatLevels.CRITICAL]: 'text-red-600'
    };
    return colors[threat] || 'text-gray-600';
  },

  // Получение иконки агентства
  getAgencyIcon: (agency) => {
    const icons = {
      [SecurityAgencies.POLICE]: '👮',
      [SecurityAgencies.FSB]: '🕵️',
      [SecurityAgencies.PROSECUTOR]: '⚖️',
      [SecurityAgencies.INVESTIGATIVE_COMMITTEE]: '🔍',
      [SecurityAgencies.ROSGVARDIA]: '🛡️',
      [SecurityAgencies.EMERGENCY_MINISTRY]: '🚒',
      [SecurityAgencies.CUSTOMS]: '🛃',
      [SecurityAgencies.TAX_SERVICE]: '💰',
      [SecurityAgencies.ANTI_CORRUPTION]: '🚫'
    };
    return icons[agency] || '🏛️';
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

  // Расчет эффективности защиты
  calculateProtectionLevel: (agencies) => {
    const friendlyAgencies = Object.values(agencies).filter(agency => 
      agency.influence === InfluenceLevels.FRIENDLY || agency.influence === InfluenceLevels.CONTROLLED
    );
    
    const totalBudget = Object.values(agencies).reduce((sum, agency) => sum + agency.budget, 0);
    const friendlyBudget = friendlyAgencies.reduce((sum, agency) => sum + agency.budget, 0);
    
    return Math.floor((friendlyBudget / totalBudget) * 100);
  }
};

export default {
  SecurityAgencies,
  SecurityAgencyLabels,
  InfluenceLevels,
  InfluenceLevelLabels,
  OperationTypes,
  OperationTypeLabels,
  ThreatLevels,
  ThreatLevelLabels,
  securityAgenciesData,
  securityThreats,
  initialSecurityState,
  securityHelpers
};
