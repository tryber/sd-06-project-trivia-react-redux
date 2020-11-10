import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" render={ (props) => <Game { ...props } /> } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />

        </Switch>
      </div>
    );
  }
}

export default App;
