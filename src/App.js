import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </div>
    );
  }
}

export default App;
