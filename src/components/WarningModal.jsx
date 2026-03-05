import React from 'react';

export default function WarningModal({ onResume }) {
    return (
        <div className="modal-overlay active">
            <div className="glass-modal warning-theme">
                <div className="modal-icon text-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                </div>
                <h2>Fullscreen Disengaged</h2>
                <p>You have left fullscreen mode. This is your <strong className="warning-text">first and only warning</strong>.</p>
                <p className="modal-subtext">If you exit fullscreen again, your session will be immediately terminated and your score will be lost.</p>
                <button onClick={onResume} className="btn warning-btn">I Understand, Resume in Fullscreen</button>
            </div>
        </div>
    );
}
