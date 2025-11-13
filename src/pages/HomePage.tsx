import React from 'react';
import { Search, Plus, Clock, Heart, Calendar, Users } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import Illustrations from '../components/Illustrations';

interface TimeEvent {
  id: string;
  title: string;
  date: string;
  type: 'countdown' | 'anniversary';
  category: string;
  description?: string;
  coverImage?: string;
  participants?: string[];
  isShared?: boolean;
}

const HomePage: React.FC = () => {
  const { events, isAuthenticated } = useAppStore();
  const navigate = useNavigate();

  const calculateDays = (targetDate: string, type: 'countdown' | 'anniversary') => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (type === 'countdown') {
      return diffDays > 0 ? diffDays : 0;
    } else {
      return Math.abs(diffDays);
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '节日': <Calendar className="w-4 h-4" />,
      '爱情': <Heart className="w-4 h-4" />,
      '旅行': <Users className="w-4 h-4" />,
      '工作': <Clock className="w-4 h-4" />
    };
    return iconMap[category] || <Clock className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      '节日': 'bg-red-100 text-red-700 border-red-200',
      '爱情': 'bg-pink-100 text-pink-700 border-pink-200',
      '旅行': 'bg-sky-100 text-sky-700 border-sky-200',
      '工作': 'bg-green-100 text-green-700 border-green-200'
    };
    return colorMap[category] || 'bg-warm-100 text-warm-700 border-warm-200';
  };

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-warm-200 safe-area-top">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Illustrations name="clock" size="sm" className="animate-float" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-sky-600 bg-clip-text text-transparent">
              时光刻
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-white/80 border border-warm-200 hover:bg-white hover:shadow-soft transition-all" style={{ touchAction: 'manipulation' }}>
              <Search size={20} className="text-warm-600" />
            </button>
            <button 
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/create');
                } else {
                  navigate('/login');
                }
              }}
              className="p-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-warm hover:shadow-lg transition-all"
              style={{ touchAction: 'manipulation' }}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="px-4 py-6 space-y-6">
        {/* 欢迎卡片 */}
        <div className="time-card p-6 bg-gradient-to-br from-pink-50 to-sky-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-warm-800 mb-2">你好，时光旅人</h2>
              <p className="text-warm-600 text-sm">今天有 {events.length} 个重要时刻等待着你</p>
            </div>
            <div className="animate-float">
              <Illustrations name="calendar" size="md" />
            </div>
          </div>
        </div>

        {/* 事件列表 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-warm-800 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-pink-500" />
            重要时刻
          </h3>
          
          {events.map((event) => {
            const days = calculateDays(event.date, event.type);
            const isPast = new Date(event.date) < new Date();
            
            return (
              <div 
                key={event.id}
                className="time-card p-4 cursor-pointer hover:scale-[1.02]"
                onClick={() => navigate(`/event/${event.id}`)}
                style={{ touchAction: 'manipulation' }}
              >
                <div className="flex items-start space-x-4">
                  {/* 事件图标 */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    event.type === 'countdown' 
                      ? 'bg-gradient-to-br from-pink-100 to-pink-200 text-pink-600'
                      : 'bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600'
                  }`}>
                    {event.type === 'countdown' ? (
                      <Clock className="w-6 h-6" />
                    ) : (
                      <Heart className="w-6 h-6" />
                    )}
                  </div>
                  
                  {/* 事件信息 */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-warm-800">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                        {getCategoryIcon(event.category)}
                        <span className="ml-1">{event.category}</span>
                      </span>
                    </div>
                    
                    <p className="text-warm-600 text-sm mb-3">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          event.type === 'countdown' && !isPast ? 'text-pink-600' : 'text-sky-600'
                        }`}>
                          {days}
                        </div>
                        <div className="text-xs text-warm-500">
                          {event.type === 'countdown' 
                            ? isPast ? '天前' : '天后'
                            : '天'
                          }
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {event.isShared && (
                          <div className="flex items-center text-warm-500">
                            <Users size={14} className="mr-1" />
                            <span className="text-xs">{event.participants?.length || 0}</span>
                          </div>
                        )}
                        <div className="text-xs text-warm-500">
                          {new Date(event.date).toLocaleDateString('zh-CN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 空状态 */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <Illustrations name="calendar" size="lg" className="mx-auto mb-4 animate-pulse-soft" />
            <h3 className="text-lg font-semibold text-warm-800 mb-2">还没有重要时刻</h3>
            <p className="text-warm-600 mb-6">点击右上角的 + 按钮开始记录你的第一个时刻</p>
            <button 
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/create');
                } else {
                  navigate('/login');
                }
              }}
              className="time-btn time-btn-primary"
              style={{ touchAction: 'manipulation' }}
            >
              <Plus size={20} className="mr-2" />
              创建时刻
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;