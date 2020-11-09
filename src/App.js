import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/ranking" component={ Ranking } />
      <Route path="/settings" component={ Settings } />
      <Route path="/gamepage" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
