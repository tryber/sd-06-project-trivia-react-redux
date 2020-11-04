import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
