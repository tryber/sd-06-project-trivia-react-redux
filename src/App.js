import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Login, Settings, Feedback, Ranking } from './pages';

function App() {
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

export default App;
