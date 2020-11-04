import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/';


class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Home /> } />
      </Switch>
    );
  }
}

export default App;
