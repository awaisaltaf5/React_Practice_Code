import React, { useState } from 'react';
import { useCounter } from '../context/CounterContext';

export default function ProfileSidebar() {
  const { state, dispatch } = useCounter();
  const [newName, setNewName] = useState('');
  const [color, setColor] = useState('#8b5cf6');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim() || newName.length > 25) return; // Cap length for layout safety
    dispatch({ type: 'ADD_CUSTOM_PROFILE', payload: { name: newName, color } });
    setNewName('');
  };

  return (
    <aside className="profile-sidebar">
      <h3 className="section-title">Tracking Targets</h3>
      <div className="tab-group" role="tablist" aria-label="Counter Metrics">
        {state.profiles.map(profile => (
          <button
            key={profile.id}
            role="tab"
            aria-selected={profile.id === state.activeProfileId}
            className={`tab-btn ${profile.id === state.activeProfileId ? 'active' : ''}`}
            style={{ '--accent-color': profile.color }}
            onClick={() => dispatch({ type: 'SET_ACTIVE_PROFILE', payload: profile.id })}
          >
            <span className="profile-name">{profile.name}</span>
            <span className="profile-indicator">{profile.current}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleCreate} className="add-profile-form">
        <h4>Create Target</h4>
        <input 
          type="text" 
          placeholder="e.g., 📚 Reading Slots" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)}
          maxLength={25}
          required
        />
        <div className="form-meta">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <button type="submit" className="submit-btn">Create</button>
        </div>
      </form>
    </aside>
  );
}