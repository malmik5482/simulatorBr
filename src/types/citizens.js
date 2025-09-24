// Типы и константы для системы взаимодействия с жителями

export const CitizenGroups = {
  PENSIONERS: 'pensioners',
  WORKERS: 'workers',
  STUDENTS: 'students',
  ENTREPRENEURS: 'entrepreneurs',
  OFFICIALS: 'officials',
  INTELLECTUALS: 'intellectuals',
  UNEMPLOYED: 'unemployed',
  FAMILIES: 'families'
};

export const CitizenGroupLabels = {
  [CitizenGroups.PENSIONERS]: 'Пенсионеры',
  [CitizenGroups.WORKERS]: 'Рабочие',
  [CitizenGroups.STUDENTS]: 'Студенты и молодежь',
  [CitizenGroups.ENTREPRENEURS]: 'Предприниматели',
  [CitizenGroups.OFFICIALS]: 'Госслужащие',
  [CitizenGroups.INTELLECTUALS]: 'Интеллигенция',
  [CitizenGroups.UNEMPLOYED]: 'Безработные',
  [CitizenGroups.FAMILIES]: 'Многодетные семьи'
};

export const CommunicationChannels = {
  EMAIL: 'email',
  PHONE: 'phone',
  MEETING: 'meeting',
  SOCIAL_MEDIA: 'social_media',
  TOWN_HALL: 'town_hall',
  PETITION: 'petition',
  MEDIA: 'media',
  PERSONAL_VISIT: 'personal_visit'
};

export const CommunicationChannelLabels = {
  [CommunicationChannels.EMAIL]: 'Электронная почта',
  [CommunicationChannels.PHONE]: 'Телефонная линия',
  [CommunicationChannels.MEETING]: 'Личная встреча',
  [CommunicationChannels.SOCIAL_MEDIA]: 'Социальные сети',
  [CommunicationChannels.TOWN_HALL]: 'Собрание',
  [CommunicationChannels.PETITION]: 'Петиция',
  [CommunicationChannels.MEDIA]: 'СМИ',
  [CommunicationChannels.PERSONAL_VISIT]: 'Личный прием'
};

export const IssueTypes = {
  INFRASTRUCTURE: 'infrastructure',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  HOUSING: 'housing',
  TRANSPORT: 'transport',
  ENVIRONMENT: 'environment',
  SAFETY: 'safety',
  ECONOMY: 'economy',
  CULTURE: 'culture',
  SOCIAL: 'social'
};

export const IssueTypeLabels = {
  [IssueTypes.INFRASTRUCTURE]: 'Инфраструктура',
  [IssueTypes.HEALTHCARE]: 'Здравоохранение',
  [IssueTypes.EDUCATION]: 'Образование',
  [IssueTypes.HOUSING]: 'ЖКХ и жилье',
  [IssueTypes.TRANSPORT]: 'Транспорт',
  [IssueTypes.ENVIRONMENT]: 'Экология',
  [IssueTypes.SAFETY]: 'Безопасность',
  [IssueTypes.ECONOMY]: 'Экономика',
  [IssueTypes.CULTURE]: 'Культура',
  [IssueTypes.SOCIAL]: 'Социальные вопросы'
};

export const ResponseTypes = {
  PROMISE: 'promise',
  EXPLANATION: 'explanation',
  REDIRECT: 'redirect',
  FUNDING: 'funding',
  INVESTIGATION: 'investigation',
  IGNORE: 'ignore',
  MEETING: 'meeting',
  COMPENSATION: 'compensation'
};

export const ResponseTypeLabels = {
  [ResponseTypes.PROMISE]: 'Обещание решить',
  [ResponseTypes.EXPLANATION]: 'Объяснение ситуации',
  [ResponseTypes.REDIRECT]: 'Перенаправление в другие органы',
  [ResponseTypes.FUNDING]: 'Выделение средств',
  [ResponseTypes.INVESTIGATION]: 'Проведение проверки',
  [ResponseTypes.IGNORE]: 'Игнорирование',
  [ResponseTypes.MEETING]: 'Назначение встречи',
  [ResponseTypes.COMPENSATION]: 'Компенсация'
};

