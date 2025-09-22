// Типы и константы для системы строительства и ЖКХ

export const ConstructionTypes = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  INDUSTRIAL: 'industrial',
  INFRASTRUCTURE: 'infrastructure',
  PUBLIC: 'public',
  RECREATIONAL: 'recreational',
  TRANSPORT: 'transport',
  UTILITIES: 'utilities'
};

export const ConstructionTypeLabels = {
  [ConstructionTypes.RESIDENTIAL]: 'Жилое строительство',
  [ConstructionTypes.COMMERCIAL]: 'Коммерческое строительство',
  [ConstructionTypes.INDUSTRIAL]: 'Промышленное строительство',
  [ConstructionTypes.INFRASTRUCTURE]: 'Инфраструктура',
  [ConstructionTypes.PUBLIC]: 'Общественные здания',
  [ConstructionTypes.RECREATIONAL]: 'Рекреационные объекты',
  [ConstructionTypes.TRANSPORT]: 'Транспортная инфраструктура',
  [ConstructionTypes.UTILITIES]: 'Коммунальная инфраструктура'
};

export const BuildingCategories = {
  APARTMENT_COMPLEX: 'apartment_complex',
  PRIVATE_HOUSES: 'private_houses',
  SHOPPING_CENTER: 'shopping_center',
  OFFICE_BUILDING: 'office_building',
  FACTORY: 'factory',
  WAREHOUSE: 'warehouse',
  SCHOOL: 'school',
  HOSPITAL: 'hospital',
  KINDERGARTEN: 'kindergarten',
  LIBRARY: 'library',
  SPORTS_COMPLEX: 'sports_complex',
  PARK: 'park',
  ROAD: 'road',
  BRIDGE: 'bridge',
  WATER_TREATMENT: 'water_treatment',
  POWER_PLANT: 'power_plant',
  WASTE_FACILITY: 'waste_facility'
};

export const BuildingCategoryLabels = {
  [BuildingCategories.APARTMENT_COMPLEX]: 'Жилой комплекс',
  [BuildingCategories.PRIVATE_HOUSES]: 'Частные дома',
  [BuildingCategories.SHOPPING_CENTER]: 'Торговый центр',
  [BuildingCategories.OFFICE_BUILDING]: 'Офисное здание',
  [BuildingCategories.FACTORY]: 'Завод',
  [BuildingCategories.WAREHOUSE]: 'Склад',
  [BuildingCategories.SCHOOL]: 'Школа',
  [BuildingCategories.HOSPITAL]: 'Больница',
  [BuildingCategories.KINDERGARTEN]: 'Детский сад',
  [BuildingCategories.LIBRARY]: 'Библиотека',
  [BuildingCategories.SPORTS_COMPLEX]: 'Спортивный комплекс',
  [BuildingCategories.PARK]: 'Парк',
  [BuildingCategories.ROAD]: 'Дорога',
  [BuildingCategories.BRIDGE]: 'Мост',
  [BuildingCategories.WATER_TREATMENT]: 'Очистные сооружения',
  [BuildingCategories.POWER_PLANT]: 'Электростанция',
  [BuildingCategories.WASTE_FACILITY]: 'Мусороперерабатывающий завод'
};

export const UtilityTypes = {
  WATER_SUPPLY: 'water_supply',
  SEWERAGE: 'sewerage',
  HEATING: 'heating',
  ELECTRICITY: 'electricity',
  GAS: 'gas',
  INTERNET: 'internet',
  WASTE_MANAGEMENT: 'waste_management',
  STREET_LIGHTING: 'street_lighting'
};

export const UtilityTypeLabels = {
  [UtilityTypes.WATER_SUPPLY]: 'Водоснабжение',
  [UtilityTypes.SEWERAGE]: 'Канализация',
  [UtilityTypes.HEATING]: 'Отопление',
  [UtilityTypes.ELECTRICITY]: 'Электроснабжение',
  [UtilityTypes.GAS]: 'Газоснабжение',
  [UtilityTypes.INTERNET]: 'Интернет',
  [UtilityTypes.WASTE_MANAGEMENT]: 'Управление отходами',
  [UtilityTypes.STREET_LIGHTING]: 'Уличное освещение'
};

