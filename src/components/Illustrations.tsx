import React from 'react';

interface IllustrationProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Illustrations: React.FC<IllustrationProps> = ({ name, className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const illustrations = {
    clock: (
      <svg viewBox="0 0 100 100" className={`${sizeMap[size]} ${className}`}>
        <defs>
          <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        
        {/* 时钟外圈 */}
        <circle cx="50" cy="50" r="45" fill="url(#clockGradient)" opacity="0.2" />
        <circle cx="50" cy="50" r="40" fill="white" stroke="url(#clockGradient)" strokeWidth="3" />
        
        {/* 时钟数字 */}
        {[12, 3, 6, 9].map((num, index) => {
          const angle = (index * 90 - 90) * Math.PI / 180;
          const x = 50 + 28 * Math.cos(angle);
          const y = 50 + 28 * Math.sin(angle) + 3;
          return (
            <text key={num} x={x} y={y} textAnchor="middle" className="text-xs fill-warm-600 font-medium">
              {num}
            </text>
          );
        })}
        
        {/* 时针和分针 */}
        <line x1="50" y1="50" x2="50" y2="30" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="50" x2="65" y2="50" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        
        {/* 中心点 */}
        <circle cx="50" cy="50" r="3" fill="#f472b6" />
        
        {/* 装饰星星 */}
        <circle cx="25" cy="25" r="2" fill="#fbbf24" className="animate-pulse" />
        <circle cx="75" cy="25" r="1.5" fill="#fbbf24" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        <circle cx="25" cy="75" r="1" fill="#fbbf24" className="animate-pulse" style={{animationDelay: '1s'}} />
      </svg>
    ),
    
    heart: (
      <svg viewBox="0 0 100 100" className={`${sizeMap[size]} ${className}`}>
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        {/* 心形 */}
        <path 
          d="M50,85 C50,85 20,60 20,40 C20,25 30,15 45,15 C50,15 50,20 50,20 C50,20 50,15 55,15 C70,15 80,25 80,40 C80,60 50,85 50,85 Z" 
          fill="url(#heartGradient)" 
          className="animate-pulse-soft"
        />
        
        {/* 装饰圆圈 */}
        <circle cx="30" cy="30" r="8" fill="#fef3c7" opacity="0.6" className="animate-float" />
        <circle cx="70" cy="35" r="6" fill="#fce7f3" opacity="0.8" className="animate-float" style={{animationDelay: '0.7s'}} />
        <circle cx="50" cy="20" r="4" fill="#fbcfe8" opacity="0.7" className="animate-float" style={{animationDelay: '1.4s'}} />
      </svg>
    ),
    
    calendar: (
      <svg viewBox="0 0 100 100" className={`${sizeMap[size]} ${className}`}>
        <defs>
          <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        
        {/* 日历背景 */}
        <rect x="20" y="25" width="60" height="55" rx="8" fill="white" stroke="url(#calendarGradient)" strokeWidth="2" />
        
        {/* 日历顶部 */}
        <rect x="20" y="15" width="60" height="15" rx="4" fill="url(#calendarGradient)" />
        
        {/* 日历环 */}
        <circle cx="30" cy="12" r="2" fill="#fbbf24" />
        <circle cx="70" cy="12" r="2" fill="#fbbf24" />
        
        {/* 日期格子 */}
        {[0, 1, 2, 3, 4, 5, 6].map((day, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const x = 28 + col * 15;
          const y = 35 + row * 12;
          return (
            <rect key={index} x={x} y={y} width="12" height="10" rx="2" 
                  fill={index === 4 ? "#f472b6" : "#f0f9ff"} 
                  stroke="#e0f2fe" strokeWidth="1" />
          );
        })}
        
        {/* 当前日期高亮 */}
        <text x="34" y="42" textAnchor="middle" className="text-xs fill-white font-bold">今</text>
        
        {/* 装饰元素 */}
        <circle cx="15" cy="80" r="3" fill="#fbbf24" opacity="0.6" className="animate-pulse" />
        <circle cx="85" cy="85" r="2" fill="#f472b6" opacity="0.7" className="animate-pulse" style={{animationDelay: '0.5s'}} />
      </svg>
    ),
    
    star: (
      <svg viewBox="0 0 100 100" className={`${sizeMap[size]} ${className}`}>
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        
        {/* 主星星 */}
        <polygon 
          points="50,15 58,35 80,35 63,50 71,70 50,58 29,70 37,50 20,35 42,35" 
          fill="url(#starGradient)" 
          className="animate-pulse-soft"
        />
        
        {/* 装饰小星星 */}
        <polygon 
          points="25,25 27,30 32,30 28,33 30,38 25,35 20,38 22,33 18,30 23,30" 
          fill="#fbbf24" 
          opacity="0.8" 
          className="animate-float"
        />
        
        <polygon 
          points="75,20 76,23 79,23 77,25 78,28 75,27 72,28 73,25 71,23 74,23" 
          fill="#fbbf24" 
          opacity="0.6" 
          className="animate-float" 
          style={{animationDelay: '0.7s'}}
        />
        
        <polygon 
          points="80,60 81,62 83,62 82,64 83,66 80,65 77,66 78,64 77,62 79,62" 
          fill="#fbbf24" 
          opacity="0.7" 
          className="animate-float" 
          style={{animationDelay: '1.4s'}}
        />
        
        {/* 光晕效果 */}
        <circle cx="50" cy="50" r="35" fill="url(#starGradient)" opacity="0.2" className="animate-pulse" />
      </svg>
    ),
    
    friends: (
      <svg viewBox="0 0 100 100" className={`${sizeMap[size]} ${className}`}>
        <defs>
          <linearGradient id="friendGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="friendGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        
        {/* 左边人物 */}
        <circle cx="30" cy="35" r="12" fill="url(#friendGradient1)" />
        <circle cx="30" cy="60" r="8" fill="url(#friendGradient1)" opacity="0.8" />
        <rect x="22" y="45" width="16" height="15" rx="8" fill="url(#friendGradient1)" opacity="0.6" />
        
        {/* 右边人物 */}
        <circle cx="70" cy="35" r="12" fill="url(#friendGradient2)" />
        <circle cx="70" cy="60" r="8" fill="url(#friendGradient2)" opacity="0.8" />
        <rect x="62" y="45" width="16" height="15" rx="8" fill="url(#friendGradient2)" opacity="0.6" />
        
        {/* 连接的心形 */}
        <path 
          d="M45,40 C45,35 40,30 35,30 C30,30 25,35 25,40 C25,45 45,60 45,60 C45,60 65,45 65,40 C65,35 60,30 55,30 C50,30 45,35 45,40 Z" 
          fill="#fbbf24" 
          opacity="0.7" 
          className="animate-pulse-soft"
        />
        
        {/* 装饰元素 */}
        <circle cx="20" cy="20" r="2" fill="#fbbf24" className="animate-float" />
        <circle cx="80" cy="25" r="1.5" fill="#fbbf24" className="animate-float" style={{animationDelay: '0.5s'}} />
        <circle cx="15" cy="75" r="1" fill="#fbbf24" className="animate-float" style={{animationDelay: '1s'}} />
        <circle cx="85" cy="80" r="2" fill="#fbbf24" className="animate-float" style={{animationDelay: '1.5s'}} />
      </svg>
    )
  };

  return illustrations[name] || null;
};

export default Illustrations;