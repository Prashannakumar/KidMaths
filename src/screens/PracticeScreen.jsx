import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateQuestion } from '../utils/mathUtils';
import { useSettings } from '../store/SettingsContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GamingOverlay } from '../components/GamingOverlay';

export const PracticeScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();
  
  const config = state?.config || { operation: 'add', difficulty: 'easy', numberMode: 'single', customRange: { min: 1, max: 10 } };
  
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null
  const inputRef = useRef(null);

  const loadNewQuestion = () => {
    setQuestion(generateQuestion(config.operation, config.difficulty, config.numberMode, config.customRange));
    setAnswer('');
    setFeedback(null);
  };

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Focus the input safely after the question has been rendered
    if (question && !settings.multipleChoiceMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [question, settings.multipleChoiceMode]);

  const playFeedbackSound = (isCorrect) => {
    if (!settings.sound) return;
    try {
      let url = '';
      if (settings.gamingMode) {
        url = isCorrect 
          ? 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3' // Game win / level up
          : 'https://assets.mixkit.co/active_storage/sfx/2043/2043-preview.mp3'; // Game boing / fail
      } else {
        url = isCorrect 
          ? 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3' // Soft Success
          : 'https://assets.mixkit.co/active_storage/sfx/2042/2042-preview.mp3'; // Soft error
      }
      const audio = new Audio(url);
      audio.volume = settings.gamingMode ? 0.6 : 0.3; // slightly louder in gaming mode
      audio.play().catch(() => {});
    } catch(e) {}
  };

  const handleCheck = (submittedAnswer) => {
    if (submittedAnswer === '' || submittedAnswer === null) return;
    
    // Allow checking immediately if MC mode, otherwise parse int
    const numAnswer = parseInt(submittedAnswer, 10);
    
    if (numAnswer === question.correctAnswer) {
      setFeedback('correct');
      playFeedbackSound(true);
      setTimeout(() => {
        loadNewQuestion();
      }, settings.animations ? 1200 : 500);
    } else {
      setFeedback('incorrect');
      playFeedbackSound(false);
      // clear input after short delay if typing
      if (!settings.multipleChoiceMode) {
        setTimeout(() => setAnswer(''), 800);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheck(answer);
    }
  };

  if (!question) return <div className="flex-1 flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl mx-auto p-4 md:p-8 relative">
      <GamingOverlay feedback={feedback} isGamingMode={settings.gamingMode} />
      
      <div className="w-full flex justify-between items-center mb-8 fade-in relative z-10">
        <Button variant="ghost" onClick={() => navigate('/')} className="px-4 py-2 text-sm">
          ← Back
        </Button>
        <div className="text-slate-400 font-medium">
          {config.operation.toUpperCase()} | {config.numberMode.toUpperCase()}
        </div>
      </div>

      <div className={`w-full bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-10 transition-all duration-500 relative z-10 ${settings.visualFeedback && feedback === 'correct' ? 'ring-4 ring-emerald-200 bg-emerald-50 dark:bg-emerald-900/20' : ''} ${settings.visualFeedback && feedback === 'incorrect' ? 'ring-4 ring-red-200 bg-red-50 dark:bg-red-900/20' : ''}`}>
        
        {/* Question Display */}
        <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-800 dark:text-white tracking-tighter" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {question.questionText} <span className="text-slate-300 dark:text-slate-600">=</span>
        </div>

        {/* Input Area */}
        <div className="w-full max-w-sm">
          {settings.multipleChoiceMode ? (
            <div className="grid grid-cols-2 gap-4 fade-in">
              {question.options.map((opt, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="py-6 text-3xl font-bold bg-white dark:bg-slate-700"
                  onClick={() => handleCheck(opt)}
                  disabled={feedback === 'correct'}
                >
                  {opt}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 fade-in">
               <Input
                  ref={inputRef}
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-4xl py-6 font-bold"
                  placeholder="?"
                  autoFocus
                  disabled={feedback === 'correct'}
               />
               <Button 
                onClick={() => handleCheck(answer)} 
                className="w-full py-4 text-xl"
                disabled={feedback === 'correct' || answer === ''}
               >
                 Check
               </Button>
            </div>
          )}
        </div>

        {/* Feedback Message */}
        <div className="h-12 flex items-center justify-center fade-in">
          {feedback === 'correct' && (
            <div className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              Great job!
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="text-xl font-medium text-red-400">
              Try again! You can do it.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
