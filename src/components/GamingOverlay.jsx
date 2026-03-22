import React, { useEffect, useState } from 'react';
import { Cat, Ghost, Planet, IceCream, Backpack, Mug } from 'react-kawaii';

const COMPONENTS = [Cat, Ghost, Planet, IceCream, Backpack, Mug];
const COLORS = ['#FDA7DC', '#83D1FB', '#E0F2FE', '#FDFD96', '#FFB7B2', '#E2F0CB'];
const MOODS = ['happy', 'blissful', 'excited'];

const SUCCESS_PHRASES = ["Yippee!", "Great Job!", "You're a Math Genius!", "Wow!", "Awesome!"];
const FAIL_PHRASES = ["Oops!", "Let's try again!", "Almost there!", "Uh oh!"];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.random() * (max - min) + min;

export const GamingOverlay = ({ feedback, isGamingMode }) => {
  const [backgroundElements, setBackgroundElements] = useState([]);
  const [reaction, setReaction] = useState(null);

  // Initialize background elements
  useEffect(() => {
    if (!isGamingMode) return;
    
    const elements = [];
    
    // Add 4 left-flying massive shapes
    for (let i = 0; i < 4; i++) {
      elements.push({
        id: `l-${i}`,
        Component: randomItem(COMPONENTS),
        color: randomItem(COLORS),
        mood: randomItem(MOODS),
        top: `${randomRange(5, 75)}%`,
        animationClass: 'animate-fly-left',
        animationDelay: `${randomRange(0, 10)}s`,
        animationDuration: `${randomRange(15, 30)}s`,
        size: Math.floor(randomRange(150, 300)), // big sizes!
      });
    }

    // Add 4 right-flying massive shapes
    for (let i = 0; i < 4; i++) {
      elements.push({
        id: `r-${i}`,
        Component: randomItem(COMPONENTS),
        color: randomItem(COLORS),
        mood: randomItem(MOODS),
        top: `${randomRange(5, 75)}%`,
        animationClass: 'animate-fly-right',
        animationDelay: `${randomRange(0, 10)}s`,
        animationDuration: `${randomRange(18, 32)}s`,
        size: Math.floor(randomRange(150, 300)), // big sizes!
      });
    }

    setBackgroundElements(elements);
  }, [isGamingMode]);

  // Handle feedback reactions
  useEffect(() => {
    if (!isGamingMode || !feedback) {
      setReaction(null);
      return;
    }

    if (feedback === 'correct') {
      setReaction({
        Component: randomItem([Cat, Ghost, Planet, IceCream, Backpack]),
        color: randomItem(COLORS),
        mood: 'excited',
        phrase: randomItem(SUCCESS_PHRASES),
        isCorrect: true
      });
    } else {
      setReaction({
        Component: randomItem([Cat, Ghost, Planet, IceCream, Backpack]),
        color: randomItem(COLORS),
        mood: 'sad',
        phrase: randomItem(FAIL_PHRASES),
        isCorrect: false
      });
    }

    const timer = setTimeout(() => {
      setReaction(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [feedback, isGamingMode]);

  if (!isGamingMode) return null;

  return (
    <>
      {/* Background Elements (Behind everything) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {backgroundElements.map((el) => {
          const { Component } = el;
          return (
            <div 
              key={el.id}
              className={`absolute ${el.animationClass}`}
              style={{
                top: el.top,
                animationDelay: el.animationDelay,
                animationDuration: el.animationDuration,
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))',
              }}
            >
              <div className="animate-float">
                 <Component size={el.size} mood={el.mood} color={el.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Foreground Character Reaction Element (Above everything) */}
      {reaction && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none fade-in">
          <div className="relative flex flex-col items-center gap-4 sm:gap-6 mt-10 sm:mt-20 px-4">
             {/* Speech Bubble */}
             <div className={`relative px-6 sm:px-8 py-4 sm:py-5 rounded-3xl text-xl sm:text-3xl font-bold shadow-2xl animate-pop-in-out text-center ${reaction.isCorrect ? 'bg-white text-emerald-600 border-4 border-emerald-200' : 'bg-white text-rose-500 border-4 border-rose-200'} `}>
               {reaction.phrase}
               {/* Speech Bubble Tail pointing down */}
               <div className={`absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 rotate-45 ${reaction.isCorrect ? 'bg-white border-b-4 border-r-4 border-emerald-200' : 'bg-white border-b-4 border-r-4 border-rose-200'}`}></div>
             </div>
             
             {/* Character */}
             <div className={`animate-pop-in-out ${reaction.isCorrect ? 'animate-bounce' : 'animate-wiggle'}`} style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.25))' }}>
               <reaction.Component 
                  size={typeof window !== 'undefined' && window.innerWidth < 640 ? 160 : 250} 
                  mood={reaction.mood} 
                  color={reaction.color} 
               />
             </div>
          </div>
        </div>
      )}
    </>
  );
};
