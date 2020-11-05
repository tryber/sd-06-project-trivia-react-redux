import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </BrowserRouter>
  );
}
