import React, { useState, useEffect } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { LunarCascade } from '../lib/LunarCascade';
import { SolarCascade } from '../lib/SolarCascade';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string, dateType: 'solar' | 'lunar') => void;
  initialDate?: string;
  initialDateType?: 'solar' | 'lunar';
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  onDateSelect,
  initialDate,
  initialDateType = 'solar'
}) => {
  const [dateType, setDateType] = useState<'solar' | 'lunar'>(initialDateType);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  
  const [lunarCascade] = useState(() => new LunarCascade());
  const [solarCascade] = useState(() => new SolarCascade());

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // 根据选择的年月获取天数
  const getDaysInMonth = () => {
    if (dateType === 'lunar') {
      return lunarCascade.getDayOptions().length;
    } else {
      return new Date(selectedYear, selectedMonth, 0).getDate();
    }
  };
  
  const days = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);

  // 初始化日期
  useEffect(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth() + 1);
      setSelectedDay(date.getDate());
      
      if (dateType === 'lunar') {
        const lunar = solarCascade.getSolar().getLunar();
        lunarCascade.setYear(lunar.getYear());
        lunarCascade.setMonth(lunar.getMonth());
        lunarCascade.setDay(lunar.getDay());
      }
    }
  }, [initialDate, dateType]);

  // 当日期类型改变时，重新设置级联数据
  useEffect(() => {
    if (dateType === 'lunar') {
      lunarCascade.setYear(selectedYear);
      lunarCascade.setMonth(selectedMonth);
      lunarCascade.setDay(selectedDay);
    } else {
      solarCascade.setYear(selectedYear);
      solarCascade.setMonth(selectedMonth);
      solarCascade.setDay(selectedDay);
    }
  }, [dateType, selectedYear, selectedMonth, selectedDay]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    if (dateType === 'lunar') {
      lunarCascade.setYear(year);
    } else {
      solarCascade.setYear(year);
    }
    // 重置日期为1号
    setSelectedDay(1);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    if (dateType === 'lunar') {
      lunarCascade.setMonth(month);
    } else {
      solarCascade.setMonth(month);
    }
    // 重置日期为1号
    setSelectedDay(1);
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    if (dateType === 'lunar') {
      lunarCascade.setDay(day);
    } else {
      solarCascade.setDay(day);
    }
  };

  const handleConfirm = () => {
    let dateString: string;
    
    if (dateType === 'lunar') {
      const solar = lunarCascade.toSolar();
      dateString = `${solar.getYear()}-${String(solar.getMonth()).padStart(2, '0')}-${String(solar.getDay()).padStart(2, '0')}`;
    } else {
      dateString = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    }
    
    onDateSelect(dateString, dateType);
    onClose();
  };

  const getCurrentDateDisplay = () => {
    if (dateType === 'lunar') {
      return lunarCascade.toString();
    } else {
      return `${selectedYear}年${selectedMonth}月${selectedDay}日`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* 底部弹窗 */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl animate-slide-up">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-warm-200">
          <h3 className="text-lg font-semibold text-warm-800">选择日期</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-warm-100 transition-colors"
          >
            <X size={20} className="text-warm-600" />
          </button>
        </div>

        {/* 日期类型选择 */}
        <div className="p-4 border-b border-warm-200">
          <div className="flex bg-warm-100 rounded-xl p-1">
            <button
              onClick={() => setDateType('solar')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                dateType === 'solar'
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-warm-600 hover:text-warm-800'
              }`}
            >
              公历
            </button>
            <button
              onClick={() => setDateType('lunar')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                dateType === 'lunar'
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-warm-600 hover:text-warm-800'
              }`}
            >
              农历
            </button>
          </div>
        </div>

        {/* 当前选中日期显示 */}
        <div className="p-4 bg-pink-50">
          <div className="flex items-center justify-center space-x-2">
            <Calendar size={20} className="text-pink-600" />
            <span className="text-pink-700 font-medium">
              {getCurrentDateDisplay()}
            </span>
          </div>
        </div>

        {/* 选择器 */}
        <div className="p-4 space-y-4">
          {/* 年选择器 */}
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">年份</label>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="time-input w-full"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ))}
            </select>
          </div>

          {/* 月选择器 */}
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">月份</label>
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="time-input w-full"
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month}月
                </option>
              ))}
            </select>
          </div>

          {/* 日选择器 */}
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">日期</label>
            <select
              value={selectedDay}
              onChange={(e) => handleDayChange(Number(e.target.value))}
              className="time-input w-full"
            >
              {days.map(day => (
                <option key={day} value={day}>
                  {day}日
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="p-4 pb-8">
          <button
            onClick={handleConfirm}
            className="time-btn time-btn-primary w-full py-3 font-medium"
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;