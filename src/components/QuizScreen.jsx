import React, { useState, useEffect } from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ questions, onComplete, onQuit }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const currentData = questions[currentIndex];
    const progressPercentage = (currentIndex / questions.length) * 100;

    const handleOptionClick = (index) => {
        if (hasAnswered) return;

        setHasAnswered(true);
        setSelectedIndex(index);

        const isCorrect = index === currentData.answer;
        if (isCorrect) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(c => c + 1);
                setHasAnswered(false);
                setSelectedIndex(null);
            } else {
                onComplete(isCorrect ? score + 1 : score);
            }
        }, 1500);
    };

    const getOptionClass = (index) => {
        if (!hasAnswered) return '';

        if (index === currentData.answer) return 'correct';
        if (index === selectedIndex && index !== currentData.answer) return 'wrong';
        return '';
    };

    return (
        <div className="screen active">
            <div className="glass-panel">
                <header className="quiz-header">
                    <div className="stats-container">
                        <div className="stat-pill">
                            <span className="stat-icon">🎯</span>
                            <span>Question {currentIndex + 1}/{questions.length}</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-icon">⭐</span>
                            <span>Score: {score}</span>
                        </div>
                        <button onClick={onQuit} className="btn secondary-btn" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>Quit Quiz</button>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </header>

                <main className="quiz-main">
                    <h2 className="question-text">{currentData.question}</h2>
                    <div className="options-grid">
                        {currentData.options.map((opt, index) => (
                            <button
                                key={index}
                                className={`option-btn ${getOptionClass(index)} ${selectedIndex === index && hasAnswered && index === currentData.answer ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(index)}
                                disabled={hasAnswered}
                            >
                                <span className="option-letter">{LETTERS[index]}</span>
                                <span className="option-text">{opt}</span>
                            </button>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
