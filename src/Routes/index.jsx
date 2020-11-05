import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Trivia from '../pages/Trivia';
import Settings from '../pages/Settings';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ SignIn } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
