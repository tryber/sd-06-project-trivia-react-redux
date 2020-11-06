import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Trivia from '../pages/Trivia';
import Settings from '../pages/Settings';
import Results from '../pages/Results';
import Ranking from '../pages/Ranking';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ SignIn } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/settings" component={ Settings } />
      <Route path="/results" component={ Results } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
