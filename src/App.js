import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
<<<<<<< HEAD
import FeedBack from './pages/FeedBack';
=======
import Settings from './pages/Settings';
>>>>>>> 415026f14624036afb56ef00be62dd71e596dc9f

export default function App() {
  return (
    <Switch>
<<<<<<< HEAD
      <Route path="game" component={ Game } />
      <Route path="/feedback" component={ FeedBack } />
=======
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
>>>>>>> 415026f14624036afb56ef00be62dd71e596dc9f
      <Route path="/" component={ Login } />

    </Switch>
  );
}
