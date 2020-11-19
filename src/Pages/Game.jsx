import React from 'react';
import Question from '../Components/Question';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Question history={ history } />
      </div>
    );
  }
}

export default Game;
