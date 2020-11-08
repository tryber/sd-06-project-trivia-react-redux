import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Login, Feedback } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/feedback" render={ () => <Feedback /> } />
        <div className="game-master-container">
          <Route exact path="/game" render={ () => <Game /> } />
        </div>
      </Switch>
    );
  }
}
export default App;
