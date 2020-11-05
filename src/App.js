import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </BrowserRouter>
  );
}
