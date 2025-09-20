// Типы и константы для управления органами власти

export const GovernmentDepartments = {
  ADMINISTRATION: 'administration',
  FINANCE: 'finance',
  URBAN_PLANNING: 'urban_planning',
  SOCIAL_SERVICES: 'social_services',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  TRANSPORT: 'transport',
  UTILITIES: 'utilities',
  CULTURE: 'culture',
  SPORTS: 'sports',
  EMERGENCY: 'emergency',
  ECOLOGY: 'ecology'
};

export const DepartmentLabels = {
  [GovernmentDepartments.ADMINISTRATION]: 'Администрация',
  [GovernmentDepartments.FINANCE]: 'Финансовое управление',
  [GovernmentDepartments.URBAN_PLANNING]: 'Градостроительство',
  [GovernmentDepartments.SOCIAL_SERVICES]: 'Социальная защита',
  [GovernmentDepartments.EDUCATION]: 'Образование',
  [GovernmentDepartments.HEALTHCARE]: 'Здравоохранение',
  [GovernmentDepartments.TRANSPORT]: 'Транспорт',
  [GovernmentDepartments.UTILITIES]: 'ЖКХ',
  [GovernmentDepartments.CULTURE]: 'Культура',
  [GovernmentDepartments.SPORTS]: 'Спорт',
  [GovernmentDepartments.EMERGENCY]: 'ЧС и ГО',
  [GovernmentDepartments.ECOLOGY]: 'Экология'
};

export const PositionLevels = {
  HEAD: 'head',
  DEPUTY: 'deputy',
  DEPARTMENT_HEAD: 'department_head',
  SPECIALIST: 'specialist',
  ASSISTANT: 'assistant'
};

export const PositionLevelLabels = {
  [PositionLevels.HEAD]: 'Руководитель',
  [PositionLevels.DEPUTY]: 'Заместитель',
  [PositionLevels.DEPARTMENT_HEAD]: 'Начальник отдела',
  [PositionLevels.SPECIALIST]: 'Специалист',
  [PositionLevels.ASSISTANT]: 'Помощник'
};

export const EmployeeQualities = {
  LOYALTY: 'loyalty',
  COMPETENCE: 'competence',
  CORRUPTION_RESISTANCE: 'corruption_resistance',
  INITIATIVE: 'initiative',
  CONNECTIONS: 'connections'
};

export const QualityLabels = {
  [EmployeeQualities.LOYALTY]: 'Лояльность',
  [EmployeeQualities.COMPETENCE]: 'Компетентность',
  [EmployeeQualities.CORRUPTION_RESISTANCE]: 'Честность',
  [EmployeeQualities.INITIATIVE]: 'Инициативность',
  [EmployeeQualities.CONNECTIONS]: 'Связи'
};

export const DecisionTypes = {
  BUDGET_ALLOCATION: 'budget_allocation',
  PERSONNEL_DECISION: 'personnel_decision',
  POLICY_CHANGE: 'policy_change',
  PROJECT_APPROVAL: 'project_approval',
  REGULATION_UPDATE: 'regulation_update'
};

