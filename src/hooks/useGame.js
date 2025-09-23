import { useContext } from 'react';

import GameContext from '@/contexts/GameContext.jsx';

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame должен использоваться внутри GameProvider');
  }

  return context;
};

export const useGameState = () => {
  const { gameState } = useGame();
  return gameState;
};

export const useGameActions = () => {
  const { actions } = useGame();
  return actions;
};

export const useGameComputed = () => {
  const { computed } = useGame();
  return computed;
};
