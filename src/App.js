import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ScreenConfig from './components/ScreenConfig';
import ScreenGame from './components/ScreenGame';
import FeedbackHeader from './components/FeedbackHeader';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/config" component={ ScreenConfig } />
        <Route path="/feedback" component={ FeedbackHeader } />
        <Route path="/game" component={ ScreenGame } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
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
