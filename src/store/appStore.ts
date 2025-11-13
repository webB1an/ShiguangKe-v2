import { create } from 'zustand';

interface TimeEvent {
  id: string;
  title: string;
  date: string;
  type: 'countdown' | 'anniversary';
  category: string;
  description?: string;
  coverImage?: string;
  reminderTime?: string;
  participants?: string[];
  isShared?: boolean;
  createdAt: string;
}

interface Message {
  id: string;
  type: 'friend_update' | 'event_reminder' | 'invitation';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  joinDate: string;
  totalDays: number;
  badges: string[];
  activityLevel: number;
  email?: string;
}

interface AppState {
  activeTab: string;
  events: TimeEvent[];
  messages: Message[];
  userProfile: UserProfile;
  theme: 'light' | 'dark';
  primaryColor: string;
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  
  // Actions
  setActiveTab: (tab: string) => void;
  addEvent: (event: Omit<TimeEvent, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, event: Partial<TimeEvent>) => void;
  deleteEvent: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setPrimaryColor: (color: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'home',
  events: [
    {
      id: '1',
      title: '春节',
      date: '2025-01-29',
      type: 'countdown',
      category: '节日',
      description: '与家人团聚的美好时光',
      coverImage: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20celebration%20with%20red%20lanterns%20and%20gold%20decorations%20warm%20festive%20atmosphere&image_size=square',
      reminderTime: '1天前',
      participants: ['user1', 'user2'],
      isShared: true,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: '恋爱纪念日',
      date: '2023-02-14',
      type: 'anniversary',
      category: '爱情',
      description: '我们相遇的那一天',
      coverImage: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Romantic%20couple%20holding%20hands%20soft%20pink%20background%20with%20hearts%20and%20flowers%20warm%20loving%20atmosphere&image_size=square',
      participants: ['user1'],
      isShared: false,
      createdAt: '2023-02-14T00:00:00Z'
    },
    {
      id: '3',
      title: '毕业旅行',
      date: '2025-06-15',
      type: 'countdown',
      category: '旅行',
      description: '和朋友们一起的毕业之旅',
      coverImage: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Friends%20traveling%20together%20adventure%20sky%20blue%20background%20with%20mountains%20and%20sunshine%20youthful%20energetic&image_size=square',
      participants: ['user1', 'user2', 'user3'],
      isShared: true,
      createdAt: '2024-06-01T00:00:00Z'
    }
  ],
  messages: [
    {
      id: '1',
      type: 'friend_update',
      title: '小明更新了事件',
      content: '小明修改了"春节"的提醒时间',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20boy%20avatar%20friendly%20smiling%20round%20face%20soft%20colors&image_size=square'
    },
    {
      id: '2',
      type: 'event_reminder',
      title: '事件提醒',
      content: '距离"春节"还有7天',
      timestamp: '2024-01-22T09:00:00Z',
      isRead: true
    },
    {
      id: '3',
      type: 'invitation',
      title: '邀请通知',
      content: '小红邀请你参与"毕业旅行"',
      timestamp: '2024-01-20T14:20:00Z',
      isRead: false,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20girl%20avatar%20friendly%20smiling%20round%20face%20soft%20pink%20colors&image_size=square'
    }
  ],
  userProfile: {
    id: 'user1',
    name: '时光旅人',
    avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20time%20traveler%20avatar%20with%20clock%20elements%20warm%20friendly%20expression%20soft%20colors&image_size=square',
    joinDate: '2023-01-01',
    totalDays: 365,
    badges: ['新手', '记录达人', '社交达人'],
    activityLevel: 8
  },
  theme: 'light',
  primaryColor: 'pink',
  isAuthenticated: false,
  currentUser: null,
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  addEvent: (event) => set((state) => ({
    events: [...state.events, {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateEvent: (id, event) => set((state) => ({
    events: state.events.map(e => e.id === id ? { ...e, ...event } : e)
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(e => e.id !== id)
  })),
  
  addMessage: (message) => set((state) => ({
    messages: [{
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }, ...state.messages]
  })),
  
  markMessageAsRead: (id) => set((state) => ({
    messages: state.messages.map(m => m.id === id ? { ...m, isRead: true } : m)
  })),
  
  updateUserProfile: (profile) => set((state) => ({
    userProfile: { ...state.userProfile, ...profile }
  })),
  
  setTheme: (theme) => set({ theme }),
  setPrimaryColor: (color) => set({ primaryColor: color }),
  
  // Authentication methods
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password.length >= 6) {
      const user: UserProfile = {
        id: '1',
        name: email.split('@')[0] || '用户',
        email: email,
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20user%20avatar%20friendly%20smiling%20round%20face%20soft%20colors&image_size=square',
        joinDate: new Date().toISOString().split('T')[0],
        totalDays: 0,
        badges: ['新手'],
        activityLevel: 1
      };
      
      set({ 
        isAuthenticated: true, 
        currentUser: user,
        userProfile: user
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return true;
    }
    
    return false;
  },
  
  register: async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - in real app, this would be an API call
    if (name && email && password.length >= 6) {
      const user: UserProfile = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cartoon%20user%20avatar%20friendly%20smiling%20round%20face%20soft%20colors&image_size=square',
        joinDate: new Date().toISOString().split('T')[0],
        totalDays: 0,
        badges: ['新手'],
        activityLevel: 1
      };
      
      set({ 
        isAuthenticated: true, 
        currentUser: user,
        userProfile: user
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ 
      isAuthenticated: false, 
      currentUser: null,
      userProfile: {
        id: '',
        name: '游客',
        joinDate: '',
        totalDays: 0,
        badges: [],
        activityLevel: 0
      }
    });
    
    // Clear from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  }
}));