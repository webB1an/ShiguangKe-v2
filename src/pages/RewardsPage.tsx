import React from 'react';
import { useAppStore } from '../store/appStore';
import { Award, Star, Heart, Calendar, TrendingUp, Gift } from 'lucide-react';
import Illustrations from '../components/Illustrations';

const RewardsPage: React.FC = () => {
  const { userProfile } = useAppStore();

  const achievements = [
    {
      id: '1',
      name: '新手入门',
      description: '创建第一个时光记录',
      icon: '🌱',
      unlocked: true,
      progress: 100,
      color: 'from-green-100 to-green-200 text-green-700'
    },
    {
      id: '2',
      name: '记录达人',
      description: '创建10个时光记录',
      icon: '📝',
      unlocked: true,
      progress: 100,
      color: 'from-blue-100 to-blue-200 text-blue-700'
    },
    {
      id: '3',
      name: '社交达人',
      description: '邀请3位好友参与',
      icon: '👥',
      unlocked: true,
      progress: 100,
      color: 'from-purple-100 to-purple-200 text-purple-700'
    },
    {
      id: '4',
      name: '时光守护者',
      description: '连续记录30天',
      icon: '⏰',
      unlocked: false,
      progress: 65,
      color: 'from-orange-100 to-orange-200 text-orange-700'
    },
    {
      id: '5',
      name: '回忆收藏家',
      description: '记录50个重要时刻',
      icon: '📸',
      unlocked: false,
      progress: 40,
      color: 'from-pink-100 to-pink-200 text-pink-700'
    },
    {
      id: '6',
      name: '情感大师',
      description: '获得100个点赞',
      icon: '💖',
      unlocked: false,
      progress: 25,
      color: 'from-red-100 to-red-200 text-red-700'
    }
  ];

  const stats = [
    {
      label: '记录天数',
      value: userProfile.totalDays,
      icon: Calendar,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100'
    },
    {
      label: '活跃度',
      value: `${userProfile.activityLevel}/10`,
      icon: TrendingUp,
      color: 'text-sky-500',
      bgColor: 'bg-sky-100'
    },
    {
      label: '获得徽章',
      value: userProfile.badges.length,
      icon: Award,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    {
      label: '连续记录',
      value: '15天',
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-warm-200 safe-area-top">
        <div className="flex items-center justify-center px-4 py-4">
          <h1 className="text-lg font-semibold text-warm-800">纪念墙</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* 用户统计卡片 */}
        <div className="time-card p-6 bg-gradient-to-br from-pink-50 to-sky-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-warm-800">我的成长</h2>
            <Gift className="w-6 h-6 text-pink-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-warm-800">{stat.value}</div>
                  <div className="text-xs text-warm-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 徽章展示 */}
        <div className="time-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warm-800">我的徽章</h3>
            <Award className="w-5 h-5 text-orange-500" />
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {userProfile.badges.map((badge, index) => (
              <div key={index} className="px-3 py-2 bg-gradient-to-r from-pink-100 to-sky-100 rounded-full flex items-center space-x-2">
                <Star className="w-4 h-4 text-pink-500 fill-current" />
                <span className="text-sm font-medium text-warm-800">{badge}</span>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-warm-600">
            已获得 {userProfile.badges.length} 个徽章，继续加油！
          </div>
        </div>

        {/* 成就系统 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-warm-800 flex items-center">
            <Award className="w-5 h-5 mr-2 text-orange-500" />
            成就系统
          </h3>
          
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`time-card p-4 ${
              achievement.unlocked ? 'bg-gradient-to-r from-warm-50 to-white' : 'opacity-75'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center text-xl`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-warm-800">{achievement.name}</h4>
                    {achievement.unlocked && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <p className="text-sm text-warm-600 mb-3">{achievement.description}</p>
                  
                  {/* 进度条 */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-warm-500 mb-1">
                      <span>进度</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-warm-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-pink-400 to-sky-400' 
                            : 'bg-gradient-to-r from-warm-300 to-warm-400'
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {achievement.unlocked ? (
                    <div className="text-xs text-green-600 font-medium">✅ 已完成</div>
                  ) : (
                    <div className="text-xs text-warm-500">继续努力...</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 激励文案 */}
        <div className="time-card p-6 bg-gradient-to-br from-pink-50 to-sky-50 text-center">
          <Illustrations name="heart" size="md" className="mx-auto mb-3" />
          <h4 className="font-semibold text-warm-800 mb-2">每一刻都值得记录</h4>
          <p className="text-sm text-warm-600">
            时光荏苒，岁月如歌。用心记录每一个美好瞬间，
            让回忆成为生命中最珍贵的财富。
          </p>
        </div>
      </main>
    </div>
  );
};

export default RewardsPage;