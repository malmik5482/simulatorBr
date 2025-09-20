import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialGameState } from '../types/game.js';
import { gameLogic } from '../utils/gameLogic.js';
import { initialFinanceState, financeHelpers } from '../types/finance.js';

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
  CLEAR_ERROR: 'CLEAR_ERROR',
  // Новые действия для финансовой системы
  REALLOCATE_BUDGET: 'REALLOCATE_BUDGET',
  PERFORM_CORRUPTION: 'PERFORM_CORRUPTION',
  TRANSFER_PERSONAL_FUNDS: 'TRANSFER_PERSONAL_FUNDS',
  UPDATE_FINANCE_STATE: 'UPDATE_FINANCE_STATE'
};

// Reducer для управления состоянием игры
const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.LOAD_GAME:
      const loadedState = action.payload || initialGameState;
      return {
        ...loadedState,
        financeState: loadedState.financeState || initialFinanceState
      };

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

    case GAME_ACTIONS.REALLOCATE_BUDGET:
      const { fromCategory, toCategory, amount } = action.payload;
      const currentFinanceState = state.financeState || initialFinanceState;
      
      const fromAllocated = currentFinanceState.cityBudget.allocated[fromCategory] || 0;
      const fromSpent = currentFinanceState.cityBudget.spent[fromCategory] || 0;
      const availableFromCategory = fromAllocated - fromSpent;

      if (availableFromCategory < amount) {
        return {
          ...state,
          errorMessage: 'Недостаточно свободных средств в исходной категории'
        };
      }

      return {
        ...state,
        financeState: {
          ...currentFinanceState,
          cityBudget: {
            ...currentFinanceState.cityBudget,
            allocated: {
              ...currentFinanceState.cityBudget.allocated,
              [fromCategory]: fromAllocated - amount,
              [toCategory]: (currentFinanceState.cityBudget.allocated[toCategory] || 0) + amount
            }
          }
        }
      };

    case GAME_ACTIONS.PERFORM_CORRUPTION:
      const { type, amount: corruptionAmount, category } = action.payload;
      const financeState = state.financeState || initialFinanceState;
      
      // Проверяем возможность операции
      const canPerform = financeHelpers.canPerformCorruption(
        corruptionAmount, 
        type, 
        financeState
      );

      if (!canPerform.canPerform) {
        return {
          ...state,
          errorMessage: canPerform.reason
        };
      }

      // Проверяем наличие средств в категории
      const categoryAllocated = financeState.cityBudget.allocated[category] || 0;
      const categorySpentCurrent = financeState.cityBudget.spent[category] || 0;
      const availableInCategory = categoryAllocated - categorySpentCurrent;

      if (availableInCategory < corruptionAmount) {
        return {
          ...state,
          errorMessage: 'Недостаточно средств в выбранной категории'
        };
      }

      // Рассчитываем риски
      const riskIncrease = Math.min(20, corruptionAmount / 100000);
      const newRisks = {
        ...financeState.risks,
        investigationRisk: Math.min(100, (financeState.risks.investigationRisk || 0) + riskIncrease),
        publicSuspicion: Math.min(100, (financeState.risks.publicSuspicion || 0) + riskIncrease * 0.5),
        federalAttention: Math.min(100, (financeState.risks.federalAttention || 0) + riskIncrease * 0.3)
      };

      // Определяем куда поступают средства
      let targetAccount = 'checking';
      if (type === 'kickbacks') targetAccount = 'cash';
      if (type === 'embezzlement') targetAccount = 'offshore';

      return {
        ...state,
        financeState: {
          ...financeState,
          cityBudget: {
            ...financeState.cityBudget,
            spent: {
              ...financeState.cityBudget.spent,
              [category]: categorySpentCurrent + corruptionAmount
            }
          },
          personalFinances: {
            ...financeState.personalFinances,
            accounts: {
              ...financeState.personalFinances.accounts,
              [targetAccount]: (financeState.personalFinances.accounts[targetAccount] || 0) + 
                              corruptionAmount * 0.8 // 20% "расходы" на операцию
            }
          },
          corruptionHistory: [
            ...financeState.corruptionHistory,
            {
              id: Date.now(),
              type,
              amount: corruptionAmount,
              category,
              timestamp: Date.now(),
              risk: riskIncrease
            }
          ],
          risks: newRisks
        },
        mayorRating: Math.max(0, state.mayorRating - riskIncrease * 0.1)
      };

    case GAME_ACTIONS.UPDATE_FINANCE_STATE:
      return {
        ...state,
        financeState: {
          ...(state.financeState || initialFinanceState),
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Провайдер контекста
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
    financeState: initialFinanceState
  });

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
    },

    // Финансовые операции
    reallocateBudget: (fromCategory, toCategory, amount) => {
      dispatch({ 
        type: GAME_ACTIONS.REALLOCATE_BUDGET, 
        payload: { fromCategory, toCategory, amount }
      });
    },

    performCorruption: (type, amount, category) => {
      dispatch({ 
        type: GAME_ACTIONS.PERFORM_CORRUPTION, 
        payload: { type, amount, category }
      });
    },

    updateFinanceState: (financeUpdate) => {
      dispatch({ 
        type: GAME_ACTIONS.UPDATE_FINANCE_STATE, 
        payload: financeUpdate
      });
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
    budgetStatus: (() => {
      const financeState = gameState.financeState || initialFinanceState;
      const totalBudget = financeHelpers.getTotalBudget(financeState.cityBudget);
      const totalSpent = financeHelpers.getTotalSpent(financeState.cityBudget);
      const remaining = totalBudget - totalSpent;
      
      if (remaining < totalBudget * 0.1) return 'critical';
      if (remaining < totalBudget * 0.3) return 'warning';
      return 'good';
    })(),
    
    // Общий статус города
    cityStatus: (() => {
      const avg = (gameState.happiness + gameState.ecology + gameState.infrastructure) / 3;
      if (avg >= 70) return 'excellent';
      if (avg >= 50) return 'good';
      if (avg >= 30) return 'poor';
      return 'critical';
    })(),

    // Финансовые показатели
    totalPersonalWealth: financeHelpers.getTotalPersonalWealth(
      gameState.financeState?.personalFinances || initialFinanceState.personalFinances
    ),
    
    corruptionRisk: financeHelpers.calculateCorruptionRisk(
      gameState.financeState?.corruptionHistory || [],
      gameState.financeState?.risks || initialFinanceState.risks
    ),

    monthlyIncome: financeHelpers.getMonthlyIncome(
      gameState.financeState?.cityBudget || initialFinanceState.cityBudget
    ),

    monthlyExpenses: financeHelpers.getMonthlyExpenses(
      gameState.financeState?.cityBudget || initialFinanceState.cityBudget
    )
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
