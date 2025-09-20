import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { GameProvider } from './contexts/GameContext.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProjectsPanel from './components/ProjectsPanel.jsx';
import EventModal from './components/EventModal.jsx';
import GameControls from './components/GameControls.jsx';
import { 
  LayoutDashboard, 
  Building2, 
  BarChart3, 
  History,
  MapPin
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
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Обзор</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Проекты</span>
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Статистика</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">История</span>
                </TabsTrigger>
              </TabsList>

              {/* Содержимое вкладок */}
              <TabsContent value="dashboard" className="space-y-6">
                <Dashboard />
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <ProjectsPanel />
              </TabsContent>

              <TabsContent value="statistics" className="space-y-6">
                <StatisticsPanel />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <HistoryPanel />
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
                Игра-симулятор "Мэр Брянска" • Управляйте городом и развивайте его инфраструктуру
              </p>
              <p className="mt-1">
                Создано с использованием React и современных веб-технологий
              </p>
            </div>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
}

// Компонент статистики (заглушка)
const StatisticsPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Статистика города</h2>
        <p className="text-gray-600">
          Детальная аналитика развития Брянска
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Экономические показатели</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Доходы за месяц:</span>
              <span className="font-medium text-green-600">+45,2 млн ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Расходы за месяц:</span>
              <span className="font-medium text-red-600">-38,7 млн ₽</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Чистая прибыль:</span>
              <span className="font-medium text-blue-600">+6,5 млн ₽</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Социальные показатели</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Население:</span>
              <span className="font-medium">372,123 чел.</span>
            </div>
            <div className="flex justify-between">
              <span>Рождаемость:</span>
              <span className="font-medium text-green-600">+0.8%</span>
            </div>
            <div className="flex justify-between">
              <span>Миграция:</span>
              <span className="font-medium text-blue-600">+0.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Проекты</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Завершено:</span>
              <span className="font-medium text-green-600">12</span>
            </div>
            <div className="flex justify-between">
              <span>В процессе:</span>
              <span className="font-medium text-blue-600">5</span>
            </div>
            <div className="flex justify-between">
              <span>Отменено:</span>
              <span className="font-medium text-red-600">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент истории (заглушка)
const HistoryPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">История решений</h2>
        <p className="text-gray-600">
          Хронология важных событий и принятых решений
        </p>
      </div>
      
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Запуск проекта "Очистка реки Десны"</h4>
                  <span className="text-sm text-gray-500">15.01.2025</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Начата реализация экологического проекта стоимостью 35 млн рублей
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Решение мусорного кризиса</h4>
                  <span className="text-sm text-gray-500">12.01.2025</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Выбрано решение: нанять дополнительные мусоровозы (+15 экология, +10 счастье)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Начало работы мэром</h4>
                  <span className="text-sm text-gray-500">01.01.2025</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Вступление в должность мэра города Брянска
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
