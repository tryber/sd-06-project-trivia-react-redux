import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import FeedBack from './pages/FeedBack';

export default function App() {
  return (
    <Switch>
      <Route path="game" component={ Game } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/" component={ Login } />

    </Switch>
  );
}
