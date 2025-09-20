import { EventTypes, EventPriority } from '../types/game.js';

// База данных игровых событий
export const gameEvents = [
  // Экологические события
  {
    id: 'waste_crisis_1',
    title: 'Мусорный кризис в Володарском районе',
    description: 'Жители Володарского района жалуются на переполненные контейнеры и несвоевременный вывоз мусора. Ситуация критическая.',
    type: EventTypes.CRISIS,
    priority: EventPriority.HIGH,
    category: 'ecology',
    image: '/assets/events/waste-crisis.jpg',
    options: [
      {
        id: 'hire_more_trucks',
        text: 'Нанять дополнительные мусоровозы',
        cost: 2000000,
        effects: {
          budget: -2000000,
          ecology: 15,
          happiness: 10,
          mayorRating: 5
        },
        description: 'Быстрое решение проблемы, но дорогое'
      },
      {
        id: 'organize_volunteers',
        text: 'Организовать субботники с волонтерами',
        cost: 100000,
        effects: {
          budget: -100000,
          ecology: 8,
          happiness: 5,
          mayorRating: 3
        },
        description: 'Экономичное решение, но менее эффективное'
      },
      {
        id: 'ignore_problem',
        text: 'Отложить решение проблемы',
        cost: 0,
        effects: {
          ecology: -10,
          happiness: -15,
          mayorRating: -8
        },
        description: 'Проблема усугубится'
      }
    ],
    triggerConditions: {
      ecology: { max: 50 },
      day: { min: 7 }
    }
  },
  
  {
    id: 'desna_pollution',
    title: 'Загрязнение реки Десны',
    description: 'Экологи обнаружили превышение нормы загрязняющих веществ в реке Десне. Требуются срочные меры.',
    type: EventTypes.CRISIS,
    priority: EventPriority.CRITICAL,
    category: 'ecology',
    options: [
      {
        id: 'build_treatment_plant',
        text: 'Построить очистные сооружения',
        cost: 15000000,
        effects: {
          budget: -15000000,
          ecology: 25,
          happiness: 15,
          mayorRating: 10
        },
        duration: 90 // дней
      },
      {
        id: 'fine_polluters',
        text: 'Оштрафовать предприятия-загрязнители',
        cost: 0,
        effects: {
          budget: 3000000,
          ecology: 10,
          happiness: 8,
          mayorRating: 5,
          unemployment: 1.5 // некоторые предприятия могут закрыться
        }
      },
      {
        id: 'minimal_measures',
        text: 'Ограничиться минимальными мерами',
        cost: 500000,
        effects: {
          budget: -500000,
          ecology: 3,
          happiness: -5,
          mayorRating: -3
        }
      }
    ]
  },

  // Инфраструктурные события
  {
    id: 'road_repair_needed',
    title: 'Критическое состояние дорог',
    description: 'Проспект Ленина и улица Калинина требуют срочного ремонта. Жители жалуются на ямы и разрушенное покрытие.',
    type: EventTypes.DECISION,
    priority: EventPriority.HIGH,
    category: 'infrastructure',
    options: [
      {
        id: 'full_reconstruction',
        text: 'Полная реконструкция дорог',
        cost: 25000000,
        effects: {
          budget: -25000000,
          infrastructure: 30,
          happiness: 20,
          mayorRating: 15
        },
        duration: 120
      },
      {
        id: 'patch_repair',
        text: 'Ямочный ремонт',
        cost: 5000000,
        effects: {
          budget: -5000000,
          infrastructure: 10,
          happiness: 5,
          mayorRating: 2
        },
        duration: 30
      },
      {
        id: 'delay_repair',
        text: 'Отложить ремонт до следующего года',
        cost: 0,
        effects: {
          infrastructure: -5,
          happiness: -10,
          mayorRating: -5
        }
      }
    ]
  },

  {
    id: 'public_transport_upgrade',
    title: 'Модернизация общественного транспорта',
    description: 'Автобусный парк устарел. Жители требуют новые автобусы и улучшения маршрутной сети.',
    type: EventTypes.OPPORTUNITY,
    priority: EventPriority.MEDIUM,
    category: 'infrastructure',
    options: [
      {
        id: 'buy_new_buses',
        text: 'Закупить новые автобусы',
        cost: 20000000,
        effects: {
          budget: -20000000,
          infrastructure: 20,
          happiness: 15,
          mayorRating: 8,
          ecology: 5 // экологичные автобусы
        }
      },
      {
        id: 'repair_old_buses',
        text: 'Отремонтировать старые автобусы',
        cost: 8000000,
        effects: {
          budget: -8000000,
          infrastructure: 8,
          happiness: 5,
          mayorRating: 3
        }
      },
      {
        id: 'privatize_transport',
        text: 'Передать транспорт частным перевозчикам',
        cost: 0,
        effects: {
          budget: 2000000,
          infrastructure: -5,
          happiness: -8,
          mayorRating: -5,
          unemployment: 2
        }
      }
    ]
  },

  // Социальные события
  {
    id: 'school_renovation',
    title: 'Ремонт школ требует внимания',
    description: 'Несколько школ в городе нуждаются в капитальном ремонте. Родители обеспокоены условиями обучения детей.',
    type: EventTypes.DECISION,
    priority: EventPriority.HIGH,
    category: 'social',
    options: [
      {
        id: 'renovate_all_schools',
        text: 'Отремонтировать все нуждающиеся школы',
        cost: 30000000,
        effects: {
          budget: -30000000,
          happiness: 25,
          mayorRating: 15
        },
        duration: 180
      },
      {
        id: 'renovate_priority_schools',
        text: 'Отремонтировать только приоритетные школы',
        cost: 15000000,
        effects: {
          budget: -15000000,
          happiness: 12,
          mayorRating: 7
        },
        duration: 90
      },
      {
        id: 'cosmetic_repair',
        text: 'Ограничиться косметическим ремонтом',
        cost: 5000000,
        effects: {
          budget: -5000000,
          happiness: 3,
          mayorRating: 1
        },
        duration: 30
      }
    ]
  },

  {
    id: 'unemployment_rise',
    title: 'Рост безработицы',
    description: 'Закрытие нескольких предприятий привело к росту безработицы. Необходимы меры поддержки.',
    type: EventTypes.CRISIS,
    priority: EventPriority.HIGH,
    category: 'economy',
    options: [
      {
        id: 'job_creation_program',
        text: 'Запустить программу создания рабочих мест',
        cost: 10000000,
        effects: {
          budget: -10000000,
          unemployment: -3,
          happiness: 15,
          mayorRating: 10
        }
      },
      {
        id: 'retraining_program',
        text: 'Организовать курсы переквалификации',
        cost: 3000000,
        effects: {
          budget: -3000000,
          unemployment: -1.5,
          happiness: 8,
          mayorRating: 5
        }
      },
      {
        id: 'unemployment_benefits',
        text: 'Увеличить пособия по безработице',
        cost: 5000000,
        effects: {
          budget: -5000000,
          unemployment: 0,
          happiness: 5,
          mayorRating: 2
        }
      }
    ]
  },

  // Культурные события
  {
    id: 'cultural_festival',
    title: 'Организация культурного фестиваля',
    description: 'Предложение провести большой культурный фестиваль в честь 1040-летия Брянска.',
    type: EventTypes.OPPORTUNITY,
    priority: EventPriority.MEDIUM,
    category: 'culture',
    options: [
      {
        id: 'grand_festival',
        text: 'Организовать грандиозный фестиваль',
        cost: 8000000,
        effects: {
          budget: -8000000,
          happiness: 20,
          mayorRating: 12,
          // Привлечение туристов
          budget: 2000000 // доход от туризма
        }
      },
      {
        id: 'modest_celebration',
        text: 'Провести скромное празднование',
        cost: 2000000,
        effects: {
          budget: -2000000,
          happiness: 8,
          mayorRating: 4
        }
      },
      {
        id: 'skip_festival',
        text: 'Отказаться от проведения',
        cost: 0,
        effects: {
          happiness: -5,
          mayorRating: -3
        }
      }
    ]
  },

  // Случайные события
  {
    id: 'federal_grant',
    title: 'Федеральный грант на развитие',
    description: 'Правительство РФ выделило грант на развитие городской инфраструктуры.',
    type: EventTypes.OPPORTUNITY,
    priority: EventPriority.MEDIUM,
    category: 'economy',
    options: [
      {
        id: 'accept_grant',
        text: 'Принять грант',
        cost: 0,
        effects: {
          budget: 20000000,
          mayorRating: 5
        },
        description: 'Дополнительные средства для развития'
      }
    ],
    autoTrigger: true // Событие происходит автоматически
  },

  {
    id: 'winter_emergency',
    title: 'Аварийная ситуация зимой',
    description: 'Сильные морозы привели к авариям в системе отопления. Жители остались без тепла.',
    type: EventTypes.CRISIS,
    priority: EventPriority.CRITICAL,
    category: 'infrastructure',
    options: [
      {
        id: 'emergency_repair',
        text: 'Экстренный ремонт системы отопления',
        cost: 12000000,
        effects: {
          budget: -12000000,
          happiness: 10,
          mayorRating: 8,
          infrastructure: 5
        }
      },
      {
        id: 'temporary_heating',
        text: 'Организовать временные пункты обогрева',
        cost: 3000000,
        effects: {
          budget: -3000000,
          happiness: 5,
          mayorRating: 3
        }
      }
    ],
    seasonalTrigger: 'winter'
  }
];

