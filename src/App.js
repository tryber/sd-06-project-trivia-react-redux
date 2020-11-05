import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Game from './pages/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/game" component={ Game } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
