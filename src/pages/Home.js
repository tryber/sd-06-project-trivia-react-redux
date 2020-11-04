import React from 'react';
import logo from './trivia.png';
import './App.css';
import { Link } from 'react-router-dom';

class Home extends React.Component{
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          <Link to='/login'>SUA VEZ</Link>
        </p>
      </header>
    </div>
    );
  }
}

export default Home;