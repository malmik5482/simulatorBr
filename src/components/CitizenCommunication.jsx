import React, { useEffect, useState } from 'react';
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
  Users,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Star,
  Award,
  FileText,
  Send,
  Eye,
  Settings,
  Filter,
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  GraduationCap,
  Home,
  Car,
  Leaf,
  Shield,
  Building,
  Palette,
  HandHeart,
  UserCheck,
  Megaphone,
  Newspaper,
  Video
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  CitizenGroups,
  CitizenGroupLabels,
  CommunicationChannels,
  CommunicationChannelLabels,
  IssueTypes,
  IssueTypeLabels,
  ResponseTypes,
  ResponseTypeLabels,
  SatisfactionLevels,
  SatisfactionLevelLabels,
  citizenGroupsData,
  citizenIssues,
  citizenHelpers 
} from '../types/citizens.js';

const CitizenCommunication = () => {
  const { gameState, actions } = useGame();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [responseType, setResponseType] = useState('');
  const [responseAmount, setResponseAmount] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const citizensState = gameState.citizensState || {};
  const groups = citizensState.groups || {};
  const activeIssues = citizensState.activeIssues || [];
  const resolvedIssues = citizensState.resolvedIssues || [];
  const citizenMetrics = citizensState.citizenMetrics || {};
  const communicationStats = citizensState.communicationStats || {};

  const getGroupIcon = (group) => {
    const icons = {
      [CitizenGroups.PENSIONERS]: Users,
      [CitizenGroups.WORKERS]: Briefcase,
      [CitizenGroups.STUDENTS]: GraduationCap,
      [CitizenGroups.ENTREPRENEURS]: Target,
      [CitizenGroups.OFFICIALS]: Building,
      [CitizenGroups.INTELLECTUALS]: Star,
      [CitizenGroups.UNEMPLOYED]: AlertTriangle,
      [CitizenGroups.FAMILIES]: Heart
    };
    return icons[group] || Users;
  };

  const getIssueIcon = (type) => {
    const icons = {
      [IssueTypes.INFRASTRUCTURE]: Building,
      [IssueTypes.HEALTHCARE]: Heart,
      [IssueTypes.EDUCATION]: GraduationCap,
      [IssueTypes.HOUSING]: Home,
      [IssueTypes.TRANSPORT]: Car,
      [IssueTypes.ENVIRONMENT]: Leaf,
      [IssueTypes.SAFETY]: Shield,
      [IssueTypes.ECONOMY]: DollarSign,
      [IssueTypes.CULTURE]: Palette,
      [IssueTypes.SOCIAL]: HandHeart
    };
    return icons[type] || FileText;
  };

  const getChannelIcon = (channel) => {
    const icons = {
      [CommunicationChannels.EMAIL]: Mail,
      [CommunicationChannels.PHONE]: Phone,
      [CommunicationChannels.MEETING]: Users,
      [CommunicationChannels.SOCIAL_MEDIA]: MessageSquare,
      [CommunicationChannels.TOWN_HALL]: Megaphone,
      [CommunicationChannels.PETITION]: FileText,
      [CommunicationChannels.MEDIA]: Newspaper,
      [CommunicationChannels.PERSONAL_VISIT]: UserCheck
    };
    return icons[channel] || MessageSquare;
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      'critical': 'bg-red-100 text-red-800',
      'high': 'bg-orange-100 text-orange-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[urgency] || 'bg-gray-100 text-gray-800';
  };

  const handleRespondToIssue = (issueId, response) => {
    actions.respondToIssue(issueId, response);
    setSelectedIssue(null);
    setResponseType('');
    setResponseAmount(0);
    setResponseMessage('');
  };

  const handleScheduleMeeting = (groupId) => {
    actions.scheduleMeeting(groupId);
    setSelectedGroup(null);
  };

  const resolveGroupInfo = (groupKeyOrId) => {
    return (
      groups[groupKeyOrId] ||
      Object.values(groups).find(group => group.group === groupKeyOrId) ||
      citizenGroupsData.find(group => group.group === groupKeyOrId || group.id === groupKeyOrId) ||
      null
    );
  };

  const filteredIssues = activeIssues
    .filter(issue => filterGroup === 'all' || issue.group === filterGroup)
    .filter(issue => filterType === 'all' || issue.type === filterType);

  const highlightedIssue = selectedIssue || filteredIssues[0] || null;
  const highlightedGroup = highlightedIssue ? resolveGroupInfo(highlightedIssue.group) : null;
  const selectedGroupReference = selectedGroup ? resolveGroupInfo(selectedGroup.id) : null;

  useEffect(() => {
    if (filteredIssues.length === 0) {
      if (selectedIssue) {
        setSelectedIssue(null);
      }
      return;
    }

    const issueStillVisible = selectedIssue && filteredIssues.some(issue => issue.id === selectedIssue.id);
    if (!issueStillVisible) {
      setSelectedIssue(filteredIssues[0]);
    }
  }, [filteredIssues, selectedIssue]);

  useEffect(() => {
    if (selectedIssue) {
      setResponseType('');
      setResponseAmount(selectedIssue.cost);
      setResponseMessage('');
    }
  }, [selectedIssue]);

  const overallSatisfaction = citizenHelpers.calculateOverallSatisfaction(groups);
  const protestPotential = citizenHelpers.calculateProtestPotential(groups);

  const satisfiedGroups = Object.values(groups).filter(group => group.satisfaction >= 60).length;
  const dissatisfiedGroups = Object.values(groups).filter(group => group.satisfaction < 40).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Связь с жителями</h2>
          <p className="text-gray-600">
            Обращения граждан, собрания и взаимодействие с населением
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            Удовлетворенность: {overallSatisfaction.toFixed(0)}%
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Обращений: {activeIssues.length}
          </Badge>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Довольных групп</p>
                <p className="text-2xl font-bold text-green-600">{satisfiedGroups}</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Недовольных групп</p>
                <p className="text-2xl font-bold text-red-600">{dissatisfiedGroups}</p>
              </div>
              <ThumbsDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Протестный потенциал</p>
                <p className="text-2xl font-bold text-orange-600">{protestPotential.toFixed(0)}%</p>
              </div>
              <Megaphone className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Уровень доверия</p>
                <p className="text-2xl font-bold text-blue-600">{citizenMetrics.trustLevel || 52}%</p>
              </div>
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="issues" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues">Обращения</TabsTrigger>
          <TabsTrigger value="groups">Группы граждан</TabsTrigger>
          <TabsTrigger value="meetings">Собрания</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        {/* Обращения граждан */}
        <TabsContent value="issues" className="space-y-6">
          {/* Фильтры */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры:</span>
                </div>
                
                <div>
                  <Label htmlFor="group-filter" className="text-xs">Группа</Label>
                  <select
                    id="group-filter"
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все группы</option>
                    {Object.entries(CitizenGroupLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="type-filter" className="text-xs">Тип проблемы</Label>
                  <select
                    id="type-filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm"
                  >
                    <option value="all">Все типы</option>
                    {Object.entries(IssueTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {highlightedIssue && (
            <Card>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Приоритетное обращение</div>
                  <div className="font-semibold">{highlightedIssue.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Стоимость решения: {citizenHelpers.formatAmount(highlightedIssue.cost)}
                  </div>
                </div>
                {highlightedGroup && (
                  <div>
                    <div className="text-gray-500">Группа</div>
                    <div className="font-semibold flex items-center gap-2">
                      {CitizenGroupLabels[highlightedGroup.group]}
                      <Badge variant="outline">Удовл. {highlightedGroup.satisfaction}%</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Предпочитаемые каналы: {highlightedGroup.preferredChannels
                        .slice(0, 2)
                        .map(channel => CommunicationChannelLabels[channel])
                        .join(', ')}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-gray-500">Рекомендуемый ответ</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(highlightedIssue.expectedResponse || []).map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {ResponseTypeLabels[type]}
                      </Badge>
                    ))}
                    {highlightedIssue.expectedResponse?.length === 0 && (
                      <span className="text-xs text-gray-500">Нет рекомендаций</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Поддержка: {highlightedIssue.support} человек • Срочность: {highlightedIssue.urgency}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Список обращений */}
          {filteredIssues.length > 0 ? (
            <div className="space-y-4">
              {filteredIssues.map((issue) => {
                const IssueIcon = getIssueIcon(issue.type);
                const ChannelIcon = getChannelIcon(issue.channel);
                const group = groups[`bryansk_${issue.group}`];

                return (
                  <Card
                    key={issue.id}
                    className={`hover:shadow-lg transition-shadow ${
                      selectedIssue?.id === issue.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onMouseEnter={() => setSelectedIssue(issue)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <IssueIcon className="w-6 h-6 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{issue.title}</div>
                            <div className="text-gray-600 mb-2">{issue.description}</div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <ChannelIcon className="w-4 h-4" />
                                <span>{CommunicationChannelLabels[issue.channel]}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{CitizenGroupLabels[issue.group]}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{issue.support} поддерживающих</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getUrgencyColor(issue.urgency)}>
                            {issue.urgency === 'critical' ? 'Критично' :
                             issue.urgency === 'high' ? 'Высокая' :
                             issue.urgency === 'medium' ? 'Средняя' : 'Низкая'}
                          </Badge>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Стоимость решения</div>
                            <div className="font-bold text-green-600">
                              {citizenHelpers.formatAmount(issue.cost)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full"
                            onClick={() => setSelectedIssue(issue)}
                          >
                            Ответить на обращение
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <IssueIcon className="w-6 h-6" />
                              {issue.title}
                            </DialogTitle>
                            <DialogDescription>
                              {IssueTypeLabels[issue.type]} • {CitizenGroupLabels[issue.group]}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Детали обращения */}
                            <div>
                              <h4 className="font-medium mb-3">Детали обращения</h4>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <div className="text-sm text-gray-600">Канал обращения</div>
                                    <div className="font-medium">{CommunicationChannelLabels[issue.channel]}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-600">Уровень поддержки</div>
                                    <div className="font-medium">{issue.support} человек</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-600">Стоимость решения</div>
                                    <div className="font-medium">{citizenHelpers.formatAmount(issue.cost)}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-600">Срочность</div>
                                    <Badge className={getUrgencyColor(issue.urgency)}>
                                      {issue.urgency === 'critical' ? 'Критично' :
                                       issue.urgency === 'high' ? 'Высокая' :
                                       issue.urgency === 'medium' ? 'Средняя' : 'Низкая'}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600">{issue.description}</div>
                              </div>
                            </div>

                            {/* Информация о группе */}
                            {group && (
                              <div>
                                <h4 className="font-medium mb-3">Информация о группе</h4>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="text-sm text-gray-600">Удовлетворенность</div>
                                      <div className="flex items-center gap-2">
                                        <Progress value={group.satisfaction} className="flex-1" />
                                        <span className="text-sm font-medium">{group.satisfaction}%</span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-600">Влияние</div>
                                      <div className="flex items-center gap-2">
                                        <Progress value={group.influence} className="flex-1" />
                                        <span className="text-sm font-medium">{group.influence}%</span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-600">Численность</div>
                                      <div className="font-medium">{group.population.toLocaleString('ru-RU')} чел.</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-600">Протестный потенциал</div>
                                      <div className="font-medium">{group.characteristics.protest_potential}%</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Варианты ответа */}
                            <div>
                              <h4 className="font-medium mb-3">Варианты ответа</h4>
                              <div className="space-y-3">
                                {Object.entries(ResponseTypeLabels).map(([type, label]) => {
                                  const isRecommended = issue.expectedResponse?.includes(type);
                                  
                                  return (
                                    <div key={type} className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                      responseType === type ? 'border-blue-500 bg-blue-50' : 
                                      isRecommended ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                                    }`} onClick={() => setResponseType(type)}>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="radio"
                                            name="responseType"
                                            value={type}
                                            checked={responseType === type}
                                            onChange={(e) => setResponseType(e.target.value)}
                                            className="rounded"
                                          />
                                          <span className="font-medium">{label}</span>
                                          {isRecommended && (
                                            <Badge className="bg-green-100 text-green-800 text-xs">
                                              Рекомендуется
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Дополнительные параметры */}
                            {(responseType === ResponseTypes.FUNDING || responseType === ResponseTypes.COMPENSATION) && (
                              <div>
                                <Label htmlFor="response-amount">Сумма выделения</Label>
                                <Input
                                  id="response-amount"
                                  type="number"
                                  value={responseAmount || issue.cost}
                                  onChange={(e) => setResponseAmount(Number(e.target.value))}
                                  placeholder="Введите сумму"
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                  Рекомендуемая сумма: {citizenHelpers.formatAmount(issue.cost)}
                                </div>
                              </div>
                            )}

                            <div>
                              <Label htmlFor="response-message">Сообщение для граждан</Label>
                              <Textarea
                                id="response-message"
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                placeholder="Введите ваш ответ гражданам..."
                                rows={3}
                              />
                            </div>

                            {/* Прогноз последствий */}
                            {responseType && issue.consequences && (
                              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="font-medium mb-2">Прогнозируемые последствия:</div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {Object.entries(issue.consequences).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span>{key}:</span>
                                      <span className={`font-medium ${
                                        typeof value === 'number' && value > 0 ? 'text-green-600' : 
                                        typeof value === 'number' && value < 0 ? 'text-red-600' : 'text-gray-800'
                                      }`}>
                                        {typeof value === 'object' ? JSON.stringify(value) : value}
                                      </span>
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
                                  setSelectedIssue(null);
                                  setResponseType('');
                                  setResponseAmount(0);
                                  setResponseMessage('');
                                }}
                                className="flex-1"
                              >
                                Отмена
                              </Button>
                              {responseType && (
                                <Button 
                                  onClick={() => handleRespondToIssue(issue.id, {
                                    type: responseType,
                                    amount: responseAmount,
                                    message: responseMessage
                                  })}
                                  className="flex-1"
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Отправить ответ
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
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <div className="text-xl font-medium mb-2">Нет активных обращений</div>
                <div className="text-gray-600">
                  Новые обращения граждан будут появляться здесь
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Группы граждан */}
        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.values(groups).map((group) => {
              const GroupIcon = getGroupIcon(group.group);
              const satisfactionColor = citizenHelpers.getSatisfactionColor(group.satisfaction);
              const influenceColor = citizenHelpers.getInfluenceColor(group.influence);
              return (
                <Card
                  key={group.id}
                  className={`hover:shadow-lg transition-shadow ${
                    selectedGroup?.id === group.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setSelectedGroup(group)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GroupIcon className="w-5 h-5 text-blue-600" />
                        <span>{group.name}</span>
                      </div>
                      <Badge variant="outline">
                        {group.population.toLocaleString('ru-RU')} чел.
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Основные показатели */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Удовлетворенность</div>
                        <div className="flex items-center gap-2">
                          <Progress value={group.satisfaction} className="flex-1" />
                          <span className={`text-sm font-medium ${satisfactionColor}`}>
                            {group.satisfaction}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Влияние</div>
                        <div className="flex items-center gap-2">
                          <Progress value={group.influence} className="flex-1" />
                          <span className={`text-sm font-medium ${influenceColor}`}>
                            {group.influence}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Характеристики */}
                    <div>
                      <div className="text-sm font-medium mb-2">Характеристики:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Политическая активность:</span>
                          <span className="font-medium">{group.characteristics.political_activity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Протестный потенциал:</span>
                          <span className="font-medium">{group.characteristics.protest_potential}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Лояльность к власти:</span>
                          <span className="font-medium">{group.characteristics.loyalty_to_authority}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Явка на выборы:</span>
                          <span className="font-medium">{group.demographics.voting_turnout}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Приоритеты */}
                    <div>
                      <div className="text-sm font-medium mb-2">Приоритеты:</div>
                      <div className="flex flex-wrap gap-1">
                        {group.priorities.slice(0, 3).map((priority) => (
                          <Badge key={priority} variant="outline" className="text-xs">
                            {IssueTypeLabels[priority]}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Предпочитаемые каналы */}
                    <div>
                      <div className="text-sm font-medium mb-2">Предпочитаемые каналы:</div>
                      <div className="flex flex-wrap gap-1">
                        {group.preferredChannels.slice(0, 2).map((channel) => {
                          const ChannelIcon = getChannelIcon(channel);
                          return (
                            <div key={channel} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                              <ChannelIcon className="w-3 h-3" />
                              <span>{CommunicationChannelLabels[channel]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedGroup(group)}
                        >
                          Взаимодействие
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <GroupIcon className="w-6 h-6" />
                            {group.name}
                          </DialogTitle>
                          <DialogDescription>
                            Население: {group.population.toLocaleString('ru-RU')} человек
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Детальная статистика */}
                          <div>
                            <h4 className="font-medium mb-3">Детальная информация</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Средний возраст</div>
                                <div className="font-medium">{group.demographics.average_age} лет</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Средний доход</div>
                                <div className="font-medium">{group.demographics.average_income.toLocaleString('ru-RU')} ₽</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Уровень образования</div>
                                <div className="font-medium capitalize">{group.demographics.education_level}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Внимание СМИ</div>
                                <div className="font-medium">{group.characteristics.media_attention}%</div>
                              </div>
                            </div>
                          </div>

                          {/* История взаимодействий */}
                          <div>
                            <h4 className="font-medium mb-3">История взаимодействий</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span>Всего обещаний:</span>
                                <span className="font-medium">{group.totalPromises || 0}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Выполнено:</span>
                                <span className="font-medium text-green-600">{group.fulfilledPromises || 0}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Процент выполнения:</span>
                                <span className="font-medium">
                                  {group.totalPromises > 0 ? 
                                    ((group.fulfilledPromises / group.totalPromises) * 100).toFixed(0) : 0}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Последнее взаимодействие:</span>
                                <span className="font-medium">
                                  {group.lastInteraction ? 
                                    new Date(group.lastInteraction).toLocaleDateString('ru-RU') : 'Никогда'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <div className="flex gap-2 w-full">
                            <Button 
                              variant="outline"
                              onClick={() => setSelectedGroup(null)}
                              className="flex-1"
                            >
                              Закрыть
                            </Button>
                            <Button 
                              onClick={() => handleScheduleMeeting(group.id)}
                              className="flex-1"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Назначить встречу
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

          {selectedGroup && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Фокус: {selectedGroup.name}</span>
                  <Badge variant="outline">Влияние {selectedGroup.influence}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-gray-500">Удовлетворенность</div>
                    <div className={citizenHelpers.getSatisfactionColor(selectedGroup.satisfaction)}>
                      {selectedGroup.satisfaction}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Протестный потенциал</div>
                    <div className="font-semibold">{selectedGroup.characteristics.protest_potential}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Население</div>
                    <div className="font-semibold">{selectedGroup.population.toLocaleString('ru-RU')} чел.</div>
                  </div>
                </div>

                {selectedGroupReference?.preferredChannels && (
                  <div className="text-xs text-gray-500">
                    Источник данных: профайл «{selectedGroupReference.name}». Предпочитаемые каналы: {selectedGroupReference
                      .preferredChannels
                      .slice(0, 3)
                      .map(channel => CommunicationChannelLabels[channel])
                      .join(', ')}.
                  </div>
                )}

                <div>
                  <div className="text-gray-500 mb-1">Актуальные проблемы</div>
                  <div className="flex flex-wrap gap-2">
                    {citizenIssues
                      .filter(issue => issue.group === selectedGroup.group)
                      .slice(0, 3)
                      .map(issue => (
                        <Badge key={issue.id} variant="outline" className="text-xs">
                          {issue.title}
                        </Badge>
                      ))}
                    {citizenIssues.filter(issue => issue.group === selectedGroup.group).length === 0 && (
                      <span className="text-xs text-gray-500">Нет зарегистрированных обращений</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Собрания и встречи */}
        <TabsContent value="meetings" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <div className="text-xl font-medium mb-2">Нет запланированных собраний</div>
              <div className="text-gray-600 mb-4">
                Назначайте встречи с группами граждан для обсуждения важных вопросов
              </div>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Запланировать собрание
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Аналитика */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Статистика обращений */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика обращений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Всего обращений</div>
                    <div className="text-2xl font-bold">{communicationStats.totalIssues || 0}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Решено</div>
                    <div className="text-xl font-semibold text-green-600">
                      {communicationStats.resolvedIssues || 0}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Процент решения</div>
                    <div className="text-lg font-semibold">
                      {communicationStats.totalIssues > 0 ? 
                        ((communicationStats.resolvedIssues / communicationStats.totalIssues) * 100).toFixed(0) : 0}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Удовлетворенность по группам */}
            <Card>
              <CardHeader>
                <CardTitle>Удовлетворенность по группам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.values(groups).map((group) => (
                    <div key={group.id} className="flex items-center justify-between">
                      <span className="text-sm">{CitizenGroupLabels[group.group]}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={group.satisfaction} className="w-20" />
                        <span className={`text-sm font-medium ${citizenHelpers.getSatisfactionColor(group.satisfaction)}`}>
                          {group.satisfaction}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* История решенных обращений */}
          <Card>
            <CardHeader>
              <CardTitle>История решенных обращений</CardTitle>
            </CardHeader>
            <CardContent>
              {resolvedIssues.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Обращение</TableHead>
                      <TableHead>Группа</TableHead>
                      <TableHead>Ответ</TableHead>
                      <TableHead>Результат</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resolvedIssues.slice(-10).reverse().map((issue, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(issue.resolvedDate).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>{issue.title}</TableCell>
                        <TableCell>{CitizenGroupLabels[issue.group]}</TableCell>
                        <TableCell>{ResponseTypeLabels[issue.response?.type]}</TableCell>
                        <TableCell>
                          {issue.satisfactionChange > 0 ? (
                            <Badge className="bg-green-100 text-green-800">
                              +{issue.satisfactionChange}%
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">
                              {issue.satisfactionChange}%
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div className="text-lg font-medium mb-1">Нет решенных обращений</div>
                  <div className="text-sm text-gray-600">
                    Решенные обращения будут отображаться здесь
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

export default CitizenCommunication;
