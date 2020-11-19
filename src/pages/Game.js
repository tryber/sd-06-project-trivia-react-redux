import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default Game;
