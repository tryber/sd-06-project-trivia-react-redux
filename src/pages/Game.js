import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
// import NextButton from '../components/NextButton';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        {/* <NextButton /> */}
      </div>
    );
  }
}

export default Game;
