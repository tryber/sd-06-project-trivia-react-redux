import React from 'react';
import Question from '../Components/Question';
import Header from '../Components/Header';

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
