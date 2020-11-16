import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ScreenConfig from './components/ScreenConfig';
import ScreenGame from './components/ScreenGame';
import Header from './components/Header';

export default function App() {
  return (
    <Switch>
      <Route path="/config" component={ ScreenConfig } />
      <Route path="/feedback" component={ Header } />
      <Route path="/game" component={ ScreenGame } />
      <Route path="/" component={ Login } />
    </Switch>
    // <div className="App">
    //   <Login />
    //   <header className="App-header">
    //     <img src={ logo } className="App-logo" alt="logo" />
    //     <p>
    //       SUA VEZ
    //     </p>
    //   </header>
    // </div>
  );
}