export const ConstructionPhases = {
  PLANNING: 'planning',
  PERMITS: 'permits',
  FOUNDATION: 'foundation',
  CONSTRUCTION: 'construction',
  FINISHING: 'finishing',
  COMMISSIONING: 'commissioning',
  COMPLETED: 'completed'
};

export const ConstructionPhaseLabels = {
  [ConstructionPhases.PLANNING]: 'Планирование',
  [ConstructionPhases.PERMITS]: 'Получение разрешений',
  [ConstructionPhases.FOUNDATION]: 'Фундамент',
  [ConstructionPhases.CONSTRUCTION]: 'Строительство',
  [ConstructionPhases.FINISHING]: 'Отделка',
  [ConstructionPhases.COMMISSIONING]: 'Ввод в эксплуатацию',
  [ConstructionPhases.COMPLETED]: 'Завершено'
};

export const Districts = {
  BEZHITSKY: 'bezhitsky',
  VOLODARSKY: 'volodarsky',
  SOVETSKY: 'sovetsky',
  FOKINSKY: 'fokinsky'
};

export const DistrictLabels = {
  [Districts.BEZHITSKY]: 'Бежицкий район',
  [Districts.VOLODARSKY]: 'Володарский район',
  [Districts.SOVETSKY]: 'Советский район',
  [Districts.FOKINSKY]: 'Фокинский район'
};

