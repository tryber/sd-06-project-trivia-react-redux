import React from 'react';
import FeedHeader from '../components/FeedHeader';
import GameContent from '../components/GameContent';

class Game extends React.Component {
  render() {
    return (
      <div>
        <FeedHeader />
        <GameContent />
      </div>
    );
  }
}

export default Game;
