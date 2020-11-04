import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            <Link to="/login">SUA VEZ</Link>
          </p>
        </header>
      </div>
    );
  }
}

export default Home;
