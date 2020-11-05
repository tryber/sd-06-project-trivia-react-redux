import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