// Данные сотрудников
export const employeesData = [
  // Администрация
  {
    id: 'admin_head_1',
    name: 'Петров Александр Иванович',
    position: 'Первый заместитель мэра',
    department: GovernmentDepartments.ADMINISTRATION,
    level: PositionLevels.HEAD,
    salary: 150000,
    experience: 15,
    age: 52,
    qualities: {
      [EmployeeQualities.LOYALTY]: 85,
      [EmployeeQualities.COMPETENCE]: 78,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: 65,
      [EmployeeQualities.INITIATIVE]: 70,
      [EmployeeQualities.CONNECTIONS]: 90
    },
    background: 'Работает в администрации 15 лет, имеет связи в региональном правительстве',
    specialization: 'Общее управление, связи с регионом',
    mood: 75,
    workload: 80,
    lastPromotion: '2022-03-15',
    achievements: ['Реализация программы цифровизации', 'Привлечение федеральных субсидий'],
    weaknesses: ['Консервативность', 'Склонность к бюрократии']
  },
  {
    id: 'admin_deputy_1',
    name: 'Смирнова Елена Петровна',
    position: 'Заместитель мэра по социальным вопросам',
    department: GovernmentDepartments.ADMINISTRATION,
    level: PositionLevels.DEPUTY,
    salary: 120000,
    experience: 8,
    age: 45,
    qualities: {
      [EmployeeQualities.LOYALTY]: 70,
      [EmployeeQualities.COMPETENCE]: 85,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: 90,
      [EmployeeQualities.INITIATIVE]: 80,
      [EmployeeQualities.CONNECTIONS]: 60
    },
    background: 'Бывший директор социального центра, активист',
    specialization: 'Социальная политика, работа с НКО',
    mood: 80,
    workload: 75,
    lastPromotion: '2023-01-10',
    achievements: ['Снижение детской беспризорности', 'Программа поддержки пенсионеров'],
    weaknesses: ['Идеализм', 'Конфликты с бизнесом']
  },

  // Финансовое управление
  {
    id: 'finance_head_1',
    name: 'Козлов Михаил Сергеевич',
    position: 'Начальник финансового управления',
    department: GovernmentDepartments.FINANCE,
    level: PositionLevels.HEAD,
    salary: 140000,
    experience: 12,
    age: 48,
    qualities: {
      [EmployeeQualities.LOYALTY]: 60,
      [EmployeeQualities.COMPETENCE]: 95,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: 40,
      [EmployeeQualities.INITIATIVE]: 65,
      [EmployeeQualities.CONNECTIONS]: 75
    },
    background: 'Экономист, работал в коммерческих банках',
    specialization: 'Бюджетное планирование, финансовый анализ',
    mood: 65,
    workload: 90,
    lastPromotion: '2021-09-01',
    achievements: ['Оптимизация бюджетных расходов', 'Привлечение инвестиций'],
    weaknesses: ['Жадность', 'Связи с олигархами']
  },

  // Градостроительство
  {
    id: 'urban_head_1',
    name: 'Волков Дмитрий Александрович',
    position: 'Главный архитектор города',
    department: GovernmentDepartments.URBAN_PLANNING,
    level: PositionLevels.HEAD,
    salary: 130000,
    experience: 20,
    age: 55,
    qualities: {
      [EmployeeQualities.LOYALTY]: 75,
      [EmployeeQualities.COMPETENCE]: 90,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: 50,
      [EmployeeQualities.INITIATIVE]: 85,
      [EmployeeQualities.CONNECTIONS]: 80
    },
    background: 'Архитектор с мировым именем, автор генплана города',
    specialization: 'Градостроительство, архитектура',
    mood: 70,
    workload: 85,
    lastPromotion: '2020-05-15',
    achievements: ['Реконструкция центра города', 'Парк "Соловьи"'],
    weaknesses: ['Амбициозность', 'Конфликты с застройщиками']
  },

  // Образование
  {
    id: 'education_head_1',
    name: 'Иванова Татьяна Николаевна',
    position: 'Начальник управления образования',
    department: GovernmentDepartments.EDUCATION,
    level: PositionLevels.HEAD,
    salary: 110000,
    experience: 25,
    age: 58,
    qualities: {
      [EmployeeQualities.LOYALTY]: 90,
      [EmployeeQualities.COMPETENCE]: 80,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: 85,
      [EmployeeQualities.INITIATIVE]: 60,
      [EmployeeQualities.CONNECTIONS]: 70
    },
    background: 'Бывший директор школы, педагог с большим стажем',
    specialization: 'Управление образованием, педагогика',
    mood: 85,
    workload: 70,
    lastPromotion: '2019-08-01',
    achievements: ['Цифровизация школ', 'Программа "Одаренные дети"'],
    weaknesses: ['Консерватизм', 'Сопротивление инновациям']
  },

  // Здравоохранение
  {
    id: 'healthcare_head_1',
    name: 'Морозов Сергей Владимирович',
    position: 'Начальник управления здравоохранения',
    department: GovernmentDepartments.HEALTHCARE,
    level: PositionLevels.HEAD,
    salary: 135000,
    experience: 18,
    age: 50,
    qualities: {
      [EmployeeQualities.LOYALTY]: 70,
      [EmployeeQualities.COMPETENCE]: 88,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: 75,
      [EmployeeQualities.INITIATIVE]: 75,
      [EmployeeQualities.CONNECTIONS]: 65
    },
    background: 'Врач-хирург, главврач больницы',
    specialization: 'Организация здравоохранения, медицина',
    mood: 75,
    workload: 95,
    lastPromotion: '2022-01-15',
    achievements: ['Модернизация больниц', 'Снижение детской смертности'],
    weaknesses: ['Перфекционизм', 'Конфликты с частной медициной']
  }
];

