import React, { useState } from 'react';
import { useSettings } from '../store/SettingsContext';
import { Toggle } from './ui/Toggle';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

export const SettingsPanel = ({ onClose }) => {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm soft-transition">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 soft-transition focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 px-2">Visuals & Layout</h3>
            
            <Select 
              label="Font Style"
              id="font"
              value={settings.font}
              onChange={(val) => updateSetting('font', val)}
              options={[
                { value: 'Nunito', label: 'Nunito (Friendly)' },
                { value: 'Quicksand', label: 'Quicksand (Round)' },
                { value: 'Comic Neue', label: 'Comic Neue (Playful)' }
              ]}
            />
            
            <Select 
              label="Text Size"
              id="fontSize"
              value={settings.fontSize}
              onChange={(val) => updateSetting('fontSize', val)}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]}
            />
            
            <Toggle 
              label="Dark Mode" 
              description="Easier on the eyes in low light"
              checked={settings.darkMode}
              onChange={(val) => updateSetting('darkMode', val)}
            />
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 px-2">Experience & Feedback</h3>
            
            <Toggle 
              label="Animations" 
              description="Smooth transitions and movement"
              checked={settings.animations}
              onChange={(val) => updateSetting('animations', val)}
            />
            <Toggle 
              label="Sound Effects" 
              description="Soft clicks and success chimes"
              checked={settings.sound}
              onChange={(val) => updateSetting('sound', val)}
            />
            <Toggle 
              label="Visual Feedback" 
              description="Colors to indicate correct/incorrect"
              checked={settings.visualFeedback}
              onChange={(val) => updateSetting('visualFeedback', val)}
            />
            <Toggle 
              label="Multiple Choice Mode" 
              description="Show 4 options instead of typing"
              checked={settings.multipleChoiceMode}
              onChange={(val) => updateSetting('multipleChoiceMode', val)}
            />
            
            <Toggle 
              label="🎮 Gaming Mode" 
              description="Fun animations, floating animals, and extra sound effects!"
              checked={settings.gamingMode}
              onChange={(val) => updateSetting('gamingMode', val)}
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
