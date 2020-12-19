import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import GameScreen from './components/GameScreen';
import Feedback from './components/Feedback';
import './App.css';
import Settings from './components/Settings';
import Ranking from './components/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ GameScreen } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
