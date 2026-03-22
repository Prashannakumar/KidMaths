import React from 'react';
import { X, RotateCcw, Target, Trophy, Clock, Star } from 'lucide-react';
import { useProgress } from '../store/ProgressContext';
import { Button } from './ui/Button';

export const ProgressDrawer = ({ isOpen, onClose }) => {
  const { progress, resetProgress } = useProgress();

  if (!isOpen) return null;

  // Group history by level
  const groupedHistory = (progress.history || []).reduce((acc, entry) => {
    const lvl = entry.levelAtTime;
    if (!acc[lvl]) acc[lvl] = [];
    acc[lvl].push(entry);
    return acc;
  }, {});

  const levels = Object.keys(groupedHistory).map(Number).sort((a, b) => b - a);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all learning progress? This cannot be undone.")) {
      resetProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-slate-50 dark:bg-slate-900 shadow-2xl flex flex-col animate-slideInRight border-l border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Trophy size={20} className="text-amber-500" />
              Learning Tracker
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review history & attempts
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full soft-transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-white dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800/50">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl flex flex-col border border-emerald-100 dark:border-emerald-800/30">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-1"><Target size={14}/> Accuracy</span>
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
              {progress.totalAttempts === 0 ? 0 : Math.round((progress.correctAnswers / progress.totalAttempts) * 100)}%
            </span>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl flex flex-col border border-indigo-100 dark:border-indigo-800/30">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold flex items-center gap-1"><Clock size={14}/> Solved</span>
            <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mt-1">
              {progress.correctAnswers}
            </span>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {levels.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
              <Star size={48} className="text-slate-300 dark:text-slate-700 opacity-50" />
              <p>No questions answered yet!</p>
            </div>
          ) : (
            levels.map(level => (
              <div key={level}>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs">
                    L{level}
                  </span>
                  Level {level}
                </h3>
                
                <div className="space-y-3">
                  {groupedHistory[level].map((entry) => (
                    <div key={entry.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <div className="font-bold text-slate-700 dark:text-slate-300 text-lg tracking-wider" style={{fontVariantNumeric: 'tabular-nums'}}>
                        {entry.questionText} = {entry.correctAnswer}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex text-xs font-semibold px-2 py-1 rounded-full items-center gap-1 bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          <Star size={12} fill="currentColor" /> +{entry.earnedPoints}
                        </div>
                        
                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${entry.attempts === 1 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                          {entry.attempts} {entry.attempts === 1 ? 'Try' : 'Tries'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-center">
           <Button variant="ghost" onClick={handleReset} className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 gap-2 w-full">
             <RotateCcw size={18} />
             Reset All Progress
           </Button>
        </div>

      </div>
    </div>
  );
};
