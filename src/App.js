import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/gamepage" component={ Game } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
