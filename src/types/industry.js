// Типы и константы для развития промышленности

export const IndustryTypes = {
  MANUFACTURING: 'manufacturing',
  TECHNOLOGY: 'technology',
  AGRICULTURE: 'agriculture',
  ENERGY: 'energy',
  CHEMICAL: 'chemical',
  AUTOMOTIVE: 'automotive',
  TEXTILE: 'textile',
  FOOD_PROCESSING: 'food_processing',
  CONSTRUCTION_MATERIALS: 'construction_materials',
  LOGISTICS: 'logistics',
  MINING: 'mining',
  PHARMACEUTICALS: 'pharmaceuticals'
};

export const IndustryLabels = {
  [IndustryTypes.MANUFACTURING]: 'Машиностроение',
  [IndustryTypes.TECHNOLOGY]: 'Высокие технологии',
  [IndustryTypes.AGRICULTURE]: 'Агропромышленность',
  [IndustryTypes.ENERGY]: 'Энергетика',
  [IndustryTypes.CHEMICAL]: 'Химическая промышленность',
  [IndustryTypes.AUTOMOTIVE]: 'Автомобилестроение',
  [IndustryTypes.TEXTILE]: 'Текстильная промышленность',
  [IndustryTypes.FOOD_PROCESSING]: 'Пищевая промышленность',
  [IndustryTypes.CONSTRUCTION_MATERIALS]: 'Стройматериалы',
  [IndustryTypes.LOGISTICS]: 'Логистика и складирование',
  [IndustryTypes.MINING]: 'Добывающая промышленность',
  [IndustryTypes.PHARMACEUTICALS]: 'Фармацевтика'
};

export const ProjectTypes = {
  NEW_FACTORY: 'new_factory',
  MODERNIZATION: 'modernization',
  EXPANSION: 'expansion',
  TECHNOLOGY_UPGRADE: 'technology_upgrade',
  INFRASTRUCTURE: 'infrastructure',
  RESEARCH_CENTER: 'research_center',
  INDUSTRIAL_PARK: 'industrial_park',
  SPECIAL_ECONOMIC_ZONE: 'special_economic_zone'
};

export const ProjectTypeLabels = {
  [ProjectTypes.NEW_FACTORY]: 'Новый завод',
  [ProjectTypes.MODERNIZATION]: 'Модернизация',
  [ProjectTypes.EXPANSION]: 'Расширение производства',
  [ProjectTypes.TECHNOLOGY_UPGRADE]: 'Технологическое обновление',
  [ProjectTypes.INFRASTRUCTURE]: 'Инфраструктурный проект',
  [ProjectTypes.RESEARCH_CENTER]: 'Исследовательский центр',
  [ProjectTypes.INDUSTRIAL_PARK]: 'Промышленный парк',
  [ProjectTypes.SPECIAL_ECONOMIC_ZONE]: 'Особая экономическая зона'
};

export const ProjectStatus = {
  PLANNING: 'planning',
  APPROVAL: 'approval',
  CONSTRUCTION: 'construction',
  COMMISSIONING: 'commissioning',
  OPERATIONAL: 'operational',
  SUSPENDED: 'suspended',
  CANCELLED: 'cancelled'
};

export const ProjectStatusLabels = {
  [ProjectStatus.PLANNING]: 'Планирование',
  [ProjectStatus.APPROVAL]: 'Согласование',
  [ProjectStatus.CONSTRUCTION]: 'Строительство',
  [ProjectStatus.COMMISSIONING]: 'Ввод в эксплуатацию',
  [ProjectStatus.OPERATIONAL]: 'Действующий',
  [ProjectStatus.SUSPENDED]: 'Приостановлен',
  [ProjectStatus.CANCELLED]: 'Отменен'
};

export const KickbackTypes = {
  CONSTRUCTION: 'construction',
  PERMITS: 'permits',
  LAND_ALLOCATION: 'land_allocation',
  TAX_BENEFITS: 'tax_benefits',
  UTILITIES: 'utilities',
  LOGISTICS: 'logistics',
  EQUIPMENT: 'equipment',
  CONSULTING: 'consulting'
};

