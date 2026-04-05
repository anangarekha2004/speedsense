import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-indigo-100 shadow-lg">
              <span className="font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">SpeedSense</span>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={window.location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="max-w-md mx-auto px-6 pt-6 pb-24"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Navbar />
    </div>
  );
};
