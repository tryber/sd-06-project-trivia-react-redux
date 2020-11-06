import React from 'react';
import GameBody from '../components/GameBody';
import HeaderGame from '../components/HeaderGame';

class GameScreen extends React.Component {
  render() {
    return (
      <div>
        <GameBody />
        <HeaderGame />
      </div>
    );
  }
}

export default GameScreen;
