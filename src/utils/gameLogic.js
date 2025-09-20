import { gameStateHelpers, GameConstants } from '../types/game.js';
import { eventHelpers } from '../data/events.js';
import { projectHelpers } from '../data/projects.js';

// Основная игровая логика
export const gameLogic = {
  // Обновление игрового состояния (вызывается каждый игровой день)
  updateGameState: (currentState) => {
    let newState = { ...currentState };

    // Обновляем день
    newState = gameLogic.advanceTime(newState);

    // Обновляем проекты
    newState = projectHelpers.updateProjectsProgress(newState);
    newState = projectHelpers.applyCompletedProjectEffects(newState);

    // Ежемесячные расчеты
    if (newState.currentDay === 1) {
      newState = gameLogic.processMonthlyUpdates(newState);
    }

    // Обновляем рейтинг мэра
    newState.mayorRating = gameStateHelpers.calculateMayorRating(newState);

    // Проверяем условия окончания игры
    newState = gameLogic.checkGameEndConditions(newState);

    return newState;
  },

  // Продвижение времени
  advanceTime: (state) => {
    let newDay = state.currentDay + 1;
    let newMonth = state.currentMonth;
    let newYear = state.currentYear;

    if (newDay > GameConstants.DAYS_PER_MONTH) {
      newDay = 1;
      newMonth += 1;
      
      if (newMonth > GameConstants.MONTHS_PER_YEAR) {
        newMonth = 1;
        newYear += 1;
      }
    }

    return {
      ...state,
      currentDay: newDay,
      currentMonth: newMonth,
      currentYear: newYear
    };
  },

  // Ежемесячные обновления
  processMonthlyUpdates: (state) => {
    let newState = { ...state };

    // Расчет доходов и расходов
    const monthlyIncome = gameStateHelpers.calculateMonthlyIncome(newState);
    const monthlyExpenses = gameStateHelpers.calculateMonthlyExpenses(newState);
    const netIncome = monthlyIncome - monthlyExpenses;

    newState.budget += netIncome;

    // Естественные изменения показателей
    newState = gameLogic.applyNaturalDecay(newState);

    // Случайные события
    if (Math.random() < 0.3) { // 30% шанс события каждый месяц
      const randomEvent = eventHelpers.getRandomEvent(newState);
      if (randomEvent) {
        newState.pendingEvent = randomEvent;
      }
    }

    return newState;
  },

  // Естественное ухудшение показателей
  applyNaturalDecay: (state) => {
    const decayRates = {
      infrastructure: -0.5, // инфраструктура изнашивается
      ecology: -0.3, // экология ухудшается без вмешательства
      happiness: -0.2 // счастье снижается без улучшений
    };

    const newState = { ...state };

    Object.entries(decayRates).forEach(([key, rate]) => {
      newState[key] = Math.max(0, newState[key] + rate);
    });

    // Безработица может расти
    if (Math.random() < 0.1) { // 10% шанс роста безработицы
      newState.unemployment = Math.min(20, newState.unemployment + 0.1);
    }

    return newState;
  },

  // Обработка решения игрока по событию
  processEventDecision: (state, eventId, optionId) => {
    const event = state.pendingEvent;
    if (!event || event.id !== eventId) return state;

    const option = event.options.find(opt => opt.id === optionId);
    if (!option) return state;

    // Проверяем, может ли игрок позволить себе это действие
    if (option.cost && !gameStateHelpers.canAffordAction(state, option.cost)) {
      return {
        ...state,
        errorMessage: 'Недостаточно средств в бюджете'
      };
    }

    // Применяем эффекты
    let newState = eventHelpers.applyEventEffects(state, option.effects);

    // Добавляем событие в историю
    const eventRecord = {
      id: event.id,
      title: event.title,
      option: option.text,
      date: {
        day: state.currentDay,
        month: state.currentMonth,
        year: state.currentYear
      },
      effects: option.effects
    };

    newState.eventHistory = [eventRecord, ...newState.eventHistory.slice(0, 49)]; // Храним последние 50 событий
    newState.totalDecisions += 1;
    newState.pendingEvent = null;

    // Если у опции есть длительность, создаем проект
    if (option.duration) {
      const project = {
        id: `event_${eventId}_${Date.now()}`,
        title: `${event.title}: ${option.text}`,
        description: option.description || event.description,
        category: event.category,
        status: 'in_progress',
        startDate: {
          day: state.currentDay,
          month: state.currentMonth,
          year: state.currentYear
        },
        remainingDays: option.duration,
        isEventProject: true
      };

      newState.activeProjects = [...newState.activeProjects, project];
    }

    return newState;
  },

  // Запуск проекта
  startProject: (state, projectId) => {
    return projectHelpers.startProject(state, projectId);
  },

  // Отмена проекта
  cancelProject: (state, projectId) => {
    const project = state.activeProjects.find(p => p.id === projectId);
    if (!project || project.status !== 'in_progress') return state;

    // Возвращаем часть средств (50%)
    const refund = Math.floor(project.totalSpent * 0.5);

    const updatedProjects = state.activeProjects.map(p => 
      p.id === projectId 
        ? { ...p, status: 'cancelled' }
        : p
    );

    return {
      ...state,
      budget: state.budget + refund,
      activeProjects: updatedProjects,
      failedProjects: state.failedProjects + 1,
      mayorRating: Math.max(0, state.mayorRating - 5) // штраф к рейтингу
    };
  },

  // Проверка условий окончания игры
  checkGameEndConditions: (state) => {
    const newState = { ...state };

    // Критически низкий рейтинг
    if (state.mayorRating <= 10) {
      newState.gameOver = true;
      newState.gameOverReason = 'Ваш рейтинг упал критически низко. Вас отстранили от должности.';
      newState.gameResult = 'defeat';
    }

    // Банкротство
    if (state.budget < -10000000) { // долг больше 10 млн
      newState.gameOver = true;
      newState.gameOverReason = 'Город обанкротился. Вы не смогли управлять бюджетом.';
      newState.gameResult = 'defeat';
    }

    // Успешное завершение (высокие показатели в течение года)
    if (state.currentYear > 2025 && 
        state.mayorRating >= 80 && 
        state.happiness >= 75 && 
        state.ecology >= 70 && 
        state.infrastructure >= 70) {
      newState.gameOver = true;
      newState.gameOverReason = 'Поздравляем! Вы успешно развили Брянск и стали народным мэром.';
      newState.gameResult = 'victory';
    }

    return newState;
  },

  // Получение статистики игры
  getGameStats: (state) => {
    const totalProjects = state.activeProjects.length + state.successfulProjects + state.failedProjects;
    const projectSuccessRate = totalProjects > 0 ? 
      Math.round((state.successfulProjects / totalProjects) * 100) : 0;

    const timeInOffice = {
      days: (state.currentYear - 2025) * 365 + (state.currentMonth - 1) * 30 + state.currentDay - 1,
      months: (state.currentYear - 2025) * 12 + state.currentMonth - 1,
      years: state.currentYear - 2025
    };

    return {
      timeInOffice,
      totalDecisions: state.totalDecisions,
      projectStats: {
        total: totalProjects,
        successful: state.successfulProjects,
        failed: state.failedProjects,
        active: state.activeProjects.filter(p => p.status === 'in_progress').length,
        successRate: projectSuccessRate
      },
      currentRatings: {
        mayor: state.mayorRating,
        happiness: state.happiness,
        ecology: state.ecology,
        infrastructure: state.infrastructure,
        unemployment: state.unemployment
      },
      budget: state.budget,
      population: state.population
    };
  },

  // Сохранение игры
  saveGame: (state) => {
    try {
      const saveData = {
        ...state,
        saveDate: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem('bryansk_mayor_save', JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения игры:', error);
      return false;
    }
  },

  // Загрузка игры
  loadGame: () => {
    try {
      const saveData = localStorage.getItem('bryansk_mayor_save');
      if (!saveData) return null;

      const parsedData = JSON.parse(saveData);
      
      // Проверяем версию сохранения
      if (parsedData.version !== '1.0') {
        console.warn('Несовместимая версия сохранения');
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error('Ошибка загрузки игры:', error);
      return null;
    }
  },

  // Сброс игры
  resetGame: () => {
    localStorage.removeItem('bryansk_mayor_save');
  },

  // Получение подсказок для игрока
  getGameTips: (state) => {
    const tips = [];

    if (state.budget < 10000000) {
      tips.push('Бюджет на исходе. Рассмотрите проекты, приносящие доход.');
    }

    if (state.mayorRating < 30) {
      tips.push('Ваш рейтинг критически низок. Займитесь проблемами, волнующими жителей.');
    }

    if (state.ecology < 40) {
      tips.push('Экологическая ситуация требует внимания. Инвестируйте в зеленые проекты.');
    }

    if (state.infrastructure < 40) {
      tips.push('Инфраструктура города нуждается в модернизации.');
    }

    if (state.unemployment > 10) {
      tips.push('Высокий уровень безработицы. Создавайте рабочие места.');
    }

    if (state.activeProjects.length === 0) {
      tips.push('У вас нет активных проектов. Время планировать развитие города.');
    }

    return tips;
  }
};
