import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';
import { useGame } from '../hooks/useGame.js';
import { gameStateHelpers } from '../types/game.js';

const EventModal = () => {
  const { gameState, actions } = useGame();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const event = gameState.pendingEvent;
  const isOpen = !!event;

  if (!event) return null;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleConfirm = async () => {
    if (!selectedOption) return;

    setIsProcessing(true);
    
    // Небольшая задержка для UX
    setTimeout(() => {
      actions.processEventDecision(event.id, selectedOption.id);
      setSelectedOption(null);
      setIsProcessing(false);
    }, 500);
  };

  const handleCancel = () => {
    setSelectedOption(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const renderEffectIcon = (key, value) => {
    if (key === 'budget') {
      return value > 0 ? 
        <TrendingUp className="w-4 h-4 text-green-600" /> : 
        <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    
    return value > 0 ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const formatEffectValue = (key, value) => {
    if (key === 'budget') {
      return gameStateHelpers.formatMoney(Math.abs(value));
    }
    
    if (key === 'unemployment') {
      return `${Math.abs(value).toFixed(1)}%`;
    }
    
    return `${Math.abs(value)}`;
  };

  const getEffectLabel = (key) => {
    const labels = {
      budget: 'Бюджет',
      mayorRating: 'Рейтинг мэра',
      happiness: 'Счастье',
      ecology: 'Экология',
      infrastructure: 'Инфраструктура',
      unemployment: 'Безработица'
    };
    return labels[key] || key;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`${getPriorityColor(event.priority)} border`}>
              <div className="flex items-center gap-1">
                {getPriorityIcon(event.priority)}
                <span className="capitalize">{event.priority}</span>
              </div>
            </Badge>
            <Badge variant="outline" className="capitalize">
              {event.category}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold">Выберите действие:</h3>
          
          <div className="grid gap-4">
            {event.options.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedOption?.id === option.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-base">{option.text}</h4>
                        {option.cost > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {gameStateHelpers.formatMoney(option.cost)}
                          </Badge>
                        )}
                        {option.duration && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {option.duration} дней
                          </Badge>
                        )}
                      </div>
                      
                      {option.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {option.description}
                        </p>
                      )}

                      {/* Проверка доступности */}
                      {option.cost > 0 && !gameStateHelpers.canAffordAction(gameState, option.cost) && (
                        <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Недостаточно средств в бюджете</span>
                        </div>
                      )}
                    </div>

                    {/* Эффекты */}
                    {option.effects && Object.keys(option.effects).length > 0 && (
                      <div className="flex-shrink-0">
                        <div className="text-xs text-gray-500 mb-2">Эффекты:</div>
                        <div className="space-y-1">
                          {Object.entries(option.effects).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 text-sm">
                              {renderEffectIcon(key, value)}
                              <span className="text-gray-700">
                                {getEffectLabel(key)}:
                              </span>
                              <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                                {value > 0 ? '+' : ''}{formatEffectValue(key, value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedOption?.id === option.id && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Выбрано для выполнения</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Кнопки действий */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedOption || isProcessing || 
                       (selectedOption?.cost > 0 && !gameStateHelpers.canAffordAction(gameState, selectedOption.cost))}
              className="min-w-[120px]"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Выполняется...</span>
                </div>
              ) : (
                'Подтвердить'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
