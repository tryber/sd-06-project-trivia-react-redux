import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import FeedBack from './pages/FeedBack';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route path="/" component={ Login } />

    </Switch>
  );
}
