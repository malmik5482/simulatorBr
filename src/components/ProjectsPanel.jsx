import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.jsx';
import { 
  Building2, 
  TreePine, 
  Users, 
  DollarSign, 
  Palette, 
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { cityProjects, projectHelpers } from '../data/projects.js';
import { ProjectCategories } from '../types/game.js';
import { gameStateHelpers } from '../types/game.js';

const ProjectsPanel = () => {
  const { gameState, actions } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categoryIcons = {
    [ProjectCategories.INFRASTRUCTURE]: Building2,
    [ProjectCategories.ECOLOGY]: TreePine,
    [ProjectCategories.SOCIAL]: Users,
    [ProjectCategories.ECONOMY]: DollarSign,
    [ProjectCategories.CULTURE]: Palette,
    [ProjectCategories.SAFETY]: Shield
  };

  const categoryLabels = {
    [ProjectCategories.INFRASTRUCTURE]: 'Инфраструктура',
    [ProjectCategories.ECOLOGY]: 'Экология',
    [ProjectCategories.SOCIAL]: 'Социальная сфера',
    [ProjectCategories.ECONOMY]: 'Экономика',
    [ProjectCategories.CULTURE]: 'Культура',
    [ProjectCategories.SAFETY]: 'Безопасность'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_progress': return <Play className="w-4 h-4 text-blue-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Pause className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_progress': return 'В процессе';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      case 'failed': return 'Провален';
      default: return 'Планируется';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Легкий';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return 'Неизвестно';
    }
  };

  const availableProjects = cityProjects.filter(project => {
    const isNotActive = !gameState.activeProjects?.some(active => active.id === project.id);
    const canStart = projectHelpers.canStartProject(project, gameState);
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    
    return isNotActive && categoryMatch;
  });

  const activeProjects = gameState.activeProjects?.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  ) || [];

  const handleStartProject = (projectId) => {
    actions.startProject(projectId);
    setSelectedProject(null);
  };

  const handleCancelProject = (projectId) => {
    if (window.confirm('Вы уверены, что хотите отменить этот проект? Вы получите только 50% от потраченных средств.')) {
      actions.cancelProject(projectId);
    }
  };

  const renderProjectCard = (project, isActive = false) => {
    const CategoryIcon = categoryIcons[project.category] || Building2;
    const canStart = !isActive && projectHelpers.canStartProject(project, gameState);
    const canAfford = gameStateHelpers.canAffordAction(gameState, project.cost);

    return (
      <Card key={project.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <CategoryIcon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{project.title}</CardTitle>
            </div>
            <div className="flex gap-2">
              {isActive && (
                <Badge variant="outline" className="text-xs">
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{getStatusLabel(project.status)}</span>
                </Badge>
              )}
              <Badge className={`text-xs ${getDifficultyColor(project.difficulty)}`}>
                {getDifficultyLabel(project.difficulty)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>

          {/* Прогресс для активных проектов */}
          {isActive && project.status === 'in_progress' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Прогресс</span>
                <span>{Math.round(((project.duration - project.remainingDays) / project.duration) * 100)}%</span>
              </div>
              <Progress value={((project.duration - project.remainingDays) / project.duration) * 100} />
              <div className="text-xs text-gray-500">
                Осталось дней: {project.remainingDays}
              </div>
            </div>
          )}

          {/* Стоимость и время */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Стоимость</div>
              <div className="font-semibold">{gameStateHelpers.formatMoney(project.cost)}</div>
            </div>
            <div>
              <div className="text-gray-500">Длительность</div>
              <div className="font-semibold">{project.duration} дней</div>
            </div>
          </div>

          {/* Ежемесячные расходы */}
          {project.monthlyCost && (
            <div className="text-sm">
              <div className="text-gray-500">Ежемесячные расходы</div>
              <div className="font-semibold text-red-600">
                {gameStateHelpers.formatMoney(project.monthlyCost)}
              </div>
            </div>
          )}

          {/* Эффекты */}
          {project.effects && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Ожидаемые эффекты:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(project.effects).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1">
                    {value > 0 ? 
                      <TrendingUp className="w-3 h-3 text-green-600" /> : 
                      <TrendingDown className="w-3 h-3 text-red-600" />
                    }
                    <span className="text-gray-600">
                      {key === 'budget' ? 'Бюджет' :
                       key === 'mayorRating' ? 'Рейтинг' :
                       key === 'happiness' ? 'Счастье' :
                       key === 'ecology' ? 'Экология' :
                       key === 'infrastructure' ? 'Инфраструктура' :
                       key === 'unemployment' ? 'Безработица' : key}:
                    </span>
                    <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                      {value > 0 ? '+' : ''}{value}
                      {key === 'budget' ? '' : key === 'unemployment' ? '%' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Требования */}
          {!isActive && project.requirements && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Требования:</div>
              <div className="space-y-1 text-xs">
                {project.requirements.budget && (
                  <div className={`flex items-center gap-2 ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                    {canAfford ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>Бюджет: {gameStateHelpers.formatMoney(project.requirements.budget)}</span>
                  </div>
                )}
                {project.requirements.mayorRating && (
                  <div className={`flex items-center gap-2 ${
                    gameState.mayorRating >= project.requirements.mayorRating ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {gameState.mayorRating >= project.requirements.mayorRating ? 
                      <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />
                    }
                    <span>Рейтинг мэра: {project.requirements.mayorRating}%</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex gap-2 pt-2">
            {!isActive ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      Подробнее
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>{project.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Детальная информация о проекте */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Финансы</h4>
                          <div className="space-y-1 text-sm">
                            <div>Стоимость: {gameStateHelpers.formatMoney(project.cost)}</div>
                            {project.monthlyCost && (
                              <div>Ежемесячно: {gameStateHelpers.formatMoney(project.monthlyCost)}</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Время</h4>
                          <div className="space-y-1 text-sm">
                            <div>Длительность: {project.duration} дней</div>
                            <div>Сложность: {getDifficultyLabel(project.difficulty)}</div>
                          </div>
                        </div>
                      </div>
                      
                      {project.effects && (
                        <div>
                          <h4 className="font-semibold mb-2">Ожидаемые результаты</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(project.effects).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span>{key === 'budget' ? 'Бюджет' :
                                       key === 'mayorRating' ? 'Рейтинг мэра' :
                                       key === 'happiness' ? 'Счастье населения' :
                                       key === 'ecology' ? 'Экология' :
                                       key === 'infrastructure' ? 'Инфраструктура' :
                                       key === 'unemployment' ? 'Безработица' : key}:</span>
                                <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {value > 0 ? '+' : ''}{value}
                                  {key === 'budget' ? ' ₽' : key === 'unemployment' ? '%' : ''}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleStartProject(project.id)}
                  disabled={!canStart}
                >
                  {!canAfford ? 'Недостаточно средств' :
                   !canStart ? 'Требования не выполнены' : 'Запустить'}
                </Button>
              </>
            ) : (
              project.status === 'in_progress' && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleCancelProject(project.id)}
                >
                  Отменить проект
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Проекты развития города</h2>
          <p className="text-gray-600">
            Планируйте и управляйте проектами для улучшения Брянска
          </p>
        </div>
        
        <div className="text-sm text-gray-600">
          Активных проектов: {activeProjects.filter(p => p.status === 'in_progress').length} / 10
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">Все</TabsTrigger>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          {/* Активные проекты */}
          {activeProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Активные проекты</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeProjects.map(project => renderProjectCard(project, true))}
              </div>
            </div>
          )}

          {/* Доступные проекты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Доступные проекты ({availableProjects.length})
            </h3>
            {availableProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableProjects.map(project => renderProjectCard(project, false))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет доступных проектов</div>
                  <div className="text-sm text-gray-600">
                    {selectedCategory === 'all' 
                      ? 'Все проекты уже запущены или требования не выполнены'
                      : `Нет доступных проектов в категории "${categoryLabels[selectedCategory]}"`
                    }
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectsPanel;
