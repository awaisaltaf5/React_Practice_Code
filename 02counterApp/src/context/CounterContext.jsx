import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CounterContext = createContext();

const STORAGE_KEY = 'NEXT_LVL_COUNTER_DATA';

const INITIAL_STATE = {
  profiles: [
    { id: 'work', name: '💻 Deep Work Hours', current: 0, color: '#3b82f6' },
    { id: 'water', name: '💧 Water Intake (L)', current: 0, color: '#0ea5e9' },
    { id: 'gym', name: '🏋️ Workout Sets', current: 0, color: '#10b981' }
  ],
  activeProfileId: 'work',
  xp: 0,
  level: 1,
  stats: { totalClicks: 0, highestValue: 0 }
};

// Defensive Reducer guarding data mutation rules securely
function counterReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_COUNTER': {
      const { profileId, amount } = action.payload;
      
      // Prevent unexpected non-numeric manipulations
      if (typeof amount !== 'number' || isNaN(amount)) return state;

      const updatedProfiles = state.profiles.map(profile => {
        if (profile.id === profileId) {
          const targetValue = profile.current + amount;
          // Guardrail: Restrict values to realistic software thresholds
          const clampedValue = Math.max(-9999, Math.min(9999, targetValue));
          return { ...profile, current: clampedValue };
        }
        return profile;
      });

      const activeProfile = updatedProfiles.find(p => p.id === state.activeProfileId);
      const newHighest = Math.max(state.stats.highestValue, activeProfile ? activeProfile.current : 0);
      
      // Calculate XP progression securely
      let newXp = state.xp + 15;
      let newLevel = state.level;
      let xpNeeded = newLevel * 100;

      if (newXp >= xpNeeded) {
        newXp -= xpNeeded;
        newLevel += 1;
      }

      return {
        ...state,
        profiles: updatedProfiles,
        xp: newXp,
        level: newLevel,
        stats: {
          totalClicks: state.stats.totalClicks + 1,
          highestValue: newHighest
        }
      };
    }

    case 'SET_ACTIVE_PROFILE':
      return { ...state, activeProfileId: action.payload };

    case 'RESET_ACTIVE':
      return {
        ...state,
        profiles: state.profiles.map(p => p.id === state.activeProfileId ? { ...p, current: 0 } : p)
      };

    case 'ADD_CUSTOM_PROFILE': {
      const { name, color } = action.payload;
      if (!name.trim()) return state;
      const newId = `custom_${Date.now()}`;
      return {
        ...state,
        profiles: [...state.profiles, { id: newId, name: name.trim(), current: 0, color: color || '#8b5cf6' }],
        activeProfileId: newId
      };
    }

    default:
      return state;
  }
}

export function CounterProvider({ children }) {
  // Load securely from storage with fallback validation
  const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE, (initial) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Schema Validation validation check
        if (Array.isArray(parsed.profiles) && typeof parsed.level === 'number') {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Storage corrupted. Resetting data context cleanly.", e);
    }
    return initial;
  });

  // Automatically persist changes reliably whenever state updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export const useCounter = () => useContext(CounterContext);