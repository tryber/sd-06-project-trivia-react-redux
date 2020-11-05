import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route  path="/ranking" component={ Ranking } />
      <Route  path="/settings" component={ Settings } />
      <Route  path="/feedback" component={ Feedback } />
      <Route  path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
