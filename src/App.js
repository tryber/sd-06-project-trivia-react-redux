import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Feedback, Game, Login, Ranking, Settings } from './pages';

export default function App() {
  return (
    <Switch>
      <Route path="/ranking" component={ Ranking } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
