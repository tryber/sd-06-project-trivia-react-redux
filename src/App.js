import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogar" component={ Jogo } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
