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
      <header className="w-full p-4 sm:p-6 flex justify-between items-center bg-transparent max-w-4xl mx-auto overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-400 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-sm shrink-0">
            +-
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white hidden min-[380px]:block">KidMaths</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          <div className="flex bg-white dark:bg-slate-800 shadow-sm rounded-xl sm:rounded-2xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 gap-1.5 sm:gap-2 md:gap-3 items-center border border-slate-100 dark:border-slate-700 shrink-0">
            <span className="font-bold text-amber-500 font-sans tracking-tight sm:tracking-wide text-xs sm:text-sm md:text-base whitespace-nowrap">
              ⭐ {progress.points}
            </span>
            <div className="w-px h-4 sm:h-5 md:h-6 bg-slate-200 dark:bg-slate-700"></div>
            <span className="font-bold text-indigo-500 font-sans tracking-tight sm:tracking-wide text-xs sm:text-sm md:text-base whitespace-nowrap">
              🏆 Lvl {progress.level}
            </span>
          </div>

          <button 
            onClick={() => setIsProgressOpen(true)}
            title="Open Learning Tracker"
            className="tour-progress p-2 sm:p-3 text-emerald-500 bg-white hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-xl sm:rounded-2xl soft-transition focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900/30 shadow-sm shrink-0"
            aria-label="View Progress"
          >
            <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="tour-settings p-2 sm:p-3 text-slate-500 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-xl sm:rounded-2xl soft-transition focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-800 shadow-sm shrink-0"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>
      
      <ProgressDrawer isOpen={isProgressOpen} onClose={() => setIsProgressOpen(false)} />
      {isSettingsOpen && <SettingsPanel onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};