// Данные строительных проектов
export const constructionProjects = [
  {
    id: 'residential_complex_1',
    name: 'ЖК "Брянские просторы"',
    category: BuildingCategories.APARTMENT_COMPLEX,
    type: ConstructionTypes.RESIDENTIAL,
    district: Districts.VOLODARSKY,
    description: 'Современный жилой комплекс на 500 квартир с развитой инфраструктурой',
    cost: 2500000000,
    duration: 24, // месяцы
    area: 45000, // кв.м
    capacity: 1500, // жителей
    requirements: {
      land_area: 8000, // кв.м
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY, UtilityTypes.HEATING],
      road_access: true,
      environmental_approval: true
    },
    benefits: {
      housing_units: 500,
      population_growth: 1500,
      tax_revenue_annual: 45000000,
      jobs_construction: 200,
      jobs_permanent: 50
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 8, amount: 200000000 },
      land_allocation: { percentage: 12, amount: 300000000 },
      permits_acceleration: { percentage: 15, amount: 375000000 },
      utility_connections: { percentage: 10, amount: 250000000 }
    },
    risks: {
      environmental_impact: 15,
      traffic_increase: 20,
      infrastructure_strain: 25,
      corruption_exposure: 30
    }
  },

  {
    id: 'shopping_center_1',
    name: 'ТРЦ "Брянск Молл"',
    category: BuildingCategories.SHOPPING_CENTER,
    type: ConstructionTypes.COMMERCIAL,
    district: Districts.BEZHITSKY,
    description: 'Крупный торгово-развлекательный центр с кинотеатром и фуд-кортом',
    cost: 4200000000,
    duration: 30,
    area: 85000,
    capacity: 15000, // посетителей в день
    requirements: {
      land_area: 12000,
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY, UtilityTypes.GAS],
      road_access: true,
      parking_spaces: 1500,
      environmental_approval: true
    },
    benefits: {
      retail_spaces: 200,
      jobs_permanent: 800,
      tax_revenue_annual: 180000000,
      tourism_boost: 25,
      economic_activity: 35
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 6, amount: 252000000 },
      land_allocation: { percentage: 10, amount: 420000000 },
      permits_acceleration: { percentage: 12, amount: 504000000 },
      tenant_selection: { percentage: 5, amount: 210000000 }
    },
    risks: {
      environmental_impact: 20,
      traffic_increase: 40,
      small_business_impact: -15,
      corruption_exposure: 25
    }
  },

  {
    id: 'school_complex_1',
    name: 'Образовательный комплекс №1',
    category: BuildingCategories.SCHOOL,
    type: ConstructionTypes.PUBLIC,
    district: Districts.SOVETSKY,
    description: 'Современная школа на 1200 учеников с спортивным комплексом',
    cost: 1800000000,
    duration: 18,
    area: 25000,
    capacity: 1200, // учеников
    requirements: {
      land_area: 15000,
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY, UtilityTypes.HEATING, UtilityTypes.INTERNET],
      road_access: true,
      environmental_approval: false
    },
    benefits: {
      education_capacity: 1200,
      jobs_permanent: 120,
      citizen_satisfaction: { families: 25, students: 20 },
      education_index: 15
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 10, amount: 180000000 },
      equipment_supply: { percentage: 15, amount: 270000000 },
      design_contracts: { percentage: 8, amount: 144000000 }
    },
    risks: {
      budget_overrun: 20,
      corruption_exposure: 35,
      political_scrutiny: 40
    }
  },

  {
    id: 'hospital_expansion',
    name: 'Расширение больницы №1',
    category: BuildingCategories.HOSPITAL,
    type: ConstructionTypes.PUBLIC,
    district: Districts.FOKINSKY,
    description: 'Новый корпус больницы с современным оборудованием',
    cost: 3500000000,
    duration: 36,
    area: 35000,
    capacity: 400, // коек
    requirements: {
      land_area: 8000,
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY, UtilityTypes.HEATING, UtilityTypes.GAS],
      road_access: true,
      emergency_access: true,
      environmental_approval: true
    },
    benefits: {
      healthcare_capacity: 400,
      jobs_permanent: 300,
      citizen_satisfaction: { pensioners: 30, families: 20 },
      healthcare_index: 25
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 8, amount: 280000000 },
      medical_equipment: { percentage: 12, amount: 420000000 },
      permits_acceleration: { percentage: 10, amount: 350000000 }
    },
    risks: {
      budget_overrun: 25,
      corruption_exposure: 40,
      federal_oversight: 30
    }
  },

  {
    id: 'industrial_park',
    name: 'Индустриальный парк "Брянск-Запад"',
    category: BuildingCategories.FACTORY,
    type: ConstructionTypes.INDUSTRIAL,
    district: Districts.BEZHITSKY,
    description: 'Промышленная зона для размещения производственных предприятий',
    cost: 6000000000,
    duration: 42,
    area: 150000,
    capacity: 50, // предприятий
    requirements: {
      land_area: 200000,
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY, UtilityTypes.GAS],
      road_access: true,
      rail_access: true,
      environmental_approval: true
    },
    benefits: {
      industrial_capacity: 50,
      jobs_permanent: 2500,
      tax_revenue_annual: 450000000,
      economic_growth: 40,
      investment_attraction: 35
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 7, amount: 420000000 },
      land_allocation: { percentage: 15, amount: 900000000 },
      infrastructure_contracts: { percentage: 10, amount: 600000000 },
      tenant_selection: { percentage: 8, amount: 480000000 }
    },
    risks: {
      environmental_impact: 35,
      corruption_exposure: 45,
      federal_oversight: 25,
      local_opposition: 20
    }
  },

  {
    id: 'sports_complex',
    name: 'Спортивный комплекс "Арена Брянск"',
    category: BuildingCategories.SPORTS_COMPLEX,
    type: ConstructionTypes.RECREATIONAL,
    district: Districts.SOVETSKY,
    description: 'Многофункциональный спортивный комплекс с ледовой ареной',
    cost: 2800000000,
    duration: 28,
    area: 45000,
    capacity: 8000, // зрителей
    requirements: {
      land_area: 25000,
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY, UtilityTypes.HEATING],
      road_access: true,
      parking_spaces: 800,
      environmental_approval: false
    },
    benefits: {
      sports_capacity: 8000,
      jobs_permanent: 150,
      citizen_satisfaction: { students: 25, workers: 15 },
      sports_index: 30,
      tourism_boost: 15
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 9, amount: 252000000 },
      equipment_supply: { percentage: 12, amount: 336000000 },
      naming_rights: { percentage: 20, amount: 560000000 }
    },
    risks: {
      budget_overrun: 30,
      corruption_exposure: 35,
      maintenance_costs: 25
    }
  },

  {
    id: 'waste_facility',
    name: 'Мусороперерабатывающий завод',
    category: BuildingCategories.WASTE_FACILITY,
    type: ConstructionTypes.UTILITIES,
    district: Districts.FOKINSKY,
    description: 'Современный завод по переработке твердых бытовых отходов',
    cost: 4500000000,
    duration: 36,
    area: 65000,
    capacity: 500000, // тонн в год
    requirements: {
      land_area: 50000,
      utilities: [UtilityTypes.WATER_SUPPLY, UtilityTypes.SEWERAGE, UtilityTypes.ELECTRICITY],
      road_access: true,
      rail_access: true,
      environmental_approval: true,
      federal_permits: true
    },
    benefits: {
      waste_processing: 500000,
      jobs_permanent: 200,
      environmental_improvement: 40,
      waste_management_savings: 150000000,
      energy_generation: 25000000 // кВт/ч в год
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 8, amount: 360000000 },
      technology_supply: { percentage: 15, amount: 675000000 },
      environmental_permits: { percentage: 12, amount: 540000000 }
    },
    risks: {
      environmental_opposition: 50,
      corruption_exposure: 40,
      federal_oversight: 35,
      technology_risks: 20
    }
  },

  {
    id: 'bridge_construction',
    name: 'Мост через реку Десна',
    category: BuildingCategories.BRIDGE,
    type: ConstructionTypes.TRANSPORT,
    district: Districts.BEZHITSKY,
    description: 'Новый автомобильный мост для разгрузки транспортных потоков',
    cost: 3200000000,
    duration: 30,
    area: 2500, // длина моста
    capacity: 40000, // автомобилей в день
    requirements: {
      utilities: [UtilityTypes.ELECTRICITY, UtilityTypes.STREET_LIGHTING],
      environmental_approval: true,
      federal_permits: true,
      navigation_approval: true
    },
    benefits: {
      traffic_improvement: 35,
      economic_connectivity: 25,
      citizen_satisfaction: { workers: 20, entrepreneurs: 15 },
      property_values_increase: 15
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 10, amount: 320000000 },
      design_contracts: { percentage: 12, amount: 384000000 },
      materials_supply: { percentage: 8, amount: 256000000 }
    },
    risks: {
      environmental_impact: 25,
      corruption_exposure: 45,
      federal_oversight: 40,
      technical_complexity: 30
    }
  }
];

