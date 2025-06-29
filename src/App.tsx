import React from 'react';
import { SplashCursor } from './components/SplashCursor';
import { HeroSection } from './components/HeroSection';
import { MainSection } from './components/MainSection';
import { FloatingAssistant } from './components/FloatingAssistant';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <SplashCursor />
      
      <div className="relative z-10">
        <HeroSection />
        <MainSection />
      </div>

      <FloatingAssistant />
    </div>
  );
}

export default App;