import React from 'react';

export const Toggle = ({ checked, onChange, label, description }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer group p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 soft-transition">
      <div className="flex flex-col">
        <span className="text-base font-bold text-slate-700 dark:text-slate-200">{label}</span>
        {description && <span className="text-sm text-slate-500 dark:text-slate-400">{description}</span>}
      </div>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={`block w-14 h-8 rounded-full soft-transition ${checked ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full soft-transition ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  );
};
