import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Game, Settings, Feedback, Ranking } from './pages';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
