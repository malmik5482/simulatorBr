import { ProjectCategories, ProjectStatus } from '../types/game.js';

// База данных городских проектов
export const cityProjects = [
  // Инфраструктурные проекты
  {
    id: 'metro_construction',
    title: 'Строительство метрополитена',
    description: 'Строительство первой линии метро в Брянске для решения транспортных проблем.',
    category: ProjectCategories.INFRASTRUCTURE,
    cost: 150000000,
    duration: 365, // дней
    monthlyCost: 5000000,
    requirements: {
      budget: 150000000,
      mayorRating: 60
    },
    effects: {
      infrastructure: 40,
      happiness: 30,
      unemployment: -2,
      ecology: 10 // меньше автомобилей
    },
    image: '/assets/projects/metro.jpg',
    difficulty: 'hard',
    priority: 'high'
  },

  {
    id: 'ring_road',
    title: 'Строительство объездной дороги',
    description: 'Строительство кольцевой автодороги для разгрузки центра города от транзитного транспорта.',
    category: ProjectCategories.INFRASTRUCTURE,
    cost: 80000000,
    duration: 240,
    monthlyCost: 3000000,
    requirements: {
      budget: 80000000,
      mayorRating: 45
    },
    effects: {
      infrastructure: 25,
      happiness: 15,
      ecology: 8
    },
    difficulty: 'medium',
    priority: 'high'
  },

  {
    id: 'bridge_reconstruction',
    title: 'Реконструкция мостов через Десну',
    description: 'Капитальная реконструкция мостов для улучшения транспортной доступности районов.',
    category: ProjectCategories.INFRASTRUCTURE,
    cost: 45000000,
    duration: 180,
    monthlyCost: 2000000,
    requirements: {
      budget: 45000000
    },
    effects: {
      infrastructure: 20,
      happiness: 12,
      mayorRating: 8
    },
    difficulty: 'medium',
    priority: 'medium'
  },

  // Экологические проекты
  {
    id: 'waste_processing_plant',
    title: 'Мусороперерабатывающий завод',
    description: 'Строительство современного завода по переработке твердых бытовых отходов.',
    category: ProjectCategories.ECOLOGY,
    cost: 60000000,
    duration: 300,
    monthlyCost: 2500000,
    requirements: {
      budget: 60000000,
      ecology: { max: 60 } // строится при плохой экологии
    },
    effects: {
      ecology: 35,
      happiness: 20,
      budget: 1000000 // ежемесячный доход от переработки
    },
    difficulty: 'hard',
    priority: 'high'
  },

  {
    id: 'desna_cleanup',
    title: 'Очистка реки Десны',
    description: 'Комплексная программа очистки реки Десны и прибрежных территорий.',
    category: ProjectCategories.ECOLOGY,
    cost: 35000000,
    duration: 200,
    monthlyCost: 1500000,
    requirements: {
      budget: 35000000
    },
    effects: {
      ecology: 30,
      happiness: 25,
      mayorRating: 15
    },
    difficulty: 'medium',
    priority: 'high'
  },

  {
    id: 'green_zones',
    title: 'Создание зеленых зон',
    description: 'Разбивка новых парков и скверов, озеленение улиц и дворов.',
    category: ProjectCategories.ECOLOGY,
    cost: 15000000,
    duration: 120,
    monthlyCost: 800000,
    requirements: {
      budget: 15000000
    },
    effects: {
      ecology: 20,
      happiness: 18,
      mayorRating: 10
    },
    difficulty: 'easy',
    priority: 'medium'
  },

  // Социальные проекты
  {
    id: 'medical_center',
    title: 'Новый медицинский центр',
    description: 'Строительство современного многопрофильного медицинского центра.',
    category: ProjectCategories.SOCIAL,
    cost: 70000000,
    duration: 280,
    monthlyCost: 3000000,
    requirements: {
      budget: 70000000,
      mayorRating: 50
    },
    effects: {
      happiness: 30,
      mayorRating: 20,
      unemployment: -1
    },
    difficulty: 'hard',
    priority: 'high'
  },

  {
    id: 'school_modernization',
    title: 'Модернизация школ',
    description: 'Комплексная модернизация школьной инфраструктуры и оборудования.',
    category: ProjectCategories.SOCIAL,
    cost: 40000000,
    duration: 150,
    monthlyCost: 2000000,
    requirements: {
      budget: 40000000
    },
    effects: {
      happiness: 25,
      mayorRating: 15,
      unemployment: -0.5
    },
    difficulty: 'medium',
    priority: 'high'
  },

  {
    id: 'sports_complex',
    title: 'Спортивный комплекс',
    description: 'Строительство современного спортивного комплекса с бассейном и залами.',
    category: ProjectCategories.SOCIAL,
    cost: 25000000,
    duration: 180,
    monthlyCost: 1200000,
    requirements: {
      budget: 25000000
    },
    effects: {
      happiness: 20,
      mayorRating: 12,
      unemployment: -0.3
    },
    difficulty: 'medium',
    priority: 'medium'
  },

  // Экономические проекты
  {
    id: 'industrial_park',
    title: 'Индустриальный парк',
    description: 'Создание современного индустриального парка для привлечения инвесторов.',
    category: ProjectCategories.ECONOMY,
    cost: 100000000,
    duration: 300,
    monthlyCost: 4000000,
    requirements: {
      budget: 100000000,
      mayorRating: 55,
      unemployment: { min: 5 } // есть безработные для трудоустройства
    },
    effects: {
      unemployment: -5,
      budget: 3000000, // ежемесячный доход от налогов
      mayorRating: 15,
      happiness: 20,
      ecology: -5 // небольшое ухудшение экологии
    },
    difficulty: 'hard',
    priority: 'high'
  },

  {
    id: 'business_incubator',
    title: 'Бизнес-инкубатор',
    description: 'Создание центра поддержки малого и среднего бизнеса.',
    category: ProjectCategories.ECONOMY,
    cost: 20000000,
    duration: 120,
    monthlyCost: 800000,
    requirements: {
      budget: 20000000
    },
    effects: {
      unemployment: -2,
      budget: 1000000,
      mayorRating: 8,
      happiness: 10
    },
    difficulty: 'easy',
    priority: 'medium'
  },

  // Культурные проекты
  {
    id: 'cultural_center',
    title: 'Культурный центр',
    description: 'Строительство современного культурного центра с театром и выставочными залами.',
    category: ProjectCategories.CULTURE,
    cost: 50000000,
    duration: 220,
    monthlyCost: 2200000,
    requirements: {
      budget: 50000000,
      mayorRating: 45
    },
    effects: {
      happiness: 25,
      mayorRating: 18,
      unemployment: -0.5,
      budget: 500000 // доход от мероприятий
    },
    difficulty: 'medium',
    priority: 'medium'
  },

  {
    id: 'historical_restoration',
    title: 'Реставрация исторического центра',
    description: 'Реставрация исторических зданий и благоустройство центра города.',
    category: ProjectCategories.CULTURE,
    cost: 30000000,
    duration: 200,
    monthlyCost: 1500000,
    requirements: {
      budget: 30000000
    },
    effects: {
      happiness: 20,
      mayorRating: 15,
      budget: 800000 // доход от туризма
    },
    difficulty: 'medium',
    priority: 'medium'
  },

  // Проекты безопасности
  {
    id: 'security_system',
    title: 'Система видеонаблюдения',
    description: 'Установка современной системы видеонаблюдения по всему городу.',
    category: ProjectCategories.SAFETY,
    cost: 18000000,
    duration: 90,
    monthlyCost: 600000,
    requirements: {
      budget: 18000000
    },
    effects: {
      happiness: 15,
      mayorRating: 10
    },
    difficulty: 'easy',
    priority: 'medium'
  },

  {
    id: 'emergency_services',
    title: 'Модернизация экстренных служб',
    description: 'Обновление оборудования и техники экстренных служб города.',
    category: ProjectCategories.SAFETY,
    cost: 25000000,
    duration: 150,
    monthlyCost: 1000000,
    requirements: {
      budget: 25000000
    },
    effects: {
      happiness: 18,
      mayorRating: 12,
      unemployment: -0.2
    },
    difficulty: 'medium',
    priority: 'medium'
  }
];

