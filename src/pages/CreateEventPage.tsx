import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { ArrowLeft, Calendar, Clock, Heart, Camera, Users, Bell, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Illustrations from '../components/Illustrations';

const CreateEventPage: React.FC = () => {
  const { addEvent } = useAppStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'countdown' as 'countdown' | 'anniversary',
    category: '节日',
    description: '',
    coverImage: '',
    reminderTime: '1天前',
    isShared: false
  });

  const categories = ['节日', '爱情', '旅行', '工作', '学习', '生日', '纪念日', '其他'];
  const reminderOptions = ['无提醒', '当天', '1天前', '3天前', '1周前', '1个月前'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert('请填写标题和日期');
      return;
    }
    
    addEvent(formData);
    navigate('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, coverImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

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
          <h1 className="text-lg font-semibold text-warm-800">创建时刻</h1>
          <button 
            onClick={handleSubmit}
            className="time-btn time-btn-primary px-4 py-2 text-sm"
            style={{ touchAction: 'manipulation' }}
          >
            <Save size={16} className="mr-1" />
            保存
          </button>
        </div>
      </header>

      {/* 表单内容 */}
      <main className="px-4 py-6 space-y-6">
        {/* 类型选择 */}
        <div className="time-card p-4">
          <h3 className="font-semibold text-warm-800 mb-3">事件类型</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'countdown' }))}
              className={`p-4 rounded-2xl border-2 transition-all ${
                formData.type === 'countdown'
                  ? 'border-pink-400 bg-pink-50 text-pink-700'
                  : 'border-warm-200 bg-white text-warm-600 hover:border-warm-300'
              }`}
              style={{ touchAction: 'manipulation' }}
            >
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">倒数日</div>
              <div className="text-xs opacity-75 mt-1">期待未来</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'anniversary' }))}
              className={`p-4 rounded-2xl border-2 transition-all ${
                formData.type === 'anniversary'
                  ? 'border-sky-400 bg-sky-50 text-sky-700'
                  : 'border-warm-200 bg-white text-warm-600 hover:border-warm-300'
              }`}
              style={{ touchAction: 'manipulation' }}
            >
              <Heart className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">纪念日</div>
              <div className="text-xs opacity-75 mt-1">回忆过去</div>
            </button>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="time-card p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="给这个时刻起个名字"
              className="time-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">日期 *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="time-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">分类</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="time-input"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="记录下这个时刻的意义..."
              rows={3}
              className="time-input resize-none"
            />
          </div>
        </div>

        {/* 封面图片 */}
        <div className="time-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-warm-800">封面图片</h3>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center space-x-2 text-pink-600 hover:text-pink-700">
                <Camera size={16} />
                <span className="text-sm">上传图片</span>
              </div>
            </label>
          </div>
          
          {formData.coverImage ? (
            <div className="relative">
              <img 
                src={formData.coverImage} 
                alt="封面"
                className="w-full h-32 object-cover rounded-2xl"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
              >
                <X size={16} className="text-warm-600" />
              </button>
            </div>
          ) : (
            <div className="w-full h-32 bg-gradient-to-br from-pink-100 to-sky-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-warm-300">
              <div className="text-center">
                <Illustrations name="star" size="sm" className="mx-auto mb-2" />
                <p className="text-sm text-warm-600">添加一张美丽的封面图片</p>
              </div>
            </div>
          )}
        </div>

        {/* 提醒设置 */}
        <div className="time-card p-4">
          <h3 className="font-semibold text-warm-800 mb-3 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-pink-500" />
            提醒设置
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">提醒时间</label>
            <select
              value={formData.reminderTime}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
              className="time-input"
            >
              {reminderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 分享设置 */}
        <div className="time-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-warm-800">分享给好友</h3>
              <p className="text-sm text-warm-600 mt-1">邀请好友一起倒数或纪念这个时刻</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isShared: !prev.isShared }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isShared ? 'bg-pink-500' : 'bg-warm-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isShared ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {formData.isShared && (
            <div className="mt-4 p-3 bg-pink-50 rounded-xl">
              <div className="flex items-center text-pink-700">
                <Illustrations name="friends" size="sm" className="mr-2" />
                <span className="text-sm">分享后，好友可以查看和参与这个时刻</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateEventPage;