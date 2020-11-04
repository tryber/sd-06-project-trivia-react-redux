import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Settings from './components/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
