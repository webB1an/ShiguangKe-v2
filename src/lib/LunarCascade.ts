import { Lunar, Solar, LunarYear } from 'lunar-typescript';

/**
 * 农历年月日联动选项
 */
interface LunarOption {
  label: string;
  value: number;
}

/**
 * 获取农历年份列表
 * @param startYear 开始年份（默认1900）
 * @param endYear 结束年份（默认2100）
 * @returns 年份选项列表
 */
export function getLunarYears(startYear: number = 1900, endYear: number = 2100): LunarOption[] {
  const years: LunarOption[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const lunar = Lunar.fromYmd(year, 1, 1);
    years.push({
      label: `${lunar.getYearInChinese()}年（${year}）`,
      value: year
    });
  }
  return years;
}

/**
 * 获取指定农历年份的月份列表
 * @param lunarYear 农历年份
 * @returns 月份选项列表（包含闰月）
 */
export function getLunarMonths(lunarYear: number): LunarOption[] {
  const months: LunarOption[] = [];
  const lunarYearObj = LunarYear.fromYear(lunarYear);
  const leapMonth = lunarYearObj.getLeapMonth(); // 获取闰月月份，0表示无闰月
  
  for (let month = 1; month <= 12; month++) {
    const testLunar = Lunar.fromYmd(lunarYear, month, 1);
    months.push({
      label: testLunar.getMonthInChinese(),
      value: month
    });
    
    // 如果有闰月且当前月份是闰月
    if (leapMonth === month) {
      const leapLunar = Lunar.fromYmd(lunarYear, -month, 1); // 负数表示闰月
      months.push({
        label: `闰${testLunar.getMonthInChinese()}`,
        value: -month // 用负数表示闰月
      });
    }
  }
  
  return months;
}

/**
 * 获取指定农历年月的日期列表
 * @param lunarYear 农历年份
 * @param lunarMonth 农历月份（负数表示闰月）
 * @returns 日期选项列表
 */
export function getLunarDays(lunarYear: number, lunarMonth: number): LunarOption[] {
  const days: LunarOption[] = [];
  
  // 通过遍历找到该月最后一天来确定天数
  let daysInMonth = 29;
  try {
    // 尝试创建30日，如果成功说明有30天
    Lunar.fromYmd(lunarYear, lunarMonth, 30);
    daysInMonth = 30;
  } catch (e) {
    daysInMonth = 29;
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const testLunar = Lunar.fromYmd(lunarYear, lunarMonth, day);
    days.push({
      label: testLunar.getDayInChinese(),
      value: day
    });
  }
  
  return days;
}

/**
 * 农历联动选择器类
 */
export class LunarCascade {
  private lunarYear: number;
  private lunarMonth: number;
  private lunarDay: number;
  
  constructor(lunarYear?: number, lunarMonth?: number, lunarDay?: number) {
    // 默认使用当前日期
    const today = Solar.fromDate(new Date());
    const lunar = today.getLunar();
    
    this.lunarYear = lunarYear || lunar.getYear();
    this.lunarMonth = lunarMonth || lunar.getMonth();
    this.lunarDay = lunarDay || lunar.getDay();
  }
  
  /**
   * 设置农历年份，并重置月份和日期
   */
  setYear(year: number) {
    this.lunarYear = year;
    // 重置月份为正月
    this.lunarMonth = 1;
    this.lunarDay = 1;
  }
  
  /**
   * 设置农历月份，并重置日期
   */
  setMonth(month: number) {
    this.lunarMonth = month;
    // 重置日期为初一，并确保日期有效
    this.lunarDay = 1;
  }
  
  /**
   * 设置农历日期
   */
  setDay(day: number) {
    this.lunarDay = day;
  }
  
  /**
   * 获取当前选中的农历日期
   */
  getLunar(): Lunar {
    return Lunar.fromYmd(this.lunarYear, this.lunarMonth, this.lunarDay);
  }
  
  /**
   * 获取年份列表
   */
  getYearOptions(startYear: number = 1920, endYear: number = 2100): LunarOption[] {
    return getLunarYears(startYear, endYear);
  }
  
  /**
   * 获取当前年份的月份列表
   */
  getMonthOptions(): LunarOption[] {
    return getLunarMonths(this.lunarYear);
  }
  
  /**
   * 获取当前年月的日期列表
   */
  getDayOptions(): LunarOption[] {
    return getLunarDays(this.lunarYear, this.lunarMonth);
  }
  
  /**
   * 获取完整的联动数据
   */
  getAllOptions(startYear: number = 1920, endYear: number = 2100) {
    return {
      years: this.getYearOptions(startYear, endYear),
      months: this.getMonthOptions(),
      days: this.getDayOptions(),
      current: {
        year: this.lunarYear,
        month: this.lunarMonth,
        day: this.lunarDay
      }
    };
  }
  
  /**
   * 转换为公历日期
   */
  toSolar(): Solar {
    return this.getLunar().getSolar();
  }
  
  /**
   * 获取格式化的农历日期字符串
   */
  toString(): string {
    return this.getLunar().toString();
  }
  
  /**
   * 获取完整的农历日期字符串
   */
  toFullString(): string {
    return this.getLunar().toFullString();
  }
  
  /**
   * 获取当前年份是否有闰月
   */
  hasLeapMonth(): boolean {
    const lunarYearObj = LunarYear.fromYear(this.lunarYear);
    return lunarYearObj.getLeapMonth() > 0;
  }
  
