import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
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
  Wallet,
  Home,
  Car,
  Plane,
  Heart,
  Shield,
  TrendingUp,
  Gift,
  Crown,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Star,
  Award,
  Target,
  BarChart3,
  PieChart,
  TrendingDown,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Banknote,
  Gem,
  Building,
  Ship,
  Music,
  GraduationCap,
  Users,
  Briefcase,
  Lock,
  Coffee,
  Dumbbell,
  HandHeart,
  AlertCircle,
  Info,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Calendar as CalendarIcon,
  FileText,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Download,
  Upload,
  RefreshCw,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  SpendingCategories,
  SpendingCategoryLabels,
  RiskLevels,
  RiskLevelLabels,
  SpendingTypes,
  SpendingTypeLabels,
  personalSpendingOptions,
  personalSpendingHelpers 
} from '../types/personalSpending.js';

const PersonalSpendingManager = () => {
  const { gameState, actions } = useGame();
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('cost');
  const [showRecommendations, setShowRecommendations] = useState(true);

  const personalSpendingState = gameState.personalSpendingState || {};
  const personalFinances = gameState.personalFinances || {};
  const spendingHistory = personalSpendingState.spendingHistory || [];
  const recurringExpenses = personalSpendingState.recurringExpenses || [];
  const assets = personalSpendingState.assets || [];

  const personalAccount = personalFinances.personal_account || 0;
  const detectionRisk = personalSpendingHelpers.calculateDetectionRisk(spendingHistory, gameState);
  const monthlyExpenses = personalSpendingHelpers.calculateMonthlyExpenses(recurringExpenses);
  const assetValue = personalSpendingHelpers.calculateAssetValue(assets, gameState);
  const lifestyleQuality = personalSpendingHelpers.calculateLifestyleQuality(assets, recurringExpenses);
  const familyHappiness = personalSpendingHelpers.calculateFamilyHappiness(spendingHistory, assets);

  const getCategoryIcon = (category) => {
    const icons = {
      [SpendingCategories.LUXURY_GOODS]: Crown,
      [SpendingCategories.REAL_ESTATE]: Home,
      [SpendingCategories.VEHICLES]: Car,
      [SpendingCategories.TRAVEL]: Plane,
      [SpendingCategories.ENTERTAINMENT]: Music,
      [SpendingCategories.FAMILY]: Heart,
      [SpendingCategories.INVESTMENTS]: TrendingUp,
      [SpendingCategories.SECURITY]: Shield,
      [SpendingCategories.LIFESTYLE]: Coffee,
      [SpendingCategories.CHARITY]: HandHeart
    };
    return icons[category] || Wallet;
  };

  const handlePurchase = (optionId, customAmount = null) => {
    actions.makePersonalPurchase(optionId, customAmount);
    setSelectedOption(null);
  };

  const filteredOptions = personalSpendingOptions
    .filter(option => filterCategory === 'all' || option.category === filterCategory)
    .filter(option => filterRisk === 'all' || option.risk_level === filterRisk)
    .sort((a, b) => {
      switch (sortBy) {
        case 'cost': return a.cost - b.cost;
        case 'risk': 
          const riskOrder = { very_low: 1, low: 2, medium: 3, high: 4, very_high: 5 };
          return riskOrder[a.risk_level] - riskOrder[b.risk_level];
        case 'detection': return a.detection_probability - b.detection_probability;
        default: return 0;
      }
    });

  const recommendations = personalSpendingHelpers.generateSpendingRecommendations(gameState);
  const assetAnalysis = personalSpendingHelpers.analyzeAssetPortfolio(assets);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Личные финансы мэра</h2>
          <p className="text-gray-600">
            Управление личными тратами и инвестициями
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Личный счет: {personalSpendingHelpers.formatAmount(personalAccount)}
          </Badge>
          <Badge variant="outline" className={`flex items-center gap-2 ${
            detectionRisk > 60 ? 'border-red-500 text-red-700' :
            detectionRisk > 30 ? 'border-yellow-500 text-yellow-700' :
            'border-green-500 text-green-700'
          }`}>
            <Eye className="w-4 h-4" />
            Риск: {detectionRisk.toFixed(0)}%
          </Badge>
        </div>
      </div>

      {/* Основные показатели */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Стоимость активов</p>
                <p className="text-2xl font-bold text-green-600">
                  {personalSpendingHelpers.formatAmount(assetValue)}
                </p>
              </div>
              <Building className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ежемесячные расходы</p>
                <p className="text-2xl font-bold text-red-600">
                  {personalSpendingHelpers.formatAmount(monthlyExpenses)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Качество жизни</p>
                <p className={`text-2xl font-bold ${
                  lifestyleQuality > 80 ? 'text-green-600' :
                  lifestyleQuality > 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {lifestyleQuality.toFixed(0)}%
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Семейное счастье</p>
                <p className={`text-2xl font-bold ${
                  familyHappiness > 80 ? 'text-green-600' :
                  familyHappiness > 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {familyHappiness.toFixed(0)}%
                </p>
              </div>
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Рекомендации */}
      {showRecommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Рекомендации</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowRecommendations(false)}
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  rec.type === 'danger' ? 'border-red-200 bg-red-50' :
                  rec.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  rec.type === 'opportunity' ? 'border-green-200 bg-green-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {rec.type === 'danger' && <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />}
                    {rec.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                    {rec.type === 'opportunity' && <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />}
                    {rec.type === 'family' && <Heart className="w-5 h-5 text-pink-600 mt-0.5" />}
                    <div>
                      <div className="font-medium">{rec.title}</div>
                      <div className="text-sm text-gray-600">{rec.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="spending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spending">Траты</TabsTrigger>
          <TabsTrigger value="assets">Активы</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        {/* Возможности трат */}
        <TabsContent value="spending" className="space-y-6">
          {/* Фильтры и сортировка */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры:</span>
                </div>
                
                <div>
                  <Label htmlFor="category-filter" className="text-xs">Категория</Label>
                  <select
                    id="category-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все категории</option>
                    {Object.entries(SpendingCategoryLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="risk-filter" className="text-xs">Риск</Label>
                  <select
                    id="risk-filter"
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все уровни</option>
                    {Object.entries(RiskLevelLabels).map(([key, label]) => (
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
                    <option value="risk">По риску</option>
                    <option value="detection">По вероятности обнаружения</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Доступные траты */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOptions.map((option) => {
              const CategoryIcon = getCategoryIcon(option.category);
              const availability = personalSpendingHelpers.checkAvailability(option, gameState);
              const ratingImpact = personalSpendingHelpers.calculateRatingImpact(option, gameState);
              
              return (
                <Card key={option.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5 text-blue-600" />
                        <span>{option.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {SpendingCategoryLabels[option.category]}
                        </Badge>
                        <Badge className={personalSpendingHelpers.getRiskBgColor(option.risk_level)}>
                          {RiskLevelLabels[option.risk_level]}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{option.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Стоимость</div>
                        <div className="font-bold text-green-600">
                          {personalSpendingHelpers.formatAmount(option.cost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Тип</div>
                        <div className="font-medium">{SpendingTypeLabels[option.type]}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Риск обнаружения</div>
                        <div className={`font-medium ${personalSpendingHelpers.getRiskColor(option.risk_level)}`}>
                          {option.detection_probability}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Влияние на рейтинг</div>
                        <div className={`font-medium ${
                          ratingImpact > 0 ? 'text-green-600' : ratingImpact < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {ratingImpact > 0 ? '+' : ''}{ratingImpact.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Основные выгоды */}
                    <div>
                      <div className="text-sm font-medium mb-2">Основные выгоды:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(option.benefits).slice(0, 3).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {typeof value === 'number' ? `+${value}` : value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Статус доступности */}
                    <div className="flex items-center gap-2">
                      {availability.available ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Доступно
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Недоступно
                        </Badge>
                      )}
                      
                      {!availability.funds && (
                        <Badge variant="outline" className="text-red-600">
                          Недостаточно средств
                        </Badge>
                      )}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedOption(option)}
                          disabled={!availability.available}
                        >
                          Подробнее
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <CategoryIcon className="w-6 h-6" />
                            {option.name}
                          </DialogTitle>
                          <DialogDescription>
                            {SpendingCategoryLabels[option.category]} • {SpendingTypeLabels[option.type]}
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
                                  {personalSpendingHelpers.formatAmount(option.cost)}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Уровень риска</div>
                                <div className={`font-medium ${personalSpendingHelpers.getRiskColor(option.risk_level)}`}>
                                  {RiskLevelLabels[option.risk_level]}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Вероятность обнаружения</div>
                                <div className="font-medium">{option.detection_probability}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Тип покупки</div>
                                <div className="font-medium">{SpendingTypeLabels[option.type]}</div>
                              </div>
                            </div>
                          </div>

                          {/* Выгоды */}
                          <div>
                            <h4 className="font-medium mb-3">Ожидаемые выгоды</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(option.benefits).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                  <span className="font-medium text-green-600">
                                    {typeof value === 'object' ? JSON.stringify(value) :
                                     typeof value === 'number' && value > 1000000 ? 
                                     personalSpendingHelpers.formatAmount(value) : 
                                     `+${value}`}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Последствия */}
                          {Object.keys(option.consequences).length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3">Возможные последствия</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(option.consequences).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                    <span className="font-medium text-red-600">
                                      {typeof value === 'object' ? JSON.stringify(value) : `+${value}`}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Требования */}
                          <div>
                            <h4 className="font-medium mb-3">Требования</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                {availability.funds ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                )}
                                <span className={availability.funds ? 'text-green-800' : 'text-red-800'}>
                                  Достаточно средств: {personalSpendingHelpers.formatAmount(option.cost)}
                                </span>
                              </div>
                              
                              {option.requirements.corruption_level_max && (
                                <div className="flex items-center gap-2">
                                  {availability.corruption ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className={availability.corruption ? 'text-green-800' : 'text-red-800'}>
                                    Уровень коррупции не выше {option.requirements.corruption_level_max}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Анализ влияния */}
                          <div>
                            <h4 className="font-medium mb-3">Анализ влияния</h4>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-600">Влияние на рейтинг</div>
                                  <div className={`font-bold ${
                                    ratingImpact > 0 ? 'text-green-600' : 
                                    ratingImpact < 0 ? 'text-red-600' : 'text-gray-600'
                                  }`}>
                                    {ratingImpact > 0 ? '+' : ''}{ratingImpact.toFixed(1)}%
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Риск расследования</div>
                                  <div className="font-bold text-orange-600">
                                    +{option.detection_probability}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button 
                              variant="outline"
                              onClick={() => setSelectedOption(null)}
                              className="flex-1"
                            >
                              Отмена
                            </Button>
                            {availability.available && (
                              <Button 
                                onClick={() => handlePurchase(option.id)}
                                className="flex-1"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Купить
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

        {/* Активы */}
        <TabsContent value="assets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Список активов */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Мои активы</CardTitle>
                </CardHeader>
                <CardContent>
                  {assets.length > 0 ? (
                    <div className="space-y-4">
                      {assets.map((asset, index) => {
                        const option = personalSpendingOptions.find(opt => opt.id === asset.optionId);
                        if (!option) return null;
                        
                        const CategoryIcon = getCategoryIcon(option.category);
                        const currentValue = asset.current_value || asset.purchase_price;
                        const appreciation = currentValue - asset.purchase_price;
                        
                        return (
                          <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <CategoryIcon className="w-6 h-6 text-blue-600" />
                              <div>
                                <div className="font-medium">{option.name}</div>
                                <div className="text-sm text-gray-600">
                                  {SpendingCategoryLabels[option.category]}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Куплено: {new Date(asset.purchase_date).toLocaleDateString('ru-RU')}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">
                                {personalSpendingHelpers.formatAmount(currentValue)}
                              </div>
                              <div className="text-sm text-gray-600">
                                Куплено за: {personalSpendingHelpers.formatAmount(asset.purchase_price)}
                              </div>
                              {appreciation !== 0 && (
                                <div className={`text-xs ${
                                  appreciation > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {appreciation > 0 ? '+' : ''}{personalSpendingHelpers.formatAmount(appreciation)}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <div className="text-lg font-medium mb-1">Нет активов</div>
                      <div className="text-sm text-gray-600">
                        Приобретенные активы будут отображаться здесь
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Анализ портфеля */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Анализ портфеля</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Общая стоимость</div>
                    <div className="text-xl font-bold text-green-600">
                      {personalSpendingHelpers.formatAmount(assetAnalysis.total_value)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600">Доходные активы</div>
                    <div className="text-lg font-semibold">
                      {personalSpendingHelpers.formatAmount(assetAnalysis.income_generating)}/мес
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600">Потенциал роста</div>
                    <div className="text-lg font-semibold">
                      {personalSpendingHelpers.formatAmount(assetAnalysis.appreciation_potential)}/год
                    </div>
                  </div>

                  {/* Диверсификация */}
                  <div>
                    <div className="text-sm font-medium mb-2">Диверсификация</div>
                    <div className="space-y-2">
                      {Object.entries(assetAnalysis.diversification).map(([category, count]) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span>{SpendingCategoryLabels[category]}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Регулярные расходы */}
          <Card>
            <CardHeader>
              <CardTitle>Регулярные расходы</CardTitle>
            </CardHeader>
            <CardContent>
              {recurringExpenses.length > 0 ? (
                <div className="space-y-3">
                  {recurringExpenses.map((expense, index) => {
                    const option = personalSpendingOptions.find(opt => opt.id === expense.optionId);
                    if (!option) return null;
                    
                    const CategoryIcon = getCategoryIcon(option.category);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-600">
                              Активно с: {new Date(expense.start_date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-600">
                            {personalSpendingHelpers.formatAmount(option.cost)}/мес
                          </div>
                          <Button variant="outline" size="sm" className="mt-1">
                            Отменить
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет регулярных расходов</div>
                  <div className="text-sm text-gray-600">
                    Подписки и регулярные услуги будут отображаться здесь
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* История трат */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>История личных трат</CardTitle>
            </CardHeader>
            <CardContent>
              {spendingHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Покупка</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Риск</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spendingHistory.slice(-20).reverse().map((spending, index) => {
                      const option = personalSpendingOptions.find(opt => opt.id === spending.optionId);
                      if (!option) return null;
                      
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(spending.date).toLocaleDateString('ru-RU')}
                          </TableCell>
                          <TableCell>{option.name}</TableCell>
                          <TableCell>{SpendingCategoryLabels[option.category]}</TableCell>
                          <TableCell>
                            {personalSpendingHelpers.formatAmount(spending.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge className={personalSpendingHelpers.getRiskBgColor(option.risk_level)}>
                              {RiskLevelLabels[option.risk_level]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              Завершено
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет истории трат</div>
                  <div className="text-sm text-gray-600">
                    Ваши покупки будут отображаться здесь
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Аналитика */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Статистика трат */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика трат</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Всего потрачено</div>
                    <div className="text-2xl font-bold">
                      {personalSpendingHelpers.formatAmount(personalSpendingState.totalSpent || 0)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Количество покупок</div>
                    <div className="text-xl font-semibold text-blue-600">{spendingHistory.length}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Средняя покупка</div>
                    <div className="text-lg font-semibold">
                      {spendingHistory.length > 0 ? 
                        personalSpendingHelpers.formatAmount(
                          (personalSpendingState.totalSpent || 0) / spendingHistory.length
                        ) : '0 ₽'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Риск обнаружения</div>
                    <div className={`text-lg font-semibold ${
                      detectionRisk > 60 ? 'text-red-600' :
                      detectionRisk > 30 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {detectionRisk.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Показатели качества жизни */}
            <Card>
              <CardHeader>
                <CardTitle>Показатели качества жизни</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Качество жизни</span>
                      <span className={
                        lifestyleQuality > 80 ? 'text-green-600' :
                        lifestyleQuality > 60 ? 'text-yellow-600' : 'text-red-600'
                      }>
                        {lifestyleQuality.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={lifestyleQuality} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Семейное счастье</span>
                      <span className={
                        familyHappiness > 80 ? 'text-green-600' :
                        familyHappiness > 60 ? 'text-yellow-600' : 'text-red-600'
                      }>
                        {familyHappiness.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={familyHappiness} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Личная безопасность</span>
                      <span className="text-blue-600">
                        {personalSpendingState.personalSecurity || 50}%
                      </span>
                    </div>
                    <Progress value={personalSpendingState.personalSecurity || 50} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Социальный статус</span>
                      <span className="text-purple-600">
                        {personalSpendingState.socialStatus || 50}%
                      </span>
                    </div>
                    <Progress value={personalSpendingState.socialStatus || 50} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Распределение трат по категориям */}
          <Card>
            <CardHeader>
              <CardTitle>Распределение трат по категориям</CardTitle>
            </CardHeader>
            <CardContent>
              {spendingHistory.length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(SpendingCategoryLabels).map(([category, label]) => {
                    const categorySpending = spendingHistory
                      .filter(spending => {
                        const option = personalSpendingOptions.find(opt => opt.id === spending.optionId);
                        return option && option.category === category;
                      })
                      .reduce((sum, spending) => sum + spending.amount, 0);
                    
                    const percentage = categorySpending > 0 ? 
                      (categorySpending / (personalSpendingState.totalSpent || 1)) * 100 : 0;
                    
                    if (categorySpending === 0) return null;
                    
                    const CategoryIcon = getCategoryIcon(category);
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-20" />
                          <span className="text-sm font-medium w-16 text-right">
                            {personalSpendingHelpers.formatAmount(categorySpending)}
                          </span>
                          <span className="text-xs text-gray-500 w-8 text-right">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PieChart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет данных для анализа</div>
                  <div className="text-sm text-gray-600">
                    Совершите несколько покупок для получения аналитики
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

export default PersonalSpendingManager;
