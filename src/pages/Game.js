import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../css/game.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
        <div className="divImage">
          <img src="https://i.imgur.com/Ud8xgso.gif" alt="pipoca" />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default Game;