export const SatisfactionLevels = {
  VERY_DISSATISFIED: 'very_dissatisfied',
  DISSATISFIED: 'dissatisfied',
  NEUTRAL: 'neutral',
  SATISFIED: 'satisfied',
  VERY_SATISFIED: 'very_satisfied'
};

export const SatisfactionLevelLabels = {
  [SatisfactionLevels.VERY_DISSATISFIED]: 'Очень недовольны',
  [SatisfactionLevels.DISSATISFIED]: 'Недовольны',
  [SatisfactionLevels.NEUTRAL]: 'Нейтрально',
  [SatisfactionLevels.SATISFIED]: 'Довольны',
  [SatisfactionLevels.VERY_SATISFIED]: 'Очень довольны'
};

// Данные групп граждан
export const citizenGroupsData = [
  {
    id: 'bryansk_pensioners',
    group: CitizenGroups.PENSIONERS,
    name: 'Пенсионеры Брянска',
    population: 85000,
    satisfaction: 45,
    influence: 70,
    priorities: [IssueTypes.HEALTHCARE, IssueTypes.SOCIAL, IssueTypes.TRANSPORT],
    preferredChannels: [CommunicationChannels.PHONE, CommunicationChannels.PERSONAL_VISIT, CommunicationChannels.MEETING],
    characteristics: {
      political_activity: 80,
      media_attention: 60,
      protest_potential: 40,
      loyalty_to_authority: 55
    },
    demographics: {
      average_age: 68,
      average_income: 18000,
      education_level: 'medium',
      voting_turnout: 85
    }
  },

  {
    id: 'bryansk_workers',
    group: CitizenGroups.WORKERS,
    name: 'Рабочие Брянска',
    population: 120000,
    satisfaction: 55,
    influence: 65,
    priorities: [IssueTypes.ECONOMY, IssueTypes.HOUSING, IssueTypes.TRANSPORT],
    preferredChannels: [CommunicationChannels.MEETING, CommunicationChannels.SOCIAL_MEDIA, CommunicationChannels.PETITION],
    characteristics: {
      political_activity: 60,
      media_attention: 50,
      protest_potential: 70,
      loyalty_to_authority: 45
    },
    demographics: {
      average_age: 42,
      average_income: 35000,
      education_level: 'medium',
      voting_turnout: 65
    }
  },

  {
    id: 'bryansk_students',
    group: CitizenGroups.STUDENTS,
    name: 'Студенты и молодежь',
    population: 45000,
    satisfaction: 40,
    influence: 30,
    priorities: [IssueTypes.EDUCATION, IssueTypes.CULTURE, IssueTypes.ECONOMY],
    preferredChannels: [CommunicationChannels.SOCIAL_MEDIA, CommunicationChannels.EMAIL, CommunicationChannels.PETITION],
    characteristics: {
      political_activity: 40,
      media_attention: 80,
      protest_potential: 85,
      loyalty_to_authority: 25
    },
    demographics: {
      average_age: 21,
      average_income: 15000,
      education_level: 'high',
      voting_turnout: 35
    }
  },

  {
    id: 'bryansk_entrepreneurs',
    group: CitizenGroups.ENTREPRENEURS,
    name: 'Предприниматели',
    population: 25000,
    satisfaction: 50,
    influence: 85,
    priorities: [IssueTypes.ECONOMY, IssueTypes.INFRASTRUCTURE, IssueTypes.SAFETY],
    preferredChannels: [CommunicationChannels.PERSONAL_VISIT, CommunicationChannels.MEETING, CommunicationChannels.EMAIL],
    characteristics: {
      political_activity: 75,
      media_attention: 70,
      protest_potential: 30,
      loyalty_to_authority: 60
    },
    demographics: {
      average_age: 45,
      average_income: 85000,
      education_level: 'high',
      voting_turnout: 70
    }
  },

  {
    id: 'bryansk_officials',
    group: CitizenGroups.OFFICIALS,
    name: 'Госслужащие',
    population: 15000,
    satisfaction: 70,
    influence: 75,
    priorities: [IssueTypes.SOCIAL, IssueTypes.ECONOMY, IssueTypes.SAFETY],
    preferredChannels: [CommunicationChannels.MEETING, CommunicationChannels.EMAIL, CommunicationChannels.PHONE],
    characteristics: {
      political_activity: 85,
      media_attention: 40,
      protest_potential: 10,
      loyalty_to_authority: 90
    },
    demographics: {
      average_age: 48,
      average_income: 55000,
      education_level: 'high',
      voting_turnout: 95
    }
  },

  {
    id: 'bryansk_intellectuals',
    group: CitizenGroups.INTELLECTUALS,
    name: 'Интеллигенция',
    population: 35000,
    satisfaction: 35,
    influence: 60,
    priorities: [IssueTypes.EDUCATION, IssueTypes.CULTURE, IssueTypes.ENVIRONMENT],
    preferredChannels: [CommunicationChannels.EMAIL, CommunicationChannels.MEDIA, CommunicationChannels.PETITION],
    characteristics: {
      political_activity: 70,
      media_attention: 90,
      protest_potential: 60,
      loyalty_to_authority: 30
    },
    demographics: {
      average_age: 52,
      average_income: 45000,
      education_level: 'very_high',
      voting_turnout: 80
    }
  },

  {
    id: 'bryansk_unemployed',
    group: CitizenGroups.UNEMPLOYED,
    name: 'Безработные',
    population: 20000,
    satisfaction: 25,
    influence: 20,
    priorities: [IssueTypes.ECONOMY, IssueTypes.SOCIAL, IssueTypes.HOUSING],
    preferredChannels: [CommunicationChannels.PERSONAL_VISIT, CommunicationChannels.PHONE, CommunicationChannels.SOCIAL_MEDIA],
    characteristics: {
      political_activity: 30,
      media_attention: 40,
      protest_potential: 90,
      loyalty_to_authority: 20
    },
    demographics: {
      average_age: 38,
      average_income: 8000,
      education_level: 'low',
      voting_turnout: 25
    }
  },

  {
    id: 'bryansk_families',
    group: CitizenGroups.FAMILIES,
    name: 'Многодетные семьи',
    population: 18000,
    satisfaction: 40,
    influence: 50,
    priorities: [IssueTypes.SOCIAL, IssueTypes.EDUCATION, IssueTypes.HOUSING],
    preferredChannels: [CommunicationChannels.MEETING, CommunicationChannels.PETITION, CommunicationChannels.PERSONAL_VISIT],
    characteristics: {
      political_activity: 55,
      media_attention: 60,
      protest_potential: 50,
      loyalty_to_authority: 40
    },
    demographics: {
      average_age: 35,
      average_income: 28000,
      education_level: 'medium',
      voting_turnout: 60
    }
  }
];

