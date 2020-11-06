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
        <Route path="/game-screen" component={ GameScreen } />
        <Route patch="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}

export default App;
