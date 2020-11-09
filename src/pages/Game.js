import React from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import './Game.css';

class Game extends React.Component {
  render() {
    return (
      <div className="game-page">
        <div className="game-container">
          <Header />
          <Questions />
        </div>
      </div>
    );
  }
}

export default Game;
