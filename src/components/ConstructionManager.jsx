import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
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
  Building,
  Home,
  Factory,
  Zap,
  Users,
  Car,
  Leaf,
  Droplets,
  Flame,
  Wifi,
  Trash2,
  Lightbulb,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  Target,
  Award,
  Shield,
  Hammer,
  Wrench,
  Truck,
  Calendar,
  FileText,
  AlertCircle,
  Info,
  Star,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Edit,
  Play,
  Pause,
  Square,
  RotateCcw,
  ExternalLink,
  Download,
  Upload,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  ConstructionTypes,
  ConstructionTypeLabels,
  BuildingCategories,
  BuildingCategoryLabels,
  UtilityTypes,
  UtilityTypeLabels,
  ConstructionPhases,
  ConstructionPhaseLabels,
  Districts,
  DistrictLabels,
  constructionProjects,
  utilityServices,
  constructionHelpers 
} from '../types/construction.js';

const ConstructionManager = () => {
  const { gameState, actions } = useGame();
  const [selectedKickbacks, setSelectedKickbacks] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('cost');

  const constructionState = gameState.constructionState || {};
  const activeProjects = constructionState.activeProjects || [];
  const completedProjects = constructionState.completedProjects || [];
  const utilities = constructionState.utilities || {};
  const districts = constructionState.districts || {};
  const constructionMetrics = constructionState.constructionMetrics || {};

  const getConstructionIcon = (type) => {
    const icons = {
      [ConstructionTypes.RESIDENTIAL]: Home,
      [ConstructionTypes.COMMERCIAL]: Building,
      [ConstructionTypes.INDUSTRIAL]: Factory,
      [ConstructionTypes.INFRASTRUCTURE]: Zap,
      [ConstructionTypes.PUBLIC]: Users,
      [ConstructionTypes.RECREATIONAL]: Star,
      [ConstructionTypes.TRANSPORT]: Car,
      [ConstructionTypes.UTILITIES]: Settings
    };
    return icons[type] || Building;
  };

  const getUtilityIcon = (type) => {
    const icons = {
      [UtilityTypes.WATER_SUPPLY]: Droplets,
      [UtilityTypes.SEWERAGE]: Droplets,
      [UtilityTypes.HEATING]: Flame,
      [UtilityTypes.ELECTRICITY]: Zap,
      [UtilityTypes.GAS]: Flame,
      [UtilityTypes.INTERNET]: Wifi,
      [UtilityTypes.WASTE_MANAGEMENT]: Trash2,
      [UtilityTypes.STREET_LIGHTING]: Lightbulb
    };
    return icons[type] || Settings;
  };

  const getPhaseColor = (phase) => {
    const colors = {
      [ConstructionPhases.PLANNING]: 'bg-blue-100 text-blue-800',
      [ConstructionPhases.PERMITS]: 'bg-yellow-100 text-yellow-800',
      [ConstructionPhases.FOUNDATION]: 'bg-orange-100 text-orange-800',
      [ConstructionPhases.CONSTRUCTION]: 'bg-purple-100 text-purple-800',
      [ConstructionPhases.FINISHING]: 'bg-indigo-100 text-indigo-800',
      [ConstructionPhases.COMMISSIONING]: 'bg-green-100 text-green-800',
      [ConstructionPhases.COMPLETED]: 'bg-green-100 text-green-800'
    };
    return colors[phase] || 'bg-gray-100 text-gray-800';
  };

  const handleStartProject = (projectId, kickbacks = []) => {
    actions.startConstructionProject(projectId, kickbacks);
    setSelectedKickbacks([]);
  };

  const handleUpgradeUtility = (utilityId) => {
    actions.upgradeUtility(utilityId);
  };

  const filteredProjects = constructionProjects
    .filter(project => filterType === 'all' || project.type === filterType)
    .filter(project => filterDistrict === 'all' || project.district === filterDistrict)
    .filter(project => !activeProjects.some(active => active.id === project.id))
    .filter(project => !completedProjects.some(completed => completed.id === project.id))
    .sort((a, b) => {
      switch (sortBy) {
        case 'cost': return a.cost - b.cost;
        case 'duration': return a.duration - b.duration;
        case 'priority': return constructionHelpers.calculateProjectPriority(b, gameState) - 
                               constructionHelpers.calculateProjectPriority(a, gameState);
        default: return 0;
      }
    });

  const overallUtilityQuality = constructionHelpers.calculateUtilityQuality(utilities);
  const averageInfrastructure = Object.values(districts).reduce((sum, district) =>
    sum + district.infrastructure_quality, 0) / Object.keys(districts).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Строительство и ЖКХ</h2>
          <p className="text-gray-600">
            Управление строительными проектами и коммунальными услугами
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Активных проектов: {activeProjects.length}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Качество ЖКХ: {overallUtilityQuality}%
          </Badge>
        </div>
      </div>

      {/* Основные показатели */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общие инвестиции</p>
                <p className="text-2xl font-bold text-green-600">
                  {constructionHelpers.formatAmount(constructionMetrics.totalInvestment || 0)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Создано рабочих мест</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(constructionMetrics.jobsCreated || 0).toLocaleString('ru-RU')}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Построено жилья</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(constructionMetrics.housingUnitsBuilt || 0).toLocaleString('ru-RU')}
                </p>
              </div>
              <Home className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Индекс инфраструктуры</p>
                <p className={`text-2xl font-bold ${constructionHelpers.getQualityColor(averageInfrastructure)}`}>
                  {averageInfrastructure.toFixed(0)}%
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="utilities">ЖКХ</TabsTrigger>
          <TabsTrigger value="districts">Районы</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        {/* Строительные проекты */}
        <TabsContent value="projects" className="space-y-6">
          {/* Активные проекты */}
          {activeProjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Активные проекты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.map((project) => {
                    const ConstructionIcon = getConstructionIcon(project.type);
                    const progress = ((project.elapsed_time || 0) / project.duration) * 100;
                    
                    return (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <ConstructionIcon className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-600">{DistrictLabels[project.district]}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getPhaseColor(project.current_phase)}>
                                {ConstructionPhaseLabels[project.current_phase]}
                              </Badge>
                              <Progress value={progress} className="w-32" />
                              <span className="text-xs text-gray-500">{progress.toFixed(0)}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Осталось месяцев</div>
                          <div className="font-bold">{project.duration - (project.elapsed_time || 0)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Фильтры и сортировка */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры:</span>
                </div>
                
                <div>
                  <Label htmlFor="type-filter" className="text-xs">Тип</Label>
                  <select
                    id="type-filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все типы</option>
                    {Object.entries(ConstructionTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="district-filter" className="text-xs">Район</Label>
                  <select
                    id="district-filter"
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все районы</option>
                    {Object.entries(DistrictLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="sort-by" className="text-xs">Сортировка</Label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="cost">По стоимости</option>
                    <option value="duration">По времени</option>
                    <option value="priority">По приоритету</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Доступные проекты */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const ConstructionIcon = getConstructionIcon(project.type);
              const requirements = constructionHelpers.checkProjectRequirements(project, gameState);
              const risks = constructionHelpers.evaluateProjectRisks(project, gameState);
              const economicImpact = constructionHelpers.calculateEconomicImpact(project);
              const priority = constructionHelpers.calculateProjectPriority(project, gameState);
              
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ConstructionIcon className="w-5 h-5 text-blue-600" />
                        <span>{project.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {ConstructionTypeLabels[project.type]}
                        </Badge>
                        <Badge className={`${
                          priority >= 70 ? 'bg-red-100 text-red-800' :
                          priority >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          Приоритет: {priority}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Стоимость</div>
                        <div className="font-bold text-green-600">
                          {constructionHelpers.formatAmount(project.cost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Длительность</div>
                        <div className="font-medium">{project.duration} мес.</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Район</div>
                        <div className="font-medium">{DistrictLabels[project.district]}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">ROI</div>
                        <div className={`font-medium ${
                          economicImpact.roi_percentage > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {economicImpact.roi_percentage.toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* Основные выгоды */}
                    <div>
                      <div className="text-sm font-medium mb-2">Основные выгоды:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(project.benefits).slice(0, 3).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Статус требований */}
                    <div className="flex items-center gap-2">
                      {requirements.all_met ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Требования выполнены
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Требования не выполнены
                        </Badge>
                      )}
                      
                      <Badge className={`${
                        risks.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                        risks.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Риск: {risks.risk_level}
                      </Badge>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                          disabled={!requirements.all_met}
                        >
                          Подробнее
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <ConstructionIcon className="w-6 h-6" />
                            {project.name}
                          </DialogTitle>
                          <DialogDescription>
                            {ConstructionTypeLabels[project.type]} • {DistrictLabels[project.district]}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Основная информация */}
                          <div>
                            <h4 className="font-medium mb-3">Основная информация</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Стоимость</div>
                                <div className="font-bold text-green-600">
                                  {constructionHelpers.formatAmount(project.cost)}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Длительность</div>
                                <div className="font-medium">{project.duration} месяцев</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Площадь</div>
                                <div className="font-medium">{project.area?.toLocaleString('ru-RU')} кв.м</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Вместимость</div>
                                <div className="font-medium">{project.capacity?.toLocaleString('ru-RU')}</div>
                              </div>
                            </div>
                          </div>

                          {/* Экономический анализ */}
                          <div>
                            <h4 className="font-medium mb-3">Экономический анализ</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Общий эффект</div>
                                <div className="font-bold text-green-600">
                                  {constructionHelpers.formatAmount(economicImpact.total_impact)}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Окупаемость</div>
                                <div className="font-medium">
                                  {economicImpact.payback_period.toFixed(1)} лет
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">ROI</div>
                                <div className={`font-bold ${
                                  economicImpact.roi_percentage > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {economicImpact.roi_percentage.toFixed(0)}%
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Выгоды */}
                          <div>
                            <h4 className="font-medium mb-3">Ожидаемые выгоды</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(project.benefits).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                  <span className="font-medium">
                                    {typeof value === 'object' ? JSON.stringify(value) :
                                     typeof value === 'number' && value > 1000000 ? 
                                     constructionHelpers.formatAmount(value) : 
                                     value.toLocaleString('ru-RU')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Возможности откатов */}
                          <div>
                            <h4 className="font-medium mb-3">Возможности получения откатов</h4>
                            <div className="space-y-3">
                              {Object.entries(project.kickback_opportunities).map(([type, data]) => (
                                <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={selectedKickbacks.includes(type)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedKickbacks([...selectedKickbacks, type]);
                                        } else {
                                          setSelectedKickbacks(selectedKickbacks.filter(k => k !== type));
                                        }
                                      }}
                                    />
                                    <div>
                                      <div className="font-medium capitalize">{type.replace('_', ' ')}</div>
                                      <div className="text-sm text-gray-600">{data.percentage}% от стоимости</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-green-600">
                                      {constructionHelpers.formatAmount(data.amount)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Риск: {Math.round(data.percentage * 2)}%
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {selectedKickbacks.length > 0 && (
                              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-3">
                                <div className="font-medium mb-2">Итого откатов:</div>
                                <div className="text-lg font-bold text-green-600">
                                  {constructionHelpers.formatAmount(
                                    selectedKickbacks.reduce((sum, type) => 
                                      sum + project.kickback_opportunities[type].amount, 0
                                    )
                                  )}
                                </div>
                                <div className="text-sm text-yellow-700 mt-1">
                                  Общий риск коррупционного расследования увеличится
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Риски */}
                          <div>
                            <h4 className="font-medium mb-3">Анализ рисков</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(project.risks).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                  <span className={`font-medium ${
                                    value > 30 ? 'text-red-600' : value > 15 ? 'text-yellow-600' : 'text-green-600'
                                  }`}>
                                    {value}%
                                  </span>
                                </div>
                              ))}
                            </div>
                            
                            <div className={`p-3 rounded-lg mt-3 ${
                              risks.risk_level === 'low' ? 'bg-green-50 text-green-800' :
                              risks.risk_level === 'medium' ? 'bg-yellow-50 text-yellow-800' :
                              'bg-red-50 text-red-800'
                            }`}>
                              <div className="font-medium">
                                Общий уровень риска: {risks.risk_level}
                              </div>
                              {risks.recommendations.length > 0 && (
                                <div className="text-sm mt-1">
                                  Рекомендации: {risks.recommendations.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Требования */}
                          <div>
                            <h4 className="font-medium mb-3">Требования к проекту</h4>
                            <div className="space-y-2">
                              {Object.entries(requirements).map(([key, met]) => (
                                key !== 'all_met' && (
                                  <div key={key} className="flex items-center gap-2">
                                    {met ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <AlertTriangle className="w-4 h-4 text-red-600" />
                                    )}
                                    <span className={met ? 'text-green-800' : 'text-red-800'}>
                                      {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                                    </span>
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedKickbacks([]);
                              }}
                              className="flex-1"
                            >
                              Отмена
                            </Button>
                            {requirements.all_met && (
                              <Button 
                                onClick={() => handleStartProject(project.id, selectedKickbacks)}
                                className="flex-1"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Начать проект
                              </Button>
                            )}
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

        {/* Коммунальные услуги */}
        <TabsContent value="utilities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(utilities).map(([type, data]) => {
              const UtilityIcon = getUtilityIcon(type);
              const averageScore = (data.coverage * 0.6 + data.quality * 0.4);
              
              return (
                <Card key={type} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UtilityIcon className="w-5 h-5 text-blue-600" />
                        <span>{UtilityTypeLabels[type]}</span>
                      </div>
                      <Badge className={`${
                        averageScore >= 80 ? 'bg-green-100 text-green-800' :
                        averageScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {averageScore.toFixed(0)}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Покрытие</span>
                          <span className={constructionHelpers.getCoverageColor(data.coverage)}>
                            {data.coverage}%
                          </span>
                        </div>
                        <Progress value={data.coverage} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Качество</span>
                          <span className={constructionHelpers.getQualityColor(data.quality)}>
                            {data.quality}%
                          </span>
                        </div>
                        <Progress value={data.quality} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Удовлетворенность</span>
                          <span className={constructionHelpers.getQualityColor(data.satisfaction)}>
                            {data.satisfaction}%
                          </span>
                        </div>
                        <Progress value={data.satisfaction} />
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                        >
                          <Wrench className="w-4 h-4 mr-2" />
                          Модернизировать
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <UtilityIcon className="w-6 h-6" />
                            Модернизация: {UtilityTypeLabels[type]}
                          </DialogTitle>
                          <DialogDescription>
                            Улучшение качества и покрытия коммунальной услуги
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Текущее состояние */}
                          <div>
                            <h4 className="font-medium mb-3">Текущее состояние</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Покрытие</div>
                                <div className="font-bold">{data.coverage}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Качество</div>
                                <div className="font-bold">{data.quality}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Удовлетворенность</div>
                                <div className="font-bold">{data.satisfaction}%</div>
                              </div>
                            </div>
                          </div>

                          {/* Доступные улучшения */}
                          <div>
                            <h4 className="font-medium mb-3">Доступные улучшения</h4>
                            <div className="space-y-3">
                              {utilityServices
                                .filter(service => service.type === type)
                                .map((service) => (
                                  <div key={service.id} className="p-3 border rounded-lg">
                                    <div className="font-medium mb-2">{service.name}</div>
                                    <div className="text-sm text-gray-600 mb-3">{service.description}</div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <div className="text-gray-600">Стоимость</div>
                                        <div className="font-bold text-green-600">
                                          {constructionHelpers.formatAmount(service.cost)}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-gray-600">Длительность</div>
                                        <div className="font-medium">{service.duration} мес.</div>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-3">
                                      <div className="text-sm font-medium mb-1">Улучшения:</div>
                                      <div className="text-xs text-gray-600">
                                        Покрытие: +{service.benefits.coverage_increase}%, 
                                        Качество: +{service.benefits.quality_increase}%
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button
                              variant="outline"
                              className="flex-1"
                            >
                              Отмена
                            </Button>
                            <Button 
                              onClick={() => handleUpgradeUtility(type)}
                              className="flex-1"
                            >
                              <Wrench className="w-4 h-4 mr-2" />
                              Начать модернизацию
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

        {/* Районы города */}
        <TabsContent value="districts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(districts).map(([districtId, data]) => (
              <Card key={districtId} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{DistrictLabels[districtId]}</span>
                    </div>
                    <Badge variant="outline">
                      {data.population.toLocaleString('ru-RU')} чел.
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Жилых единиц</div>
                      <div className="font-medium">{data.housing_units.toLocaleString('ru-RU')}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Коммерческих зданий</div>
                      <div className="font-medium">{data.commercial_buildings.toLocaleString('ru-RU')}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Промышленных объектов</div>
                      <div className="font-medium">{data.industrial_facilities}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Качество инфраструктуры</div>
                      <div className={`font-medium ${constructionHelpers.getQualityColor(data.infrastructure_quality)}`}>
                        {data.infrastructure_quality}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Качество инфраструктуры</div>
                    <Progress value={data.infrastructure_quality} />
                  </div>

                  <div className="text-xs text-gray-500">
                    Плотность населения: {Math.round(data.population / 100)} чел./км²
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Аналитика */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Статистика проектов */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика проектов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Всего проектов</div>
                    <div className="text-2xl font-bold">{constructionMetrics.totalProjects || 0}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Активных проектов</div>
                    <div className="text-xl font-semibold text-blue-600">{activeProjects.length}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Завершенных проектов</div>
                    <div className="text-xl font-semibold text-green-600">{completedProjects.length}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Общие инвестиции</div>
                    <div className="text-lg font-semibold">
                      {constructionHelpers.formatAmount(constructionMetrics.totalInvestment || 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Качество ЖКХ по типам */}
            <Card>
              <CardHeader>
                <CardTitle>Качество ЖКХ по типам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(utilities).map(([type, data]) => {
                    const UtilityIcon = getUtilityIcon(type);
                    const score = (data.coverage * 0.6 + data.quality * 0.4);
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UtilityIcon className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{UtilityTypeLabels[type]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={score} className="w-20" />
                          <span className={`text-sm font-medium ${constructionHelpers.getQualityColor(score)}`}>
                            {score.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* История завершенных проектов */}
          <Card>
            <CardHeader>
              <CardTitle>История завершенных проектов</CardTitle>
            </CardHeader>
            <CardContent>
              {completedProjects.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Проект</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Район</TableHead>
                      <TableHead>Стоимость</TableHead>
                      <TableHead>Дата завершения</TableHead>
                      <TableHead>Результат</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedProjects.slice(-10).reverse().map((project, index) => (
                      <TableRow key={index}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{ConstructionTypeLabels[project.type]}</TableCell>
                        <TableCell>{DistrictLabels[project.district]}</TableCell>
                        <TableCell>{constructionHelpers.formatAmount(project.cost)}</TableCell>
                        <TableCell>
                          {project.completedDate ? 
                            new Date(project.completedDate).toLocaleDateString('ru-RU') : 'Н/Д'}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Успешно
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет завершенных проектов</div>
                  <div className="text-sm text-gray-600">
                    Завершенные проекты будут отображаться здесь
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

export default ConstructionManager;
