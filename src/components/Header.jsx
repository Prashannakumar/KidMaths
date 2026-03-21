import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';

export const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="w-full p-6 flex justify-between items-center bg-transparent max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            +-
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">KidMaths</h1>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 text-slate-500 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-2xl soft-transition focus:outline-none focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800 shadow-sm"
          aria-label="Settings"
        >
          <SettingsIcon size={24} />
        </button>
      </header>
      
      {isSettingsOpen && <SettingsPanel onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};
