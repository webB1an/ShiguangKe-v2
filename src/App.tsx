import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import MessagesPage from "@/pages/MessagesPage";
import RewardsPage from "@/pages/RewardsPage";
import SettingsPage from "@/pages/SettingsPage";
import CreateEventPage from "@/pages/CreateEventPage";
import EventDetailPage from "@/pages/EventDetailPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import BottomNav from "@/components/BottomNav";
import { useAppStore } from "@/store/appStore";

function AppContent() {
  const { activeTab, setActiveTab, theme, primaryColor, isAuthenticated } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Apply theme and primary color changes
  useEffect(() => {
    // Apply theme
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Apply primary color
    const root = document.documentElement;
    const colorMap: Record<string, Record<string, string>> = {
      pink: {
        50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
        400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
        800: '#9d174d', 900: '#831843'
      },
      sky: {
        50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
        400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
        800: '#075985', 900: '#0c4a6e'
      },
      cream: {
        50: '#fffdf7', 100: '#fffaeb', 200: '#fff3c4', 300: '#ffe888',
        400: '#ffd43b', 500: '#fab005', 600: '#f59f00', 700: '#f08c00',
        800: '#e67700', 900: '#d9480f'
      },
      green: {
        50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
        400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
        800: '#166534', 900: '#14532d'
      }
    };

    const colors = colorMap[primaryColor] || colorMap.pink;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
  }, [theme, primaryColor]);

  // Authentication redirect logic
  useEffect(() => {
    const protectedRoutes = ['/create', '/edit', '/messages', '/rewards', '/settings'];
    const isProtectedRoute = protectedRoutes.some(route => 
      location.pathname.startsWith(route)
    );
    
    if (isProtectedRoute && !isAuthenticated && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/register')) {
      navigate('/login');
    }
  }, [location.pathname, isAuthenticated, navigate]);
  
  // 隐藏底部导航栏的页面
  const hideBottomNav = ['/create', '/event/', '/edit', '/login', '/register'].some(path => 
    location.pathname.startsWith(path)
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Navigate to the corresponding route
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'messages':
        navigate('/messages');
        break;
      case 'rewards':
        navigate('/rewards');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-sky-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/create" element={<CreateEventPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/edit/:id" element={<CreateEventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      
      {!hideBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
