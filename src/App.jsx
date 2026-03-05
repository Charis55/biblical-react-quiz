import React, { useState } from 'react';
import allQuestions from './questions.json';
import { useFullscreen } from './hooks/useFullscreen';

import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import TerminatedScreen from './components/TerminatedScreen';
import WarningModal from './components/WarningModal';

function App() {
  const [screen, setScreen] = useState('start'); // start | quiz | results | terminated
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const isQuizActive = screen === 'quiz';

  const { requestFullscreen, exitFullscreen } = useFullscreen(
    isQuizActive,
    () => {
      // First exit
      setShowWarning(true);
    },
    () => {
      // Second exit
      setShowWarning(false);
      setScreen('terminated');
    }
  );

  const handleStart = async (count) => {
    try {
      await requestFullscreen();

      // Shuffle completely and slice the requested amount
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, count);

      setQuizQuestions(selected);
      setScore(0);
      setShowWarning(false);
      setScreen('quiz');
    } catch (err) {
      alert("You must allow full screen to start the quiz.");
      console.error(err);
    }
  };

  const handleResume = async () => {
    try {
      await requestFullscreen();
      setShowWarning(false);
    } catch (err) {
      alert("You MUST enter full screen to resume.");
    }
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setScreen('results');
    exitFullscreen();
  };

  const resetToHome = () => {
    setScreen('start');
    setShowWarning(false);
    setQuizQuestions([]);
    setScore(0);
  };

  const handleQuit = () => {
    resetToHome();
    exitFullscreen();
  };

  return (
    <>
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <div className="app-container">
        {screen === 'start' && <StartScreen onStart={handleStart} />}

        {screen === 'quiz' && (
          <QuizScreen
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onQuit={handleQuit}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            score={score}
            total={quizQuestions.length}
            onRestart={resetToHome}
          />
        )}

        {screen === 'terminated' && <TerminatedScreen onRestart={resetToHome} />}
      </div>

      {showWarning && <WarningModal onResume={handleResume} />}
    </>
  );
}

export default App;