// Данные коммунальных услуг
export const utilityServices = [
  {
    id: 'water_supply_upgrade',
    type: UtilityTypes.WATER_SUPPLY,
    name: 'Модернизация водоснабжения',
    description: 'Замена устаревших водопроводных сетей и насосных станций',
    cost: 1200000000,
    duration: 18,
    coverage: 85, // процент покрытия
    quality: 75, // качество услуги
    benefits: {
      coverage_increase: 10,
      quality_increase: 20,
      citizen_satisfaction: { pensioners: 15, families: 20 },
      health_improvement: 10
    },
    kickback_opportunities: {
      equipment_supply: { percentage: 12, amount: 144000000 },
      construction_contracts: { percentage: 8, amount: 96000000 }
    }
  },

  {
    id: 'heating_modernization',
    type: UtilityTypes.HEATING,
    name: 'Модернизация теплосетей',
    description: 'Замена теплотрасс и установка современных котельных',
    cost: 2800000000,
    duration: 24,
    coverage: 78,
    quality: 65,
    benefits: {
      coverage_increase: 15,
      quality_increase: 25,
      energy_efficiency: 30,
      citizen_satisfaction: { pensioners: 25, families: 20 }
    },
    kickback_opportunities: {
      equipment_supply: { percentage: 15, amount: 420000000 },
      construction_contracts: { percentage: 10, amount: 280000000 }
    }
  },

  {
    id: 'sewerage_expansion',
    type: UtilityTypes.SEWERAGE,
    name: 'Расширение канализационной сети',
    description: 'Строительство новых очистных сооружений и канализационных сетей',
    cost: 1800000000,
    duration: 30,
    coverage: 70,
    quality: 60,
    benefits: {
      coverage_increase: 20,
      quality_increase: 30,
      environmental_improvement: 25,
      citizen_satisfaction: { families: 25, intellectuals: 20 }
    },
    kickback_opportunities: {
      construction_contracts: { percentage: 12, amount: 216000000 },
      equipment_supply: { percentage: 10, amount: 180000000 }
    }
  },

  {
    id: 'street_lighting_led',
    type: UtilityTypes.STREET_LIGHTING,
    name: 'Переход на LED-освещение',
    description: 'Замена уличного освещения на энергоэффективные LED-светильники',
    cost: 450000000,
    duration: 12,
    coverage: 90,
    quality: 70,
    benefits: {
      quality_increase: 25,
      energy_savings: 60,
      safety_improvement: 20,
      citizen_satisfaction: { workers: 15, students: 10 }
    },
    kickback_opportunities: {
      equipment_supply: { percentage: 20, amount: 90000000 },
      installation_contracts: { percentage: 15, amount: 67500000 }
    }
  },

  {
    id: 'internet_fiber',
    type: UtilityTypes.INTERNET,
    name: 'Развитие оптоволоконной сети',
    description: 'Прокладка оптоволоконных линий для высокоскоростного интернета',
    cost: 800000000,
    duration: 15,
    coverage: 60,
    quality: 80,
    benefits: {
      coverage_increase: 30,
      quality_increase: 15,
      digital_economy: 25,
      citizen_satisfaction: { students: 30, entrepreneurs: 25, intellectuals: 20 }
    },
    kickback_opportunities: {
      equipment_supply: { percentage: 18, amount: 144000000 },
      installation_contracts: { percentage: 12, amount: 96000000 }
    }
  }
];

