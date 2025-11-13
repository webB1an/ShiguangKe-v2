import { Solar, Lunar } from 'lunar-typescript';

/**
 * 公历年月日联动选项
 */
interface SolarOption {
  label: string;
  value: number;
}

/**
 * 获取公历年份列表
 * @param startYear 开始年份（默认1900）
 * @param endYear 结束年份（默认2100）
 * @returns 年份选项列表
 */
export function getSolarYears(startYear: number = 1900, endYear: number = 2100): SolarOption[] {
  const years: SolarOption[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({
      label: `${year}年`,
      value: year
    });
  }
  return years;
}

/**
 * 获取公历月份列表
 * @returns 月份选项列表（1-12月）
 */
export function getSolarMonths(): SolarOption[] {
  const months: SolarOption[] = [];
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                      '七月', '八月', '九月', '十月', '十一月', '十二月'];
  
  for (let month = 1; month <= 12; month++) {
    months.push({
      label: `${month}月（${monthNames[month - 1]}）`,
      value: month
    });
  }
  return months;
}

/**
 * 获取指定公历年月的日期列表
 * @param solarYear 公历年份
 * @param solarMonth 公历月份
 * @returns 日期选项列表
 */
export function getSolarDays(solarYear: number, solarMonth: number): SolarOption[] {
  const days: SolarOption[] = [];
  const daysInMonth = new Date(solarYear, solarMonth, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      label: `${day}日`,
      value: day
    });
  }
  
  return days;
}

/**
 * 判断是否是闰年
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 公历联动选择器类
 */
export class SolarCascade {
  private solarYear: number;
  private solarMonth: number;
  private solarDay: number;
  
  constructor(solarYear?: number, solarMonth?: number, solarDay?: number) {
    // 默认使用当前日期
    const today = new Date();
    
    this.solarYear = solarYear || today.getFullYear();
    this.solarMonth = solarMonth || (today.getMonth() + 1);
    this.solarDay = solarDay || today.getDate();
  }
  
  /**
   * 设置公历年份，并重置月份和日期
   */
  setYear(year: number) {
    this.solarYear = year;
    // 重置月份为1月
    this.solarMonth = 1;
    this.solarDay = 1;
  }
  
  /**
   * 设置公历月份，并重置日期
   */
  setMonth(month: number) {
    this.solarMonth = month;
    // 重置日期为1日，并确保日期有效
    const maxDay = new Date(this.solarYear, month, 0).getDate();
    this.solarDay = Math.min(this.solarDay, maxDay);
    if (this.solarDay > maxDay) {
      this.solarDay = 1;
    }
  }
  
  /**
   * 设置公历日期
   */
  setDay(day: number) {
    this.solarDay = day;
  }
  
  /**
   * 获取当前选中的公历日期
   */
  getSolar(): Solar {
    return Solar.fromYmd(this.solarYear, this.solarMonth, this.solarDay);
  }
  
  /**
   * 获取年份列表
   */
  getYearOptions(startYear: number = 1900, endYear: number = 2100): SolarOption[] {
    return getSolarYears(startYear, endYear);
  }
  
  /**
   * 获取月份列表
   */
  getMonthOptions(): SolarOption[] {
    return getSolarMonths();
  }
  
  /**
   * 获取当前年月的日期列表
   */
  getDayOptions(): SolarOption[] {
    return getSolarDays(this.solarYear, this.solarMonth);
  }
  
  /**
   * 获取完整的联动数据
   */
  getAllOptions(startYear: number = 1900, endYear: number = 2100) {
    return {
      years: this.getYearOptions(startYear, endYear),
      months: this.getMonthOptions(),
      days: this.getDayOptions(),
      current: {
        year: this.solarYear,
        month: this.solarMonth,
        day: this.solarDay
      }
    };
  }
  
  /**
   * 转换为农历日期
   */
  toLunar(): Lunar {
    return this.getSolar().getLunar();
  }
  
  /**
   * 获取格式化的公历日期字符串
   */
  toString(): string {
    return this.getSolar().toString();
  }
  
  /**
   * 获取完整的公历日期字符串
   */
  toFullString(): string {
    return this.getSolar().toFullString();
  }
  
  /**
   * 获取当前年份是否是闰年
   */
  isLeapYear(): boolean {
    return isLeapYear(this.solarYear);
  }
  
  /**
   * 获取当前月份的天数
   */
  getDaysInMonth(): number {
    return new Date(this.solarYear, this.solarMonth, 0).getDate();
  }
  
  /**
   * 获取星期几
   */
  getWeek(): string {
    return String(this.getSolar().getWeek());
  }
  
  /**
   * 获取星座
   */
  getXingZuo(): string {
    return this.getSolar().getXingZuo();
  }
  