export const KickbackLabels = {
  [KickbackTypes.CONSTRUCTION]: 'Строительные работы',
  [KickbackTypes.PERMITS]: 'Разрешения и лицензии',
  [KickbackTypes.LAND_ALLOCATION]: 'Выделение земли',
  [KickbackTypes.TAX_BENEFITS]: 'Налоговые льготы',
  [KickbackTypes.UTILITIES]: 'Подключение коммуникаций',
  [KickbackTypes.LOGISTICS]: 'Логистические услуги',
  [KickbackTypes.EQUIPMENT]: 'Поставка оборудования',
  [KickbackTypes.CONSULTING]: 'Консалтинговые услуги'
};

// Данные промышленных проектов
export const industrialProjects = [
  // Машиностроение
  {
    id: 'bryansk_machinery_plant',
    name: 'Брянский машиностроительный завод',
    type: ProjectTypes.NEW_FACTORY,
    industry: IndustryTypes.MANUFACTURING,
    description: 'Современное производство промышленного оборудования и станков',
    totalCost: 3500000000,
    constructionTime: 24, // месяцы
    jobs: 1200,
    annualRevenue: 8000000000,
    taxRevenue: 400000000,
    environmentalImpact: -15,
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 8, amount: 280000000 },
      { type: KickbackTypes.PERMITS, percent: 15, amount: 52500000 },
      { type: KickbackTypes.LAND_ALLOCATION, percent: 12, amount: 42000000 },
      { type: KickbackTypes.EQUIPMENT, percent: 5, amount: 175000000 }
    ],
    requirements: {
      mayorRating: 60,
      infrastructure: 55,
      unemployment: 8
    },
    benefits: {
      unemployment: -12,
      infrastructure: 8,
      mayorRating: 15,
      industrialCapacity: 25
    },
    risks: [
      { type: 'environmental_protest', probability: 0.3, impact: -10 },
      { type: 'supply_chain_issues', probability: 0.2, impact: -5 },
      { type: 'labor_shortage', probability: 0.15, impact: -8 }
    ]
  },

  // Автомобилестроение
  {
    id: 'electric_vehicle_plant',
    name: 'Завод электромобилей "БрянскАвто"',
    type: ProjectTypes.NEW_FACTORY,
    industry: IndustryTypes.AUTOMOTIVE,
    description: 'Производство электромобилей в партнерстве с китайскими инвесторами',
    totalCost: 8000000000,
    constructionTime: 36,
    jobs: 2500,
    annualRevenue: 15000000000,
    taxRevenue: 750000000,
    environmentalImpact: 10, // положительное влияние
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 6, amount: 480000000 },
      { type: KickbackTypes.PERMITS, percent: 10, amount: 80000000 },
      { type: KickbackTypes.LAND_ALLOCATION, percent: 8, amount: 64000000 },
      { type: KickbackTypes.TAX_BENEFITS, percent: 20, amount: 150000000 },
      { type: KickbackTypes.UTILITIES, percent: 12, amount: 96000000 }
    ],
    requirements: {
      mayorRating: 70,
      infrastructure: 65,
      ecology: 40,
      education: 50
    },
    benefits: {
      unemployment: -20,
      infrastructure: 15,
      mayorRating: 25,
      ecology: 10,
      innovation: 20
    },
    risks: [
      { type: 'technology_transfer_issues', probability: 0.25, impact: -15 },
      { type: 'market_competition', probability: 0.3, impact: -10 },
      { type: 'regulatory_changes', probability: 0.2, impact: -12 }
    ]
  },

  // Высокие технологии
  {
    id: 'semiconductor_fab',
    name: 'Фабрика полупроводников "БрянскЧип"',
    type: ProjectTypes.NEW_FACTORY,
    industry: IndustryTypes.TECHNOLOGY,
    description: 'Производство микросхем и полупроводниковых компонентов',
    totalCost: 12000000000,
    constructionTime: 42,
    jobs: 800,
    annualRevenue: 20000000000,
    taxRevenue: 1000000000,
    environmentalImpact: -5,
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 4, amount: 480000000 },
      { type: KickbackTypes.PERMITS, percent: 8, amount: 96000000 },
      { type: KickbackTypes.EQUIPMENT, percent: 3, amount: 360000000 },
      { type: KickbackTypes.CONSULTING, percent: 15, amount: 180000000 }
    ],
    requirements: {
      mayorRating: 80,
      infrastructure: 75,
      education: 70,
      innovation: 60
    },
    benefits: {
      unemployment: -8,
      infrastructure: 20,
      mayorRating: 30,
      education: 15,
      innovation: 35
    },
    risks: [
      { type: 'high_tech_complexity', probability: 0.4, impact: -20 },
      { type: 'international_sanctions', probability: 0.15, impact: -30 },
      { type: 'talent_shortage', probability: 0.35, impact: -15 }
    ]
  },

  // Пищевая промышленность
  {
    id: 'food_processing_complex',
    name: 'Агропромышленный комплекс "Брянские продукты"',
    type: ProjectTypes.NEW_FACTORY,
    industry: IndustryTypes.FOOD_PROCESSING,
    description: 'Переработка сельхозпродукции и производство экологически чистых продуктов',
    totalCost: 2000000000,
    constructionTime: 18,
    jobs: 800,
    annualRevenue: 4500000000,
    taxRevenue: 225000000,
    environmentalImpact: 5,
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 10, amount: 200000000 },
      { type: KickbackTypes.PERMITS, percent: 12, amount: 24000000 },
      { type: KickbackTypes.LAND_ALLOCATION, percent: 15, amount: 30000000 },
      { type: KickbackTypes.UTILITIES, percent: 8, amount: 16000000 }
    ],
    requirements: {
      mayorRating: 50,
      infrastructure: 40,
      agriculture: 30
    },
    benefits: {
      unemployment: -8,
      infrastructure: 5,
      mayorRating: 12,
      agriculture: 15,
      happiness: 8
    },
    risks: [
      { type: 'food_safety_concerns', probability: 0.2, impact: -8 },
      { type: 'supply_volatility', probability: 0.25, impact: -6 },
      { type: 'market_saturation', probability: 0.15, impact: -5 }
    ]
  },

  // Химическая промышленность
  {
    id: 'chemical_plant',
    name: 'Химический завод "БрянскХим"',
    type: ProjectTypes.NEW_FACTORY,
    industry: IndustryTypes.CHEMICAL,
    description: 'Производство удобрений и химических реагентов',
    totalCost: 4500000000,
    constructionTime: 30,
    jobs: 600,
    annualRevenue: 9000000000,
    taxRevenue: 450000000,
    environmentalImpact: -25,
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 12, amount: 540000000 },
      { type: KickbackTypes.PERMITS, percent: 20, amount: 90000000 },
      { type: KickbackTypes.LAND_ALLOCATION, percent: 10, amount: 45000000 },
      { type: KickbackTypes.UTILITIES, percent: 15, amount: 67500000 }
    ],
    requirements: {
      mayorRating: 45,
      infrastructure: 50,
      ecology: 20 // низкие требования к экологии
    },
    benefits: {
      unemployment: -6,
      infrastructure: 10,
      mayorRating: 8,
      industrialCapacity: 20
    },
    risks: [
      { type: 'environmental_disaster', probability: 0.1, impact: -50 },
      { type: 'regulatory_shutdown', probability: 0.2, impact: -30 },
      { type: 'public_opposition', probability: 0.4, impact: -15 }
    ]
  },

  // Модернизация существующих предприятий
  {
    id: 'bmz_modernization',
    name: 'Модернизация Брянского машиностроительного завода',
    type: ProjectTypes.MODERNIZATION,
    industry: IndustryTypes.MANUFACTURING,
    description: 'Обновление оборудования и технологий на БМЗ',
    totalCost: 1500000000,
    constructionTime: 12,
    jobs: 300, // дополнительные рабочие места
    annualRevenue: 2500000000,
    taxRevenue: 125000000,
    environmentalImpact: 8, // улучшение экологии
    kickbackOpportunities: [
      { type: KickbackTypes.EQUIPMENT, percent: 8, amount: 120000000 },
      { type: KickbackTypes.CONSULTING, percent: 12, amount: 18000000 },
      { type: KickbackTypes.PERMITS, percent: 10, amount: 15000000 }
    ],
    requirements: {
      mayorRating: 55,
      infrastructure: 45
    },
    benefits: {
      unemployment: -3,
      infrastructure: 5,
      mayorRating: 10,
      ecology: 8,
      industrialCapacity: 15
    },
    risks: [
      { type: 'production_disruption', probability: 0.3, impact: -10 },
      { type: 'worker_resistance', probability: 0.2, impact: -5 }
    ]
  },

  // Промышленный парк
  {
    id: 'industrial_park_bryansk',
    name: 'Промышленный парк "Брянск-Индустрия"',
    type: ProjectTypes.INDUSTRIAL_PARK,
    industry: IndustryTypes.MANUFACTURING,
    description: 'Современный промышленный парк с готовой инфраструктурой',
    totalCost: 6000000000,
    constructionTime: 36,
    jobs: 3000,
    annualRevenue: 12000000000,
    taxRevenue: 600000000,
    environmentalImpact: -10,
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 7, amount: 420000000 },
      { type: KickbackTypes.LAND_ALLOCATION, percent: 15, amount: 90000000 },
      { type: KickbackTypes.UTILITIES, percent: 10, amount: 60000000 },
      { type: KickbackTypes.LOGISTICS, percent: 8, amount: 48000000 }
    ],
    requirements: {
      mayorRating: 65,
      infrastructure: 60,
      unemployment: 10
    },
    benefits: {
      unemployment: -25,
      infrastructure: 20,
      mayorRating: 20,
      industrialCapacity: 40
    },
    risks: [
      { type: 'tenant_shortage', probability: 0.25, impact: -15 },
      { type: 'infrastructure_overload', probability: 0.2, impact: -10 }
    ]
  },

  // Особая экономическая зона
  {
    id: 'sez_bryansk_tech',
    name: 'ОЭЗ "Брянск-Технополис"',
    type: ProjectTypes.SPECIAL_ECONOMIC_ZONE,
    industry: IndustryTypes.TECHNOLOGY,
    description: 'Особая экономическая зона для высокотехнологичных производств',
    totalCost: 10000000000,
    constructionTime: 48,
    jobs: 5000,
    annualRevenue: 25000000000,
    taxRevenue: 1250000000,
    environmentalImpact: 15,
    kickbackOpportunities: [
      { type: KickbackTypes.CONSTRUCTION, percent: 5, amount: 500000000 },
      { type: KickbackTypes.PERMITS, percent: 8, amount: 80000000 },
      { type: KickbackTypes.TAX_BENEFITS, percent: 25, amount: 312500000 },
      { type: KickbackTypes.CONSULTING, percent: 10, amount: 100000000 }
    ],
    requirements: {
      mayorRating: 75,
      infrastructure: 70,
      education: 65,
      innovation: 50
    },
    benefits: {
      unemployment: -40,
      infrastructure: 30,
      mayorRating: 35,
      education: 20,
      innovation: 50,
      internationalReputation: 25
    },
    risks: [
      { type: 'federal_approval_delay', probability: 0.3, impact: -20 },
      { type: 'international_competition', probability: 0.25, impact: -15 },
      { type: 'regulatory_complexity', probability: 0.4, impact: -10 }
    ]
  }
];

