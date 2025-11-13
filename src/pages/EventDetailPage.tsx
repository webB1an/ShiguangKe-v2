import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { ArrowLeft, Share2, Users, Heart, Clock, Calendar, Bell, Edit3, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent, deleteEvent } = useAppStore();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === id);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (!event) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date(event.date).getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-warm-500 mb-4">事件不存在</div>
          <button 
            onClick={() => navigate('/')}
            className="time-btn time-btn-primary"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('确定要删除这个时刻吗？')) {
      deleteEvent(event.id);
      navigate('/');
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const participants = [
    { id: '1', name: '小明', avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20boy%20avatar%20friendly%20smiling%20round%20face%20soft%20colors&image_size=square' },
    { id: '2', name: '小红', avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20girl%20avatar%20friendly%20smiling%20round%20face%20soft%20pink%20colors&image_size=square' },
    { id: '3', name: '小李', avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20boy%20avatar%20friendly%20smiling%20round%20face%20soft%20blue%20colors&image_size=square' }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-warm-200 safe-area-top">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-warm-100 transition-colors"
            style={{ touchAction: 'manipulation' }}
          >
            <ArrowLeft size={20} className="text-warm-600" />
          </button>
          <h1 className="text-lg font-semibold text-warm-800">时刻详情</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate(`/edit/${event.id}`)}
              className="p-2 rounded-full hover:bg-warm-100 transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              <Edit3 size={20} className="text-warm-600" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 rounded-full hover:bg-red-100 transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="px-4 py-6 space-y-6">
        {/* 封面图片 */}
        {event.coverImage && (
          <div className="relative h-48 rounded-3xl overflow-hidden">
            <img 
              src={event.coverImage} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-white text-2xl font-bold">{event.title}</h1>
            </div>
          </div>
        )}

        {/* 倒计时卡片 */}
        <div className="time-card p-6 bg-gradient-to-br from-pink-50 to-sky-50">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {event.type === 'countdown' ? (
                <Clock className="w-6 h-6 text-pink-500 mr-2" />
              ) : (
                <Heart className="w-6 h-6 text-red-500 mr-2" />
              )}
              <h2 className="text-lg font-semibold text-warm-800">
                {event.type === 'countdown' ? '距离目标还有' : '已经过去'}
              </h2>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{timeLeft.days}</div>
                <div className="text-xs text-warm-600">天</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">{timeLeft.hours}</div>
                <div className="text-xs text-warm-600">时</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{timeLeft.minutes}</div>
                <div className="text-xs text-warm-600">分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{timeLeft.seconds}</div>
                <div className="text-xs text-warm-600">秒</div>
              </div>
            </div>
            
            <div className="text-sm text-warm-600">
              目标日期：{new Date(event.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* 事件信息 */}
        <div className="time-card p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-warm-800 mb-2">分类</h3>
            <span className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full border border-pink-200">
              {event.category}
            </span>
          </div>
          
          {event.description && (
            <div>
              <h3 className="font-semibold text-warm-800 mb-2">描述</h3>
              <p className="text-warm-600 text-sm leading-relaxed">{event.description}</p>
            </div>
          )}
          
          {event.reminderTime && event.reminderTime !== '无提醒' && (
            <div>
              <h3 className="font-semibold text-warm-800 mb-2 flex items-center">
                <Bell className="w-4 h-4 mr-2 text-pink-500" />
                提醒设置
              </h3>
              <p className="text-warm-600 text-sm">{event.reminderTime} 提醒</p>
            </div>
          )}
        </div>

        {/* 参与者 */}
        {event.isShared && (
          <div className="time-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-warm-800 flex items-center">
                <Users className="w-5 h-5 mr-2 text-sky-500" />
                参与者 ({participants.length})
              </h3>
              <button 
                onClick={handleShare}
                className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 text-sm"
                style={{ touchAction: 'manipulation' }}
              >
                <Share2 size={16} />
                <span>邀请</span>
              </button>
            </div>
            
            <div className="flex -space-x-2">
              {participants.map((participant) => (
                <div key={participant.id} className="relative group">
                  <img 
                    src={participant.avatar} 
                    alt={participant.name}
                    className="w-10 h-10 rounded-full border-2 border-white time-avatar"
                  />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-warm-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {participant.name}
                  </div>
                </div>
              ))}
              <button className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 border-2 border-white flex items-center justify-center hover:bg-pink-200 transition-colors" style={{ touchAction: 'manipulation' }}>
                <Users size={16} />
              </button>
            </div>
          </div>
        )}

        {/* 分享按钮 */}
        <div className="flex space-x-3">
          <button 
            onClick={handleShare}
            className="flex-1 time-btn time-btn-primary flex items-center justify-center space-x-2"
            style={{ touchAction: 'manipulation' }}
          >
            <Share2 size={20} />
            <span>分享时刻</span>
          </button>
          <button className="px-6 py-3 rounded-full bg-white text-warm-700 border border-warm-200 hover:bg-warm-50 transition-colors" style={{ touchAction: 'manipulation' }}>
            <Calendar size={20} />
          </button>
        </div>
      </main>

      {/* 分享模态框 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-warm-800 mb-2">分享时刻</h3>
              <p className="text-sm text-warm-600">选择分享方式</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <button className="w-full p-3 rounded-2xl bg-green-100 text-green-700 font-medium hover:bg-green-200 transition-colors" style={{ touchAction: 'manipulation' }}>
                微信分享
              </button>
              <button className="w-full p-3 rounded-2xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors" style={{ touchAction: 'manipulation' }}>
                复制链接
              </button>
              <button className="w-full p-3 rounded-2xl bg-pink-100 text-pink-700 font-medium hover:bg-pink-200 transition-colors" style={{ touchAction: 'manipulation' }}>
                生成海报
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareModal(false)}
              className="w-full p-3 rounded-2xl bg-warm-100 text-warm-700 font-medium hover:bg-warm-200 transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;