// Начальное состояние строительства и ЖКХ
export const initialConstructionState = {
  // Активные проекты
  activeProjects: [],
  
  // Завершенные проекты
  completedProjects: [],
  
  // Состояние коммунальных услуг
  utilities: {
    [UtilityTypes.WATER_SUPPLY]: { coverage: 85, quality: 75, satisfaction: 65 },
    [UtilityTypes.SEWERAGE]: { coverage: 70, quality: 60, satisfaction: 55 },
    [UtilityTypes.HEATING]: { coverage: 78, quality: 65, satisfaction: 60 },
    [UtilityTypes.ELECTRICITY]: { coverage: 98, quality: 85, satisfaction: 75 },
    [UtilityTypes.GAS]: { coverage: 82, quality: 80, satisfaction: 70 },
    [UtilityTypes.INTERNET]: { coverage: 60, quality: 80, satisfaction: 65 },
    [UtilityTypes.WASTE_MANAGEMENT]: { coverage: 90, quality: 55, satisfaction: 50 },
    [UtilityTypes.STREET_LIGHTING]: { coverage: 90, quality: 70, satisfaction: 65 }
  },
  
  // Статистика по районам
  districts: {
    [Districts.BEZHITSKY]: {
      population: 180000,
      housing_units: 75000,
      commercial_buildings: 1200,
      industrial_facilities: 45,
      infrastructure_quality: 70
    },
    [Districts.VOLODARSKY]: {
      population: 95000,
      housing_units: 40000,
      commercial_buildings: 800,
      industrial_facilities: 25,
      infrastructure_quality: 65
    },
    [Districts.SOVETSKY]: {
      population: 120000,
      housing_units: 50000,
      commercial_buildings: 950,
      industrial_facilities: 30,
      infrastructure_quality: 75
    },
    [Districts.FOKINSKY]: {
      population: 85000,
      housing_units: 35000,
      commercial_buildings: 600,
      industrial_facilities: 20,
      infrastructure_quality: 60
    }
  },
  
  // Общие показатели
  constructionMetrics: {
    totalProjects: 0,
    totalInvestment: 0,
    jobsCreated: 0,
    housingUnitsBuilt: 0,
    infrastructureIndex: 68
  }
};

