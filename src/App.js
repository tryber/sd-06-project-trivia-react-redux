import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';
import Feedback from './pages/Feedback';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/trivia" component={ Trivia } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}
