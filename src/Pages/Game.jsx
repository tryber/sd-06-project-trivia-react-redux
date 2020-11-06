import React from 'react';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

export default Game;
