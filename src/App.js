import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import FeedBack from './pages/FeedBack';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/settings" component={ Settings } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/game" component={ Game } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
