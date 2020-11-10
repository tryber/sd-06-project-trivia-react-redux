import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Configuracoes from './pages/Configuracoes';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/configuracoes" component={ Configuracoes } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