// Функции для работы с проектами
export const projectHelpers = {
  // Получить доступные проекты
  getAvailableProjects: (gameState) => {
    return cityProjects.filter(project => 
      projectHelpers.canStartProject(project, gameState) &&
      !gameState.activeProjects.some(active => active.id === project.id)
    );
  },

  // Проверить возможность запуска проекта
  canStartProject: (project, gameState) => {
    const requirements = project.requirements;
    
    // Проверка бюджета
    if (requirements.budget && gameState.budget < requirements.budget) {
      return false;
    }
    
    // Проверка рейтинга мэра
    if (requirements.mayorRating && gameState.mayorRating < requirements.mayorRating) {
      return false;
    }
    
    // Проверка других условий
    for (const [key, condition] of Object.entries(requirements)) {
      if (key === 'budget' || key === 'mayorRating') continue;
      
      const value = gameState[key];
      if (typeof condition === 'object') {
        if (condition.min && value < condition.min) return false;
        if (condition.max && value > condition.max) return false;
      }
    }
    
    return true;
  },

  // Запустить проект
  startProject: (gameState, projectId) => {
    const project = cityProjects.find(p => p.id === projectId);
    if (!project || !projectHelpers.canStartProject(project, gameState)) {
      return gameState;
    }

    const newProject = {
      ...project,
      status: ProjectStatus.IN_PROGRESS,
      startDate: {
        day: gameState.currentDay,
        month: gameState.currentMonth,
        year: gameState.currentYear
      },
      remainingDays: project.duration,
      totalSpent: project.cost
    };

    return {
      ...gameState,
      budget: gameState.budget - project.cost,
      activeProjects: [...gameState.activeProjects, newProject]
    };
  },

  // Обновить прогресс проектов
  updateProjectsProgress: (gameState) => {
    const updatedProjects = gameState.activeProjects.map(project => {
      if (project.status !== ProjectStatus.IN_PROGRESS) return project;

      const updatedProject = {
        ...project,
        remainingDays: project.remainingDays - 1
      };

      // Проект завершен
      if (updatedProject.remainingDays <= 0) {
        updatedProject.status = ProjectStatus.COMPLETED;
        updatedProject.completionDate = {
          day: gameState.currentDay,
          month: gameState.currentMonth,
          year: gameState.currentYear
        };
      }

      return updatedProject;
    });

    return {
      ...gameState,
      activeProjects: updatedProjects
    };
  },

  // Применить эффекты завершенных проектов
  applyCompletedProjectEffects: (gameState) => {
    const completedProjects = gameState.activeProjects.filter(
      project => project.status === ProjectStatus.COMPLETED && !project.effectsApplied
    );

    let newState = { ...gameState };

    completedProjects.forEach(project => {
      // Применяем эффекты проекта
      Object.entries(project.effects).forEach(([key, value]) => {
        if (key in newState) {
          newState[key] = Math.max(0, newState[key] + value);
          
          // Ограничения для процентных показателей
          if (['mayorRating', 'happiness', 'ecology', 'infrastructure'].includes(key)) {
            newState[key] = Math.min(100, newState[key]);
          }
        }
      });

      // Отмечаем, что эффекты применены
      project.effectsApplied = true;
      newState.successfulProjects += 1;
    });

    return newState;
  },

  // Получить проекты по категории
  getProjectsByCategory: (category) => {
    return cityProjects.filter(project => project.category === category);
  },

  // Рассчитать общую стоимость активных проектов
  calculateActiveProjectsCost: (gameState) => {
    return gameState.activeProjects
      .filter(project => project.status === ProjectStatus.IN_PROGRESS)
      .reduce((total, project) => total + (project.monthlyCost || 0), 0);
  },

  // Получить статистику проектов
  getProjectStats: (gameState) => {
    const active = gameState.activeProjects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length;
    const completed = gameState.successfulProjects;
    const failed = gameState.failedProjects;
    
    return {
      active,
      completed,
      failed,
      total: active + completed + failed
    };
  }
};
