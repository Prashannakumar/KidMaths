import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(null);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const getInitialProgress = () => {
    const saved = localStorage.getItem('kidmaths_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    return {
      points: 0,
      level: 1,
      correctAnswers: 0, // Number of questions solved
      totalAttempts: 0,
      history: [], // Stores question history
    };
  };

  const [progress, setProgress] = useState(getInitialProgress);

  useEffect(() => {
    localStorage.setItem('kidmaths_progress', JSON.stringify(progress));
  }, [progress]);

  // Adds points and recalculates level
  const recordQuestionSolved = (attempts, questionText, correctAnswer) => {
    setProgress((prev) => {
      // Points logic:
      // 1 attempt = 10 pts
      // 2 attempts = 5 pts
      // 3+ attempts = 2 pts
      let earnedPoints = 2;
      if (attempts === 1) earnedPoints = 10;
      else if (attempts === 2) earnedPoints = 5;

      const newPoints = prev.points + earnedPoints;
      // Level up every 100 points
      const newLevel = Math.floor(newPoints / 100) + 1;

      const historyEntry = {
        id: Date.now(),
        questionText,
        correctAnswer,
        attempts,
        earnedPoints,
        levelAtTime: prev.level,
      };

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        correctAnswers: prev.correctAnswers + 1,
        totalAttempts: prev.totalAttempts + attempts,
        history: [historyEntry, ...(prev.history || [])],
      };
    });
  };

  const resetProgress = () => {
    const init = {
      points: 0,
      level: 1,
      correctAnswers: 0,
      totalAttempts: 0,
      history: [],
    };
    setProgress(init);
    localStorage.removeItem('kidmaths_progress');
  };

  return (
    <ProgressContext.Provider value={{ progress, recordQuestionSolved, resetProgress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
