import React, { Component } from 'react';

import BodyGame from '../components/BodyGame';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <BodyGame />
      </div>
    );
  }
}

export default Game;
