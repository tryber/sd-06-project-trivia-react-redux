import React, { Component } from 'react';
import './App.css';
import './visual_identity/general_styles/defaultPage.scss';
import { Route, Switch } from 'react-router-dom';

import { Login,
  Settings,
  Feedback,
  Game,
  NoMatch,
  Ranking } from './pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
        <Route component={ NoMatch } />
      </Switch>
    );
  }
}

export default App;
