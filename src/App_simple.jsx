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
                v2.0 - Расширенная версия
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Обзор</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Проекты</span>
                </TabsTrigger>
              </TabsList>

              {/* Содержимое вкладок */}
              <TabsContent value="dashboard" className="space-y-6">
                <Dashboard />
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
}

export default App;
