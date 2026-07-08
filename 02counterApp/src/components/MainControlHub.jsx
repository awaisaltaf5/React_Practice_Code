import React from 'react';
import { useCounter } from '../context/CounterContext';

export default function MainControlHub() {
  const { state, dispatch } = useCounter();
  const currentProfile = state.profiles.find(p => p.id === state.activeProfileId);

  if (!currentProfile) return <div className="fallback-notice">Select or add a metric to get started.</div>;

  return (
    <main className="main-control-hub">
      <div className="interactive-display-card" style={{ borderColor: currentProfile.color + '40' }}>
        <span className="active-tag" style={{ backgroundColor: currentProfile.color + '20', color: currentProfile.color }}>
          Active Focus
        </span>
        <h2>{currentProfile.name}</h2>
        <div className="huge-counter-digits" style={{ color: currentProfile.color }}>
          {currentProfile.current}
        </div>

        <div className="pad-controls">
          <button 
            className="action-pad dec" 
            onClick={() => dispatch({ type: 'UPDATE_COUNTER', payload: { profileId: currentProfile.id, amount: -1 } })}
            aria-label="Decrement count"
          >
            -
          </button>
          <button 
            className="action-pad inc" 
            onClick={() => dispatch({ type: 'UPDATE_COUNTER', payload: { profileId: currentProfile.id, amount: 1 } })}
            aria-label="Increment count"
          >
            +
          </button>
        </div>

        <button className="reset-link-btn" onClick={() => dispatch({ type: 'RESET_ACTIVE' })}>
          Clear Active Record
        </button>
      </div>
    </main>
  );
}