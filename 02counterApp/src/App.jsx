import React from 'react';
import { CounterProvider } from './context/CounterContext';
import ProfileSidebar from './components/ProfileSidebar';
import MetricsDashboard from './components/MetricsDashboard';
import MainControlHub from './components/MainControlHub';
import './index.css';

function App() {
  return (
    <CounterProvider>
      <div className="app-shell">
        <ProfileSidebar />
        <div className="content-workspace">
          <MetricsDashboard />
          <MainControlHub />
        </div>
      </div>
    </CounterProvider>
  );
}

export default App;