  /**
   * 计算距离现在的时间差
   * @returns 时间差对象
   */
  getTimeFromNow() {
    const now = new Date();
    const targetDate = new Date(
      this.solarYear,
      this.solarMonth - 1,
      this.solarDay,
      0, 0, 0, 0
    );
    
    const diffMs = targetDate.getTime() - now.getTime();
    const isPast = diffMs < 0;
    const absDiffMs = Math.abs(diffMs);
    
    const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absDiffMs % (1000 * 60)) / 1000);
    
    // 计算年月日
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    
    return {
      isPast,
      milliseconds: Math.abs(diffMs),
      totalDays: days,
      totalHours: Math.floor(absDiffMs / (1000 * 60 * 60)),
      totalMinutes: Math.floor(absDiffMs / (1000 * 60)),
      breakdown: {
        years,
        months,
        days: remainingDays,
        hours,
        minutes,
        seconds
      },
      formatted: this.formatTimeFromNow(isPast, years, months, remainingDays, hours, minutes, seconds)
    };
  }
  
  /**
   * 格式化时间差为易读的字符串
   */
  private formatTimeFromNow(
    isPast: boolean, 
    years: number, 
    months: number, 
    days: number, 
    hours: number, 
    minutes: number, 
    seconds: number
  ): string {
    const parts: string[] = [];
    
    if (years > 0) parts.push(`${years}年`);
    if (months > 0) parts.push(`${months}个月`);
    if (days > 0) parts.push(`${days}天`);
    if (hours > 0 && years === 0) parts.push(`${hours}小时`);
    if (minutes > 0 && years === 0 && months === 0) parts.push(`${minutes}分钟`);
    if (seconds > 0 && years === 0 && months === 0 && days === 0) parts.push(`${seconds}秒`);
    
    const timeStr = parts.length > 0 ? parts.join('') : '0秒';
    
    if (isPast) {
      return `${timeStr}前`;
    } else {
      return `还有${timeStr}`;
    }
  }
  
  /**
   * 计算距离最近的一个对应公历日期的时间差
   * （比如每年的公历生日）
   */
  getTimeToNextOccurrence() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 先尝试今年的这个日期
    let targetYear = currentYear;
    let targetDate = new Date(targetYear, this.solarMonth - 1, this.solarDay);
    
    // 如果今年的日期已经过了，就用明年的
    if (targetDate < now) {
      targetYear++;
      targetDate = new Date(targetYear, this.solarMonth - 1, this.solarDay);
    }
    
    const tempCascade = new SolarCascade(targetYear, this.solarMonth, this.solarDay);
    return {
      ...tempCascade.getTimeFromNow(),
      nextYear: targetYear,
      nextDate: tempCascade.toString()
    };
  }
  
  /**
   * 获取节日信息
   */
  getFestivals(): string[] {
    const solar = this.getSolar();
    const festivals: string[] = [];
    
    // 获取公历节日
    const solarFestivals = solar.getFestivals();
    festivals.push(...solarFestivals);
    
    // 获取农历节日
    const lunar = solar.getLunar();
    const lunarFestivals = lunar.getFestivals();
    festivals.push(...lunarFestivals);
    
    return festivals;
  }
  
  /**
   * 获取节气
   */
  getJieQi(): string {
    return this.getSolar().getLunar().getJieQi();
  }
}

// 使用示例
export function soloarExample() {
  // 创建联动选择器（默认使用今天）
  const cascade = new SolarCascade();
  
  console.log('当前公历日期:', cascade.toString());
  console.log('对应农历日期:', cascade.toLunar().toString());
  console.log('星期:', cascade.getWeek());
  console.log('星座:', cascade.getXingZuo());
  
  // 获取年份列表
  const years = cascade.getYearOptions(2020, 2030);
  console.log('年份选项:', years);
  
  // 获取月份列表
  const months = cascade.getMonthOptions();
  console.log('月份选项:', months);
  
  // 选择年份后获取日期列表
  cascade.setYear(2024);
  cascade.setMonth(2);
  const days = cascade.getDayOptions();
  console.log('2024年2月天数:', days.length); // 闰年29天
  console.log('是否闰年:', cascade.isLeapYear());
  
  // 选择完整日期
  cascade.setDay(14);
  console.log('选中的日期:', cascade.toFullString());
  console.log('节日:', cascade.getFestivals());
  console.log('节气:', cascade.getJieQi());
  
  // 获取所有选项
  const allOptions = cascade.getAllOptions(2020, 2030);
  console.log('所有选项:', allOptions);
  
  // ===== 计算时间差示例 =====
  
  // 示例1: 计算元旦还有多久
  cascade.setYear(2026);
  cascade.setMonth(1);
  cascade.setDay(1);
  
  const timeFromNow = cascade.getTimeFromNow();
  console.log('\n距离2026年元旦:');
  console.log('格式化输出:', timeFromNow.formatted);
  console.log('总天数:', timeFromNow.totalDays);
  console.log('详细信息:', timeFromNow.breakdown);
  
  // 示例2: 计算下一个公历生日
  const birthday = new SolarCascade();
  birthday.setMonth(6);
  birthday.setDay(15);
  
  const nextBirthday = birthday.getTimeToNextOccurrence();
  console.log('\n距离下一个6月15日:');
  console.log('格式化输出:', nextBirthday.formatted);
  console.log('下一次是:', nextBirthday.nextYear, '年');
  console.log('还有', nextBirthday.totalDays, '天');
  
  // 示例3: 查看特定日期信息
  const valentines = new SolarCascade(2025, 2, 14);
  console.log('\n2025年情人节:');
  console.log('公历:', valentines.toString());
  console.log('农历:', valentines.toLunar().toString());
  console.log('星期:', valentines.getWeek());
  console.log('星座:', valentines.getXingZuo());
  console.log('节日:', valentines.getFestivals());
}