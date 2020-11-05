import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GameScreen from './pages/GameScreen';
import Settings from './pages/Settings';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact patch="/settings" component={ Settings } />
        <Route exact path="/game-screen" component={ GameScreen } />
      </Switch>
    </div>
  );
}

export default App;
