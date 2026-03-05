import React from 'react';

export default function TerminatedScreen({ onRestart }) {
    return (
        <div className="screen active">
            <div className="glass-panel error-theme text-center">
                <div className="icon-container text-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>
                </div>
                <h1 className="text-danger">Session Terminated</h1>
                <p className="subtitle">Rule Violation Detected</p>
                <div className="termination-details">
                    <p>You have explicitly left fullscreen mode twice.</p>
                    <p>As per the quiz instructions, your attempt has been invalidated and recorded as incomplete.</p>
                </div>
                <button onClick={onRestart} className="btn secondary-btn">Return to Start</button>
            </div>
        </div>
    );
}
