import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { generateWorksheetPDF } from '../utils/pdfUtils';

export const SetupScreen = () => {
  const navigate = useNavigate();
  const [operation, setOperation] = useState('add');
  const [difficulty, setDifficulty] = useState('easy');
  const [numberMode, setNumberMode] = useState('single');
  const [customRange, setCustomRange] = useState({ min: '1', max: '20' });
  
  // Printing Modal State
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printCount, setPrintCount] = useState('10');

  const getConfig = () => ({
    operation,
    difficulty,
    numberMode,
    customRange
  });

  const handleStart = () => {
    navigate('/practice', { state: { config: getConfig() } });
  };

  const handlePrint = () => {
    generateWorksheetPDF(getConfig(), parseInt(printCount, 10));
    setShowPrintModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-xl mx-auto p-4 gap-8 fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">Let's Practice!</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">Choose your math adventure</p>
      </div>

      <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
        
        <div className="tour-operation">
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
        </div>

        <div className="tour-number-size">
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
        </div>

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

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
        <div className="tour-start">
          <Button onClick={handleStart} className="px-12 py-4 text-xl w-full">
            Start Practicing
          </Button>
        </div>
        <div className="tour-print">
          <Button 
            onClick={() => setShowPrintModal(true)} 
            variant="outline" 
            className="px-8 py-4 text-xl flex items-center justify-center gap-2 w-full"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print Worksheet
          </Button>
        </div>
      </div>

      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm p-6 shadow-2xl flex flex-col gap-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Download PDF</h3>
            <p className="text-slate-600 dark:text-slate-400">How many questions would you like to print?</p>
            <Input 
              type="number" 
              value={printCount} 
              onChange={(e) => setPrintCount(e.target.value)} 
              min="1" 
              max="50"
            />
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1" onClick={() => setShowPrintModal(false)}>Cancel</Button>
              <Button onClick={handlePrint} className="flex-1">Download</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
