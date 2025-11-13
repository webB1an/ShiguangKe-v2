import React from 'react';
import { useAppStore } from '../store/appStore';
import { Bell, UserPlus, Heart, Clock } from 'lucide-react';
import Illustrations from '../components/Illustrations';

const MessagesPage: React.FC = () => {
  const { messages, markMessageAsRead } = useAppStore();

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'friend_update':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'event_reminder':
        return <Bell className="w-5 h-5 text-orange-500" />;
      case 'invitation':
        return <Heart className="w-5 h-5 text-pink-500" />;
      default:
        return <Clock className="w-5 h-5 text-warm-500" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '刚刚';
    if (diffInHours < 24) return `${diffInHours}小时前`;
    return `${Math.floor(diffInHours / 24)}天前`;
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-warm-200 safe-area-top">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-warm-800">消息中心</h1>
          {unreadCount > 0 && (
            <div className="px-2 py-1 bg-pink-500 text-white text-xs rounded-full font-medium">
              {unreadCount}
            </div>
          )}
        </div>
      </header>

      {/* 消息列表 */}
      <main className="px-4 py-6">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Illustrations name="heart" size="lg" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-warm-800 mb-2">暂无消息</h3>
            <p className="text-warm-600">当好友更新事件或有新的邀请时，你会在这里看到</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`time-card p-4 cursor-pointer transition-all ${
                  !message.isRead ? 'border-l-4 border-pink-400 bg-gradient-to-r from-pink-50 to-white' : ''
                }`}
                onClick={() => !message.isRead && markMessageAsRead(message.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* 头像或图标 */}
                  <div className="flex-shrink-0">
                    {message.avatar ? (
                      <img 
                        src={message.avatar} 
                        alt="头像"
                        className="w-10 h-10 rounded-full time-avatar"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-warm-100 to-warm-200 rounded-full flex items-center justify-center">
                        {getMessageIcon(message.type)}
                      </div>
                    )}
                  </div>
                  
                  {/* 消息内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-warm-800 truncate">{message.title}</h4>
                      <span className="text-xs text-warm-500 flex-shrink-0 ml-2">
                        {getTimeAgo(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-warm-600 mb-2">{message.content}</p>
                    
                    {/* 消息类型标签 */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.type === 'friend_update' ? 'bg-blue-100 text-blue-700' :
                        message.type === 'event_reminder' ? 'bg-orange-100 text-orange-700' :
                        'bg-pink-100 text-pink-700'
                      }`}>
                        {message.type === 'friend_update' ? '好友更新' :
                         message.type === 'event_reminder' ? '事件提醒' : '邀请通知'}
                      </span>
                      
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;