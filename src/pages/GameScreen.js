import React from 'react';
import GameBody from '../components/GameBody';
import HeaderGame from '../components/HeaderGame';

class GameScreen extends React.Component {
  render() {
    return (
      <div>
        <HeaderGame />
        <GameBody />
      </div>
    );
  }
}

export default GameScreen;
