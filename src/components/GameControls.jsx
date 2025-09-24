import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx';
import { 
  Play, 
  Pause, 
  Save, 
  RotateCcw, 
  Settings,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useGame } from '../hooks/useGame.js';

const GameControls = () => {
  const { gameState, actions, computed } = useGame();

  const speedOptions = [
    { value: 0.5, label: 'Медленно', icon: '🐌' },
    { value: 1, label: 'Нормально', icon: '🚶' },
    { value: 2, label: 'Быстро', icon: '🏃' },
    { value: 3, label: 'Очень быстро', icon: '⚡' }
  ];

  const handleSave = () => {
    actions.saveGame();
    // Можно добавить уведомление об успешном сохранении
  };

  const getGameStatusColor = () => {
    if (gameState.gameOver) return 'bg-red-100 text-red-800 border-red-200';
    if (computed.budgetStatus === 'critical') return 'bg-red-100 text-red-800 border-red-200';
    if (gameState.mayorRating < 30) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (computed.cityStatus === 'excellent') return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getGameStatusText = () => {
    if (gameState.gameOver) {
      return gameState.gameResult === 'victory' ? 'Победа!' : 'Поражение';
    }
    if (computed.budgetStatus === 'critical') return 'Кризис бюджета';
    if (gameState.mayorRating < 30) return 'Низкий рейтинг';
    if (computed.cityStatus === 'excellent') return 'Отличное управление';
    return 'Стабильная ситуация';
  };

  return (
    <Card className="sticky top-4 z-10">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Статус игры */}
          <div className="flex items-center gap-3">
            <Badge className={`${getGameStatusColor()} border`}>
              <div className="flex items-center gap-1">
                {gameState.gameOver ? (
                  gameState.gameResult === 'victory' ? 
                    <CheckCircle className="w-4 h-4" /> : 
                    <AlertTriangle className="w-4 h-4" />
                ) : (
                  computed.budgetStatus === 'critical' || gameState.mayorRating < 30 ? 
                    <AlertTriangle className="w-4 h-4" /> : 
                    <CheckCircle className="w-4 h-4" />
                )}
                <span>{getGameStatusText()}</span>
              </div>
            </Badge>
            
            <div className="text-sm text-gray-600">
              {computed.currentDate}
            </div>
          </div>

          {/* Управление игрой */}
          <div className="flex items-center gap-2">
            {/* Пауза/Воспроизведение */}
            <Button
              variant={gameState.isPaused ? "default" : "outline"}
              size="sm"
              onClick={actions.togglePause}
              disabled={gameState.gameOver}
              className="flex items-center gap-2"
            >
              {gameState.isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Продолжить</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="hidden sm:inline">Пауза</span>
                </>
              )}
            </Button>

            {/* Скорость игры */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={gameState.gameOver}>
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    {speedOptions.find(opt => opt.value === gameState.gameSpeed)?.label || 'Скорость'}
                  </span>
                  <span className="sm:hidden">
                    x{gameState.gameSpeed}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {speedOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => actions.setGameSpeed(option.value)}
                    className={gameState.gameSpeed === option.value ? 'bg-blue-50' : ''}
                  >
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-500">x{option.value}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Сохранение */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Сохранить</span>
            </Button>

            {/* Дополнительные настройки */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить игру
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={actions.resetGame}
                  className="text-red-600 focus:text-red-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Новая игра
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Дополнительная информация */}
        {(gameState.errorMessage || gameState.gameOver) && (
          <div className="mt-3 pt-3 border-t">
            {gameState.errorMessage && (
              <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{gameState.errorMessage}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={actions.clearError}
                  className="ml-auto text-xs"
                >
                  Закрыть
                </Button>
              </div>
            )}
            
            {gameState.gameOver && (
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">
                  {gameState.gameOverReason}
                </div>
                <div className="flex justify-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={actions.resetGame}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Начать заново
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Быстрая статистика */}
        {!gameState.gameOver && (
          <div className="mt-3 pt-3 border-t">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Рейтинг</div>
                <div className={`text-sm font-semibold ${
                  gameState.mayorRating >= 70 ? 'text-green-600' :
                  gameState.mayorRating >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {gameState.mayorRating.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Бюджет</div>
                <div className={`text-sm font-semibold ${
                  computed.budgetStatus === 'good' ? 'text-green-600' :
                  computed.budgetStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {gameState.budget >= 1000000 ? 
                    `${(gameState.budget / 1000000).toFixed(1)}М` :
                    `${(gameState.budget / 1000).toFixed(0)}К`
                  }₽
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Проекты</div>
                <div className="text-sm font-semibold text-blue-600">
                  {gameState.activeProjects?.filter(p => p.status === 'in_progress').length || 0}/10
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Решения</div>
                <div className="text-sm font-semibold text-purple-600">
                  {gameState.totalDecisions || 0}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameControls;
