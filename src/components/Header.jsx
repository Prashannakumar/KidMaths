import React, { useState } from 'react';
import { Settings as SettingsIcon, BarChart2 } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';
import { useProgress } from '../store/ProgressContext';
import { ProgressDrawer } from './ProgressDrawer';

export const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const { progress } = useProgress();

  return (
    <>
      <header className="w-full p-6 flex justify-between items-center bg-transparent max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            +-
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">KidMaths</h1>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex bg-white dark:bg-slate-800 shadow-sm rounded-2xl px-3 md:px-4 py-2 gap-2 md:gap-3 items-center border border-slate-100 dark:border-slate-700">
            <span className="font-bold text-amber-500 font-sans tracking-wide text-sm md:text-base">
              ⭐ {progress.points}
            </span>
            <div className="w-px h-5 md:h-6 bg-slate-200 dark:bg-slate-700"></div>
            <span className="font-bold text-indigo-500 font-sans tracking-wide text-sm md:text-base">
              🏆 Lvl {progress.level}
            </span>
          </div>

          <button 
            onClick={() => setIsProgressOpen(true)}
            title="Open Learning Tracker"
            className="tour-progress p-3 text-emerald-500 bg-white hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-2xl soft-transition focus:outline-none focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 shadow-sm"
            aria-label="View Progress"
          >
            <BarChart2 size={24} />
          </button>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="tour-settings p-3 text-slate-500 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-2xl soft-transition focus:outline-none focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800 shadow-sm"
            aria-label="Settings"
          >
            <SettingsIcon size={24} />
          </button>
        </div>
      </header>
      
      <ProgressDrawer isOpen={isProgressOpen} onClose={() => setIsProgressOpen(false)} />
      {isSettingsOpen && <SettingsPanel onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};
