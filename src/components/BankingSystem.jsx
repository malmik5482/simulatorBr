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
  Banknote, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  PiggyBank,
  Building2,
  ArrowUpDown,
  Plus,
  Minus,
  DollarSign,
  Percent,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useGame } from '../hooks/useGame.js';
import { 
  BankAccountTypes, 
  BankAccountLabels,
  StockSectors,
  StockSectorLabels,
  LoanTypes,
  LoanTypeLabels,
  DepositTypes,
  DepositTypeLabels,
  stocksData,
  loanOffers,
  depositOffers,
  bankingHelpers 
} from '../types/banking.js';

const BankingSystem = () => {
  const { gameState, actions } = useGame();
  const [_selectedStock, setSelectedStock] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [showPersonalAccounts, setShowPersonalAccounts] = useState(false);
  const [depositAmounts, setDepositAmounts] = useState({});

  const bankingState = gameState.bankingState || {};
  const accounts = bankingState.accounts || {};
  const stockPortfolio = bankingState.stockPortfolio || { city: {}, personal: {} };
  const deposits = bankingState.deposits || [];
  const loans = bankingState.loans || [];

  const getSectorIcon = (sector) => {
    const icons = {
      [StockSectors.ENERGY]: '⚡',
      [StockSectors.TECHNOLOGY]: '💻',
      [StockSectors.FINANCE]: '🏦',
      [StockSectors.INDUSTRY]: '🏭',
      [StockSectors.REAL_ESTATE]: '🏢',
      [StockSectors.AGRICULTURE]: '🌾',
      [StockSectors.TRANSPORT]: '🚛',
      [StockSectors.RETAIL]: '🛒'
    };
    return icons[sector] || '📈';
  };

  const getAccountTypeColor = (accountType) => {
    if (accountType.includes('city')) return 'bg-blue-100 text-blue-800';
    if (accountType.includes('personal')) return 'bg-green-100 text-green-800';
    if (accountType.includes('offshore')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleBuyStock = (stockId, quantity, isPersonal = false) => {
    const stock = stocksData.find(s => s.id === stockId);
    if (!stock) return;

    const totalCost = stock.price * quantity;
    const commission = bankingHelpers.calculateCommission(totalCost, 'stock_buy');
    const accountType = isPersonal ? BankAccountTypes.PERSONAL_INVESTMENT : BankAccountTypes.CITY_INVESTMENT;
    
    actions.buyStock(stockId, quantity, stock.price, accountType, commission);
    setStockQuantity(0);
    setSelectedStock(null);
  };

  const handleTransfer = () => {
    if (transferAmount > 0 && transferFrom && transferTo && transferFrom !== transferTo) {
      actions.transferFunds(transferFrom, transferTo, transferAmount);
      setTransferAmount(0);
      setTransferFrom('');
      setTransferTo('');
    }
  };

  const handleTakeLoan = (loanId) => {
    actions.takeLoan(loanId);
  };

  const handleCreateDeposit = (depositId) => {
    const offer = depositOffers.find(deposit => deposit.id === depositId);
    const rawValue = depositAmounts[depositId];
    const amountValue = rawValue !== undefined && rawValue !== ''
      ? Number(rawValue)
      : (offer ? offer.minAmount : 0);

    actions.createDeposit(depositId, amountValue);
  };

  const totalCityBalance = bankingHelpers.getTotalBalance(accounts, null);
  const cityPortfolioValue = bankingHelpers.getPortfolioValue(stockPortfolio.city, stocksData);
  const personalPortfolioValue = bankingHelpers.getPortfolioValue(stockPortfolio.personal, stocksData);
  const totalLoansAmount = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const totalDepositsAmount = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Банковская система</h2>
          <p className="text-gray-600">
            Управление счетами, инвестициями и кредитами
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant={showPersonalAccounts ? "destructive" : "outline"}
            size="sm"
            onClick={() => setShowPersonalAccounts(!showPersonalAccounts)}
            className="flex items-center gap-2"
          >
            {showPersonalAccounts ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPersonalAccounts ? 'Скрыть личные счета' : 'Показать личные счета'}
          </Button>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общий баланс</p>
                <p className="text-2xl font-bold">{bankingHelpers.formatMoney(totalCityBalance)}</p>
              </div>
              <Banknote className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Инвестиции</p>
                <p className="text-2xl font-bold text-green-600">
                  {bankingHelpers.formatMoney(cityPortfolioValue + personalPortfolioValue)}
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
                <p className="text-sm text-gray-600">Депозиты</p>
                <p className="text-2xl font-bold text-blue-600">
                  {bankingHelpers.formatMoney(totalDepositsAmount)}
                </p>
              </div>
              <PiggyBank className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Кредиты</p>
                <p className="text-2xl font-bold text-red-600">
                  -{bankingHelpers.formatMoney(totalLoansAmount)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="accounts">Счета</TabsTrigger>
          <TabsTrigger value="stocks">Акции</TabsTrigger>
          <TabsTrigger value="deposits">Депозиты</TabsTrigger>
          <TabsTrigger value="loans">Кредиты</TabsTrigger>
          <TabsTrigger value="transfers">Переводы</TabsTrigger>
        </TabsList>

        {/* Банковские счета */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(accounts)
              .filter(([type]) => showPersonalAccounts || !type.includes('personal'))
              .map(([accountType, account]) => (
                <Card key={accountType} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        {BankAccountLabels[accountType]}
                      </div>
                      <Badge className={getAccountTypeColor(accountType)}>
                        {account.bank}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {bankingHelpers.formatMoney(account.balance, account.currency)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Счет: {account.accountNumber}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Процентная ставка</div>
                        <div className="font-semibold">{account.interestRate}% годовых</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Тип счета</div>
                        <div className="font-semibold">
                          {accountType.includes('checking') ? 'Расчетный' :
                           accountType.includes('savings') ? 'Сберегательный' :
                           accountType.includes('investment') ? 'Инвестиционный' : 'Специальный'}
                        </div>
                      </div>
                    </div>

                    {account.interestRate > 0 && (
                      <div className="pt-3 border-t">
                        <div className="text-sm text-gray-600">
                          Ежемесячный доход: {bankingHelpers.formatMoney(
                            account.balance * account.interestRate / 100 / 12,
                            account.currency
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Акции */}
        <TabsContent value="stocks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Доступные акции */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Доступные акции</h3>
              <div className="space-y-3">
                {stocksData.map((stock) => (
                  <Card key={stock.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getSectorIcon(stock.sector)}</span>
                          <div>
                            <div className="font-semibold">{stock.name}</div>
                            <div className="text-sm text-gray-500">{stock.ticker}</div>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {StockSectorLabels[stock.sector]}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-500">Цена</div>
                          <div className="font-semibold">{bankingHelpers.formatMoney(stock.price)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Изменение</div>
                          <div className={`font-semibold ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Дивиденды</div>
                          <div className="font-semibold">{stock.dividend}%</div>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedStock(stock)}
                          >
                            Купить акции
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Покупка акций {stock.name}</DialogTitle>
                            <DialogDescription>
                              {stock.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="quantity">Количество</Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  value={stockQuantity}
                                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <Label>Общая стоимость</Label>
                                <div className="p-2 border rounded-md bg-gray-50">
                                  {bankingHelpers.formatMoney(stock.price * stockQuantity)}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-500">Комиссия</div>
                                <div className="font-semibold">
                                  {bankingHelpers.formatMoney(
                                    bankingHelpers.calculateCommission(stock.price * stockQuantity, 'stock_buy')
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-500">Итого к оплате</div>
                                <div className="font-semibold">
                                  {bankingHelpers.formatMoney(
                                    stock.price * stockQuantity + 
                                    bankingHelpers.calculateCommission(stock.price * stockQuantity, 'stock_buy')
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <div className="flex gap-2 w-full">
                              <Button 
                                onClick={() => handleBuyStock(stock.id, stockQuantity, false)}
                                disabled={stockQuantity <= 0}
                                className="flex-1"
                              >
                                Купить (Городской счет)
                              </Button>
                              {showPersonalAccounts && (
                                <Button 
                                  onClick={() => handleBuyStock(stock.id, stockQuantity, true)}
                                  disabled={stockQuantity <= 0}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  Купить (Личный счет)
                                </Button>
                              )}
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Портфель */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Портфель акций</h3>
              
              {/* Городской портфель */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Городской портфель
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(stockPortfolio.city).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(stockPortfolio.city).map(([stockId, data]) => {
                        const stock = stocksData.find(s => s.id === stockId);
                        if (!stock || !data.quantity) return null;
                        
                        const currentValue = stock.price * data.quantity;
                        const purchaseValue = data.averagePrice * data.quantity;
                        const profit = currentValue - purchaseValue;
                        const profitPercent = (profit / purchaseValue) * 100;
                        
                        return (
                          <div key={stockId} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-semibold">{stock.name}</div>
                              <div className="text-sm text-gray-500">
                                {data.quantity} шт. × {bankingHelpers.formatMoney(stock.price)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{bankingHelpers.formatMoney(currentValue)}</div>
                              <div className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {profit >= 0 ? '+' : ''}{bankingHelpers.formatMoney(profit)} 
                                ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Портфель пуст
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Личный портфель */}
              {showPersonalAccounts && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Личный портфель
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(stockPortfolio.personal).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(stockPortfolio.personal).map(([stockId, data]) => {
                          const stock = stocksData.find(s => s.id === stockId);
                          if (!stock || !data.quantity) return null;
                          
                          const currentValue = stock.price * data.quantity;
                          const purchaseValue = data.averagePrice * data.quantity;
                          const profit = currentValue - purchaseValue;
                          const profitPercent = (profit / purchaseValue) * 100;
                          
                          return (
                            <div key={stockId} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-semibold">{stock.name}</div>
                                <div className="text-sm text-gray-500">
                                  {data.quantity} шт. × {bankingHelpers.formatMoney(stock.price)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{bankingHelpers.formatMoney(currentValue)}</div>
                                <div className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {profit >= 0 ? '+' : ''}{bankingHelpers.formatMoney(profit)} 
                                  ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Портфель пуст
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Депозиты */}
        <TabsContent value="deposits" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Доступные депозиты */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Доступные депозиты</h3>
              <div className="space-y-3">
                {depositOffers.map((deposit) => (
                  <Card key={deposit.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold">{deposit.bank}</div>
                          <div className="text-sm text-gray-500">{DepositTypeLabels[deposit.type]}</div>
                        </div>
                        <Badge variant="outline">
                          {deposit.interestRate}% годовых
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{deposit.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-500">Срок</div>
                          <div className="font-semibold">{deposit.term} мес.</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Мин. сумма</div>
                          <div className="font-semibold">{bankingHelpers.formatMoney(deposit.minAmount)}</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        {deposit.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="w-full">
                            Открыть депозит
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Открытие депозита</DialogTitle>
                            <DialogDescription>
                              {deposit.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="deposit-amount">Сумма депозита</Label>
                              <Input
                                id={`deposit-amount-${deposit.id}`}
                                type="number"
                                value={depositAmounts[deposit.id] ?? deposit.minAmount.toString()}
                                onChange={(e) => setDepositAmounts(prev => ({
                                  ...prev,
                                  [deposit.id]: e.target.value
                                }))}
                                placeholder={`От ${deposit.minAmount}`}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-500">Доходность</div>
                                <div className="font-semibold">{deposit.interestRate}% годовых</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Срок</div>
                                <div className="font-semibold">{deposit.term} месяцев</div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => handleCreateDeposit(deposit.id)}>
                              Открыть депозит
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Активные депозиты */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Активные депозиты</h3>
              {deposits.length > 0 ? (
                <div className="space-y-3">
                  {deposits.map((deposit) => (
                    <Card key={deposit.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-semibold">{deposit.bank}</div>
                            <div className="text-sm text-gray-500">
                              Открыт: {new Date(deposit.openDate).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {deposit.interestRate}%
                          </Badge>
                        </div>
                        
                        <div className="text-2xl font-bold mb-2">
                          {bankingHelpers.formatMoney(deposit.amount)}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Прогресс</span>
                            <span>{deposit.remainingDays} дней осталось</span>
                          </div>
                          <Progress 
                            value={((deposit.term * 30 - deposit.remainingDays) / (deposit.term * 30)) * 100} 
                          />
                        </div>
                        
                        <div className="mt-3 pt-3 border-t text-sm">
                          <div className="flex justify-between">
                            <span>Ожидаемый доход:</span>
                            <span className="font-semibold text-green-600">
                              +{bankingHelpers.formatMoney(
                                bankingHelpers.calculateDepositReturn(
                                  deposit.amount, 
                                  deposit.interestRate, 
                                  deposit.term
                                )
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <PiggyBank className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <div className="text-lg font-medium mb-1">Нет активных депозитов</div>
                    <div className="text-sm text-gray-600">
                      Откройте депозит для получения пассивного дохода
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Кредиты */}
        <TabsContent value="loans" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Доступные кредиты */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Доступные кредиты</h3>
              <div className="space-y-3">
                {loanOffers.map((loan) => {
                  const creditRating = bankingHelpers.checkCreditRating(gameState);
                  const canApply = creditRating >= (loan.requirements.minRating || 0);
                  
                  return (
                    <Card key={loan.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-semibold">{loan.bank}</div>
                            <div className="text-sm text-gray-500">{LoanTypeLabels[loan.type]}</div>
                          </div>
                          <Badge variant="outline">
                            {loan.interestRate}% годовых
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{loan.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <div className="text-gray-500">Сумма</div>
                            <div className="font-semibold">{bankingHelpers.formatMoney(loan.amount)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Срок</div>
                            <div className="font-semibold">{loan.term} мес.</div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          {loan.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium mb-2">Ежемесячный платеж:</div>
                          <div className="text-lg font-bold">
                            {bankingHelpers.formatMoney(
                              bankingHelpers.calculateLoanPayment(loan.amount, loan.interestRate, loan.term)
                            )}
                          </div>
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full"
                          disabled={!canApply}
                          onClick={() => handleTakeLoan(loan.id)}
                        >
                          {canApply ? 'Подать заявку' : `Требуется рейтинг ${loan.requirements.minRating}%`}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Активные кредиты */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Активные кредиты</h3>
              {loans.length > 0 ? (
                <div className="space-y-3">
                  {loans.map((loan) => (
                    <Card key={loan.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-semibold">{loan.bank}</div>
                            <div className="text-sm text-gray-500">
                              Взят: {new Date(loan.issueDate).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {loan.interestRate}%
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-sm text-gray-500">Остаток долга</div>
                            <div className="text-xl font-bold text-red-600">
                              {bankingHelpers.formatMoney(loan.remainingAmount)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Ежемесячный платеж</div>
                            <div className="text-xl font-bold">
                              {bankingHelpers.formatMoney(loan.monthlyPayment)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Прогресс погашения</span>
                            <span>{loan.remainingMonths} мес. осталось</span>
                          </div>
                          <Progress 
                            value={((loan.term - loan.remainingMonths) / loan.term) * 100} 
                          />
                        </div>
                        
                        <div className="mt-3 pt-3 border-t">
                          <Button size="sm" variant="outline" className="w-full">
                            Досрочное погашение
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <div className="text-lg font-medium mb-1">Нет активных кредитов</div>
                    <div className="text-sm text-gray-600">
                      Хорошая кредитная история открывает новые возможности
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Переводы */}
        <TabsContent value="transfers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="w-5 h-5" />
                Перевод средств между счетами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transfer-from">Со счета</Label>
                  <select
                    id="transfer-from"
                    value={transferFrom}
                    onChange={(e) => setTransferFrom(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Выберите счет</option>
                    {Object.entries(accounts)
                      .filter(([type]) => showPersonalAccounts || !type.includes('personal'))
                      .map(([accountType, account]) => (
                        <option key={accountType} value={accountType}>
                          {BankAccountLabels[accountType]} - {bankingHelpers.formatMoney(account.balance)}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="transfer-to">На счет</Label>
                  <select
                    id="transfer-to"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Выберите счет</option>
                    {Object.entries(accounts)
                      .filter(([type]) => showPersonalAccounts || !type.includes('personal'))
                      .filter(([type]) => type !== transferFrom)
                      .map(([accountType, account]) => (
                        <option key={accountType} value={accountType}>
                          {BankAccountLabels[accountType]} - {bankingHelpers.formatMoney(account.balance)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="transfer-amount">Сумма перевода</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              
              {transferAmount > 0 && transferFrom && transferTo && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Сумма перевода:</span>
                      <span>{bankingHelpers.formatMoney(transferAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Комиссия:</span>
                      <span>{bankingHelpers.formatMoney(
                        bankingHelpers.calculateCommission(transferAmount, 'transfer')
                      )}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1 mt-1">
                      <span>К списанию:</span>
                      <span>{bankingHelpers.formatMoney(
                        transferAmount + bankingHelpers.calculateCommission(transferAmount, 'transfer')
                      )}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleTransfer}
                disabled={!transferAmount || !transferFrom || !transferTo || transferFrom === transferTo}
                className="w-full"
              >
                Выполнить перевод
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankingSystem;
