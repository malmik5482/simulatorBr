// Типы данных для игрового состояния

// Основное состояние игры
export const initialGameState = {
  // Основные показатели
  budget: 50000000, // Бюджет в рублях
  mayorRating: 50, // Рейтинг мэра (0-100)
  population: 372123, // Население
  happiness: 50, // Уровень счастья населения (0-100)
  ecology: 40, // Экологический индекс (0-100)
  infrastructure: 45, // Индекс инфраструктуры (0-100)
  unemployment: 8.5, // Уровень безработицы (%)
  
  // Игровое время
  currentDay: 1,
  currentMonth: 1,
  currentYear: 2025,
  
  // Активные проекты
  activeProjects: [],
  
  // История событий
  eventHistory: [],
  
  // Настройки игры
  gameSpeed: 1, // Скорость игры (1 = нормальная)
  isPaused: false,
  
  // Статистика
  totalDecisions: 0,
  successfulProjects: 0,
  failedProjects: 0
};

// Типы событий
export const EventTypes = {
  CRISIS: 'crisis',
  OPPORTUNITY: 'opportunity',
  DECISION: 'decision',
  PROJECT: 'project',
  RANDOM: 'random'
};

// Приоритеты событий
export const EventPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Категории проектов
export const ProjectCategories = {
  INFRASTRUCTURE: 'infrastructure',
  ECOLOGY: 'ecology',
  SOCIAL: 'social',
  ECONOMY: 'economy',
  CULTURE: 'culture',
  SAFETY: 'safety'
};

// Статусы проектов
export const ProjectStatus = {
  PLANNING: 'planning',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed'
};

// Функции для работы с игровым состоянием
export const gameStateHelpers = {
  // Обновление рейтинга мэра на основе других показателей
  calculateMayorRating: (state) => {
    const happinessWeight = 0.4;
    const ecologyWeight = 0.2;
    const infrastructureWeight = 0.2;
    const unemploymentWeight = 0.2;
    
    const unemploymentScore = Math.max(0, 100 - state.unemployment * 2);
    
    return Math.round(
      state.happiness * happinessWeight +
      state.ecology * ecologyWeight +
      state.infrastructure * infrastructureWeight +
      unemploymentScore * unemploymentWeight
    );
  },
  
  // Расчет ежемесячного дохода
  calculateMonthlyIncome: (state) => {
    const baseTax = state.population * 500; // Базовый налог с человека
    const businessTax = Math.max(0, (100 - state.unemployment) * state.population * 100);
    const federalSubsidy = 5000000; // Федеральная субсидия
    
    return baseTax + businessTax + federalSubsidy;
  },
  
  // Расчет ежемесячных расходов
  calculateMonthlyExpenses: (state) => {
    const infrastructureCost = state.population * 200;
    const socialCost = state.population * 150;
    const administrationCost = 2000000;
    const projectsCost = state.activeProjects.reduce((sum, project) => 
      sum + (project.monthlyCost || 0), 0);
    
    return infrastructureCost + socialCost + administrationCost + projectsCost;
  },
  
  // Проверка возможности выполнения действия
  canAffordAction: (state, cost) => {
    return state.budget >= cost;
  },
  
  // Форматирование денежных сумм
  formatMoney: (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },
  
  // Получение цвета для индикатора на основе значения
  getIndicatorColor: (value, reverse = false) => {
    if (reverse) {
      if (value <= 30) return 'text-green-600';
      if (value <= 60) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value >= 70) return 'text-green-600';
      if (value >= 40) return 'text-yellow-600';
      return 'text-red-600';
    }
  }
};

// Константы для игровой логики
export const GameConstants = {
  MAX_ACTIVE_PROJECTS: 10,
  MIN_MAYOR_RATING: 0,
  MAX_MAYOR_RATING: 100,
  CRITICAL_BUDGET_THRESHOLD: 1000000,
  DAYS_PER_MONTH: 30,
  MONTHS_PER_YEAR: 12,
  
  // Множители для различных эффектов
  MULTIPLIERS: {
    HAPPINESS_TO_RATING: 0.4,
    ECOLOGY_TO_HAPPINESS: 0.3,
    INFRASTRUCTURE_TO_HAPPINESS: 0.4,
    UNEMPLOYMENT_TO_HAPPINESS: -0.3
  }
};
