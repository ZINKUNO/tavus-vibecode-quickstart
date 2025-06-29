import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentPageAtom } from './store/navigation';
import { SplashCursor } from './components/SplashCursor';
import { Navigation } from './components/Navigation';
import { FloatingAssistant } from './components/FloatingAssistant';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { PricingPage } from './pages/PricingPage';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const [currentPage] = useAtom(currentPageAtom);
  const { user, isLoading } = useAuth();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-deep-blue flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'pricing':
        return <PricingPage />;
      case 'login':
        return <LoginPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <SplashCursor />
      
      <div className="relative z-10">
        <Navigation />
        {renderPage()}
      </div>

      <FloatingAssistant />
    </div>
  );
}

export default App;