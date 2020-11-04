import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
