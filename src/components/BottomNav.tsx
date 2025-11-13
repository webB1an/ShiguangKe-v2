import React from 'react';
import { Home, MessageCircle, Award, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'messages', label: '消息', icon: MessageCircle },
    { id: 'rewards', label: '纪念墙', icon: Award },
    { id: 'settings', label: '设置', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-warm-200 safe-area-bottom">
      <div className="flex justify-around items-center h-20 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-br from-pink-100 to-sky-100 text-pink-600 transform -translate-y-1 shadow-warm' 
                  : 'text-warm-500 hover:text-pink-500 hover:bg-warm-50'
                }
              `}
              style={{ touchAction: 'manipulation' }}
            >
              <Icon 
                size={24} 
                className={`mb-1 ${isActive ? 'animate-pulse-soft' : ''}`}
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;