// Типичные обращения граждан
export const citizenIssues = [
  {
    id: 'road_repair_1',
    title: 'Ремонт дороги на ул. Калинина',
    description: 'Дорога в ужасном состоянии, машины ломаются, люди падают в ямы',
    type: IssueTypes.INFRASTRUCTURE,
    group: CitizenGroups.WORKERS,
    urgency: 'high',
    cost: 15000000,
    support: 850,
    channel: CommunicationChannels.PETITION,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.PROMISE],
    consequences: {
      satisfaction_change: { [CitizenGroups.WORKERS]: 15, [CitizenGroups.PENSIONERS]: 10 },
      rating_change: 8,
      budget_impact: -15000000
    }
  },

  {
    id: 'hospital_equipment',
    title: 'Новое оборудование для больницы №1',
    description: 'Больница нуждается в современном оборудовании для диагностики',
    type: IssueTypes.HEALTHCARE,
    group: CitizenGroups.PENSIONERS,
    urgency: 'critical',
    cost: 45000000,
    support: 1200,
    channel: CommunicationChannels.MEETING,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.INVESTIGATION],
    consequences: {
      satisfaction_change: { [CitizenGroups.PENSIONERS]: 25, [CitizenGroups.FAMILIES]: 15 },
      rating_change: 12,
      budget_impact: -45000000
    }
  },

  {
    id: 'school_renovation',
    title: 'Ремонт школы №15',
    description: 'Школа требует капитального ремонта, протекает крыша',
    type: IssueTypes.EDUCATION,
    group: CitizenGroups.FAMILIES,
    urgency: 'high',
    cost: 25000000,
    support: 650,
    channel: CommunicationChannels.PERSONAL_VISIT,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.PROMISE],
    consequences: {
      satisfaction_change: { [CitizenGroups.FAMILIES]: 20, [CitizenGroups.STUDENTS]: 15 },
      rating_change: 10,
      budget_impact: -25000000
    }
  },

  {
    id: 'park_construction',
    title: 'Строительство парка в Володарском районе',
    description: 'Район нуждается в зеленой зоне для отдыха жителей',
    type: IssueTypes.ENVIRONMENT,
    group: CitizenGroups.INTELLECTUALS,
    urgency: 'medium',
    cost: 35000000,
    support: 420,
    channel: CommunicationChannels.EMAIL,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.MEETING],
    consequences: {
      satisfaction_change: { [CitizenGroups.INTELLECTUALS]: 18, [CitizenGroups.FAMILIES]: 12 },
      rating_change: 6,
      budget_impact: -35000000
    }
  },

  {
    id: 'transport_route',
    title: 'Новый автобусный маршрут',
    description: 'Жители отдаленных районов просят новый маршрут общественного транспорта',
    type: IssueTypes.TRANSPORT,
    group: CitizenGroups.WORKERS,
    urgency: 'medium',
    cost: 8000000,
    support: 750,
    channel: CommunicationChannels.SOCIAL_MEDIA,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.INVESTIGATION],
    consequences: {
      satisfaction_change: { [CitizenGroups.WORKERS]: 12, [CitizenGroups.PENSIONERS]: 8 },
      rating_change: 5,
      budget_impact: -8000000
    }
  },

  {
    id: 'unemployment_program',
    title: 'Программа трудоустройства',
    description: 'Создание программы помощи в трудоустройстве безработных',
    type: IssueTypes.SOCIAL,
    group: CitizenGroups.UNEMPLOYED,
    urgency: 'high',
    cost: 20000000,
    support: 380,
    channel: CommunicationChannels.TOWN_HALL,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.PROMISE],
    consequences: {
      satisfaction_change: { [CitizenGroups.UNEMPLOYED]: 30, [CitizenGroups.WORKERS]: 8 },
      rating_change: 7,
      budget_impact: -20000000
    }
  },

  {
    id: 'business_support',
    title: 'Поддержка малого бизнеса',
    description: 'Предприниматели просят льготы и упрощение процедур',
    type: IssueTypes.ECONOMY,
    group: CitizenGroups.ENTREPRENEURS,
    urgency: 'medium',
    cost: 12000000,
    support: 180,
    channel: CommunicationChannels.MEETING,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.EXPLANATION],
    consequences: {
      satisfaction_change: { [CitizenGroups.ENTREPRENEURS]: 22, [CitizenGroups.WORKERS]: 5 },
      rating_change: 4,
      budget_impact: -12000000
    }
  },

  {
    id: 'cultural_center',
    title: 'Реконструкция Дома культуры',
    description: 'Дом культуры нуждается в реконструкции и новом оборудовании',
    type: IssueTypes.CULTURE,
    group: CitizenGroups.INTELLECTUALS,
    urgency: 'low',
    cost: 30000000,
    support: 320,
    channel: CommunicationChannels.PETITION,
    expectedResponse: [ResponseTypes.FUNDING, ResponseTypes.MEETING],
    consequences: {
      satisfaction_change: { [CitizenGroups.INTELLECTUALS]: 20, [CitizenGroups.STUDENTS]: 15 },
      rating_change: 6,
      budget_impact: -30000000
    }
  }
];

