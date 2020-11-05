import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/questions" component={ Questions } />
        <Route path="/config" component={ Settings } />
      </Switch>
    </div>
  );
}
