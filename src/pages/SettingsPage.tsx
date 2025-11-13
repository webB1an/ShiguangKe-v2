import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { User, Bell, Palette, Shield, Download, LogOut, LogIn } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, theme, primaryColor, setTheme, setPrimaryColor, isAuthenticated, logout } = useAppStore();

  const themeOptions = [
    { id: 'light', name: '浅色模式', icon: '☀️' },
    { id: 'dark', name: '深色模式', icon: '🌙' },
  ];

  const colorOptions = [
    { id: 'pink', name: '粉色', color: 'bg-pink-400' },
    { id: 'sky', name: '天蓝', color: 'bg-sky-400' },
    { id: 'cream', name: '奶油', color: 'bg-cream-400' },
    { id: 'green', name: '薄荷', color: 'bg-green-400' },
  ];

  const menuItems = [
    { icon: User, label: '个人资料', description: '编辑个人信息', badge: null },
    { icon: Bell, label: '通知设置', description: '管理提醒和通知', badge: '3' },
    { icon: Palette, label: '主题外观', description: '个性化你的界面', badge: null },
    { icon: Shield, label: '隐私安全', description: '保护你的数据', badge: null },
    { icon: Download, label: '数据备份', description: '导出和备份数据', badge: null },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-warm-200 safe-area-top">
        <div className="flex items-center justify-center px-4 py-4">
          <h1 className="text-lg font-semibold text-warm-800">设置</h1>
        </div>
      </header>

      {/* 用户信息卡片 */}
      <div className="px-4 py-6">
        {isAuthenticated ? (
          <div className="time-card p-6 bg-gradient-to-br from-pink-50 to-sky-50">
            <div className="flex items-center space-x-4">
              <img 
                src={userProfile.avatar} 
                alt="用户头像"
                className="w-16 h-16 rounded-full border-3 border-white shadow-card"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-warm-800">{userProfile.name}</h2>
                <p className="text-warm-600 text-sm">记录时光 {userProfile.totalDays} 天</p>
                <div className="flex items-center mt-2 space-x-2">
                  {userProfile.badges.map((badge, index) => (
                    <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="time-card p-6 bg-gradient-to-br from-pink-50 to-sky-50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-sky-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-warm-800 mb-2">欢迎来到时光刻</h2>
            <p className="text-warm-600 text-sm mb-4">登录后开始记录你的美好时光</p>
            <button 
              onClick={() => navigate('/login')}
              className="time-btn-primary px-6 py-2"
            >
              立即登录
            </button>
          </div>
        )}
      </div>

      {/* 设置菜单 */}
      <div className="px-4 space-y-6">
        {/* 外观设置 */}
        <div className="time-card p-4">
          <h3 className="text-lg font-semibold text-warm-800 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-pink-500" />
            主题外观
          </h3>
          
          {/* 主题模式 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-warm-700 mb-3">主题模式</h4>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id as 'light' | 'dark')}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    theme === option.id
                      ? 'border-pink-400 bg-pink-50 text-pink-700'
                      : 'border-warm-200 bg-white text-warm-600 hover:border-warm-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-sm font-medium">{option.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 主色调 */}
          <div>
            <h4 className="text-sm font-medium text-warm-700 mb-3">主色调</h4>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPrimaryColor(option.id)}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    primaryColor === option.id
                      ? 'border-warm-400 shadow-card'
                      : 'border-warm-200 hover:border-warm-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${option.color} mx-auto mb-2`}></div>
                  <div className="text-xs font-medium text-warm-700">{option.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 功能设置 */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full time-card p-4 flex items-center justify-between hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-sky-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-warm-800">{item.label}</h4>
                    <p className="text-sm text-warm-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                  <div className="w-2 h-2 bg-warm-300 rounded-full"></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 登录/退出登录 */}
        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="w-full time-card p-4 flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all bg-gradient-to-r from-red-50 to-pink-50"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="font-medium text-red-600">退出登录</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="w-full time-card p-4 flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all bg-gradient-to-r from-pink-50 to-sky-50"
          >
            <LogIn className="w-5 h-5 text-pink-500" />
            <span className="font-medium text-pink-600">立即登录</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;