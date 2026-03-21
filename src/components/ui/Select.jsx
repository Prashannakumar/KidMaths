import React from 'react';

export const Select = ({ label, id, options, value, onChange, className = '' }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id} className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-2">{label}</label>}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`appearance-none w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 text-lg font-medium text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 soft-transition cursor-pointer dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-900 ${className}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
