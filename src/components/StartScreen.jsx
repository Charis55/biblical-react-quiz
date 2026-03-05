import React from 'react';

export default function StartScreen({ onStart }) {
    const [questionCount, setQuestionCount] = React.useState('10');

    const handleStart = () => {
        onStart(Number(questionCount));
    };

    return (
        <div className="screen active">
            <div className="glass-panel text-center">
                <div className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" /><path d="m16 12 2 2 4-4" /><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" /></svg>
                </div>
                <h1 className="gradient-text">Biblical Principles</h1>
                <p className="subtitle">in Personal and Professional Life</p>

                <div className="rules-section">
                    <h2>Quiz Instructions & Rules</h2>
                    <ul className="rules-list">
                        <li><span className="highlight">Scale it:</span> Choose how many questions to attempt.</li>
                        <li><span className="highlight">Strict Fullscreen:</span> This quiz requires fullscreen mode.</li>
                        <li><span className="warning-text">First Strike:</span> Leaving fullscreen results in a warning.</li>
                        <li><span className="danger-text">Termination:</span> Leaving fullscreen twice invalidates your session.</li>
                    </ul>
                </div>

                <div className="settings-form">
                    <label htmlFor="qCount">Attempt:</label>
                    <select
                        id="qCount"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(e.target.value)}
                    >
                        <option value="5">5 Questions</option>
                        <option value="10">10 Questions</option>
                        <option value="25">25 Questions</option>
                        <option value="50">50 Questions</option>
                        <option value="100">100 Questions</option>
                        <option value="500">All 500 Questions</option>
                    </select>
                </div>

                <button onClick={handleStart} className="btn primary-btn pulse-glow">Begin Assessment</button>
            </div>
        </div>
    );
}
