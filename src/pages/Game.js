import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import './Game.css';

class Game extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div className="game-page">
        <div className="game-container">
          <Header />
          <Questions history={ history } />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Game;