// Данные решений и политик
export const policyOptions = [
  {
    id: 'transparency_policy',
    name: 'Политика прозрачности',
    department: GovernmentDepartments.ADMINISTRATION,
    description: 'Публикация всех решений и трат администрации',
    effects: {
      mayorRating: 15,
      corruptionRisk: -20,
      employeeMood: -10
    },
    cost: 2000000,
    duration: 30,
    requirements: {
      competence: 70
    }
  },
  {
    id: 'digitalization_program',
    name: 'Программа цифровизации',
    department: GovernmentDepartments.ADMINISTRATION,
    description: 'Внедрение цифровых технологий во все сферы управления',
    effects: {
      efficiency: 25,
      happiness: 10,
      infrastructure: 15
    },
    cost: 50000000,
    duration: 180,
    requirements: {
      competence: 80,
      initiative: 70
    }
  },
  {
    id: 'budget_optimization',
    name: 'Оптимизация бюджета',
    department: GovernmentDepartments.FINANCE,
    description: 'Пересмотр всех статей расходов для повышения эффективности',
    effects: {
      budget: 20000000,
      employeeMood: -15,
      efficiency: 20
    },
    cost: 5000000,
    duration: 60,
    requirements: {
      competence: 85
    }
  },
  {
    id: 'social_housing_program',
    name: 'Программа социального жилья',
    department: GovernmentDepartments.URBAN_PLANNING,
    description: 'Строительство доступного жилья для малообеспеченных семей',
    effects: {
      happiness: 20,
      mayorRating: 10,
      unemployment: -5
    },
    cost: 100000000,
    duration: 360,
    requirements: {
      competence: 75,
      connections: 60
    }
  }
];

// Начальное состояние управления
export const initialGovernmentState = {
  // Сотрудники по департаментам
  employees: employeesData.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = [];
    }
    acc[employee.department].push(employee);
    return acc;
  }, {}),

  // Активные политики и программы
  activePolicies: [],

  // Решения, ожидающие утверждения
  pendingDecisions: [],

  // Настройки департаментов
  departmentSettings: Object.values(GovernmentDepartments).reduce((acc, dept) => {
    acc[dept] = {
      budget: 10000000,
      priority: 'medium',
      autonomy: 50, // Уровень автономии (0-100)
      efficiency: 70,
      morale: 75
    };
    return acc;
  }, {}),

  // Статистика работы
  performanceMetrics: {
    decisionsPerMonth: 0,
    averageDecisionTime: 0,
    employeeSatisfaction: 75,
    departmentEfficiency: 70,
    corruptionIncidents: 0
  }
};

