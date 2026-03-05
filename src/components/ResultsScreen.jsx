import React from 'react';

export default function ResultsScreen({ score, total, onRestart }) {
    const ratio = score / total;

    let feedbackHtml = '';
    if (ratio === 1) {
        feedbackHtml = <>Perfect! You have a profound understanding of these Biblical principles.<br /><span className='highlight'>(Colossians 3:23)</span></>;
    } else if (ratio >= 0.7) {
        feedbackHtml = "Great job! You possess a solid grasp of how to integrate these principles professionally.";
    } else if (ratio >= 0.5) {
        feedbackHtml = "Good effort! There is room for deeper reflection on applying these values.";
    } else {
        feedbackHtml = "Keep studying! Understanding these concepts is a lifelong journey.";
    }

    return (
        <div className="screen active">
            <div className="glass-panel text-center">
                <div className="icon-container success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                </div>
                <h1 className="gradient-text">Quiz Completed!</h1>
                <div className="score-display">
                    <span className="score-label">Final Score</span>
                    <div className="score-value"><span>{score}</span><span className="total-score">/{total}</span></div>
                </div>
                <p className="feedback-text">{feedbackHtml}</p>
                <button onClick={onRestart} className="btn primary-btn">Retake Quiz</button>
            </div>
        </div>
    );
}
