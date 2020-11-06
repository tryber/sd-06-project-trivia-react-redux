import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Questions from './components/Questions';
import Settings from './pages/Settings';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Header para testes, deve ser retirado do App */}
        <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route exact path="/questions" component={ Questions } />
        </Switch>
      </div>
    );
  }
}

export default App;
