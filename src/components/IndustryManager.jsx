import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.jsx';
import { 
  Factory,
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Plus,
  Eye,
  Wrench,
  Target,
  BarChart3,
  PieChart,
  Globe,
  Leaf,
  Shield,
  Award,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  CreditCard,
  Lock,
  Unlock,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  IndustryTypes,
  IndustryLabels,
  ProjectTypes,
  ProjectTypeLabels,
  ProjectStatus,
  ProjectStatusLabels,
  KickbackTypes,
  KickbackLabels,
  industrialProjects,
  existingEnterprises,
  industryHelpers 
} from '../types/industry.js';

const IndustryManager = () => {
  const { gameState, actions } = useGame();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedKickbacks, setSelectedKickbacks] = useState([]);
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const industryState = gameState.industryState || {};
  const activeProjects = industryState.activeProjects || [];
  const enterprises = industryState.enterprises || existingEnterprises;
  const industryMetrics = industryState.industryMetrics || {};
  const kickbacks = industryState.kickbacks || {};

  const getIndustryIcon = (industry) => {
    const icons = {
      [IndustryTypes.MANUFACTURING]: Factory,
      [IndustryTypes.TECHNOLOGY]: Globe,
      [IndustryTypes.AGRICULTURE]: Leaf,
      [IndustryTypes.ENERGY]: Zap,
      [IndustryTypes.CHEMICAL]: Target,
      [IndustryTypes.AUTOMOTIVE]: Target,
      [IndustryTypes.TEXTILE]: Target,
      [IndustryTypes.FOOD_PROCESSING]: Target,
      [IndustryTypes.CONSTRUCTION_MATERIALS]: Building2,
      [IndustryTypes.LOGISTICS]: Target,
      [IndustryTypes.MINING]: Target,
      [IndustryTypes.PHARMACEUTICALS]: Target
    };
    return icons[industry] || Factory;
  };

  const getStatusColor = (status) => {
    const colors = {
      [ProjectStatus.PLANNING]: 'bg-blue-100 text-blue-800',
      [ProjectStatus.APPROVAL]: 'bg-yellow-100 text-yellow-800',
      [ProjectStatus.CONSTRUCTION]: 'bg-orange-100 text-orange-800',
      [ProjectStatus.COMMISSIONING]: 'bg-purple-100 text-purple-800',
      [ProjectStatus.OPERATIONAL]: 'bg-green-100 text-green-800',
      [ProjectStatus.SUSPENDED]: 'bg-gray-100 text-gray-800',
      [ProjectStatus.CANCELLED]: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (risk) => {
    const colors = {
      minimal: 'text-green-600',
      low: 'text-yellow-600',
      medium: 'text-orange-600',
      high: 'text-red-600'
    };
    return colors[risk] || 'text-gray-600';
  };

  const filteredProjects = industrialProjects
    .filter(project => filterIndustry === 'all' || project.industry === filterIndustry)
    .filter(project => filterType === 'all' || project.type === filterType);

  const handleImplementProject = (projectId, kickbacks = []) => {
    const project = industrialProjects.find(p => p.id === projectId);
    if (!project) return;

    const canImplement = industryHelpers.canImplementProject(project, gameState);
    if (!canImplement.canImplement) {
      alert(canImplement.reason);
      return;
    }

    actions.implementIndustrialProject(projectId, kickbacks);
    setSelectedProject(null);
    setSelectedKickbacks([]);
  };

  const handleModernizeEnterprise = (enterpriseId) => {
    actions.modernizeEnterprise(enterpriseId);
  };

  const handleKickbackSelection = (kickback, isSelected) => {
    if (isSelected) {
      setSelectedKickbacks([...selectedKickbacks, kickback]);
    } else {
      setSelectedKickbacks(selectedKickbacks.filter(k => k.type !== kickback.type));
    }
  };

  const totalKickbackAmount = selectedKickbacks.reduce((sum, k) => sum + k.amount, 0);
  const totalKickbackPercent = selectedProject ? 
    (totalKickbackAmount / selectedProject.totalCost) * 100 : 0;

  const totalEmployment = enterprises.reduce((sum, e) => sum + e.employees, 0) + 
    activeProjects.reduce((sum, p) => sum + (p.jobs || 0), 0);
  const totalRevenue = enterprises.reduce((sum, e) => sum + e.annualRevenue, 0);
  const totalTaxRevenue = enterprises.reduce((sum, e) => sum + e.taxContribution, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Развитие промышленности</h2>
          <p className="text-gray-600">
            Управление промышленными проектами и получение откатов
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Factory className="w-4 h-4" />
            Проектов: {activeProjects.length}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Откаты: {industryHelpers.formatAmount(kickbacks.total || 0)}
          </Badge>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Занятость</p>
                <p className="text-2xl font-bold">{totalEmployment.toLocaleString('ru-RU')}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Выручка</p>
                <p className="text-2xl font-bold text-green-600">
                  {industryHelpers.formatAmount(totalRevenue)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Налоги</p>
                <p className="text-2xl font-bold text-purple-600">
                  {industryHelpers.formatAmount(totalTaxRevenue)}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Мощность</p>
                <p className="text-2xl font-bold text-orange-600">
                  {industryMetrics.industrialCapacity || 45}%
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Новые проекты</TabsTrigger>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="enterprises">Предприятия</TabsTrigger>
          <TabsTrigger value="kickbacks">Откаты</TabsTrigger>
        </TabsList>

        {/* Новые проекты */}
        <TabsContent value="projects" className="space-y-6">
          {/* Фильтры */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры:</span>
                </div>
                
                <div>
                  <Label htmlFor="industry-filter" className="text-xs">Отрасль</Label>
                  <select
                    id="industry-filter"
                    value={filterIndustry}
                    onChange={(e) => setFilterIndustry(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все отрасли</option>
                    {Object.entries(IndustryLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="type-filter" className="text-xs">Тип проекта</Label>
                  <select
                    id="type-filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все типы</option>
                    {Object.entries(ProjectTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Список проектов */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const Icon = getIndustryIcon(project.industry);
              const canImplement = industryHelpers.canImplementProject(project, gameState);
              const totalKickback = industryHelpers.calculateTotalKickback(project);
              const kickbackPercent = (totalKickback / project.totalCost) * 100;
              
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="text-lg">{project.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          {IndustryLabels[project.industry]}
                        </Badge>
                        <Badge variant="outline">
                          {ProjectTypeLabels[project.type]}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Стоимость</div>
                        <div className="font-semibold">{industryHelpers.formatAmount(project.totalCost)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Срок строительства</div>
                        <div className="font-semibold">{project.constructionTime} мес.</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Рабочие места</div>
                        <div className="font-semibold text-green-600">{project.jobs.toLocaleString('ru-RU')}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Налоги в год</div>
                        <div className="font-semibold text-purple-600">
                          {industryHelpers.formatAmount(project.taxRevenue)}
                        </div>
                      </div>
                    </div>

                    {/* Откатный потенциал */}
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-yellow-800">Откатный потенциал</div>
                        <div className="text-sm font-bold text-yellow-800">
                          {industryHelpers.formatAmount(totalKickback)} ({kickbackPercent.toFixed(1)}%)
                        </div>
                      </div>
                      <div className="space-y-1">
                        {project.kickbackOpportunities.slice(0, 2).map((kickback) => (
                          <div key={kickback.type} className="flex justify-between text-xs text-yellow-700">
                            <span>{KickbackLabels[kickback.type]}</span>
                            <span>{kickback.percent}% • {industryHelpers.formatAmount(kickback.amount)}</span>
                          </div>
                        ))}
                        {project.kickbackOpportunities.length > 2 && (
                          <div className="text-xs text-yellow-600">
                            +{project.kickbackOpportunities.length - 2} других возможностей
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Экологическое влияние */}
                    <div className="flex items-center justify-between text-sm">
                      <span>Экологическое влияние:</span>
                      <span className={`font-semibold ${
                        project.environmentalImpact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {project.environmentalImpact > 0 ? '+' : ''}{project.environmentalImpact}
                      </span>
                    </div>

                    {/* Требования */}
                    {project.requirements && (
                      <div>
                        <div className="text-sm font-medium mb-2">Требования:</div>
                        <div className="space-y-1">
                          {Object.entries(project.requirements).map(([req, value]) => {
                            const currentValue = gameState[req] || 0;
                            const isMet = currentValue >= value;
                            return (
                              <div key={req} className={`text-xs flex items-center gap-2 ${isMet ? 'text-green-600' : 'text-red-600'}`}>
                                {isMet ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                {req}: {value} (текущее: {currentValue})
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          disabled={!canImplement.canImplement}
                          onClick={() => setSelectedProject(project)}
                        >
                          {canImplement.canImplement ? 'Реализовать проект' : 'Недоступно'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Icon className="w-6 h-6" />
                            {project.name}
                          </DialogTitle>
                          <DialogDescription>
                            {IndustryLabels[project.industry]} • {project.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Основная информация */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Финансовые показатели</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Общая стоимость:</span>
                                  <span className="font-semibold">{industryHelpers.formatAmount(project.totalCost)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Годовая выручка:</span>
                                  <span className="font-semibold">{industryHelpers.formatAmount(project.annualRevenue)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Налоги в год:</span>
                                  <span className="font-semibold">{industryHelpers.formatAmount(project.taxRevenue)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Срок окупаемости:</span>
                                  <span className="font-semibold">{(project.totalCost / project.taxRevenue).toFixed(1)} лет</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Социальные эффекты</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Рабочие места:</span>
                                  <span className="font-semibold">{project.jobs.toLocaleString('ru-RU')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Срок строительства:</span>
                                  <span className="font-semibold">{project.constructionTime} мес.</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Экология:</span>
                                  <span className={`font-semibold ${project.environmentalImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {project.environmentalImpact > 0 ? '+' : ''}{project.environmentalImpact}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Возможности откатов */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Возможности получения откатов
                            </h4>
                            <div className="space-y-3">
                              {project.kickbackOpportunities.map((kickback) => {
                                const risk = industryHelpers.calculateCorruptionRisk(kickback.amount, project.totalCost);
                                const isSelected = selectedKickbacks.some(k => k.type === kickback.type);
                                
                                return (
                                  <div key={kickback.type} className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                  }`} onClick={() => handleKickbackSelection(kickback, !isSelected)}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={(e) => handleKickbackSelection(kickback, e.target.checked)}
                                          className="rounded"
                                        />
                                        <span className="font-medium">{KickbackLabels[kickback.type]}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge className={`${getRiskColor(risk)} bg-transparent border`}>
                                          {risk === 'minimal' ? 'Минимальный риск' :
                                           risk === 'low' ? 'Низкий риск' :
                                           risk === 'medium' ? 'Средний риск' : 'Высокий риск'}
                                        </Badge>
                                        <span className="font-bold text-green-600">
                                          {industryHelpers.formatAmount(kickback.amount)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {kickback.percent}% от стоимости • Риск обнаружения: {(kickback.percent * 2).toFixed(1)}%
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {selectedKickbacks.length > 0 && (
                              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-green-800">Итого к получению:</span>
                                  <span className="font-bold text-green-800 text-lg">
                                    {industryHelpers.formatAmount(totalKickbackAmount)}
                                  </span>
                                </div>
                                <div className="text-sm text-green-700">
                                  {totalKickbackPercent.toFixed(1)}% от стоимости проекта • 
                                  Общий риск: {totalKickbackPercent > 15 ? 'Высокий' : 
                                              totalKickbackPercent > 8 ? 'Средний' : 'Низкий'}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Риски проекта */}
                          {project.risks && (
                            <div>
                              <h4 className="font-medium mb-3">Риски проекта</h4>
                              <div className="space-y-2">
                                {project.risks.map((risk, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                                    <div>
                                      <div className="font-medium text-sm">{risk.type}</div>
                                      <div className="text-xs text-gray-500">Влияние: {risk.impact}</div>
                                    </div>
                                    <div className="text-sm font-medium">
                                      {(risk.probability * 100).toFixed(0)}%
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setSelectedProject(null);
                                setSelectedKickbacks([]);
                              }}
                              className="flex-1"
                            >
                              Отмена
                            </Button>
                            <Button 
                              onClick={() => handleImplementProject(project.id, selectedKickbacks)}
                              className="flex-1"
                            >
                              Реализовать проект
                              {selectedKickbacks.length > 0 && (
                                <span className="ml-2 text-xs">
                                  (+{industryHelpers.formatAmount(totalKickbackAmount)})
                                </span>
                              )}
                            </Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Активные проекты */}
        <TabsContent value="active" className="space-y-6">
          {activeProjects.length > 0 ? (
            <div className="space-y-4">
              {activeProjects.map((project) => {
                const originalProject = industrialProjects.find(p => p.id === project.id);
                if (!originalProject) return null;
                
                const Icon = getIndustryIcon(originalProject.industry);
                const progress = industryHelpers.simulateConstructionProgress(
                  originalProject, 
                  project.monthsPassed || 0
                );
                
                return (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-semibold text-lg">{originalProject.name}</div>
                            <div className="text-sm text-gray-500">
                              {IndustryLabels[originalProject.industry]} • 
                              Начат: {new Date(project.startDate).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        
                        <Badge className={getStatusColor(project.status)}>
                          {ProjectStatusLabels[project.status]}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Инвестировано</div>
                          <div className="font-semibold">{industryHelpers.formatAmount(originalProject.totalCost)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Прогресс</div>
                          <div className="font-semibold">{progress.progressPercent.toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Осталось</div>
                          <div className="font-semibold">{progress.remainingMonths} мес.</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Получено откатов</div>
                          <div className="font-semibold text-green-600">
                            {industryHelpers.formatAmount(project.kickbacksReceived || 0)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс строительства</span>
                          <span className="capitalize">{progress.currentPhase}</span>
                        </div>
                        <Progress value={progress.progressPercent} />
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Детали
                        </Button>
                        {!progress.isCompleted && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="w-4 h-4 mr-2" />
                            Управление
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Factory className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <div className="text-xl font-medium mb-2">Нет активных проектов</div>
                <div className="text-gray-600 mb-4">
                  Начните реализацию промышленных проектов для развития города
                </div>
                <Button onClick={() => document.querySelector('[value="projects"]').click()}>
                  Посмотреть проекты
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Существующие предприятия */}
        <TabsContent value="enterprises" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enterprises.map((enterprise) => {
              const Icon = getIndustryIcon(enterprise.industry);
              const modernizationROI = enterprise.modernizationNeeded ? 
                industryHelpers.calculateModernizationROI(enterprise, enterprise.modernizationCost) : null;
              
              return (
                <Card key={enterprise.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span>{enterprise.name}</span>
                      </div>
                      <Badge className={getStatusColor(enterprise.status)}>
                        {enterprise.status === 'operational' ? 'Действующее' : enterprise.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Сотрудники</div>
                        <div className="font-semibold">{enterprise.employees.toLocaleString('ru-RU')}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Выручка в год</div>
                        <div className="font-semibold">{industryHelpers.formatAmount(enterprise.annualRevenue)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Налоги в год</div>
                        <div className="font-semibold text-purple-600">
                          {industryHelpers.formatAmount(enterprise.taxContribution)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Отрасль</div>
                        <div className="font-semibold">{IndustryLabels[enterprise.industry]}</div>
                      </div>
                    </div>

                    {enterprise.modernizationNeeded && modernizationROI && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-blue-800">Возможность модернизации</div>
                          <div className="text-sm font-bold text-blue-800">
                            {industryHelpers.formatAmount(enterprise.modernizationCost)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                          <div>ROI: {modernizationROI.roi.toFixed(1)}%</div>
                          <div>Окупаемость: {modernizationROI.paybackPeriod.toFixed(1)} лет</div>
                          <div>Новые места: +{modernizationROI.additionalJobs}</div>
                          <div>Эффективность: +{modernizationROI.efficiencyGain}%</div>
                        </div>
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                          disabled={!enterprise.modernizationNeeded}
                        >
                          {enterprise.modernizationNeeded ? 'Модернизировать' : 'Модернизация не требуется'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Wrench className="w-6 h-6" />
                            Модернизация {enterprise.name}
                          </DialogTitle>
                          <DialogDescription>
                            Обновление оборудования и технологий для повышения эффективности
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Текущие показатели</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Сотрудники:</span>
                                  <span>{enterprise.employees.toLocaleString('ru-RU')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Выручка:</span>
                                  <span>{industryHelpers.formatAmount(enterprise.annualRevenue)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Налоги:</span>
                                  <span>{industryHelpers.formatAmount(enterprise.taxContribution)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">После модернизации</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Сотрудники:</span>
                                  <span className="text-green-600">
                                    +{enterprise.modernizationBenefits.jobs}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Доп. выручка:</span>
                                  <span className="text-green-600">
                                    +{industryHelpers.formatAmount(enterprise.modernizationBenefits.revenue)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Эффективность:</span>
                                  <span className="text-green-600">
                                    +{enterprise.modernizationBenefits.efficiency}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium mb-2">Финансовый анализ</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span>Стоимость модернизации:</span>
                                <span className="font-semibold">{industryHelpers.formatAmount(enterprise.modernizationCost)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>ROI за 5 лет:</span>
                                <span className="font-semibold text-green-600">{modernizationROI?.roi.toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Срок окупаемости:</span>
                                <span className="font-semibold">{modernizationROI?.paybackPeriod.toFixed(1)} лет</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Откат (8%):</span>
                                <span className="font-semibold text-blue-600">
                                  {industryHelpers.formatAmount(enterprise.modernizationCost * 0.08)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button 
                            onClick={() => handleModernizeEnterprise(enterprise.id)}
                            className="w-full"
                          >
                            Модернизировать за {industryHelpers.formatAmount(enterprise.modernizationCost)}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* История откатов */}
        <TabsContent value="kickbacks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Статистика откатов */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика откатов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Общая сумма</div>
                    <div className="text-2xl font-bold text-green-600">
                      {industryHelpers.formatAmount(kickbacks.total || 0)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Количество операций</div>
                    <div className="text-xl font-semibold">
                      {kickbacks.history?.length || 0}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Средний размер</div>
                    <div className="text-lg font-semibold">
                      {kickbacks.history?.length ? 
                        industryHelpers.formatAmount(kickbacks.total / kickbacks.history.length) : 
                        '0 ₽'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Распределение по типам */}
            <Card>
              <CardHeader>
                <CardTitle>По типам операций</CardTitle>
              </CardHeader>
              <CardContent>
                {kickbacks.byType && Object.keys(kickbacks.byType).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(kickbacks.byType).map(([type, amount]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm">{KickbackLabels[type] || type}</span>
                        <span className="font-semibold">{industryHelpers.formatAmount(amount)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Нет данных об откатах
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Риски */}
            <Card>
              <CardHeader>
                <CardTitle>Коррупционные риски</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Уровень риска</div>
                    <div className="text-lg font-semibold text-yellow-600">Средний</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Вероятность расследования</div>
                    <div className="text-lg font-semibold text-red-600">15%</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Репутационный ущерб</div>
                    <div className="text-lg font-semibold text-orange-600">-12 пунктов</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* История операций */}
          <Card>
            <CardHeader>
              <CardTitle>История откатов</CardTitle>
            </CardHeader>
            <CardContent>
              {kickbacks.history && kickbacks.history.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Проект</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Риск</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kickbacks.history.map((kickback, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(kickback.date).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>{kickback.projectName}</TableCell>
                        <TableCell>{KickbackLabels[kickback.type]}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {industryHelpers.formatAmount(kickback.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRiskColor(kickback.risk)} bg-transparent border`}>
                            {kickback.risk}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет истории откатов</div>
                  <div className="text-sm text-gray-600">
                    Откаты от промышленных проектов будут отображаться здесь
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustryManager;
