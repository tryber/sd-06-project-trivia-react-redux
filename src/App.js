import React from 'react';
import Login from './pages/Login';
import Settings from './pages/Settings';
import logo from './trivia.png';
import './App.css';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
        </Switch>
        
      </header>
    </div>
  );
}
