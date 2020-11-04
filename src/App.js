import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
    </Switch>
  );
}
