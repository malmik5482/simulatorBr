import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Building2, 
  Users, 
  Wallet, 
  TreePine, 
  Heart, 
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock
} from 'lucide-react';
import { useGame } from '../hooks/useGame.js';
import { gameStateHelpers } from '../types/game.js';

const Dashboard = () => {
  const { gameState, computed } = useGame();

  // Функция для получения цвета индикатора
  const getIndicatorColor = (value, reverse = false) => {
    if (reverse) {
      if (value <= 5) return 'text-green-600';
      if (value <= 10) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value >= 70) return 'text-green-600';
      if (value >= 40) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const indicators = [
    {
      title: 'Рейтинг мэра',
      value: gameState.mayorRating,
      icon: Star,
      suffix: '%',
      description: 'Доверие населения'
    },
    {
      title: 'Счастье населения',
      value: gameState.happiness,
      icon: Heart,
      suffix: '%',
      description: 'Удовлетворенность жителей'
    },
    {
      title: 'Экология',
      value: gameState.ecology,
      icon: TreePine,
      suffix: '%',
      description: 'Состояние окружающей среды'
    },
    {
      title: 'Инфраструктура',
      value: gameState.infrastructure,
      icon: Building2,
      suffix: '%',
      description: 'Состояние городской инфраструктуры'
    },
    {
      title: 'Безработица',
      value: gameState.unemployment,
      icon: TrendingDown,
      suffix: '%',
      description: 'Уровень безработицы',
      reverse: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок и основная информация */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Мэр города Брянска
          </h1>
          <p className="text-gray-600 mt-1">
            Управление городом с населением {gameState.population.toLocaleString('ru-RU')} человек
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{computed.currentDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <Badge variant={gameState.isPaused ? 'secondary' : 'default'}>
              {gameState.isPaused ? 'Пауза' : `Скорость x${gameState.gameSpeed}`}
            </Badge>
          </div>
        </div>
      </div>

      {/* Бюджет */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            Городской бюджет
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {gameStateHelpers.formatMoney(gameState.budget)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Статус: 
                <Badge 
                  variant={computed.budgetStatus === 'good' ? 'default' : 
                          computed.budgetStatus === 'warning' ? 'secondary' : 'destructive'}
                  className="ml-2"
                >
                  {computed.budgetStatus === 'good' ? 'Стабильный' :
                   computed.budgetStatus === 'warning' ? 'Требует внимания' : 'Критический'}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Ежемесячный доход</div>
              <div className="text-lg font-semibold text-green-600">
                +{gameStateHelpers.formatMoney(gameStateHelpers.calculateMonthlyIncome(gameState))}
              </div>
              <div className="text-sm text-gray-600">Ежемесячные расходы</div>
              <div className="text-lg font-semibold text-red-600">
                -{gameStateHelpers.formatMoney(gameStateHelpers.calculateMonthlyExpenses(gameState))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Основные показатели */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          const colorClass = getIndicatorColor(indicator.value, indicator.reverse);
          
          return (
            <Card key={indicator.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Icon className={`w-4 h-4 ${colorClass}`} />
                  {indicator.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`text-2xl font-bold ${colorClass}`}>
                    {indicator.value.toFixed(1)}{indicator.suffix}
                  </div>
                  <Progress 
                    value={indicator.reverse ? 100 - indicator.value : indicator.value} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-600">
                    {indicator.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Активные проекты */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Активные проекты
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gameState.activeProjects && gameState.activeProjects.length > 0 ? (
            <div className="space-y-3">
              {gameState.activeProjects
                .filter(project => project.status === 'in_progress')
                .slice(0, 3)
                .map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-600">
                      Осталось дней: {project.remainingDays}
                    </div>
                  </div>
                  <div className="text-right">
                    <Progress 
                      value={((project.duration - project.remainingDays) / project.duration) * 100} 
                      className="w-20 h-2 mb-1"
                    />
                    <div className="text-xs text-gray-600">
                      {Math.round(((project.duration - project.remainingDays) / project.duration) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
              {gameState.activeProjects.filter(p => p.status === 'in_progress').length > 3 && (
                <div className="text-center text-sm text-gray-600 pt-2">
                  И еще {gameState.activeProjects.filter(p => p.status === 'in_progress').length - 3} проектов...
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <div className="text-lg font-medium mb-1">Нет активных проектов</div>
              <div className="text-sm">Время планировать развитие города!</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Подсказки */}
      {computed.gameTips && computed.gameTips.length > 0 && (
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <TrendingUp className="w-5 h-5" />
              Рекомендации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {computed.gameTips.slice(0, 3).map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">{tip}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Статус города */}
      <Card className={`border-l-4 ${
        computed.cityStatus === 'excellent' ? 'border-l-green-500' :
        computed.cityStatus === 'good' ? 'border-l-blue-500' :
        computed.cityStatus === 'poor' ? 'border-l-yellow-500' : 'border-l-red-500'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Общий статус города
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge 
                variant={computed.cityStatus === 'excellent' || computed.cityStatus === 'good' ? 'default' : 'destructive'}
                className="text-sm"
              >
                {computed.cityStatus === 'excellent' ? 'Отличное состояние' :
                 computed.cityStatus === 'good' ? 'Хорошее состояние' :
                 computed.cityStatus === 'poor' ? 'Требует улучшений' : 'Критическое состояние'}
              </Badge>
              <div className="text-sm text-gray-600 mt-2">
                Средний показатель по основным индикаторам
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {Math.round((gameState.happiness + gameState.ecology + gameState.infrastructure) / 3)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