  /**
   * 获取当前年份的闰月月份（0表示无闰月）
   */
  getLeapMonth(): number {
    const lunarYearObj = LunarYear.fromYear(this.lunarYear);
    return lunarYearObj.getLeapMonth();
  }
  
  /**
   * 计算距离现在的时间差
   * @returns 时间差对象
   */
  getTimeFromNow() {
    const now = new Date();
    const targetSolar = this.toSolar();
    const targetDate = new Date(
      targetSolar.getYear(),
      targetSolar.getMonth() - 1, // JavaScript月份从0开始
      targetSolar.getDay(),
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
      isPast, // 是否是过去的日期
      milliseconds: Math.abs(diffMs), // 总毫秒数
      totalDays: days, // 总天数
      totalHours: Math.floor(absDiffMs / (1000 * 60 * 60)), // 总小时数
      totalMinutes: Math.floor(absDiffMs / (1000 * 60)), // 总分钟数
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
   * 计算距离最近的一个对应农历日期的时间差
   * （比如每年的农历生日）
   */
  getTimeToNextOccurrence() {
    const now = Solar.fromDate(new Date());
    const currentLunar = now.getLunar();
    const currentYear = currentLunar.getYear();
    
    // 先尝试今年的这个日期
    let targetYear = currentYear;
    let targetLunar: Lunar;
    
    try {
      targetLunar = Lunar.fromYmd(targetYear, this.lunarMonth, this.lunarDay);
      const targetSolar = targetLunar.getSolar();
      const targetDate = new Date(
        targetSolar.getYear(),
        targetSolar.getMonth() - 1,
        targetSolar.getDay()
      );
      
      // 如果今年的日期已经过了，就用明年的
      if (targetDate < new Date()) {
        targetYear++;
        targetLunar = Lunar.fromYmd(targetYear, this.lunarMonth, this.lunarDay);
      }
    } catch (e) {
      // 如果今年没有这个日期（比如闰月），尝试明年
      targetYear++;
      try {
        targetLunar = Lunar.fromYmd(targetYear, this.lunarMonth, this.lunarDay);
      } catch (e2) {
        // 如果明年也没有，返回null
        return null;
      }
    }
    
    const tempCascade = new LunarCascade(targetYear, this.lunarMonth, this.lunarDay);
    return {
      ...tempCascade.getTimeFromNow(),
      nextYear: targetYear,
      nextDate: tempCascade.toString()
    };
  }
}

// 使用示例
export function example() {
  // 创建联动选择器（默认使用今天）
  const cascade = new LunarCascade();
  
  console.log('当前农历日期:', cascade.toString());
  console.log('对应公历日期:', cascade.toSolar().toString());
  
  // 获取年份列表
  const years = cascade.getYearOptions(2020, 2030);
  console.log('年份选项:', years);
  
  // 选择年份后获取月份列表
  cascade.setYear(2023);
  const months = cascade.getMonthOptions();
  console.log('2023年月份选项:', months);
  console.log('2023年闰月:', cascade.getLeapMonth());
  
  // 选择月份后获取日期列表
  cascade.setMonth(1);
  const days = cascade.getDayOptions();
  console.log('正月日期选项:', days);
  
  // 选择完整日期
  cascade.setDay(15);
  console.log('选中的日期:', cascade.toFullString());
  
  // 获取所有选项
  const allOptions = cascade.getAllOptions(2020, 2030);
  console.log('所有选项:', allOptions);
  
  // ===== 计算时间差示例 =====
  
  // 示例1: 计算选中日期距离现在的时间
  cascade.setYear(2025);
  cascade.setMonth(1);
  cascade.setDay(1); // 2025年农历正月初一（春节）
  
  const timeFromNow = cascade.getTimeFromNow();
  console.log('\n距离2025年春节:');
  console.log('格式化输出:', timeFromNow.formatted); // "还有2个月15天"
  console.log('总天数:', timeFromNow.totalDays);
  console.log('详细信息:', timeFromNow.breakdown);
  console.log('是否已过:', timeFromNow.isPast);
  
  // 示例2: 计算下一个农历生日
  const birthday = new LunarCascade();
  birthday.setMonth(8);  // 农历八月
  birthday.setDay(15);   // 十五（中秋节）
  
  const nextBirthday = birthday.getTimeToNextOccurrence();
  if (nextBirthday) {
    console.log('\n距离下一个农历八月十五:');
    console.log('格式化输出:', nextBirthday.formatted);
    console.log('下一次是:', nextBirthday.nextYear, '年', nextBirthday.nextDate);
    console.log('还有', nextBirthday.totalDays, '天');
  }
  
  // 示例3: 计算过去的日期
  const pastDate = new LunarCascade(2020, 1, 1);
  const pastTime = pastDate.getTimeFromNow();
  console.log('\n2020年农历正月初一:', pastTime.formatted); // "5年前"

  // 测试
  const testDate = new LunarCascade(1998, 9, 15);
  const testTime = testDate.getTimeToNextOccurrence();
  if (testTime) {
    console.log('\n1998年09月15日:', testTime.formatted);
    console.log('\n1998年09月15日:', testTime.nextYear);
    console.log('\n1998年09月15日:', testTime.nextDate);
    console.log('\n1998年09月15日:', testTime.totalDays);
  }

}