// Начальное состояние взаимодействия с гражданами
export const initialCitizensState = {
  // Группы граждан
  groups: citizenGroupsData.reduce((acc, group) => {
    acc[group.id] = {
      ...group,
      lastInteraction: null,
      totalPromises: 0,
      fulfilledPromises: 0,
      communicationHistory: []
    };
    return acc;
  }, {}),
  
  // Активные обращения
  activeIssues: [],
  
  // Решенные обращения
  resolvedIssues: [],
  
  // Общие показатели
  citizenMetrics: {
    overallSatisfaction: 48,
    trustLevel: 52,
    participationRate: 35,
    complaintRate: 15
  },
  
  // Настройки коммуникации
  communicationSettings: {
    responseTime: 'medium',
    transparency: 'medium',
    accessibility: 'medium'
  },
  
  // Статистика обращений
  communicationStats: {
    totalIssues: 0,
    resolvedIssues: 0,
    averageResponseTime: 0,
    satisfactionRate: 0
  }
};

// Утилиты для работы с гражданами
export const citizenHelpers = {
  // Расчет общего уровня удовлетворенности
  calculateOverallSatisfaction: (groups) => {
    const weightedSatisfaction = Object.values(groups).reduce((sum, group) => {
      const weight = group.population / 1000; // нормализация по населению
      return sum + (group.satisfaction * weight * group.influence / 100);
    }, 0);
    
    const totalWeight = Object.values(groups).reduce((sum, group) => {
      return sum + (group.population / 1000 * group.influence / 100);
    }, 0);
    
    return totalWeight > 0 ? weightedSatisfaction / totalWeight : 50;
  },

  // Расчет влияния группы на рейтинг мэра
  calculateGroupInfluence: (group) => {
    let influence = group.influence;

    // Корректировка на основе политической активности
    influence *= (group.characteristics.political_activity / 100);

    // Корректировка на основе явки на выборы
    influence *= (group.demographics.voting_turnout / 100);

    // Корректировка на основе размера группы
    const populationWeight = Math.log(group.population / 1000) / 10;
    influence *= (1 + populationWeight);

    return Math.min(100, influence);
  },

  // Генерация случайного обращения
  generateRandomIssue: (gameState) => {
    const availableIssues = citizenIssues.filter(issue => {
      // Проверяем, что такое обращение еще не активно
      const activeIssues = gameState.citizensState?.activeIssues || [];
      return !activeIssues.some(active => active.id === issue.id);
    });
    
    if (availableIssues.length === 0) return null;
    
    const randomIssue = availableIssues[Math.floor(Math.random() * availableIssues.length)];
    
    // Добавляем случайные вариации
    return {
      ...randomIssue,
      id: `${randomIssue.id}_${Date.now()}`,
      support: Math.floor(randomIssue.support * (0.8 + Math.random() * 0.4)),
      cost: Math.floor(randomIssue.cost * (0.9 + Math.random() * 0.2))
    };
  },

  // Расчет эффективности ответа
  calculateResponseEffectiveness: (response, issue, group) => {
    let effectiveness = 50; // базовая эффективность
    
    // Соответствие ожиданиям группы
    if (issue.expectedResponse.includes(response.type)) {
      effectiveness += 30;
    }
    
    // Учет характеристик группы
    if (response.type === ResponseTypes.FUNDING) {
      effectiveness += group.characteristics.loyalty_to_authority * 0.3;
    }
    
    if (response.type === ResponseTypes.EXPLANATION) {
      effectiveness += (group.demographics.education_level === 'high' ? 20 : -10);
    }
    
    if (response.type === ResponseTypes.IGNORE) {
      effectiveness -= group.characteristics.protest_potential * 0.5;
    }
    
    // Учет срочности проблемы
    const urgencyMultiplier = {
      'critical': 1.5,
      'high': 1.2,
      'medium': 1.0,
      'low': 0.8
    };
    effectiveness *= urgencyMultiplier[issue.urgency] || 1.0;
    
    return Math.max(0, Math.min(100, effectiveness));
  },

  // Расчет изменения удовлетворенности
  calculateSatisfactionChange: (response, issue, group) => {
    const effectiveness = citizenHelpers.calculateResponseEffectiveness(response, issue, group);

    let change = 0;

    if (response.type === ResponseTypes.FUNDING && response.amount >= issue.cost) {
      change = 15 + (effectiveness - 50) * 0.3;
    } else if (response.type === ResponseTypes.PROMISE) {
      change = 8 + (effectiveness - 50) * 0.2;
    } else if (response.type === ResponseTypes.EXPLANATION) {
      change = 3 + (effectiveness - 50) * 0.1;
    } else if (response.type === ResponseTypes.IGNORE) {
      change = -10 - (100 - effectiveness) * 0.2;
    }

    // Корректировка на основе истории взаимодействий
    const promisesFulfillmentRate = group.totalPromises > 0 ?
      group.fulfilledPromises / group.totalPromises : 1;

    if (response.type === ResponseTypes.PROMISE) {
      change *= promisesFulfillmentRate;
    }

    return Math.round(change);
  },

  // Получение цвета уровня удовлетворенности
  getSatisfactionColor: (satisfaction) => {
    if (satisfaction >= 80) return 'text-green-600';
    if (satisfaction >= 60) return 'text-green-500';
    if (satisfaction >= 40) return 'text-yellow-600';
    if (satisfaction >= 20) return 'text-orange-600';
    return 'text-red-600';
  },

  // Получение цвета уровня влияния
  getInfluenceColor: (influence) => {
    if (influence >= 80) return 'text-purple-600';
    if (influence >= 60) return 'text-blue-600';
    if (influence >= 40) return 'text-indigo-600';
    if (influence >= 20) return 'text-gray-600';
    return 'text-gray-400';
  },

  // Получение цвета срочности
  getUrgencyColor: (urgency) => {
    const colors = {
      'critical': 'text-red-600',
      'high': 'text-orange-600',
      'medium': 'text-yellow-600',
      'low': 'text-green-600'
    };
    return colors[urgency] || 'text-gray-600';
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

  // Расчет протестного потенциала
  calculateProtestPotential: (groups) => {
    return Object.values(groups).reduce((total, group) => {
      const dissatisfaction = Math.max(0, 50 - group.satisfaction);
      const protestWeight = group.characteristics.protest_potential / 100;
      const populationWeight = group.population / 100000;
      
      return total + (dissatisfaction * protestWeight * populationWeight);
    }, 0);
  },

  // Генерация события на основе недовольства
  generateProtestEvent: (groups) => {
    const protestPotential = citizenHelpers.calculateProtestPotential(groups);

    if (protestPotential > 30 && Math.random() < 0.3) {
      const dissatisfiedGroups = Object.values(groups)
        .filter(group => group.satisfaction < 40)
        .sort((a, b) => a.satisfaction - b.satisfaction);

      if (dissatisfiedGroups.length > 0) {
        const mainGroup = dissatisfiedGroups[0];
        return {
          type: 'protest',
          title: `Протест ${CitizenGroupLabels[mainGroup.group]}`,
          description: `${CitizenGroupLabels[mainGroup.group]} выражают недовольство политикой мэра`,
          participants: Math.floor(mainGroup.population * 0.1),
          consequences: {
            rating_change: -15,
            media_attention: true,
            investigation_risk: 10
          }
        };
      }
    }

    return null;
  }
};

export default {
  CitizenGroups,
  CitizenGroupLabels,
  CommunicationChannels,
  CommunicationChannelLabels,
  IssueTypes,
  IssueTypeLabels,
  ResponseTypes,
  ResponseTypeLabels,
  SatisfactionLevels,
  SatisfactionLevelLabels,
  citizenGroupsData,
  citizenIssues,
  initialCitizensState,
  citizenHelpers
};
