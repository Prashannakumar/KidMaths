import React, { useEffect, useState } from 'react';
import { Cat, Ghost, Planet, IceCream, Backpack, Mug } from 'react-kawaii';

const COMPONENTS = [Cat, Ghost, Planet, IceCream, Backpack, Mug];
const COLORS = ['#FDA7DC', '#83D1FB', '#E0F2FE', '#FDFD96', '#FFB7B2', '#E2F0CB'];
const MOODS = ['happy', 'blissful', 'excited'];

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

    const reactions = [];
    
    if (feedback === 'correct') {
      // Create 3 massive excited popping characters
      for(let i=0; i<3; i++) {
        reactions.push({
          id: `react-correct-${Date.now()}-${i}`,
          Component: randomItem(COMPONENTS),
          color: randomItem(COLORS),
          mood: 'lovestruck',
          left: `${randomRange(10, 70)}%`,
          top: `${randomRange(10, 70)}%`,
          size: Math.floor(randomRange(250, 450)),
          rotation: `${randomRange(-30, 30)}deg`
        });
      }
    } else {
      // 1 massive shocked or sad character
      reactions.push({
        id: `react-incorrect-${Date.now()}`,
        Component: Cat,
        color: '#FFB7B2',
        mood: 'shocked',
        left: '50%',
        top: '50%',
        size: 350,
        rotation: '0deg',
        transform: 'translate(-50%, -50%)'
      });
    }
    
    setReaction(reactions);

    const timer = setTimeout(() => {
      setReaction(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [feedback, isGamingMode]);

  if (!isGamingMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Elements */}
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
              zIndex: 1, // behind the main panel
            }}
          >
            <div className="animate-float">
               <Component size={el.size} mood={el.mood} color={el.color} />
            </div>
          </div>
        );
      })}

      {/* Foreground Reaction Elements */}
      {reaction && reaction.map((el) => {
        const { Component } = el;
        return (
          <div 
            key={el.id}
            className={`absolute z-50 text-center flex items-center justify-center`}
            style={{
              top: el.top,
              left: el.left,
              transform: el.transform || `rotate(${el.rotation})`,
              filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.25))',
            }}
          >
            <div className={`animate-pop-in-out ${feedback==='incorrect'?'animate-wiggle':''}`}>
              <Component size={el.size} mood={el.mood} color={el.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