// Утилиты для управления
export const governmentHelpers = {
  // Расчет общей эффективности департамента
  calculateDepartmentEfficiency: (department, employees) => {
    if (!employees || employees.length === 0) return 0;
    
    const avgCompetence = employees.reduce((sum, emp) => sum + emp.qualities.competence, 0) / employees.length;
    const avgMood = employees.reduce((sum, emp) => sum + emp.mood, 0) / employees.length;
    const avgWorkload = employees.reduce((sum, emp) => sum + emp.workload, 0) / employees.length;
    
    // Эффективность зависит от компетентности, настроения и загруженности
    let efficiency = (avgCompetence * 0.4 + avgMood * 0.3 + (100 - avgWorkload) * 0.3);
    
    // Бонус за опыт
    const avgExperience = employees.reduce((sum, emp) => sum + emp.experience, 0) / employees.length;
    efficiency += Math.min(avgExperience * 0.5, 10);
    
    return Math.min(100, Math.max(0, efficiency));
  },

  // Расчет стоимости содержания департамента
  calculateDepartmentCost: (employees) => {
    if (!employees) return 0;
    return employees.reduce((sum, emp) => sum + emp.salary, 0);
  },

  // Проверка возможности реализации политики
  canImplementPolicy: (policy, department, employees) => {
    if (!employees || employees.length === 0) return { canImplement: false, reason: 'Нет сотрудников' };
    
    const headEmployee = employees.find(emp => emp.level === PositionLevels.HEAD);
    if (!headEmployee) return { canImplement: false, reason: 'Нет руководителя департамента' };
    
    // Проверяем требования
    if (policy.requirements) {
      for (const [requirement, minValue] of Object.entries(policy.requirements)) {
        if (headEmployee.qualities[requirement] < minValue) {
          return { 
            canImplement: false, 
            reason: `Недостаточно ${QualityLabels[requirement]} у руководителя` 
          };
        }
      }
    }
    
    return { canImplement: true };
  },

  // Расчет влияния решения на сотрудников
  calculateDecisionImpact: (decision, employees) => {
    let totalImpact = 0;
    
    employees.forEach(employee => {
      let impact = 0;
      
      // Влияние на основе типа решения
      switch (decision.type) {
        case DecisionTypes.BUDGET_ALLOCATION:
          impact = decision.budgetChange > 0 ? 10 : -15;
          break;
        case DecisionTypes.PERSONNEL_DECISION:
          impact = decision.isPromotion ? 15 : -20;
          break;
        case DecisionTypes.POLICY_CHANGE:
          impact = decision.isProgressive ? 5 : -5;
          break;
        default:
          impact = 0;
      }
      
      // Модификация на основе качеств сотрудника
      if (employee.qualities.loyalty > 80) impact *= 0.8; // Лояльные меньше реагируют
      if (employee.qualities.initiative > 80) impact *= 1.2; // Инициативные больше реагируют
      
      totalImpact += impact;
    });
    
    return totalImpact / employees.length;
  },

  // Генерация случайного события в департаменте
  generateDepartmentEvent: (department, employees) => {
    const events = [
      {
        type: 'corruption_scandal',
        title: 'Коррупционный скандал',
        description: 'В департаменте обнаружены нарушения в использовании бюджетных средств',
        probability: 0.1,
        effects: {
          mayorRating: -10,
          departmentEfficiency: -20,
          employeeMood: -15
        }
      },
      {
        type: 'innovation_proposal',
        title: 'Инновационное предложение',
        description: 'Сотрудники предлагают внедрить новую технологию для повышения эффективности',
        probability: 0.15,
        effects: {
          departmentEfficiency: 15,
          budget: -5000000,
          employeeMood: 10
        }
      },
      {
        type: 'staff_conflict',
        title: 'Конфликт в коллективе',
        description: 'Между сотрудниками возник серьезный конфликт, влияющий на работу',
        probability: 0.08,
        effects: {
          departmentEfficiency: -15,
          employeeMood: -20
        }
      },
      {
        type: 'federal_inspection',
        title: 'Федеральная проверка',
        description: 'Департамент проверяют федеральные контролирующие органы',
        probability: 0.05,
        effects: {
          stress: 30,
          corruptionRisk: -10
        }
      }
    ];
    
    const availableEvents = events.filter(event => Math.random() < event.probability);
    return availableEvents.length > 0 ? availableEvents[Math.floor(Math.random() * availableEvents.length)] : null;
  },

  // Форматирование качеств сотрудника
  formatEmployeeQualities: (qualities) => {
    return Object.entries(qualities).map(([key, value]) => ({
      name: QualityLabels[key],
      value,
      color: value >= 80 ? 'green' : value >= 60 ? 'yellow' : 'red'
    }));
  },

  // Расчет рекомендуемой зарплаты
  calculateRecommendedSalary: (employee) => {
    const baseByLevel = {
      [PositionLevels.HEAD]: 120000,
      [PositionLevels.DEPUTY]: 100000,
      [PositionLevels.DEPARTMENT_HEAD]: 80000,
      [PositionLevels.SPECIALIST]: 60000,
      [PositionLevels.ASSISTANT]: 40000
    };
    
    const base = baseByLevel[employee.level] || 50000;
    const experienceBonus = employee.experience * 2000;
    const competenceBonus = (employee.qualities.competence - 50) * 500;
    
    return Math.max(base + experienceBonus + competenceBonus, base * 0.8);
  },

  // Поиск кандидатов на должность
  findCandidates: (department, level, requirements = {}) => {
    // Здесь будет логика поиска кандидатов
    // Пока возвращаем заглушку
    return [];
  },

  // Расчет риска увольнения сотрудника
  calculateResignationRisk: (employee) => {
    let risk = 0;
    
    // Низкое настроение увеличивает риск
    if (employee.mood < 50) risk += 30;
    else if (employee.mood < 70) risk += 15;
    
    // Высокая загруженность увеличивает риск
    if (employee.workload > 90) risk += 20;
    else if (employee.workload > 80) risk += 10;
    
    // Низкая лояльность увеличивает риск
    if (employee.qualities.loyalty < 50) risk += 25;
    else if (employee.qualities.loyalty < 70) risk += 10;
    
    // Долгое отсутствие повышения увеличивает риск
    const monthsSincePromotion = employee.lastPromotion ? 
      (Date.now() - new Date(employee.lastPromotion).getTime()) / (1000 * 60 * 60 * 24 * 30) : 60;
    if (monthsSincePromotion > 36) risk += 15;
    
    return Math.min(100, Math.max(0, risk));
  }
};

export default {
  GovernmentDepartments,
  DepartmentLabels,
  PositionLevels,
  PositionLevelLabels,
  EmployeeQualities,
  QualityLabels,
  DecisionTypes,
  employeesData,
  policyOptions,
  initialGovernmentState,
  governmentHelpers
};
