import React, { forwardRef } from 'react';

export const Input = forwardRef(({ label, id, className = '', error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id} className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-2">{label}</label>}
      <input
        id={id}
        ref={ref}
        className={`w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 text-xl text-center focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 soft-transition dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-900 ${
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500 ml-2 font-medium">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
