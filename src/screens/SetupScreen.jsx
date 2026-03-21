import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';

export const SetupScreen = () => {
  const navigate = useNavigate();
  const [operation, setOperation] = useState('add');
  const [difficulty, setDifficulty] = useState('easy');
  const [numberMode, setNumberMode] = useState('single');
  const [customRange, setCustomRange] = useState({ min: '1', max: '20' });

  const handleStart = () => {
    // Pass config via state
    navigate('/practice', {
      state: {
        config: {
          operation,
          difficulty,
          numberMode,
          customRange
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-xl mx-auto p-4 gap-8 fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">Let's Practice!</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">Choose your math adventure</p>
      </div>

      <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
        
        <Select 
          label="What to practice?"
          id="operation"
          value={operation}
          onChange={setOperation}
          options={[
            { value: 'add', label: 'Addition (+)' },
            { value: 'subtract', label: 'Subtraction (-)' },
            { value: 'multiply', label: 'Multiplication (×)' },
            { value: 'divide', label: 'Division (÷)' },
            { value: 'mixed', label: 'Mixed (Random)' }
          ]}
        />

        <Select 
          label="Number size"
          id="numberMode"
          value={numberMode}
          onChange={setNumberMode}
          options={[
            { value: 'single', label: 'Single Digits (1-9)' },
            { value: 'double', label: 'Double Digits (10-99)' },
            { value: 'custom', label: 'Custom Range' }
          ]}
        />

        {numberMode === 'custom' && (
          <div className="flex gap-4">
            <Input 
              label="Min" 
              type="number" 
              value={customRange.min}
              onChange={(e) => setCustomRange(prev => ({ ...prev, min: e.target.value }))}
            />
            <Input 
              label="Max" 
              type="number" 
              value={customRange.max}
              onChange={(e) => setCustomRange(prev => ({ ...prev, max: e.target.value }))}
            />
          </div>
        )}

      </div>

      <Button onClick={handleStart} className="w-full sm:w-auto px-12 py-4 text-xl">
        Start Practicing
      </Button>
    </div>
  );
};
