import React from 'react';
import GameBody from '../components/GameBody';
import HeaderGame from '../components/HeaderGame';

class GameScreen extends React.Component {
  componentDidMount() {
    const playerData = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(playerData));
  }

  render() {
    return (
      <div>
        <HeaderGame />
        <GameBody { ...this.props } />
      </div>
    );
  }
}
export default GameScreen;
