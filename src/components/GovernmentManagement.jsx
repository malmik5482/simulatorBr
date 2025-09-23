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
  Users, 
  Building2, 
  TrendingUp, 
  TrendingDown,
  UserPlus,
  UserMinus,
  Settings,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
  Star,
  Briefcase,
  GraduationCap,
  Heart,
  Zap,
  Shield
} from 'lucide-react';
import { useGame } from '../contexts/GameContext.jsx';
import { 
  GovernmentDepartments,
  DepartmentLabels,
  PositionLevels,
  PositionLevelLabels,
  EmployeeQualities,
  QualityLabels,
  DecisionTypes,
  employeesData,
  policyOptions,
  governmentHelpers 
} from '../types/government.js';

const GovernmentManagement = () => {
  const { gameState, actions } = useGame();
  const [selectedDepartment, setSelectedDepartment] = useState(GovernmentDepartments.ADMINISTRATION);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [newSalary, setNewSalary] = useState(0);
  const [decisionText, setDecisionText] = useState('');

  const governmentState = gameState.governmentState || {};
  const employees = governmentState.employees || {};
  const activePolicies = governmentState.activePolicies || [];
  const departmentSettings = governmentState.departmentSettings || {};
  const performanceMetrics = governmentState.performanceMetrics || {};

  const currentDepartmentEmployees = employees[selectedDepartment] || [];
  const currentDepartmentSettings = departmentSettings[selectedDepartment] || {};

  const getQualityIcon = (quality) => {
    const icons = {
      [EmployeeQualities.LOYALTY]: Heart,
      [EmployeeQualities.COMPETENCE]: GraduationCap,
      [EmployeeQualities.CORRUPTION_RESISTANCE]: Shield,
      [EmployeeQualities.INITIATIVE]: Zap,
      [EmployeeQualities.CONNECTIONS]: Users
    };
    return icons[quality] || Star;
  };

  const getQualityColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDepartmentIcon = (department) => {
    const icons = {
      [GovernmentDepartments.ADMINISTRATION]: Building2,
      [GovernmentDepartments.FINANCE]: DollarSign,
      [GovernmentDepartments.URBAN_PLANNING]: Target,
      [GovernmentDepartments.SOCIAL_SERVICES]: Heart,
      [GovernmentDepartments.EDUCATION]: GraduationCap,
      [GovernmentDepartments.HEALTHCARE]: Heart,
      [GovernmentDepartments.TRANSPORT]: Target,
      [GovernmentDepartments.UTILITIES]: Settings,
      [GovernmentDepartments.CULTURE]: Star,
      [GovernmentDepartments.SPORTS]: Award,
      [GovernmentDepartments.EMERGENCY]: AlertTriangle,
      [GovernmentDepartments.ECOLOGY]: Target
    };
    return icons[department] || Building2;
  };

  const handlePromoteEmployee = (employeeId) => {
    actions.promoteEmployee(employeeId);
  };

  const handleFireEmployee = (employeeId) => {
    actions.fireEmployee(employeeId);
  };

  const handleChangeSalary = (employeeId, newSalary) => {
    actions.changeEmployeeSalary(employeeId, newSalary);
    setNewSalary(0);
    setSelectedEmployee(null);
  };

  const handleImplementPolicy = (policyId) => {
    actions.implementPolicy(policyId);
    setSelectedPolicy(null);
  };

  const handleMakeDecision = (type, data) => {
    actions.makeGovernmentDecision(type, data);
    setDecisionText('');
  };

  const departmentEfficiency = governmentHelpers.calculateDepartmentEfficiency(
    selectedDepartment,
    currentDepartmentEmployees
  );

  const departmentCost = governmentHelpers.calculateDepartmentCost(currentDepartmentEmployees);
  const currentEmployeeIds = new Set(Object.values(employees).flat().map(employee => employee.id));
  const talentPool = employeesData
    .filter(candidate => !currentEmployeeIds.has(candidate.id))
    .sort((a, b) => b.qualities.competence - a.qualities.competence)
    .slice(0, 3);
  const selectedEmployeeRisk = selectedEmployee ? governmentHelpers.calculateResignationRisk(selectedEmployee) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Управление органами власти</h2>
          <p className="text-gray-600">
            Кадровая политика, департаменты и принятие решений
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Сотрудников: {Object.values(employees).flat().length}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Эффективность: {performanceMetrics.departmentEfficiency || 70}%
          </Badge>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Решений в месяц</p>
                <p className="text-2xl font-bold">{performanceMetrics.decisionsPerMonth || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Удовлетворенность</p>
                <p className="text-2xl font-bold text-green-600">
                  {performanceMetrics.employeeSatisfaction || 75}%
                </p>
              </div>
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Время решения</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {performanceMetrics.averageDecisionTime || 0} дн.
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Инциденты</p>
                <p className="text-2xl font-bold text-red-600">
                  {performanceMetrics.corruptionIncidents || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="departments">Департаменты</TabsTrigger>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
          <TabsTrigger value="policies">Политики</TabsTrigger>
          <TabsTrigger value="decisions">Решения</TabsTrigger>
        </TabsList>

        {/* Департаменты */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Список департаментов */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Департаменты</h3>
              <div className="space-y-2">
                {Object.values(GovernmentDepartments).map((dept) => {
                  const Icon = getDepartmentIcon(dept);
                  const deptEmployees = employees[dept] || [];
                  const efficiency = governmentHelpers.calculateDepartmentEfficiency(dept, deptEmployees);
                  
                  return (
                    <Card 
                      key={dept} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedDepartment === dept ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-medium">{DepartmentLabels[dept]}</div>
                              <div className="text-sm text-gray-500">
                                {deptEmployees.length} сотрудников
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              efficiency >= 80 ? 'text-green-600' : 
                              efficiency >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {efficiency.toFixed(0)}%
                            </div>
                            <div className="text-xs text-gray-500">эффективность</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Детали выбранного департамента */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {DepartmentLabels[selectedDepartment]}
                </h3>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Показатели</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Эффективность</span>
                        <span>{departmentEfficiency.toFixed(0)}%</span>
                      </div>
                      <Progress value={departmentEfficiency} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Моральный дух</span>
                        <span>{currentDepartmentSettings.morale || 75}%</span>
                      </div>
                      <Progress value={currentDepartmentSettings.morale || 75} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Автономия</span>
                        <span>{currentDepartmentSettings.autonomy || 50}%</span>
                      </div>
                      <Progress value={currentDepartmentSettings.autonomy || 50} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Финансы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Бюджет департамента</div>
                      <div className="text-xl font-bold">
                        {(currentDepartmentSettings.budget || 10000000).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Расходы на зарплаты</div>
                      <div className="text-lg font-semibold">
                        {departmentCost.toLocaleString('ru-RU')} ₽/мес
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Приоритет</div>
                      <Badge variant="outline">
                        {currentDepartmentSettings.priority === 'high' ? 'Высокий' :
                         currentDepartmentSettings.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Сотрудники департамента */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    Сотрудники
                    <Button size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Нанять
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentDepartmentEmployees.length > 0 ? (
                    <div className="space-y-3">
                      {currentDepartmentEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.position}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {employee.salary.toLocaleString('ru-RU')} ₽
                              </div>
                              <div className="text-xs text-gray-500">
                                Опыт: {employee.experience} лет
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                employee.mood >= 80 ? 'bg-green-500' :
                                employee.mood >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                              <span className="text-sm">{employee.mood}%</span>
                            </div>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedEmployee(employee)}
                                >
                                  Управление
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{employee.name}</DialogTitle>
                                  <DialogDescription>
                                    {employee.position} • {employee.background}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-6">
                                  {/* Качества */}
                                  <div>
                                    <h4 className="font-medium mb-3">Качества</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      {Object.entries(employee.qualities).map(([quality, value]) => {
                                        const Icon = getQualityIcon(quality);
                                        return (
                                          <div key={quality} className="flex items-center gap-2">
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm">{QualityLabels[quality]}</span>
                                            <span className={`text-sm font-medium ${getQualityColor(value)}`}>
                                              {value}%
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  {/* Достижения и слабости */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Достижения</h4>
                                      <ul className="text-sm space-y-1">
                                        {employee.achievements.map((achievement, index) => (
                                          <li key={index} className="flex items-center gap-2">
                                            <CheckCircle className="w-3 h-3 text-green-600" />
                                            {achievement}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-medium mb-2">Слабости</h4>
                                      <ul className="text-sm space-y-1">
                                        {employee.weaknesses.map((weakness, index) => (
                                          <li key={index} className="flex items-center gap-2">
                                            <AlertTriangle className="w-3 h-3 text-yellow-600" />
                                            {weakness}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  {/* Управление */}
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="new-salary">Новая зарплата</Label>
                                      <div className="flex gap-2">
                                        <Input
                                          id="new-salary"
                                          type="number"
                                          value={newSalary || employee.salary}
                                          onChange={(e) => setNewSalary(Number(e.target.value))}
                                          placeholder={employee.salary.toString()}
                                        />
                                        <Button 
                                          onClick={() => handleChangeSalary(employee.id, newSalary)}
                                          disabled={!newSalary || newSalary === employee.salary}
                                        >
                                          Изменить
                                        </Button>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        Рекомендуемая: {governmentHelpers.calculateRecommendedSalary(employee).toLocaleString('ru-RU')} ₽
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <DialogFooter>
                                  <div className="flex gap-2 w-full">
                                    <Button 
                                      onClick={() => handlePromoteEmployee(employee.id)}
                                      className="flex-1"
                                    >
                                      Повысить
                                    </Button>
                                    <Button 
                                      onClick={() => handleFireEmployee(employee.id)}
                                      variant="destructive"
                                      className="flex-1"
                                    >
                                      Уволить
                                    </Button>
                                  </div>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      В департаменте нет сотрудников
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {selectedPolicy && (() => {
            const policyDetails = policyOptions.find(item => item.id === selectedPolicy);
            if (!policyDetails) return null;
            return (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Выбранная политика: {policyDetails.name}</span>
                    <Badge variant="outline">{policyDetails.duration} дней</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Департамент</div>
                    <div className="font-semibold">{DepartmentLabels[policyDetails.department]}</div>
                    <div className="text-xs text-gray-500 mt-1">Стоимость: {policyDetails.cost.toLocaleString('ru-RU')} ₽</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ключевые эффекты</div>
                    <div className="space-y-1 mt-1">
                      {Object.entries(policyDetails.effects).map(([effect, value]) => (
                        <div key={effect} className={`text-xs ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {effect}: {value >= 0 ? '+' : ''}{value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Дополнительно</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {policyDetails.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}
        </TabsContent>

        {/* Все сотрудники */}
        <TabsContent value="employees" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Все сотрудники</h3>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Нанять сотрудника
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Департамент</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead>Зарплата</TableHead>
                    <TableHead>Настроение</TableHead>
                    <TableHead>Эффективность</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(employees).flat().map((employee) => {
                    const avgQuality = Object.values(employee.qualities).reduce((a, b) => a + b, 0) / 5;
                    const resignationRisk = governmentHelpers.calculateResignationRisk(employee);
                    
                    return (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">
                              {employee.age} лет, опыт {employee.experience} лет
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {DepartmentLabels[employee.department]}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.salary.toLocaleString('ru-RU')} ₽</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              employee.mood >= 80 ? 'bg-green-500' :
                              employee.mood >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                            {employee.mood}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={avgQuality} className="w-16" />
                            {avgQuality.toFixed(0)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedEmployee(employee)}
                            >
                              Управление
                            </Button>
                            {resignationRisk > 70 && (
                              <Badge variant="destructive" className="text-xs">
                                Риск увольнения
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedEmployee && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Выбранный сотрудник: {selectedEmployee.name}</span>
                  <Badge variant="outline">Риск ухода {selectedEmployeeRisk}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Департамент</div>
                  <div className="font-semibold">{DepartmentLabels[selectedEmployee.department]}</div>
                  <div className="text-xs text-gray-500 mt-1">Опыт: {selectedEmployee.experience} лет</div>
                </div>
                <div>
                  <div className="text-gray-500">Качества</div>
                  <div className="space-y-1 mt-1">
                    {Object.entries(selectedEmployee.qualities).map(([quality, value]) => (
                      <div key={quality} className="flex justify-between text-xs">
                        <span>{QualityLabels[quality]}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Рекомендации</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Рекомендуемая зарплата: {governmentHelpers.calculateRecommendedSalary(selectedEmployee).toLocaleString('ru-RU')} ₽
                    <br />Настроение: {selectedEmployee.mood}%
                  </div>
                  {selectedEmployeeRisk > 60 && (
                    <Badge variant="destructive" className="mt-2">Высокий риск ухода</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {talentPool.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Кадровый резерв</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                {talentPool.map((candidate) => (
                  <div key={candidate.id} className="p-3 border rounded-lg">
                    <div className="font-semibold">{candidate.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{candidate.position}</div>
                    <div className="flex justify-between text-xs">
                      <span>Компетентность</span>
                      <span className="font-medium">{candidate.qualities[EmployeeQualities.COMPETENCE]}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Лояльность</span>
                      <span className="font-medium">{candidate.qualities[EmployeeQualities.LOYALTY]}%</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      variant="outline"
                      onClick={() => setSelectedDepartment(candidate.department)}
                    >
                      Перейти к отделу
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Политики */}
        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Доступные политики */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Доступные политики</h3>
              <div className="space-y-3">
                {policyOptions.map((policy) => {
                  const canImplement = governmentHelpers.canImplementPolicy(
                    policy,
                    policy.department,
                    employees[policy.department]
                  );

                  return (
                    <Card
                      key={policy.id}
                      className={`hover:shadow-md transition-shadow ${
                        selectedPolicy === policy.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onMouseEnter={() => setSelectedPolicy(policy.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold">{policy.name}</div>
                            <div className="text-sm text-gray-500">
                              {DepartmentLabels[policy.department]}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {policy.duration} дней
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <div className="text-gray-500">Стоимость</div>
                            <div className="font-semibold">{policy.cost.toLocaleString('ru-RU')} ₽</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Эффекты</div>
                            <div className="space-y-1">
                              {Object.entries(policy.effects).map(([effect, value]) => (
                                <div key={effect} className={`text-xs ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {effect}: {value > 0 ? '+' : ''}{value}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full"
                          disabled={!canImplement.canImplement}
                          onClick={() => handleImplementPolicy(policy.id)}
                        >
                          {canImplement.canImplement ? 'Внедрить' : canImplement.reason}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Активные политики */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Активные политики</h3>
              {activePolicies.length > 0 ? (
                <div className="space-y-3">
                  {activePolicies.map((policy) => (
                    <Card key={policy.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-semibold">{policy.name}</div>
                            <div className="text-sm text-gray-500">
                              Запущена: {new Date(policy.startDate).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {policy.status === 'active' ? 'Активна' : 'Завершена'}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Прогресс</span>
                            <span>{policy.remainingDays} дней осталось</span>
                          </div>
                          <Progress 
                            value={((policy.duration - policy.remainingDays) / policy.duration) * 100} 
                          />
                        </div>
                        
                        <div className="mt-3 pt-3 border-t text-sm">
                          <div className="text-gray-600">Ожидаемые результаты:</div>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            {Object.entries(policy.effects).map(([effect, value]) => (
                              <div key={effect} className={`${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {effect}: {value > 0 ? '+' : ''}{value}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <div className="text-lg font-medium mb-1">Нет активных политик</div>
                    <div className="text-sm text-gray-600">
                      Внедрите новые политики для улучшения работы администрации
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Решения */}
        <TabsContent value="decisions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Принятие решений */}
            <Card>
              <CardHeader>
                <CardTitle>Принять решение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="decision-type">Тип решения</Label>
                  <select id="decision-type" className="w-full p-2 border rounded-md">
                    <option value="">Выберите тип</option>
                    <option value={DecisionTypes.BUDGET_ALLOCATION}>Распределение бюджета</option>
                    <option value={DecisionTypes.PERSONNEL_DECISION}>Кадровое решение</option>
                    <option value={DecisionTypes.POLICY_CHANGE}>Изменение политики</option>
                    <option value={DecisionTypes.PROJECT_APPROVAL}>Утверждение проекта</option>
                    <option value={DecisionTypes.REGULATION_UPDATE}>Обновление регламента</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="decision-department">Департамент</Label>
                  <select id="decision-department" className="w-full p-2 border rounded-md">
                    <option value="">Выберите департамент</option>
                    {Object.values(GovernmentDepartments).map((dept) => (
                      <option key={dept} value={dept}>
                        {DepartmentLabels[dept]}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="decision-text">Описание решения</Label>
                  <Textarea
                    id="decision-text"
                    value={decisionText}
                    onChange={(e) => setDecisionText(e.target.value)}
                    placeholder="Опишите суть принимаемого решения..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  className="w-full"
                  disabled={!decisionText.trim()}
                  onClick={() => handleMakeDecision(DecisionTypes.POLICY_CHANGE, { description: decisionText })}
                >
                  Принять решение
                </Button>
              </CardContent>
            </Card>

            {/* История решений */}
            <Card>
              <CardHeader>
                <CardTitle>История решений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Здесь будет список принятых решений */}
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <div className="text-lg font-medium mb-1">Нет принятых решений</div>
                    <div className="text-sm text-gray-600">
                      Принятые решения будут отображаться здесь
                    </div>
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

export default GovernmentManagement;
