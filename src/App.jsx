import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { SetupScreen } from './screens/SetupScreen';
import { PracticeScreen } from './screens/PracticeScreen';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <Header />
      <main className="flex-1 w-full flex flex-col relative z-0">
        <Routes>
          <Route path="/" element={<SetupScreen />} />
          <Route path="/practice" element={<PracticeScreen />} />
        </Routes>
      </main>
      <Analytics />
    </div>
  );
}

export default App;