// Утилиты для работы со строительством
export const constructionHelpers = {
  // Расчет общей стоимости проекта с учетом откатов
  calculateProjectCost: (project, selectedKickbacks = []) => {
    let totalCost = project.cost;
    let totalKickback = 0;
    
    selectedKickbacks.forEach(kickback => {
      if (project.kickback_opportunities[kickback]) {
        totalKickback += project.kickback_opportunities[kickback].amount;
      }
    });
    
    return {
      base_cost: project.cost,
      kickback_amount: totalKickback,
      total_cost: totalCost + totalKickback,
      kickback_percentage: (totalKickback / totalCost) * 100
    };
  },

  // Расчет времени строительства с учетом факторов
  calculateConstructionTime: (project, gameState) => {
    let baseDuration = project.duration;
    let modifiers = 1;
    
    // Модификаторы времени
    if (gameState.mayorRating < 40) modifiers *= 1.2; // низкий рейтинг замедляет
    if (gameState.corruption_level > 70) modifiers *= 1.15; // высокая коррупция замедляет
    if (project.risks.federal_oversight > 30) modifiers *= 1.1; // федеральный надзор замедляет
    
    return Math.ceil(baseDuration * modifiers);
  },

  // Оценка рисков проекта
  evaluateProjectRisks: (project, gameState) => {
    let riskScore = 0;
    
    // Базовые риски проекта
    Object.values(project.risks).forEach(risk => {
      riskScore += risk;
    });
    
    // Модификаторы рисков
    if (gameState.mayorRating < 50) riskScore += 10;
    if (gameState.corruption_level > 60) riskScore += 15;
    if (gameState.media_attention > 70) riskScore += 10;
    
    return {
      total_risk: Math.min(100, riskScore),
      risk_level: riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high',
      recommendations: constructionHelpers.generateRiskRecommendations(riskScore)
    };
  },

  // Генерация рекомендаций по рискам
  generateRiskRecommendations: (riskScore) => {
    const recommendations = [];
    
    if (riskScore > 70) {
      recommendations.push('Рассмотрите отложение проекта до улучшения ситуации');
      recommendations.push('Усильте контроль за исполнением');
    } else if (riskScore > 40) {
      recommendations.push('Обеспечьте дополнительный мониторинг');
      recommendations.push('Подготовьте план управления рисками');
    }
    
    return recommendations;
  },

  // Расчет влияния на удовлетворенность граждан
  calculateSatisfactionImpact: (project, gameState) => {
    const impact = { ...(project.benefits.citizen_satisfaction || {}) };
    
    // Модификаторы влияния
    const completionBonus = 1.2; // бонус за завершение
    const qualityModifier = gameState.construction_quality || 1;
    
    Object.keys(impact).forEach(group => {
      impact[group] = Math.round(impact[group] * completionBonus * qualityModifier);
    });
    
    return impact;
  },

  // Расчет экономического эффекта
  calculateEconomicImpact: (project) => {
    const benefits = project.benefits;
    let economicImpact = 0;
    
    // Налоговые поступления
    if (benefits.tax_revenue_annual) {
      economicImpact += benefits.tax_revenue_annual * 10; // NPV за 10 лет
    }
    
    // Создание рабочих мест
    if (benefits.jobs_permanent) {
      economicImpact += benefits.jobs_permanent * 500000; // средняя зарплата * мультипликатор
    }
    
    // Рост населения
    if (benefits.population_growth) {
      economicImpact += benefits.population_growth * 200000; // экономический эффект на человека
    }
    
    return {
      total_impact: economicImpact,
      payback_period: project.cost / (benefits.tax_revenue_annual || 1),
      roi_percentage: ((economicImpact - project.cost) / project.cost) * 100
    };
  },

  // Проверка требований проекта
  checkProjectRequirements: (project, gameState) => {
    const requirements = project.requirements;
    const checks = {};
    
    // Проверка коммунальных услуг
    if (requirements.utilities) {
      checks.utilities = requirements.utilities.every(utility => {
        const utilityState = gameState.constructionState?.utilities[utility];
        return utilityState && utilityState.coverage >= 70;
      });
    }
    
    // Проверка экологических разрешений
    if (requirements.environmental_approval) {
      checks.environmental = gameState.environmental_rating >= 50;
    }
    
    // Проверка федеральных разрешений
    if (requirements.federal_permits) {
      checks.federal = gameState.federal_relations >= 60;
    }
    
    checks.all_met = Object.values(checks).every(check => check);
    
    return checks;
  },

  // Расчет качества коммунальных услуг
  calculateUtilityQuality: (utilities) => {
    const weights = {
      [UtilityTypes.WATER_SUPPLY]: 0.2,
      [UtilityTypes.SEWERAGE]: 0.15,
      [UtilityTypes.HEATING]: 0.2,
      [UtilityTypes.ELECTRICITY]: 0.15,
      [UtilityTypes.GAS]: 0.1,
      [UtilityTypes.INTERNET]: 0.1,
      [UtilityTypes.WASTE_MANAGEMENT]: 0.05,
      [UtilityTypes.STREET_LIGHTING]: 0.05
    };
    
    let weightedQuality = 0;
    Object.entries(utilities).forEach(([type, data]) => {
      const weight = weights[type] || 0;
      const score = (data.coverage * 0.6 + data.quality * 0.4);
      weightedQuality += score * weight;
    });
    
    return Math.round(weightedQuality);
  },

  // Генерация событий строительства
  generateConstructionEvent: (project, phase) => {
    const events = {
      [ConstructionPhases.PLANNING]: [
        'Обнаружены археологические находки',
        'Протесты экологов',
        'Изменение проектной документации'
      ],
      [ConstructionPhases.PERMITS]: [
        'Задержка в получении разрешений',
        'Дополнительные требования надзорных органов',
        'Коррупционный скандал в комиссии'
      ],
      [ConstructionPhases.CONSTRUCTION]: [
        'Рост цен на стройматериалы',
        'Забастовка строителей',
        'Технические проблемы',
        'Несчастный случай на стройке'
      ]
    };
    
    const phaseEvents = events[phase] || [];
    if (phaseEvents.length === 0) return null;
    
    const randomEvent = phaseEvents[Math.floor(Math.random() * phaseEvents.length)];
    
    return {
      title: randomEvent,
      phase: phase,
      project_id: project.id,
      consequences: constructionHelpers.generateEventConsequences(randomEvent, project)
    };
  },

  // Генерация последствий событий
  generateEventConsequences: (eventTitle, project) => {
    const consequences = {
      cost_increase: 0,
      time_delay: 0,
      satisfaction_change: {},
      corruption_risk: 0
    };
    
    if (eventTitle.includes('археологические')) {
      consequences.time_delay = 3;
      consequences.cost_increase = project.cost * 0.05;
    } else if (eventTitle.includes('протесты')) {
      consequences.satisfaction_change = { intellectuals: -10, environmentalists: -15 };
      consequences.time_delay = 1;
    } else if (eventTitle.includes('цен на стройматериалы')) {
      consequences.cost_increase = project.cost * 0.08;
    }
    
    return consequences;
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

  // Получение цвета качества
  getQualityColor: (quality) => {
    if (quality >= 80) return 'text-green-600';
    if (quality >= 60) return 'text-yellow-600';
    if (quality >= 40) return 'text-orange-600';
    return 'text-red-600';
  },

  // Получение цвета покрытия
  getCoverageColor: (coverage) => {
    if (coverage >= 90) return 'text-green-600';
    if (coverage >= 70) return 'text-yellow-600';
    if (coverage >= 50) return 'text-orange-600';
    return 'text-red-600';
  },

  // Расчет приоритета проектов
  calculateProjectPriority: (project, gameState) => {
    let priority = 50; // базовый приоритет
    
    // Социальные проекты имеют высокий приоритет при низкой удовлетворенности
    if (project.type === ConstructionTypes.PUBLIC && gameState.mayorRating < 50) {
      priority += 20;
    }
    
    // Инфраструктурные проекты важны при плохом состоянии ЖКХ
    if (project.type === ConstructionTypes.UTILITIES) {
      const avgUtilityQuality = constructionHelpers.calculateUtilityQuality(
        gameState.constructionState?.utilities || {}
      );
      if (avgUtilityQuality < 60) priority += 25;
    }
    
    // Экономические проекты важны при дефиците бюджета
    if (project.benefits.tax_revenue_annual && gameState.budget_balance < 0) {
      priority += 15;
    }
    
    return Math.min(100, priority);
  }
};

export default {
  ConstructionTypes,
  ConstructionTypeLabels,
  BuildingCategories,
  BuildingCategoryLabels,
  UtilityTypes,
  UtilityTypeLabels,
  ConstructionPhases,
  ConstructionPhaseLabels,
  Districts,
  DistrictLabels,
  constructionProjects,
  utilityServices,
  initialConstructionState,
  constructionHelpers
};
