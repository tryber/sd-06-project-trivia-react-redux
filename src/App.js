import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from './pages/';

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
      </Switch>
    );
  }
}
export default App;
