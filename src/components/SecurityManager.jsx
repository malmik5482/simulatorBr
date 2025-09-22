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
  Shield,
  AlertTriangle,
  Eye,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  Settings,
  FileText,
  Lock,
  Unlock,
  Star,
  Award,
  Briefcase,
  Phone,
  MessageSquare,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Search,
  UserCheck,
  UserX,
  Handshake,
  CreditCard,
  Scale,
  Gavel
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import {
  SecurityAgencies,
  SecurityAgencyLabels,
  InfluenceLevels,
  InfluenceLevelLabels,
  OperationTypes,
  OperationTypeLabels,
  ThreatLevels,
  ThreatLevelLabels,
  securityThreats,
  securityHelpers
} from '../types/security.js';

const SecurityManager = () => {
  const { gameState, actions } = useGame();
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [operationAmount, setOperationAmount] = useState(0);

  const securityState = gameState.securityState || {};
  const agencies = securityState.agencies || {};
  const activeThreats = securityState.activeThreats || [];
  const operationHistory = securityState.operationHistory || [];

  const getAgencyIcon = (agency) => {
    const icons = {
      [SecurityAgencies.POLICE]: Shield,
      [SecurityAgencies.FSB]: Eye,
      [SecurityAgencies.PROSECUTOR]: Scale,
      [SecurityAgencies.INVESTIGATIVE_COMMITTEE]: Search,
      [SecurityAgencies.ROSGVARDIA]: Shield,
      [SecurityAgencies.EMERGENCY_MINISTRY]: AlertTriangle,
      [SecurityAgencies.CUSTOMS]: Target,
      [SecurityAgencies.TAX_SERVICE]: DollarSign,
      [SecurityAgencies.ANTI_CORRUPTION]: Lock
    };
    return icons[agency] || Shield;
  };

  const getInfluenceColor = (influence) => {
    const colors = {
      [InfluenceLevels.HOSTILE]: 'bg-red-100 text-red-800',
      [InfluenceLevels.UNFRIENDLY]: 'bg-orange-100 text-orange-800',
      [InfluenceLevels.NEUTRAL]: 'bg-gray-100 text-gray-800',
      [InfluenceLevels.FRIENDLY]: 'bg-green-100 text-green-800',
      [InfluenceLevels.CONTROLLED]: 'bg-blue-100 text-blue-800'
    };
    return colors[influence] || 'bg-gray-100 text-gray-800';
  };

  const getThreatColor = (threat) => {
    const colors = {
      [ThreatLevels.LOW]: 'bg-green-100 text-green-800',
      [ThreatLevels.MEDIUM]: 'bg-yellow-100 text-yellow-800',
      [ThreatLevels.HIGH]: 'bg-orange-100 text-orange-800',
      [ThreatLevels.CRITICAL]: 'bg-red-100 text-red-800'
    };
    return colors[threat] || 'bg-gray-100 text-gray-800';
  };

  const getOperationIcon = (type) => {
    const icons = {
      [OperationTypes.BRIBE]: CreditCard,
      [OperationTypes.BLACKMAIL]: AlertTriangle,
      [OperationTypes.FAVOR]: Handshake,
      [OperationTypes.APPOINTMENT]: UserCheck,
      [OperationTypes.INVESTIGATION_STOP]: XCircle,
      [OperationTypes.CASE_DISMISSAL]: Gavel,
      [OperationTypes.PROTECTION]: Shield,
      [OperationTypes.INFORMATION]: Eye
    };
    return icons[type] || Briefcase;
  };

  const handleExecuteOperation = (agencyId, operation) => {
    const agency = agencies[agencyId];
    if (!agency) return;

    const cost = securityHelpers.calculateOperationCost(operation, agency);
    if (operationAmount && operationAmount !== cost) {
      // Пользователь указал другую сумму
      const customOperation = { ...operation, cost: operationAmount };
      actions.executeSecurityOperation(agencyId, customOperation);
    } else {
      actions.executeSecurityOperation(agencyId, operation);
    }

    setSelectedOperation(null);
    setOperationAmount(0);
  };

  const handleMitigateThreat = (threatId, mitigationOption) => {
    actions.mitigateThreat(threatId, mitigationOption);
  };

  const overallInfluence = securityHelpers.calculateOverallInfluence(agencies);
  const investigationRisk = securityHelpers.calculateInvestigationRisk(gameState);
  const protectionLevel = securityHelpers.calculateProtectionLevel(agencies);

  const friendlyAgencies = Object.values(agencies).filter(agency => 
    agency.influence === InfluenceLevels.FRIENDLY || agency.influence === InfluenceLevels.CONTROLLED
  ).length;

  const hostileAgencies = Object.values(agencies).filter(agency => 
    agency.influence === InfluenceLevels.HOSTILE || agency.influence === InfluenceLevels.UNFRIENDLY
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Управление силовыми структурами</h2>
          <p className="text-gray-600">
            Влияние на правоохранительные органы и обеспечение безопасности
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Влияние: {InfluenceLevelLabels[overallInfluence]}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Угроз: {activeThreats.length}
          </Badge>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Дружественных</p>
                <p className="text-2xl font-bold text-green-600">{friendlyAgencies}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Враждебных</p>
                <p className="text-2xl font-bold text-red-600">{hostileAgencies}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Риск расследования</p>
                <p className="text-2xl font-bold text-orange-600">{investigationRisk.toFixed(0)}%</p>
              </div>
              <Search className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Уровень защиты</p>
                <p className="text-2xl font-bold text-blue-600">{protectionLevel}%</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agencies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agencies">Агентства</TabsTrigger>
          <TabsTrigger value="threats">Угрозы</TabsTrigger>
          <TabsTrigger value="operations">Операции</TabsTrigger>
          <TabsTrigger value="intelligence">Разведка</TabsTrigger>
        </TabsList>

        {/* Силовые агентства */}
        <TabsContent value="agencies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(agencies).map((agency) => {
              const Icon = getAgencyIcon(agency.agency);
              const totalBribes = agency.totalBribes || 0;
              
              return (
                <Card key={agency.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="text-lg">{agency.name}</span>
                      </div>
                      <Badge className={getInfluenceColor(agency.influence)}>
                        {InfluenceLevelLabels[agency.influence]}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Информация о руководителе */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm mb-2">{agency.head.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{agency.head.position}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Лояльность:</span>
                          <span className={`font-medium ${agency.head.loyalty >= 60 ? 'text-green-600' : 
                            agency.head.loyalty >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {agency.head.loyalty}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Коррумпированность:</span>
                          <span className={`font-medium ${agency.head.corruptibility >= 60 ? 'text-red-600' : 
                            agency.head.corruptibility >= 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {agency.head.corruptibility}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Компетентность:</span>
                          <span className="font-medium text-blue-600">{agency.head.competence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Связи:</span>
                          <span className="font-medium text-purple-600">{agency.head.connections}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Основные показатели */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Бюджет</div>
                        <div className="font-semibold">{securityHelpers.formatAmount(agency.budget)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Персонал</div>
                        <div className="font-semibold">{agency.personnel.toLocaleString('ru-RU')}</div>
                      </div>
                    </div>

                    {/* Взятки */}
                    {totalBribes > 0 && (
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="text-xs text-yellow-800">
                          Получено взяток: {securityHelpers.formatAmount(totalBribes)}
                        </div>
                      </div>
                    )}

                    {/* Текущие расследования */}
                    {agency.currentInvestigations && agency.currentInvestigations.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2">Текущие расследования:</div>
                        <div className="space-y-2">
                          {agency.currentInvestigations.map((investigation) => (
                            <div key={investigation.id} className="p-2 border rounded text-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{investigation.name}</span>
                                <Badge className={getThreatColor(investigation.threat)}>
                                  {ThreatLevelLabels[investigation.threat]}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Прогресс: {investigation.progress}%</span>
                                {investigation.canInfluence && (
                                  <span className="text-green-600">Можно повлиять</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Возможности */}
                    <div>
                      <div className="text-sm font-medium mb-2">Возможности:</div>
                      <div className="flex flex-wrap gap-1">
                        {agency.capabilities.slice(0, 3).map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {agency.capabilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{agency.capabilities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                        >
                          Взаимодействие
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Icon className="w-6 h-6" />
                            {agency.name}
                          </DialogTitle>
                          <DialogDescription>
                            {agency.head.name} • {agency.head.position}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Детальная информация о руководителе */}
                          <div>
                            <h4 className="font-medium mb-3">Досье руководителя</h4>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <div className="text-sm text-gray-600">Лояльность</div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={agency.head.loyalty} className="flex-1" />
                                    <span className="text-sm font-medium">{agency.head.loyalty}%</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Коррумпированность</div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={agency.head.corruptibility} className="flex-1" />
                                    <span className="text-sm font-medium">{agency.head.corruptibility}%</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Компетентность</div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={agency.head.competence} className="flex-1" />
                                    <span className="text-sm font-medium">{agency.head.competence}%</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Связи</div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={agency.head.connections} className="flex-1" />
                                    <span className="text-sm font-medium">{agency.head.connections}%</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">{agency.head.background}</div>
                            </div>
                          </div>

                          {/* Доступные операции */}
                          <div>
                            <h4 className="font-medium mb-3">Доступные операции</h4>
                            <div className="space-y-3">
                              {agency.availableOperations.map((operation, index) => {
                                const OperationIcon = getOperationIcon(operation.type);
                                const cost = securityHelpers.calculateOperationCost(operation, agency);
                                const successRate = securityHelpers.calculateOperationSuccess(operation, agency, gameState);
                                
                                return (
                                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                       onClick={() => setSelectedOperation(operation)}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <OperationIcon className="w-4 h-4" />
                                        <span className="font-medium">{OperationTypeLabels[operation.type]}</span>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-green-600">
                                          {securityHelpers.formatAmount(cost)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Успех: {successRate.toFixed(0)}%
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="text-sm text-gray-600">
                                      Последствия: 
                                      {Object.entries(operation.consequences).map(([key, value]) => (
                                        <span key={key} className="ml-2">
                                          {key}: {value > 0 ? '+' : ''}{value}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Форма для выполнения операции */}
                          {selectedOperation && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="font-medium mb-3">
                                Выполнить: {OperationTypeLabels[selectedOperation.type]}
                              </h4>
                              
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="operation-amount">Сумма операции</Label>
                                  <Input
                                    id="operation-amount"
                                    type="number"
                                    value={operationAmount || securityHelpers.calculateOperationCost(selectedOperation, agency)}
                                    onChange={(e) => setOperationAmount(Number(e.target.value))}
                                    placeholder="Введите сумму"
                                  />
                                  <div className="text-xs text-gray-500 mt-1">
                                    Рекомендуемая сумма: {securityHelpers.formatAmount(
                                      securityHelpers.calculateOperationCost(selectedOperation, agency)
                                    )}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Вероятность успеха:</span>
                                    <span className="font-medium ml-2">
                                      {securityHelpers.calculateOperationSuccess(selectedOperation, agency, gameState).toFixed(0)}%
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Риск обнаружения:</span>
                                    <span className="font-medium ml-2 text-red-600">
                                      {(selectedOperation.consequences.corruption_risk || 0)}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedOperation(null);
                                setOperationAmount(0);
                              }}
                              className="flex-1"
                            >
                              Отмена
                            </Button>
                            {selectedOperation && (
                              <Button 
                                onClick={() => handleExecuteOperation(agency.id, selectedOperation)}
                                className="flex-1"
                              >
                                Выполнить операцию
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

        {/* Угрозы безопасности */}
        <TabsContent value="threats" className="space-y-6">
          {activeThreats.length > 0 ? (
            <div className="space-y-4">
              {activeThreats.map((threat) => (
                <Card key={threat.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-semibold text-lg mb-1">{threat.name}</div>
                        <div className="text-gray-600 mb-2">{threat.description}</div>
                        <Badge className={getThreatColor(threat.threat_level)}>
                          {ThreatLevelLabels[threat.threat_level]}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Вероятность</div>
                        <div className="text-lg font-bold text-red-600">
                          {(threat.probability * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    
                    {threat.consequences && (
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Возможные последствия:</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(threat.consequences).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span>{key}:</span>
                              <span className={`font-medium ${typeof value === 'number' && value < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                                {typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {threat.mitigation_options && (
                      <div>
                        <div className="text-sm font-medium mb-2">Варианты противодействия:</div>
                        <div className="flex gap-2">
                          {threat.mitigation_options.map((option, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              onClick={() => handleMitigateThreat(threat.id, option)}
                            >
                              {option.description} ({securityHelpers.formatAmount(option.cost)})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <div className="text-xl font-medium mb-2">Нет активных угроз</div>
                <div className="text-gray-600">
                  Ваша безопасность находится под контролем
                </div>
              </CardContent>
            </Card>
          )}

          {/* Потенциальные угрозы */}
          <Card>
            <CardHeader>
              <CardTitle>Потенциальные угрозы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityThreats.map((threat) => (
                  <div key={threat.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{threat.name}</div>
                      <div className="text-sm text-gray-600">{threat.description}</div>
                    </div>
                    <div className="text-right">
                      <Badge className={getThreatColor(threat.threat_level)}>
                        {ThreatLevelLabels[threat.threat_level]}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        Вероятность: {(threat.probability * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* История операций */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Статистика операций */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика операций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Всего операций</div>
                    <div className="text-2xl font-bold">{operationHistory.length}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Успешных</div>
                    <div className="text-xl font-semibold text-green-600">
                      {operationHistory.filter(op => op.success).length}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Общие затраты</div>
                    <div className="text-lg font-semibold">
                      {securityHelpers.formatAmount(
                        operationHistory.reduce((sum, op) => sum + op.cost, 0)
                      )}
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
                <div className="space-y-3">
                  {Object.values(OperationTypes).map((type) => {
                    const count = operationHistory.filter(op => op.type === type).length;
                    if (count === 0) return null;
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm">{OperationTypeLabels[type]}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Эффективность */}
            <Card>
              <CardHeader>
                <CardTitle>Эффективность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Процент успеха</div>
                    <div className="text-2xl font-bold text-green-600">
                      {operationHistory.length > 0 ? 
                        ((operationHistory.filter(op => op.success).length / operationHistory.length) * 100).toFixed(0) : 0}%
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Средняя стоимость</div>
                    <div className="text-lg font-semibold">
                      {operationHistory.length > 0 ? 
                        securityHelpers.formatAmount(
                          operationHistory.reduce((sum, op) => sum + op.cost, 0) / operationHistory.length
                        ) : '0 ₽'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* История операций */}
          <Card>
            <CardHeader>
              <CardTitle>История операций</CardTitle>
            </CardHeader>
            <CardContent>
              {operationHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Агентство</TableHead>
                      <TableHead>Операция</TableHead>
                      <TableHead>Стоимость</TableHead>
                      <TableHead>Результат</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operationHistory.slice(-10).reverse().map((operation, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(operation.date).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>{operation.agencyName}</TableCell>
                        <TableCell>{OperationTypeLabels[operation.type]}</TableCell>
                        <TableCell>{securityHelpers.formatAmount(operation.cost)}</TableCell>
                        <TableCell>
                          {operation.success ? (
                            <Badge className="bg-green-100 text-green-800">Успех</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Провал</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет истории операций</div>
                  <div className="text-sm text-gray-600">
                    Проведенные операции будут отображаться здесь
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Разведывательная информация */}
        <TabsContent value="intelligence" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Компромат на чиновников</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет данных</div>
                  <div className="text-sm text-gray-600">
                    Собирайте информацию через операции
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Досье на бизнесменов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет данных</div>
                  <div className="text-sm text-gray-600">
                    Информация появится после расследований
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Информация о журналистах</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет данных</div>
                  <div className="text-sm text-gray-600">
                    Следите за СМИ и их деятельностью
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

export default SecurityManager;
