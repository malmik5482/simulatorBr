import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialGameState } from '../types/game.js';
import { gameLogic } from '../utils/gameLogic.js';

// Создаем контекст
const GameContext = createContext();

// Типы действий для reducer
const GAME_ACTIONS = {
  LOAD_GAME: 'LOAD_GAME',
  UPDATE_GAME_STATE: 'UPDATE_GAME_STATE',
  PROCESS_EVENT_DECISION: 'PROCESS_EVENT_DECISION',
  START_PROJECT: 'START_PROJECT',
  CANCEL_PROJECT: 'CANCEL_PROJECT',
  TOGGLE_PAUSE: 'TOGGLE_PAUSE',
  SET_GAME_SPEED: 'SET_GAME_SPEED',
  SAVE_GAME: 'SAVE_GAME',
  RESET_GAME: 'RESET_GAME',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer для управления состоянием игры
const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.LOAD_GAME:
      return action.payload || initialGameState;

    case GAME_ACTIONS.UPDATE_GAME_STATE:
      return gameLogic.updateGameState(state);

    case GAME_ACTIONS.PROCESS_EVENT_DECISION:
      return gameLogic.processEventDecision(state, action.eventId, action.optionId);

    case GAME_ACTIONS.START_PROJECT:
      return gameLogic.startProject(state, action.projectId);

    case GAME_ACTIONS.CANCEL_PROJECT:
      return gameLogic.cancelProject(state, action.projectId);

    case GAME_ACTIONS.TOGGLE_PAUSE:
      return {
        ...state,
        isPaused: !state.isPaused
      };

    case GAME_ACTIONS.SET_GAME_SPEED:
      return {
        ...state,
        gameSpeed: action.speed
      };

    case GAME_ACTIONS.SAVE_GAME:
      gameLogic.saveGame(state);
      return {
        ...state,
        lastSaved: new Date().toISOString()
      };

    case GAME_ACTIONS.RESET_GAME:
      gameLogic.resetGame();
      return initialGameState;

    case GAME_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null
      };

    default:
      return state;
  }
};

// Провайдер контекста
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  // Загрузка сохраненной игры при инициализации
  useEffect(() => {
    const savedGame = gameLogic.loadGame();
    if (savedGame) {
      dispatch({ type: GAME_ACTIONS.LOAD_GAME, payload: savedGame });
    }
  }, []);

  // Автоматическое обновление игры
  useEffect(() => {
    if (gameState.isPaused || gameState.gameOver) return;

    const interval = setInterval(() => {
      dispatch({ type: GAME_ACTIONS.UPDATE_GAME_STATE });
    }, 3000 / gameState.gameSpeed); // Базовая скорость: 1 игровой день = 3 секунды

    return () => clearInterval(interval);
  }, [gameState.isPaused, gameState.gameSpeed, gameState.gameOver]);

  // Автосохранение каждые 5 минут
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (!gameState.gameOver) {
        dispatch({ type: GAME_ACTIONS.SAVE_GAME });
      }
    }, 300000); // 5 минут

    return () => clearInterval(autoSaveInterval);
  }, [gameState.gameOver]);

  // Действия для компонентов
  const actions = {
    // Обработка решения по событию
    processEventDecision: (eventId, optionId) => {
      dispatch({ 
        type: GAME_ACTIONS.PROCESS_EVENT_DECISION, 
        eventId, 
        optionId 
      });
    },

    // Запуск проекта
    startProject: (projectId) => {
      dispatch({ 
        type: GAME_ACTIONS.START_PROJECT, 
        projectId 
      });
    },

    // Отмена проекта
    cancelProject: (projectId) => {
      dispatch({ 
        type: GAME_ACTIONS.CANCEL_PROJECT, 
        projectId 
      });
    },

    // Управление игрой
    togglePause: () => {
      dispatch({ type: GAME_ACTIONS.TOGGLE_PAUSE });
    },

    setGameSpeed: (speed) => {
      dispatch({ 
        type: GAME_ACTIONS.SET_GAME_SPEED, 
        speed: Math.max(0.5, Math.min(3, speed)) // Ограничиваем скорость
      });
    },

    // Сохранение и загрузка
    saveGame: () => {
      dispatch({ type: GAME_ACTIONS.SAVE_GAME });
    },

    resetGame: () => {
      if (window.confirm('Вы уверены, что хотите начать новую игру? Текущий прогресс будет потерян.')) {
        dispatch({ type: GAME_ACTIONS.RESET_GAME });
      }
    },

    // Очистка ошибок
    clearError: () => {
      dispatch({ type: GAME_ACTIONS.CLEAR_ERROR });
    },

    // Принудительное обновление состояния (для отладки)
    forceUpdate: () => {
      dispatch({ type: GAME_ACTIONS.UPDATE_GAME_STATE });
    }
  };

  // Вычисляемые значения
  const computed = {
    // Статистика игры
    gameStats: gameLogic.getGameStats(gameState),
    
    // Подсказки для игрока
    gameTips: gameLogic.getGameTips(gameState),
    
    // Доступные проекты
    availableProjects: gameState.activeProjects?.length < 10 ? 
      [] : [], // Будет реализовано в компонентах
    
    // Форматированная дата
    currentDate: `${gameState.currentDay}.${gameState.currentMonth.toString().padStart(2, '0')}.${gameState.currentYear}`,
    
    // Статус бюджета
    budgetStatus: gameState.budget > 20000000 ? 'good' : 
                  gameState.budget > 5000000 ? 'warning' : 'critical',
    
    // Общий статус города
    cityStatus: (() => {
      const avg = (gameState.happiness + gameState.ecology + gameState.infrastructure) / 3;
      if (avg >= 70) return 'excellent';
      if (avg >= 50) return 'good';
      if (avg >= 30) return 'poor';
      return 'critical';
    })()
  };

  const value = {
    gameState,
    actions,
    computed,
    GAME_ACTIONS
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Хук для использования контекста
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame должен использоваться внутри GameProvider');
  }
  return context;
};

// Хук для получения только состояния (оптимизация)
export const useGameState = () => {
  const { gameState } = useGame();
  return gameState;
};

// Хук для получения только действий
export const useGameActions = () => {
  const { actions } = useGame();
  return actions;
};

// Хок для получения вычисляемых значений
export const useGameComputed = () => {
  const { computed } = useGame();
  return computed;
};

export default GameContext;
