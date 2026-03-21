import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const getInitialSettings = () => {
    const saved = localStorage.getItem('kidmaths_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return {
      animations: true,
      sound: true,
      visualFeedback: true,
      multipleChoiceMode: false,
      fontSize: 'medium', // small, medium, large
      darkMode: false,
      font: 'Nunito', // Nunito, Quicksand, 'Comic Neue'
    };
  };

  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    localStorage.setItem('kidmaths_settings', JSON.stringify(settings));
    
    // Apply dark mode to body
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Apply font to body
    let displayFont = 'var(--font-nunito)';
    if (settings.font === 'Quicksand') displayFont = 'var(--font-quicksand)';
    else if (settings.font === 'Comic Neue') displayFont = 'var(--font-comic)';
    
    document.body.style.fontFamily = displayFont;

    // Apply font size
    let size = '16px';
    if (settings.fontSize === 'small') size = '14px';
    else if (settings.fontSize === 'large') size = '20px';
    document.documentElement.style.fontSize = size;

    // Disable animations globally if turned off
    if (!settings.animations) {
      document.body.classList.add('no-animation');
    } else {
      document.body.classList.remove('no-animation');
    }

  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};
