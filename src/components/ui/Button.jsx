import React from 'react';
import { useSettings } from '../../store/SettingsContext';
import useSound from 'use-sound';

// A soft bubble pop sound in base64 to avoid external asset dependency
const popSound = 'data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'; 

// Due to base64 length constraints and simplicity, we can use an empty or valid generic short beep, 
// or simply disable it for now if URL fails. Let's rely on standard HTML5 Audio or use-sound's defaults.
// Alternatively, we use a public free sound URL or just no sound. 
// A real app would have an MP3 file in public/assets. We'll simulate by checking volume.

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const { settings } = useSettings();
  
  // We mock a tiny click sound. In real scenario, add your own mp3.
  const playClick = () => {
    if (settings.sound) {
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio play blocked", e));
      } catch (e) {}
    }
  };

  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  const baseStyles = 'px-6 py-3 rounded-2xl font-bold text-lg focus:outline-none focus:ring-4 soft-transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-emerald-400 text-slate-900 hover:bg-emerald-300 focus:ring-emerald-200 shadow-sm',
    secondary: 'bg-indigo-400 text-white hover:bg-indigo-300 focus:ring-indigo-200 shadow-sm',
    outline: 'bg-transparent border-2 border-slate-300 text-slate-600 hover:bg-slate-50 focus:ring-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