// Существующие предприятия Брянска
export const existingEnterprises = [
  {
    id: 'bmz',
    name: 'Брянский машиностроительный завод',
    industry: IndustryTypes.MANUFACTURING,
    employees: 8500,
    annualRevenue: 12000000000,
    taxContribution: 600000000,
    status: 'operational',
    modernizationNeeded: true,
    modernizationCost: 2000000000,
    modernizationBenefits: {
      efficiency: 25,
      jobs: 500,
      revenue: 3000000000,
      ecology: 15
    }
  },
  {
    id: 'bryansk_arsenal',
    name: 'Брянский арсенал',
    industry: IndustryTypes.MANUFACTURING,
    employees: 3200,
    annualRevenue: 5000000000,
    taxContribution: 250000000,
    status: 'operational',
    modernizationNeeded: true,
    modernizationCost: 800000000,
    modernizationBenefits: {
      efficiency: 20,
      jobs: 200,
      revenue: 1500000000,
      ecology: 10
    }
  },
  {
    id: 'bryansk_chemical',
    name: 'Брянский химический завод',
    industry: IndustryTypes.CHEMICAL,
    employees: 1800,
    annualRevenue: 3500000000,
    taxContribution: 175000000,
    status: 'operational',
    modernizationNeeded: true,
    modernizationCost: 1200000000,
    modernizationBenefits: {
      efficiency: 30,
      jobs: 150,
      revenue: 2000000000,
      ecology: 25 // значительное улучшение экологии
    }
  }
];

