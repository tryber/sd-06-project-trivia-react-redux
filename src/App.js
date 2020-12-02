import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Game, Login, Feedback, Ranking } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <div className="game-master-container">
          <Route exact path="/game" render={ () => <Game /> } />
          <Route exact path="/feedback" render={ () => <Feedback /> } />
          <Route exact path="/ranking" render={ () => <Ranking /> } />
        </div>
      </Switch>
    );
  }
}
export default App;
