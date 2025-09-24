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
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Building2,
  Factory,
  Leaf,
  GraduationCap,
  Heart,
  ShoppingCart,
  Truck,
  Banknote,
  Globe,
  Award,
  Shield,
  Calendar,
  Users,
  Settings,
  Plus,
  Minus,
  Eye,
  Filter
} from 'lucide-react';
import { useGame } from '../hooks/useGame.js';
import { 
  InvestmentSectors,
  SectorLabels,
  InvestmentTypes,
  InvestmentTypeLabels,
  RiskLevels,
  RiskLevelLabels,
  investmentOpportunities,
  investmentFunds,
  investmentHelpers 
} from '../types/investments.js';

const InvestmentManager = () => {
  const { gameState, actions } = useGame();
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [sortBy, setSortBy] = useState('expectedReturn');

  const investmentState = gameState.investmentState || {};
  const activeInvestments = investmentState.activeInvestments || [];
  const completedInvestments = investmentState.completedInvestments || [];
  const portfolio = investmentState.portfolio || {};
  const investmentMetrics = investmentState.investmentMetrics || {};
  const selectedInvestmentDetails = selectedInvestment || null;

  const getSectorIcon = (sector) => {
    const icons = {
      [InvestmentSectors.TECHNOLOGY]: Globe,
      [InvestmentSectors.REAL_ESTATE]: Building2,
      [InvestmentSectors.INFRASTRUCTURE]: Target,
      [InvestmentSectors.ENERGY]: Zap,
      [InvestmentSectors.MANUFACTURING]: Factory,
      [InvestmentSectors.AGRICULTURE]: Leaf,
      [InvestmentSectors.TOURISM]: Award,
      [InvestmentSectors.EDUCATION]: GraduationCap,
      [InvestmentSectors.HEALTHCARE]: Heart,
      [InvestmentSectors.RETAIL]: ShoppingCart,
      [InvestmentSectors.LOGISTICS]: Truck,
      [InvestmentSectors.FINANCE]: Banknote
    };
    return icons[sector] || Target;
  };

  const getRiskColor = (riskLevel) => {
    const colors = {
      [RiskLevels.LOW]: 'bg-green-100 text-green-800',
      [RiskLevels.MEDIUM]: 'bg-yellow-100 text-yellow-800',
      [RiskLevels.HIGH]: 'bg-orange-100 text-orange-800',
      [RiskLevels.VERY_HIGH]: 'bg-red-100 text-red-800'
    };
    return colors[riskLevel] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type) => {
    const colors = {
      [InvestmentTypes.DIRECT]: 'bg-blue-100 text-blue-800',
      [InvestmentTypes.FUND]: 'bg-purple-100 text-purple-800',
      [InvestmentTypes.BOND]: 'bg-green-100 text-green-800',
      [InvestmentTypes.STARTUP]: 'bg-red-100 text-red-800',
      [InvestmentTypes.VENTURE]: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredOpportunities = investmentOpportunities
    .filter(inv => selectedSector === 'all' || inv.sector === selectedSector)
    .filter(inv => selectedRisk === 'all' || inv.riskLevel === selectedRisk)
    .sort((a, b) => {
      switch (sortBy) {
        case 'expectedReturn':
          return b.expectedReturn - a.expectedReturn;
        case 'minInvestment':
          return a.minInvestment - b.minInvestment;
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

  const handleInvest = (investmentId, amount) => {
    const investment = investmentOpportunities.find(inv => inv.id === investmentId);
    if (!investment) return;

    const canInvest = investmentHelpers.canInvest(investment, amount, gameState);
    if (!canInvest.canInvest) {
      alert(canInvest.reason);
      return;
    }

    actions.makeInvestment(investmentId, amount);
    setInvestmentAmount(0);
    setSelectedInvestment(null);
  };

  const handleWithdraw = (investmentId, amount) => {
    actions.withdrawInvestment(investmentId, amount);
  };

  const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = activeInvestments.reduce((sum, inv) => {
    const currentValue = investmentHelpers.calculateCurrentValue(
      inv, 
      inv.monthsPassed || 0, 
      inv.amount
    );
    return sum + currentValue;
  }, 0);
  const totalReturn = totalValue - totalInvested;
  const returnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Инвестиционные возможности</h2>
          <p className="text-gray-600">
            Управление инвестициями и развитие города
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Активных: {activeInvestments.length}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Доходность: {returnPercent.toFixed(1)}%
          </Badge>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Инвестировано</p>
                <p className="text-2xl font-bold">{investmentHelpers.formatAmount(totalInvested)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Текущая стоимость</p>
                <p className="text-2xl font-bold text-green-600">
                  {investmentHelpers.formatAmount(totalValue)}
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
                <p className="text-sm text-gray-600">Прибыль/Убыток</p>
                <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalReturn >= 0 ? '+' : ''}{investmentHelpers.formatAmount(totalReturn)}
                </p>
              </div>
              {totalReturn >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-600" /> :
                <TrendingDown className="w-8 h-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Проектов</p>
                <p className="text-2xl font-bold text-purple-600">
                  {investmentMetrics.totalProjects || 0}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Возможности</TabsTrigger>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="portfolio">Портфель</TabsTrigger>
          <TabsTrigger value="funds">Фонды</TabsTrigger>
        </TabsList>

        {/* Инвестиционные возможности */}
        <TabsContent value="opportunities" className="space-y-6">
          {/* Фильтры */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры:</span>
                </div>
                
                <div>
                  <Label htmlFor="sector-filter" className="text-xs">Сектор</Label>
                  <select
                    id="sector-filter"
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все секторы</option>
                    {Object.entries(SectorLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="risk-filter" className="text-xs">Риск</Label>
                  <select
                    id="risk-filter"
                    value={selectedRisk}
                    onChange={(e) => setSelectedRisk(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все уровни</option>
                    {Object.entries(RiskLevelLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="sort-filter" className="text-xs">Сортировка</Label>
                  <select
                    id="sort-filter"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="expectedReturn">По доходности</option>
                    <option value="minInvestment">По мин. сумме</option>
                    <option value="duration">По сроку</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Список возможностей */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((investment) => {
              const Icon = getSectorIcon(investment.sector);
              const canInvest = investmentHelpers.canInvest(investment, investment.minInvestment, gameState);
              const expectedReturn = investmentHelpers.calculateExpectedReturn(investment, gameState);
              const riskScore = investmentHelpers.calculateInvestmentRisk(investment, gameState);

              return (
                <Card
                  key={investment.id}
                  className={`hover:shadow-lg transition-shadow ${
                    selectedInvestment?.id === investment.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setSelectedInvestment(investment)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="text-lg">{investment.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getRiskColor(investment.riskLevel)}>
                          {RiskLevelLabels[investment.riskLevel]}
                        </Badge>
                        <Badge className={getTypeColor(investment.type)}>
                          {InvestmentTypeLabels[investment.type]}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{investment.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Мин. инвестиции</div>
                        <div className="font-semibold">{investmentHelpers.formatAmount(investment.minInvestment)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Макс. инвестиции</div>
                        <div className="font-semibold">{investmentHelpers.formatAmount(investment.maxInvestment)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Ожидаемая доходность</div>
                        <div className="font-semibold text-green-600">{expectedReturn.toFixed(1)}% годовых</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Срок</div>
                        <div className="font-semibold">{investment.duration} мес.</div>
                      </div>
                    </div>

                    {/* Риск-метрика */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Риск проекта</span>
                        <span>{riskScore.toFixed(0)}%</span>
                      </div>
                      <Progress value={riskScore} className="h-2" />
                    </div>

                    {/* Выгоды для города */}
                    {investment.cityBenefits && (
                      <div>
                        <div className="text-sm font-medium mb-2">Выгоды для города:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(investment.cityBenefits).map(([benefit, value]) => (
                            <div key={benefit} className={`${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {benefit}: {value > 0 ? '+' : ''}{value}
                              {benefit === 'taxRevenue' ? ' ₽/мес' : benefit.includes('Percent') ? '%' : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Требования */}
                    {investment.requirements && (
                      <div>
                        <div className="text-sm font-medium mb-2">Требования:</div>
                        <div className="space-y-1">
                          {Object.entries(investment.requirements).map(([req, value]) => {
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
                          disabled={!canInvest.canInvest}
                          onClick={() => setSelectedInvestment(investment)}
                        >
                          {canInvest.canInvest ? 'Инвестировать' : 'Недоступно'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Icon className="w-6 h-6" />
                            {investment.name}
                          </DialogTitle>
                          <DialogDescription>
                            {SectorLabels[investment.sector]} • {investment.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Детальная информация */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Финансовые показатели</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Ожидаемая доходность:</span>
                                  <span className="font-semibold">{expectedReturn.toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Срок инвестиций:</span>
                                  <span className="font-semibold">{investment.duration} мес.</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Уровень риска:</span>
                                  <span className="font-semibold">{riskScore.toFixed(0)}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Личные выгоды</h4>
                              {investment.personalBenefits && (
                                <div className="space-y-2 text-sm">
                                  {Object.entries(investment.personalBenefits).map(([benefit, value]) => (
                                    <div key={benefit} className="flex justify-between">
                                      <span>{benefit}:</span>
                                      <span className="font-semibold text-green-600">
                                        {benefit.includes('Percent') ? `${value}%` : 
                                         typeof value === 'number' && value > 1000 ? investmentHelpers.formatAmount(value) : 
                                         `+${value}`}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Этапы реализации */}
                          {investment.milestones && (
                            <div>
                              <h4 className="font-medium mb-3">Этапы реализации</h4>
                              <div className="space-y-2">
                                {investment.milestones.map((milestone, index) => (
                                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                                      {milestone.month}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">{milestone.description}</div>
                                      <div className="text-xs text-gray-500">Месяц {milestone.month}</div>
                                    </div>
                                    <div className="text-sm font-medium">{milestone.completion}%</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Сумма инвестиций */}
                          <div>
                            <Label htmlFor="investment-amount">Сумма инвестиций</Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="investment-amount"
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                placeholder={`От ${investment.minInvestment.toLocaleString('ru-RU')}`}
                                min={investment.minInvestment}
                                max={investment.maxInvestment}
                              />
                              <Button
                                variant="outline"
                                onClick={() => setInvestmentAmount(investment.minInvestment)}
                              >
                                Мин
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setInvestmentAmount(investment.maxInvestment)}
                              >
                                Макс
                              </Button>
                            </div>
                            
                            {investmentAmount > 0 && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm space-y-1">
                                  <div className="flex justify-between">
                                    <span>Сумма инвестиций:</span>
                                    <span className="font-semibold">{investmentHelpers.formatAmount(investmentAmount)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Ожидаемый доход:</span>
                                    <span className="font-semibold text-green-600">
                                      {investmentHelpers.formatAmount(investmentAmount * expectedReturn / 100)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Личный откат:</span>
                                    <span className="font-semibold text-blue-600">
                                      {investment.personalBenefits?.kickbackPercent ? 
                                        investmentHelpers.formatAmount(investmentAmount * investment.personalBenefits.kickbackPercent / 100) : 
                                        '0 ₽'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button 
                            onClick={() => handleInvest(investment.id, investmentAmount)}
                            disabled={!investmentAmount || investmentAmount < investment.minInvestment || investmentAmount > investment.maxInvestment}
                            className="w-full"
                          >
                            Инвестировать {investmentHelpers.formatAmount(investmentAmount)}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedInvestmentDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Выбранная возможность: {selectedInvestmentDetails.name}</span>
                  <Badge variant="outline">{SectorLabels[selectedInvestmentDetails.sector]}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Минимальные инвестиции</div>
                  <div className="font-semibold">{investmentHelpers.formatAmount(selectedInvestmentDetails.minInvestment)}</div>
                  <div className="text-xs text-gray-500 mt-1">Срок: {selectedInvestmentDetails.duration} мес.</div>
                </div>
                <div>
                  <div className="text-gray-500">Ожидаемая доходность</div>
                  <div className="font-semibold text-green-600">
                    {investmentHelpers.calculateExpectedReturn(selectedInvestmentDetails, gameState).toFixed(1)}% годовых
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Риск: {investmentHelpers.calculateInvestmentRisk(selectedInvestmentDetails, gameState).toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-gray-500">Ключевые выгоды</div>
                  <div className="space-y-1 mt-1 text-xs">
                    {selectedInvestmentDetails.cityBenefits && Object.entries(selectedInvestmentDetails.cityBenefits).map(([benefit, value]) => (
                      <div key={benefit} className={value >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {benefit}: {value >= 0 ? '+' : ''}{value}
                      </div>
                    ))}
                    {!selectedInvestmentDetails.cityBenefits && (
                      <span className="text-gray-500">Дополнительные выгоды не указаны</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Активные инвестиции */}
        <TabsContent value="active" className="space-y-6">
          {activeInvestments.length > 0 ? (
            <div className="space-y-4">
              {activeInvestments.map((investment) => {
                const originalInvestment = investmentOpportunities.find(inv => inv.id === investment.id);
                if (!originalInvestment) return null;
                
                const Icon = getSectorIcon(originalInvestment.sector);
                const progress = investmentHelpers.simulateInvestmentProgress(
                  originalInvestment, 
                  investment.monthsPassed || 0
                );
                const currentValue = investmentHelpers.calculateCurrentValue(
                  originalInvestment, 
                  investment.monthsPassed || 0, 
                  investment.amount
                );
                const profit = currentValue - investment.amount;
                const profitPercent = (profit / investment.amount) * 100;
                
                return (
                  <Card key={investment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-semibold text-lg">{originalInvestment.name}</div>
                            <div className="text-sm text-gray-500">
                              {SectorLabels[originalInvestment.sector]} • 
                              Инвестировано: {new Date(investment.startDate).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold">{investmentHelpers.formatAmount(currentValue)}</div>
                          <div className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {profit >= 0 ? '+' : ''}{investmentHelpers.formatAmount(profit)} 
                            ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(1)}%)
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Инвестировано</div>
                          <div className="font-semibold">{investmentHelpers.formatAmount(investment.amount)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Прогресс</div>
                          <div className="font-semibold">{progress.progressPercent.toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Осталось</div>
                          <div className="font-semibold">{progress.remainingMonths} мес.</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс реализации</span>
                          <span>{progress.currentMilestone?.description || 'Начальная стадия'}</span>
                        </div>
                        <Progress value={progress.progressPercent} />
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Детали
                        </Button>
                        {!progress.isCompleted && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleWithdraw(investment.id, investment.amount)}
                          >
                            Вывести средства
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {completedInvestments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Завершенные инвестиции</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {completedInvestments.slice(-5).reverse().map((investment) => {
                      const originalInvestment = investmentOpportunities.find(inv => inv.id === investment.id);
                      if (!originalInvestment) return null;
                      const Icon = getSectorIcon(originalInvestment.sector);
                      const totalReturn = investment.profit || 0;
                      const percent = investment.returnPercent || (investment.amount > 0 ? (totalReturn / investment.amount) * 100 : 0);
                      return (
                        <div key={investment.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-blue-600" />
                            <div>
                              <div className="font-medium">{originalInvestment.name}</div>
                              <div className="text-xs text-gray-500">
                                Доход: {investmentHelpers.formatAmount(totalReturn)} ({percent >= 0 ? '+' : ''}{percent.toFixed(1)}%)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Завершено: {new Date(investment.completedAt || Date.now()).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <div className="text-xl font-medium mb-2">Нет активных инвестиций</div>
                <div className="text-gray-600 mb-4">
                  Начните инвестировать для развития города и получения прибыли
                </div>
                <Button onClick={() => document.querySelector('[value="opportunities"]').click()}>
                  Посмотреть возможности
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Портфель */}
        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Сводка портфеля</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Инвестировано</div>
                <div className="font-semibold">{investmentHelpers.formatAmount(portfolio.totalInvested || 0)}</div>
              </div>
              <div>
                <div className="text-gray-500">Текущая стоимость</div>
                <div className="font-semibold text-green-600">{investmentHelpers.formatAmount(portfolio.activeValue || 0)}</div>
              </div>
              <div>
                <div className="text-gray-500">Полученная прибыль</div>
                <div className={`font-semibold ${ (portfolio.totalReturns || 0) >= 0 ? 'text-green-600' : 'text-red-600' }`}>
                  {investmentHelpers.formatAmount(portfolio.totalReturns || 0)}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Распределение по секторам */}
            <Card>
              <CardHeader>
                <CardTitle>Распределение по секторам</CardTitle>
              </CardHeader>
              <CardContent>
                {activeInvestments.length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(
                      activeInvestments.reduce((acc, inv) => {
                        const original = investmentOpportunities.find(o => o.id === inv.id);
                        if (original) {
                          acc[original.sector] = (acc[original.sector] || 0) + inv.amount;
                        }
                        return acc;
                      }, {})
                    ).map(([sector, amount]) => {
                      const percentage = (amount / totalInvested) * 100;
                      const Icon = getSectorIcon(sector);
                      
                      return (
                        <div key={sector} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{SectorLabels[sector]}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{percentage.toFixed(1)}%</div>
                            <div className="text-xs text-gray-500">
                              {investmentHelpers.formatAmount(amount)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Нет активных инвестиций для анализа
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Статистика доходности */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика доходности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Общая доходность</div>
                      <div className={`text-xl font-bold ${returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Успешных проектов</div>
                      <div className="text-xl font-bold">
                        {investmentMetrics.successRate || 0}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Средняя доходность</div>
                      <div className="text-lg font-semibold">
                        {investmentMetrics.averageReturn || 0}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Риск-профиль</div>
                      <div className="text-lg font-semibold">
                        {investmentMetrics.riskScore || 0}/100
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Инвестиционные фонды */}
        <TabsContent value="funds" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {investmentFunds.map((fund) => (
              <Card key={fund.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{fund.name}</span>
                    <Badge variant="outline">{fund.type}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{fund.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Общий капитал</div>
                      <div className="font-semibold">{investmentHelpers.formatAmount(fund.totalCapital)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Доступно</div>
                      <div className="font-semibold text-green-600">
                        {investmentHelpers.formatAmount(fund.availableCapital)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Фокус секторы:</div>
                    <div className="flex flex-wrap gap-1">
                      {fund.focusSectors.map((sector) => (
                        <Badge key={sector} variant="outline" className="text-xs">
                          {SectorLabels[sector]}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Требования:</div>
                    <div className="space-y-1 text-xs">
                      {Object.entries(fund.requirements).map(([req, value]) => (
                        <div key={req} className="flex justify-between">
                          <span>{req}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Преимущества:</div>
                    <div className="space-y-1">
                      {Object.entries(fund.benefits).map(([benefit, value]) => (
                        <div key={benefit} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>{benefit}: {typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    Подать заявку
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentManager;
