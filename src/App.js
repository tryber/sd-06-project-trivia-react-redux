import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Gamepage from './pages/Gamepage';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/gamepage" component={ Gamepage } />
      <Route exact path="/" component={ Login } />
    </div>
  );
}
