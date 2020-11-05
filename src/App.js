import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Login, Settings } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}

export default App;