// Функции для работы с событиями
export const eventHelpers = {
  // Получить случайное событие
  getRandomEvent: (gameState) => {
    const availableEvents = gameEvents.filter(event => 
      eventHelpers.canTriggerEvent(event, gameState)
    );
    
    if (availableEvents.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableEvents.length);
    return availableEvents[randomIndex];
  },
  
  // Проверить, может ли событие быть запущено
  canTriggerEvent: (event, gameState) => {
    if (!event.triggerConditions) return true;
    
    const conditions = event.triggerConditions;
    
    // Проверка условий по показателям
    for (const [key, condition] of Object.entries(conditions)) {
      const value = gameState[key];
      if (condition.min && value < condition.min) return false;
      if (condition.max && value > condition.max) return false;
    }
    
    // Проверка сезонных условий
    if (event.seasonalTrigger) {
      const currentSeason = eventHelpers.getCurrentSeason(gameState.currentMonth);
      if (event.seasonalTrigger !== currentSeason) return false;
    }
    
    return true;
  },
  
  // Определить текущий сезон
  getCurrentSeason: (month) => {
    if (month >= 12 || month <= 2) return 'winter';
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    return 'autumn';
  },
  
  // Применить эффекты выбранной опции
  applyEventEffects: (gameState, effects) => {
    const newState = { ...gameState };
    
    Object.entries(effects).forEach(([key, value]) => {
      if (key in newState) {
        newState[key] = Math.max(0, newState[key] + value);
        
        // Ограничения для процентных показателей
        if (['mayorRating', 'happiness', 'ecology', 'infrastructure'].includes(key)) {
          newState[key] = Math.min(100, newState[key]);
        }
      }
    });
    
    return newState;
  }
};
