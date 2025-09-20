import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Slider } from '@/components/ui/slider.jsx';
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  FileText,
  Building,
  Users,
  Briefcase,
  Home,
  Car,
  Leaf,
  Shield,
  GraduationCap,
  Heart,
  Palette,
  Zap,
  CreditCard,
  Percent,
  ArrowUp,
  ArrowDown,
  Equal,
  Plus,
  Minus,
  Eye,
  Edit,
  Save,
  X,
  Info,
  Lightbulb,
  Award,
  AlertCircle
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  TaxTypes,
  TaxTypeLabels,
  RevenueCategories,
  RevenueCategoryLabels,
  ExpenditureCategories,
  ExpenditureCategoryLabels,
  TaxPolicyTypes,
  TaxPolicyLabels,
  taxPolicies,
  taxationHelpers 
} from '../types/taxation.js';

const TaxationManager = () => {
  const { gameState, actions } = useGame();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetChanges, setBudgetChanges] = useState({});
  const [selectedTax, setSelectedTax] = useState(null);
  const [newTaxRate, setNewTaxRate] = useState(0);

  const taxationState = gameState.taxationState || {};
  const currentRates = taxationState.currentRates || {};
  const taxBase = taxationState.taxBase || {};
  const collectionEfficiency = taxationState.collectionEfficiency || {};
  const revenueStructure = taxationState.revenueStructure || {};
  const expenditureStructure = taxationState.expenditureStructure || {};
  const taxMetrics = taxationState.taxMetrics || {};
  const debt = taxationState.debt || {};
  const activePolicies = taxationState.activePolicies || [];

  const getTaxIcon = (taxType) => {
    const icons = {
      [TaxTypes.INCOME_TAX]: Users,
      [TaxTypes.PROPERTY_TAX]: Home,
      [TaxTypes.LAND_TAX]: Building,
      [TaxTypes.TRANSPORT_TAX]: Car,
      [TaxTypes.BUSINESS_TAX]: Briefcase,
      [TaxTypes.SALES_TAX]: DollarSign,
      [TaxTypes.EXCISE_TAX]: Percent,
      [TaxTypes.TOURIST_TAX]: Users,
      [TaxTypes.ADVERTISING_TAX]: Eye,
      [TaxTypes.ENVIRONMENTAL_TAX]: Leaf
    };
    return icons[taxType] || DollarSign;
  };

  const getRevenueIcon = (category) => {
    const icons = {
      [RevenueCategories.FEDERAL_TRANSFERS]: Building,
      [RevenueCategories.REGIONAL_TRANSFERS]: Building,
      [RevenueCategories.LOCAL_TAXES]: DollarSign,
      [RevenueCategories.BUSINESS_INCOME]: Briefcase,
      [RevenueCategories.PROPERTY_INCOME]: Home,
      [RevenueCategories.FINES_PENALTIES]: AlertTriangle,
      [RevenueCategories.LICENSES_PERMITS]: FileText,
      [RevenueCategories.MUNICIPAL_SERVICES]: Settings,
      [RevenueCategories.GRANTS_SUBSIDIES]: Award,
      [RevenueCategories.BORROWING]: CreditCard
    };
    return icons[category] || DollarSign;
  };

  const getExpenditureIcon = (category) => {
    const icons = {
      [ExpenditureCategories.ADMINISTRATION]: Building,
      [ExpenditureCategories.EDUCATION]: GraduationCap,
      [ExpenditureCategories.HEALTHCARE]: Heart,
      [ExpenditureCategories.SOCIAL_SERVICES]: Users,
      [ExpenditureCategories.INFRASTRUCTURE]: Zap,
      [ExpenditureCategories.TRANSPORT]: Car,
      [ExpenditureCategories.HOUSING_UTILITIES]: Home,
      [ExpenditureCategories.CULTURE_SPORTS]: Palette,
      [ExpenditureCategories.ENVIRONMENT]: Leaf,
      [ExpenditureCategories.SECURITY]: Shield,
      [ExpenditureCategories.DEBT_SERVICE]: CreditCard,
      [ExpenditureCategories.RESERVES]: Target
    };
    return icons[category] || DollarSign;
  };

  const calculateTaxRevenue = (taxType) => {
    const rate = currentRates[taxType] || 0;
    const base = taxBase[taxType] || 0;
    const efficiency = collectionEfficiency[taxType] || 0;
    return taxationHelpers.calculateTaxRevenue(taxType, rate, base, efficiency);
  };

  const totalTaxRevenue = Object.keys(currentRates).reduce((total, taxType) => {
    return total + calculateTaxRevenue(taxType);
  }, 0);

  const budgetBalance = taxationHelpers.analyzeBudgetBalance(revenueStructure, expenditureStructure);
  const debtBurden = taxationHelpers.calculateDebtBurden(debt, budgetBalance.total_revenue);

  const handleImplementPolicy = (policyId) => {
    actions.implementTaxPolicy(policyId);
    setSelectedPolicy(null);
  };

  const handleChangeTaxRate = (taxType, newRate) => {
    actions.changeTaxRate(taxType, newRate);
    setSelectedTax(null);
    setNewTaxRate(0);
  };

  const handleBudgetReallocation = () => {
    actions.reallocateBudget(budgetChanges);
    setEditingBudget(false);
    setBudgetChanges({});
  };

  const availablePolicies = taxPolicies.filter(policy => 
    !activePolicies.some(active => active.id === policy.id)
  );

  const recommendations = taxationHelpers.generateTaxRecommendations(taxationState, gameState);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Налоги и бюджет</h2>
          <p className="text-gray-600">
            Управление налоговой системой и распределение бюджетных средств
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Доходы: {taxationHelpers.formatAmount(budgetBalance.total_revenue)}
          </Badge>
          <Badge variant="outline" className={`flex items-center gap-2 ${
            budgetBalance.status === 'surplus' ? 'text-green-600' : 'text-red-600'
          }`}>
            {budgetBalance.status === 'surplus' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {budgetBalance.status === 'surplus' ? 'Профицит' : 'Дефицит'}: {taxationHelpers.formatAmount(Math.abs(budgetBalance.balance))}
          </Badge>
        </div>
      </div>

      {/* Основные показатели */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Налоговое бремя</p>
                <p className={`text-2xl font-bold ${taxationHelpers.getMetricColor(taxMetrics.taxBurden, 'burden')}`}>
                  {taxationHelpers.formatPercentage(taxMetrics.taxBurden || 28)}
                </p>
              </div>
              <Percent className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Собираемость</p>
                <p className={`text-2xl font-bold ${taxationHelpers.getMetricColor(taxMetrics.collectionRate, 'efficiency')}`}>
                  {taxationHelpers.formatPercentage(taxMetrics.collectionRate || 75)}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Удовлетворенность</p>
                <p className={`text-2xl font-bold ${taxationHelpers.getMetricColor(taxMetrics.taxpayerSatisfaction, 'satisfaction')}`}>
                  {taxationHelpers.formatPercentage(taxMetrics.taxpayerSatisfaction || 45)}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Долговая нагрузка</p>
                <p className={`text-2xl font-bold ${
                  debtBurden.sustainability === 'sustainable' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {taxationHelpers.formatPercentage(debtBurden.debt_to_revenue || 10)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Рекомендации */}
      {recommendations.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Lightbulb className="w-5 h-5" />
              Рекомендации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className={`p-1 rounded ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-yellow-800">{rec.title}</div>
                    <div className="text-sm text-yellow-700">{rec.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="taxes">Налоги</TabsTrigger>
          <TabsTrigger value="budget">Бюджет</TabsTrigger>
          <TabsTrigger value="policies">Политики</TabsTrigger>
          <TabsTrigger value="debt">Долг</TabsTrigger>
        </TabsList>

        {/* Обзор */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Структура доходов */}
            <Card>
              <CardHeader>
                <CardTitle>Структура доходов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(revenueStructure).map(([category, data]) => {
                    const RevenueIcon = getRevenueIcon(category);
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RevenueIcon className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{RevenueCategoryLabels[category]}</div>
                            <div className="text-sm text-gray-500">{data.percentage}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{taxationHelpers.formatAmount(data.amount)}</div>
                          {!data.controllable && (
                            <Badge variant="outline" className="text-xs">Неуправляемо</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Структура расходов */}
            <Card>
              <CardHeader>
                <CardTitle>Структура расходов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(expenditureStructure).map(([category, data]) => {
                    const ExpenditureIcon = getExpenditureIcon(category);
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ExpenditureIcon className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="font-medium">{ExpenditureCategoryLabels[category]}</div>
                            <div className="text-sm text-gray-500">{data.percentage}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{taxationHelpers.formatAmount(data.amount)}</div>
                          {data.mandatory && (
                            <Badge variant="outline" className="text-xs">Обязательно</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Бюджетный баланс */}
          <Card>
            <CardHeader>
              <CardTitle>Бюджетный баланс</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {taxationHelpers.formatAmount(budgetBalance.total_revenue)}
                  </div>
                  <div className="text-sm text-gray-600">Общие доходы</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {taxationHelpers.formatAmount(budgetBalance.total_expenditure)}
                  </div>
                  <div className="text-sm text-gray-600">Общие расходы</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${
                    budgetBalance.status === 'surplus' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {budgetBalance.status === 'surplus' ? '+' : ''}{taxationHelpers.formatAmount(budgetBalance.balance)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {budgetBalance.status === 'surplus' ? 'Профицит' : 'Дефицит'} 
                    ({taxationHelpers.formatPercentage(Math.abs(budgetBalance.balance_percentage))})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Налоги */}
        <TabsContent value="taxes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(currentRates).map(([taxType, rate]) => {
              const TaxIcon = getTaxIcon(taxType);
              const revenue = calculateTaxRevenue(taxType);
              const base = taxBase[taxType] || 0;
              const efficiency = collectionEfficiency[taxType] || 0;
              
              return (
                <Card key={taxType} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TaxIcon className="w-5 h-5 text-blue-600" />
                        <span>{TaxTypeLabels[taxType]}</span>
                      </div>
                      <Badge variant="outline">
                        {taxationHelpers.formatPercentage(rate)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Налоговая база</div>
                        <div className="font-medium">{taxationHelpers.formatAmount(base)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Собираемость</div>
                        <div className="font-medium">{taxationHelpers.formatPercentage(efficiency)}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-600">Поступления в год</div>
                        <div className="font-bold text-green-600">{taxationHelpers.formatAmount(revenue)}</div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            setSelectedTax(taxType);
                            setNewTaxRate(rate);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Изменить ставку
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <TaxIcon className="w-6 h-6" />
                            {TaxTypeLabels[taxType]}
                          </DialogTitle>
                          <DialogDescription>
                            Изменение налоговой ставки
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="tax-rate">Новая ставка (%)</Label>
                            <div className="flex items-center gap-4 mt-2">
                              <Slider
                                value={[newTaxRate]}
                                onValueChange={(value) => setNewTaxRate(value[0])}
                                max={50}
                                min={0}
                                step={0.1}
                                className="flex-1"
                              />
                              <Input
                                id="tax-rate"
                                type="number"
                                value={newTaxRate}
                                onChange={(e) => setNewTaxRate(Number(e.target.value))}
                                className="w-20"
                                min={0}
                                max={50}
                                step={0.1}
                              />
                            </div>
                          </div>

                          {/* Прогноз изменений */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium mb-3">Прогноз изменений:</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">Текущие поступления</div>
                                <div className="font-medium">{taxationHelpers.formatAmount(revenue)}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Новые поступления</div>
                                <div className="font-medium">
                                  {taxationHelpers.formatAmount(
                                    taxationHelpers.calculateTaxRevenue(taxType, newTaxRate, base, efficiency)
                                  )}
                                </div>
                              </div>
                              <div className="col-span-2">
                                <div className="text-gray-600">Изменение</div>
                                <div className={`font-bold ${
                                  newTaxRate > rate ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {newTaxRate > rate ? '+' : ''}
                                  {taxationHelpers.formatAmount(
                                    taxationHelpers.calculateTaxRevenue(taxType, newTaxRate, base, efficiency) - revenue
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setSelectedTax(null);
                                setNewTaxRate(0);
                              }}
                              className="flex-1"
                            >
                              Отмена
                            </Button>
                            <Button 
                              onClick={() => handleChangeTaxRate(taxType, newTaxRate)}
                              className="flex-1"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Применить
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

        {/* Бюджет */}
        <TabsContent value="budget" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Распределение бюджета</h3>
            <Button 
              onClick={() => setEditingBudget(!editingBudget)}
              variant={editingBudget ? "destructive" : "default"}
            >
              {editingBudget ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Отмена
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </>
              )}
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Категория</TableHead>
                    <TableHead>Текущая сумма</TableHead>
                    <TableHead>Процент</TableHead>
                    {editingBudget && <TableHead>Новая сумма</TableHead>}
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(expenditureStructure).map(([category, data]) => {
                    const ExpenditureIcon = getExpenditureIcon(category);
                    const newAmount = budgetChanges[category] || data.amount;
                    
                    return (
                      <TableRow key={category}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ExpenditureIcon className="w-4 h-4 text-blue-600" />
                            <span>{ExpenditureCategoryLabels[category]}</span>
                          </div>
                        </TableCell>
                        <TableCell>{taxationHelpers.formatAmount(data.amount)}</TableCell>
                        <TableCell>{taxationHelpers.formatPercentage(data.percentage)}</TableCell>
                        {editingBudget && (
                          <TableCell>
                            <Input
                              type="number"
                              value={newAmount}
                              onChange={(e) => setBudgetChanges({
                                ...budgetChanges,
                                [category]: Number(e.target.value)
                              })}
                              disabled={data.mandatory}
                              className="w-32"
                            />
                          </TableCell>
                        )}
                        <TableCell>
                          {data.mandatory ? (
                            <Badge variant="outline">Обязательно</Badge>
                          ) : (
                            <Badge variant="secondary">Гибко</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {editingBudget && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button onClick={handleBudgetReallocation}>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Налоговые политики */}
        <TabsContent value="policies" className="space-y-6">
          {/* Активные политики */}
          {activePolicies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Активные политики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activePolicies.map((policy) => (
                    <div key={policy.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">{policy.name}</div>
                        <div className="text-sm text-gray-600">{policy.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Осталось месяцев</div>
                        <div className="font-bold">{policy.remainingTime || policy.implementation_time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Доступные политики */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availablePolicies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{policy.name}</span>
                    <Badge variant="outline">
                      {TaxPolicyLabels[policy.type]}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{policy.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Стоимость</div>
                      <div className="font-medium">{taxationHelpers.formatAmount(policy.cost)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Время внедрения</div>
                      <div className="font-medium">{policy.implementation_time} мес.</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Изменение доходов</div>
                      <div className={`font-medium ${
                        policy.consequences.revenue_change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {policy.consequences.revenue_change > 0 ? '+' : ''}
                        {taxationHelpers.formatAmount(policy.consequences.revenue_change)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Политические издержки</div>
                      <div className={`font-medium ${
                        policy.political_cost > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {policy.political_cost > 0 ? '+' : ''}{policy.political_cost}
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full"
                        onClick={() => setSelectedPolicy(policy)}
                      >
                        Подробнее
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{policy.name}</DialogTitle>
                        <DialogDescription>
                          {TaxPolicyLabels[policy.type]}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Описание</h4>
                          <p className="text-gray-600">{policy.description}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Параметры внедрения</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-600">Стоимость внедрения</div>
                              <div className="font-medium">{taxationHelpers.formatAmount(policy.cost)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Время внедрения</div>
                              <div className="font-medium">{policy.implementation_time} месяцев</div>
                            </div>
                            {policy.targetTax !== 'all' && (
                              <div className="col-span-2">
                                <div className="text-sm text-gray-600">Целевой налог</div>
                                <div className="font-medium">{TaxTypeLabels[policy.targetTax]}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Ожидаемые последствия</h4>
                          <div className="space-y-2">
                            {Object.entries(policy.consequences).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                <span className={`font-medium ${
                                  typeof value === 'number' && value > 0 ? 'text-green-600' : 
                                  typeof value === 'number' && value < 0 ? 'text-red-600' : 'text-gray-800'
                                }`}>
                                  {typeof value === 'object' ? JSON.stringify(value) : 
                                   typeof value === 'number' && Math.abs(value) > 1000000 ? 
                                   taxationHelpers.formatAmount(value) : value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <div className="flex gap-2 w-full">
                          <Button 
                            variant="outline"
                            onClick={() => setSelectedPolicy(null)}
                            className="flex-1"
                          >
                            Отмена
                          </Button>
                          <Button 
                            onClick={() => handleImplementPolicy(policy.id)}
                            className="flex-1"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Внедрить политику
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Долговые обязательства */}
        <TabsContent value="debt" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Текущий долг</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Общий долг</div>
                  <div className="text-2xl font-bold text-red-600">
                    {taxationHelpers.formatAmount(debt.totalDebt || 0)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">К доходам</div>
                    <div className="font-medium">{taxationHelpers.formatPercentage(debtBurden.debt_to_revenue)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Процентная ставка</div>
                    <div className="font-medium">{taxationHelpers.formatPercentage(debt.interestRate || 0)}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Годовое обслуживание</div>
                  <div className="font-bold text-orange-600">
                    {taxationHelpers.formatAmount(debt.annualService || 0)}
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  debtBurden.sustainability === 'sustainable' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <div className="font-medium">
                    {debtBurden.sustainability === 'sustainable' ? 'Устойчивый уровень долга' : 'Рискованный уровень долга'}
                  </div>
                  <div className="text-sm">
                    Доля обслуживания: {taxationHelpers.formatPercentage(debtBurden.debt_service_ratio)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Управление долгом</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Взять кредит
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Minus className="w-4 h-4 mr-2" />
                  Досрочное погашение
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Calculator className="w-4 h-4 mr-2" />
                  Рефинансирование
                </Button>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Совет:</strong> Поддерживайте долговую нагрузку ниже 50% от доходов для обеспечения финансовой устойчивости.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxationManager;
