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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx';
import { 
  PiggyBank, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  Eye,
  EyeOff,
  Shield,
  Building2,
  GraduationCap,
  Heart,
  Users,
  Palette,
  Zap,
  Leaf,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  BudgetCategories, 
  BudgetCategoryLabels, 
  IncomeTypes, 
  IncomeTypeLabels,
  CorruptionTypes,
  CorruptionTypeLabels,
  PersonalAccountTypes,
  PersonalAccountLabels,
  financeHelpers 
} from '../types/finance.js';

const BudgetManager = () => {
  const { gameState, actions } = useGame();
  const [selectedCategory, setSelectedCategory] = useState(BudgetCategories.INFRASTRUCTURE);
  const [reallocationAmount, setReallocationAmount] = useState(0);
  const [targetCategory, setTargetCategory] = useState('');
  const [corruptionAmount, setCorruptionAmount] = useState(0);
  const [corruptionType, setCorruptionType] = useState(CorruptionTypes.KICKBACKS);
  const [showCorruption, setShowCorruption] = useState(false);

  const financeState = gameState.financeState || {};
  const cityBudget = financeState.cityBudget || {};
  const personalFinances = financeState.personalFinances || {};
  const risks = financeState.risks || {};

  const categoryIcons = {
    [BudgetCategories.INFRASTRUCTURE]: Building2,
    [BudgetCategories.EDUCATION]: GraduationCap,
    [BudgetCategories.HEALTHCARE]: Heart,
    [BudgetCategories.SOCIAL]: Users,
    [BudgetCategories.CULTURE]: Palette,
    [BudgetCategories.SPORTS]: Zap,
    [BudgetCategories.ECOLOGY]: Leaf,
    [BudgetCategories.SECURITY]: Shield,
    [BudgetCategories.ADMINISTRATION]: Settings,
    [BudgetCategories.EMERGENCY]: AlertTriangle
  };

  const handleReallocateFunds = () => {
    if (reallocationAmount > 0 && targetCategory && selectedCategory !== targetCategory) {
      actions.reallocateBudget(selectedCategory, targetCategory, reallocationAmount);
      setReallocationAmount(0);
      setTargetCategory('');
    }
  };

  const handleCorruptionOperation = () => {
    if (corruptionAmount > 0) {
      const result = actions.performCorruption(corruptionType, corruptionAmount, selectedCategory);
      if (result.success) {
        setCorruptionAmount(0);
      }
    }
  };

  const getBudgetStatus = (category) => {
    const allocated = cityBudget.allocated?.[category] || 0;
    const spent = cityBudget.spent?.[category] || 0;
    const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
    
    if (percentage >= 90) return { status: 'critical', color: 'bg-red-500' };
    if (percentage >= 70) return { status: 'warning', color: 'bg-yellow-500' };
    return { status: 'good', color: 'bg-green-500' };
  };

  const getCorruptionRisk = () => {
    const risk = financeHelpers.calculateCorruptionRisk(
      financeState.corruptionHistory || [], 
      risks
    );
    
    if (risk >= 70) return { level: 'high', color: 'text-red-600', icon: XCircle };
    if (risk >= 40) return { level: 'medium', color: 'text-yellow-600', icon: AlertCircle };
    return { level: 'low', color: 'text-green-600', icon: CheckCircle };
  };

  const totalBudget = financeHelpers.getTotalBudget(cityBudget);
  const totalSpent = financeHelpers.getTotalSpent(cityBudget);
  const monthlyIncome = financeHelpers.getMonthlyIncome(cityBudget);
  const monthlyExpenses = financeHelpers.getMonthlyExpenses(cityBudget);
  const personalWealth = financeHelpers.getTotalPersonalWealth(personalFinances);
  const corruptionRisk = getCorruptionRisk();

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Управление бюджетом</h2>
          <p className="text-gray-600">
            Распределение и контроль городских финансов
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant={showCorruption ? "destructive" : "outline"}
            size="sm"
            onClick={() => setShowCorruption(!showCorruption)}
            className="flex items-center gap-2"
          >
            {showCorruption ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showCorruption ? 'Скрыть коррупцию' : 'Показать коррупцию'}
          </Button>
          
          <Badge className={`${corruptionRisk.color} border`}>
            <corruptionRisk.icon className="w-4 h-4 mr-1" />
            Риск: {corruptionRisk.level}
          </Badge>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общий бюджет</p>
                <p className="text-2xl font-bold">{financeHelpers.formatMoney(totalBudget)}</p>
              </div>
              <PiggyBank className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Потрачено</p>
                <p className="text-2xl font-bold">{financeHelpers.formatMoney(totalSpent)}</p>
                <p className="text-xs text-gray-500">
                  {totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0}% от бюджета
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Месячный доход</p>
                <p className="text-2xl font-bold text-green-600">
                  +{financeHelpers.formatMoney(monthlyIncome)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {showCorruption && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Личные средства</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {financeHelpers.formatMoney(personalWealth)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="budget" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="budget">Распределение бюджета</TabsTrigger>
          <TabsTrigger value="income">Доходы и расходы</TabsTrigger>
          {showCorruption && <TabsTrigger value="corruption">Коррупция</TabsTrigger>}
        </TabsList>

        {/* Распределение бюджета */}
        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Категории бюджета */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Категории бюджета</h3>
              <div className="space-y-3">
                {Object.entries(BudgetCategories).map(([key, category]) => {
                  const CategoryIcon = categoryIcons[category];
                  const allocated = cityBudget.allocated?.[category] || 0;
                  const spent = cityBudget.spent?.[category] || 0;
                  const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
                  const budgetStatus = getBudgetStatus(category);
                  
                  return (
                    <Card 
                      key={category}
                      className={`cursor-pointer transition-colors ${
                        selectedCategory === category ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{BudgetCategoryLabels[category]}</span>
                          </div>
                          <Badge variant="outline">
                            {financeHelpers.formatMoney(allocated)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Потрачено: {financeHelpers.formatMoney(spent)}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Управление выбранной категорией */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Управление: {BudgetCategoryLabels[selectedCategory]}
              </h3>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(categoryIcons[selectedCategory], { className: "w-5 h-5" })}
                    {BudgetCategoryLabels[selectedCategory]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Выделено</div>
                      <div className="font-semibold">
                        {financeHelpers.formatMoney(cityBudget.allocated?.[selectedCategory] || 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Потрачено</div>
                      <div className="font-semibold">
                        {financeHelpers.formatMoney(cityBudget.spent?.[selectedCategory] || 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Остаток</div>
                      <div className="font-semibold text-green-600">
                        {financeHelpers.formatMoney(
                          (cityBudget.allocated?.[selectedCategory] || 0) - 
                          (cityBudget.spent?.[selectedCategory] || 0)
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Месячные расходы</div>
                      <div className="font-semibold text-red-600">
                        -{financeHelpers.formatMoney(cityBudget.monthlyExpenses?.[selectedCategory] || 0)}
                      </div>
                    </div>
                  </div>

                  {/* Перераспределение средств */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">Перераспределение средств</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="amount">Сумма</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={reallocationAmount}
                          onChange={(e) => setReallocationAmount(Number(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="target">В категорию</Label>
                        <select
                          id="target"
                          value={targetCategory}
                          onChange={(e) => setTargetCategory(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Выберите категорию</option>
                          {Object.entries(BudgetCategories)
                            .filter(([, cat]) => cat !== selectedCategory)
                            .map(([key, category]) => (
                              <option key={category} value={category}>
                                {BudgetCategoryLabels[category]}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <Button 
                      onClick={handleReallocateFunds}
                      disabled={!reallocationAmount || !targetCategory}
                      className="w-full"
                    >
                      Перераспределить средства
                    </Button>
                  </div>

                  {/* Коррупционные операции */}
                  {showCorruption && (
                    <div className="space-y-3 pt-4 border-t border-yellow-200">
                      <h4 className="font-medium text-yellow-700">Коррупционные операции</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="corruption-amount">Сумма</Label>
                          <Input
                            id="corruption-amount"
                            type="number"
                            value={corruptionAmount}
                            onChange={(e) => setCorruptionAmount(Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="corruption-type">Тип операции</Label>
                          <select
                            id="corruption-type"
                            value={corruptionType}
                            onChange={(e) => setCorruptionType(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            {Object.entries(CorruptionTypes).map(([key, type]) => (
                              <option key={type} value={type}>
                                {CorruptionTypeLabels[type]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive"
                            disabled={!corruptionAmount}
                            className="w-full"
                          >
                            Выполнить операцию
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Подтверждение коррупционной операции</AlertDialogTitle>
                            <AlertDialogDescription>
                              Вы собираетесь выполнить операцию "{CorruptionTypeLabels[corruptionType]}" 
                              на сумму {financeHelpers.formatMoney(corruptionAmount)}. 
                              Это увеличит риск расследования. Продолжить?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCorruptionOperation}>
                              Подтвердить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Доходы и расходы */}
        <TabsContent value="income" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Доходы */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Месячные доходы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(IncomeTypes).map(([key, type]) => {
                  const amount = cityBudget.monthlyIncome?.[type] || 0;
                  const percentage = monthlyIncome > 0 ? (amount / monthlyIncome) * 100 : 0;
                  
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{IncomeTypeLabels[type]}</span>
                          <span className="text-sm font-semibold text-green-600">
                            +{financeHelpers.formatMoney(amount)}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Итого доходов:</span>
                    <span className="font-bold text-green-600">
                      +{financeHelpers.formatMoney(monthlyIncome)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Расходы */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  Месячные расходы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(BudgetCategories).map(([key, category]) => {
                  const amount = cityBudget.monthlyExpenses?.[category] || 0;
                  const percentage = monthlyExpenses > 0 ? (amount / monthlyExpenses) * 100 : 0;
                  const CategoryIcon = categoryIcons[category];
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{BudgetCategoryLabels[category]}</span>
                          </div>
                          <span className="text-sm font-semibold text-red-600">
                            -{financeHelpers.formatMoney(amount)}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Итого расходов:</span>
                    <span className="font-bold text-red-600">
                      -{financeHelpers.formatMoney(monthlyExpenses)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="font-bold">Чистый доход:</span>
                    <span className={`font-bold ${
                      monthlyIncome - monthlyExpenses >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {monthlyIncome - monthlyExpenses >= 0 ? '+' : ''}
                      {financeHelpers.formatMoney(monthlyIncome - monthlyExpenses)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Коррупция */}
        {showCorruption && (
          <TabsContent value="corruption" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Личные счета */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    Личные счета
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(PersonalAccountTypes).map(([key, type]) => {
                    const amount = personalFinances.accounts?.[type] || 0;
                    const percentage = personalWealth > 0 ? (amount / personalWealth) * 100 : 0;
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{PersonalAccountLabels[type]}</span>
                            <span className="text-sm font-semibold">
                              {financeHelpers.formatMoney(amount)}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Общая сумма:</span>
                      <span className="font-bold text-yellow-600">
                        {financeHelpers.formatMoney(personalWealth)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Риски */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Риски и внимание
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Риск расследования</span>
                        <span className="text-sm font-semibold">{risks.investigationRisk || 0}%</span>
                      </div>
                      <Progress value={risks.investigationRisk || 0} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Подозрения общественности</span>
                        <span className="text-sm font-semibold">{risks.publicSuspicion || 0}%</span>
                      </div>
                      <Progress value={risks.publicSuspicion || 0} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Внимание федеральных органов</span>
                        <span className="text-sm font-semibold">{risks.federalAttention || 0}%</span>
                      </div>
                      <Progress value={risks.federalAttention || 0} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Внимание СМИ</span>
                        <span className="text-sm font-semibold">{risks.mediaAttention || 0}%</span>
                      </div>
                      <Progress value={risks.mediaAttention || 0} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Общий риск:</span>
                      <Badge className={`${corruptionRisk.color} border`}>
                        <corruptionRisk.icon className="w-4 h-4 mr-1" />
                        {corruptionRisk.level}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default BudgetManager;
