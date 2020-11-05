import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Login } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/game" render={ () => <Game /> } />
      </Switch>
    );
  }
}
export default App;
