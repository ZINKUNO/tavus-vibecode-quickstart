import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { currentPageAtom, type Page } from '../store/navigation';
import { Button } from './ui/button';

export const Navigation: React.FC = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Login', page: 'login' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CP</span>
          </div>
          <span className="text-xl font-bold text-white font-jakarta">CreatorPilot</span>
        </div>

        <div className="flex items-center gap-6">
          {navItems.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'text-neon-blue'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};