// Начальное состояние промышленности
export const initialIndustryState = {
  // Активные проекты
  activeProjects: [],
  
  // Завершенные проекты
  completedProjects: [],
  
  // Существующие предприятия
  enterprises: existingEnterprises,
  
  // Общие показатели
  industryMetrics: {
    totalEmployment: 13500,
    totalRevenue: 20500000000,
    totalTaxRevenue: 1025000000,
    industrialCapacity: 45,
    environmentalImpact: -20
  },
  
  // Полученные откаты
  kickbacks: {
    total: 0,
    byType: {},
    byProject: {},
    history: []
  },
  
  // Настройки
  industrySettings: {
    environmentalStandards: 'medium',
    laborProtection: 'standard',
    taxIncentives: 'moderate',
    foreignInvestment: 'welcome'
  }
};

// Утилиты для промышленности
export const industryHelpers = {
  // Расчет общего откатного потенциала проекта
  calculateTotalKickback: (project) => {
    return project.kickbackOpportunities.reduce((total, kickback) => {
      return total + kickback.amount;
    }, 0);
  },

  // Проверка возможности реализации проекта
  canImplementProject: (project, gameState) => {
    // Проверка требований
    if (project.requirements) {
      for (const [requirement, minValue] of Object.entries(project.requirements)) {
        if (gameState[requirement] < minValue) {
          return { 
            canImplement: false, 
            reason: `Требуется ${requirement}: ${minValue} (текущее: ${gameState[requirement]})` 
          };
        }
      }
    }
    
    // Проверка бюджета
    const availableBudget = gameState.financeState?.cityBudget?.total || 0;
    if (project.totalCost > availableBudget) {
      return { 
        canImplement: false, 
        reason: 'Недостаточно средств в городском бюджете' 
      };
    }
    
    // Проверка экологических ограничений
    if (project.environmentalImpact < -30 && gameState.ecology > 70) {
      return { 
        canImplement: false, 
        reason: 'Проект не соответствует экологическим стандартам' 
      };
    }
    
    return { canImplement: true };
  },

  // Расчет влияния проекта на город
  calculateProjectImpact: (project, gameState) => {
    const impact = { ...project.benefits };
    
    // Корректировка на основе текущего состояния
    if (gameState.unemployment > 15) {
      impact.unemployment = Math.min(impact.unemployment * 1.2, impact.unemployment - 5);
    }
    
    if (gameState.infrastructure < 50) {
      impact.infrastructure = Math.max(impact.infrastructure * 0.8, impact.infrastructure - 3);
    }
    
    return impact;
  },

  // Симуляция прогресса строительства
  simulateConstructionProgress: (project, monthsPassed) => {
    const totalMonths = project.constructionTime;
    const progressPercent = Math.min(100, (monthsPassed / totalMonths) * 100);
    
    // Определение текущей фазы
    let currentPhase = 'planning';
    if (progressPercent >= 10) currentPhase = 'permits';
    if (progressPercent >= 25) currentPhase = 'foundation';
    if (progressPercent >= 50) currentPhase = 'construction';
    if (progressPercent >= 80) currentPhase = 'equipment';
    if (progressPercent >= 95) currentPhase = 'commissioning';
    if (progressPercent >= 100) currentPhase = 'operational';
    
    return {
      progressPercent,
      currentPhase,
      isCompleted: progressPercent >= 100,
      remainingMonths: Math.max(0, totalMonths - monthsPassed)
    };
  },

  // Генерация случайных событий для проектов
  generateProjectEvent: (project) => {
    const applicableRisks = project.risks.filter(risk => Math.random() < risk.probability);
    
    if (applicableRisks.length > 0) {
      return applicableRisks[Math.floor(Math.random() * applicableRisks.length)];
    }
    
    // Положительные события
    const positiveEvents = [
      {
        type: 'early_completion',
        title: 'Досрочное завершение',
        description: 'Строительство идет быстрее запланированного',
        impact: 5
      },
      {
        type: 'cost_savings',
        title: 'Экономия средств',
        description: 'Удалось сэкономить на строительстве',
        impact: 8
      },
      {
        type: 'additional_investor',
        title: 'Дополнительный инвестор',
        description: 'К проекту присоединился новый инвестор',
        impact: 12
      }
    ];
    
    if (Math.random() < 0.1) {
      return positiveEvents[Math.floor(Math.random() * positiveEvents.length)];
    }
    
    return null;
  },

  // Расчет эффективности модернизации
  calculateModernizationROI: (enterprise, modernizationCost) => {
    const benefits = enterprise.modernizationBenefits;
    const additionalRevenue = benefits.revenue || 0;
    const paybackPeriod = modernizationCost / (additionalRevenue * 0.1); // 10% прибыль
    
    return {
      paybackPeriod: paybackPeriod / 12, // в годах
      roi: (additionalRevenue * 5 - modernizationCost) / modernizationCost * 100, // ROI за 5 лет
      additionalJobs: benefits.jobs || 0,
      efficiencyGain: benefits.efficiency || 0
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

  // Получение цвета статуса проекта
  getStatusColor: (status) => {
    const colors = {
      [ProjectStatus.PLANNING]: 'bg-blue-100 text-blue-800',
      [ProjectStatus.APPROVAL]: 'bg-yellow-100 text-yellow-800',
      [ProjectStatus.CONSTRUCTION]: 'bg-orange-100 text-orange-800',
      [ProjectStatus.COMMISSIONING]: 'bg-purple-100 text-purple-800',
      [ProjectStatus.OPERATIONAL]: 'bg-green-100 text-green-800',
      [ProjectStatus.SUSPENDED]: 'bg-gray-100 text-gray-800',
      [ProjectStatus.CANCELLED]: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  },

  // Получение иконки отрасли
  getIndustryIcon: (industry) => {
    const icons = {
      [IndustryTypes.MANUFACTURING]: '🏭',
      [IndustryTypes.TECHNOLOGY]: '💻',
      [IndustryTypes.AGRICULTURE]: '🌾',
      [IndustryTypes.ENERGY]: '⚡',
      [IndustryTypes.CHEMICAL]: '⚗️',
      [IndustryTypes.AUTOMOTIVE]: '🚗',
      [IndustryTypes.TEXTILE]: '🧵',
      [IndustryTypes.FOOD_PROCESSING]: '🍞',
      [IndustryTypes.CONSTRUCTION_MATERIALS]: '🧱',
      [IndustryTypes.LOGISTICS]: '🚛',
      [IndustryTypes.MINING]: '⛏️',
      [IndustryTypes.PHARMACEUTICALS]: '💊'
    };
    return icons[industry] || '🏢';
  },

  // Расчет коррупционного риска
  calculateCorruptionRisk: (kickbackAmount, projectCost) => {
    const kickbackPercent = (kickbackAmount / projectCost) * 100;
    
    if (kickbackPercent > 15) return 'high';
    if (kickbackPercent > 8) return 'medium';
    if (kickbackPercent > 3) return 'low';
    return 'minimal';
  },

  // Генерация предложений по откатам
  generateKickbackProposals: (project) => {
    return project.kickbackOpportunities.map(kickback => ({
      ...kickback,
      risk: industryHelpers.calculateCorruptionRisk(kickback.amount, project.totalCost),
      description: `${KickbackLabels[kickback.type]} - ${kickback.percent}% от стоимости`,
      consequences: {
        detection_probability: kickback.percent * 0.02, // 2% за каждый процент
        reputation_impact: -kickback.percent * 0.5,
        investigation_risk: kickback.percent > 10 ? 'high' : 'low'
      }
    }));
  }
};

export default {
  IndustryTypes,
  IndustryLabels,
  ProjectTypes,
  ProjectTypeLabels,
  ProjectStatus,
  ProjectStatusLabels,
  KickbackTypes,
  KickbackLabels,
  industrialProjects,
  existingEnterprises,
  initialIndustryState,
  industryHelpers
};
