import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Feedback from './Pages/Feedback';
import Settings from './Pages/Settings';
import Game from './Pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route path="/Settings" component={ Settings } />
    </Switch>
  );
}
