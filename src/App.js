import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import './App.css';
import './styles/Game.css';
import './styles/Login.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
