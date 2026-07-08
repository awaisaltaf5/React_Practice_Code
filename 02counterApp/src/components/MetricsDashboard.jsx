import React from 'react';
import { useCounter } from '../context/CounterContext';

export default function MetricsDashboard() {
  const { state } = useCounter();
  const { xp, level, stats } = state;
  
  const nextLevelXp = level * 100;
  const progressRatio = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <section className="metrics-dashboard" aria-label="Gamification Panel">
      <div className="rpg-card">
        <div className="level-hexagon">
          <span className="lvl-lbl">LVL</span>
          <span className="lvl-num">{level}</span>
        </div>
        <div className="progress-track">
          <div className="progress-labels">
            <span>Experience Points</span>
            <span>{xp} / {nextLevelXp} XP</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${progressRatio}%` }}></div>
          </div>
        </div>
      </div>

      <div className="global-stats-grid">
        <div className="metric-tile">
          <span className="tile-title">Lifetime Inputs</span>
          <span className="tile-value">{stats.totalClicks}</span>
        </div>
        <div className="metric-tile">
          <span className="tile-title">Record Max</span>
          <span className="tile-value high-value">{stats.highestValue}</span>
        </div>
      </div>
    </section>
  );
}