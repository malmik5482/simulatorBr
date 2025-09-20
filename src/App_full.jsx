import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { GameProvider } from './contexts/GameContext.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProjectsPanel from './components/ProjectsPanel.jsx';
import EventModal from './components/EventModal.jsx';
import GameControls from './components/GameControls.jsx';
import BudgetManager from './components/BudgetManager.jsx';
import BankingSystem from './components/BankingSystem.jsx';
import GovernmentManagement from './components/GovernmentManagement.jsx';
import InvestmentManager from './components/InvestmentManager.jsx';
import IndustryManager from './components/IndustryManager.jsx';
import SecurityManager from './components/SecurityManager.jsx';
import CitizenCommunication from './components/CitizenCommunication.jsx';
import TaxationManager from './components/TaxationManager.jsx';
import ConstructionManager from './components/ConstructionManager.jsx';
import PersonalSpendingManager from './components/PersonalSpendingManager.jsx';
import { 
  LayoutDashboard, 
  Building2, 
  BarChart3, 
  History,
  MapPin,
  DollarSign,
  Banknote,
  Users,
  TrendingUp,
  Factory,
  Shield,
  MessageSquare,
  Receipt,
  Hammer,
  Wallet
} from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Заголовок приложения */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Мэр Брянска
                  </h1>
                  <p className="text-xs text-gray-600">
                    Городской симулятор
                  </p>
                </div>
              </div>
              
              {/* Версия игры */}
              <div className="text-xs text-gray-500">
                v1.0
              </div>
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Панель управления игрой */}
            <GameControls />

            {/* Навигация по разделам */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 min-w-max">
                  <TabsTrigger value="dashboard" className="flex items-center gap-2 min-w-0">
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden sm:inline">Обзор</span>
                  </TabsTrigger>
                  <TabsTrigger value="budget" className="flex items-center gap-2 min-w-0">
                    <DollarSign className="w-4 h-4" />
                    <span className="hidden sm:inline">Бюджет</span>
                  </TabsTrigger>
                  <TabsTrigger value="banking" className="flex items-center gap-2 min-w-0">
                    <Banknote className="w-4 h-4" />
                    <span className="hidden sm:inline">Банки</span>
                  </TabsTrigger>
                  <TabsTrigger value="government" className="flex items-center gap-2 min-w-0">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Власть</span>
                  </TabsTrigger>
                  <TabsTrigger value="investments" className="flex items-center gap-2 min-w-0">
                    <TrendingUp className="w-4 h-4" />
                    <span className="hidden sm:inline">Инвестиции</span>
                  </TabsTrigger>
                  <TabsTrigger value="industry" className="flex items-center gap-2 min-w-0">
                    <Factory className="w-4 h-4" />
                    <span className="hidden sm:inline">Промышленность</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2 min-w-0">
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Безопасность</span>
                  </TabsTrigger>
                  <TabsTrigger value="citizens" className="flex items-center gap-2 min-w-0">
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Граждане</span>
                  </TabsTrigger>
                  <TabsTrigger value="taxation" className="flex items-center gap-2 min-w-0">
                    <Receipt className="w-4 h-4" />
                    <span className="hidden sm:inline">Налоги</span>
                  </TabsTrigger>
                  <TabsTrigger value="construction" className="flex items-center gap-2 min-w-0">
                    <Hammer className="w-4 h-4" />
                    <span className="hidden sm:inline">Строительство</span>
                  </TabsTrigger>
                  <TabsTrigger value="personal" className="flex items-center gap-2 min-w-0">
                    <Wallet className="w-4 h-4" />
                    <span className="hidden sm:inline">Личные</span>
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex items-center gap-2 min-w-0">
                    <Building2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Проекты</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Содержимое вкладок */}
              <TabsContent value="dashboard" className="space-y-6">
                <Dashboard />
              </TabsContent>

              <TabsContent value="budget" className="space-y-6">
                <BudgetManager />
              </TabsContent>

              <TabsContent value="banking" className="space-y-6">
                <BankingSystem />
              </TabsContent>

              <TabsContent value="government" className="space-y-6">
                <GovernmentManagement />
              </TabsContent>

              <TabsContent value="investments" className="space-y-6">
                <InvestmentManager />
              </TabsContent>

              <TabsContent value="industry" className="space-y-6">
                <IndustryManager />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <SecurityManager />
              </TabsContent>

              <TabsContent value="citizens" className="space-y-6">
                <CitizenCommunication />
              </TabsContent>

              <TabsContent value="taxation" className="space-y-6">
                <TaxationManager />
              </TabsContent>

              <TabsContent value="construction" className="space-y-6">
                <ConstructionManager />
              </TabsContent>

              <TabsContent value="personal" className="space-y-6">
                <PersonalSpendingManager />
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <ProjectsPanel />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Модальные окна */}
        <EventModal />

        {/* Футер */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>
                Игра-симулятор "Мэр Брянска" • Полноценное управление городом с детальными механиками
              </p>
              <p className="mt-1">
                Бюджет • Банки • Промышленность • Коррупция • Силовые структуры • Граждане • Строительство
              </p>
              <p className="mt-1 text-xs">
                Создано с использованием React и современных веб-технологий
              </p>
            </div>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
};

export default App;
