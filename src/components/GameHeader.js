import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Questions from './Questions';

class GameHeader extends React.Component {
  constructor() {
    super();

    this.sendToLocalStorage = this.sendToLocalStorage.bind(this);
  }

  sendToLocalStorage() {
    const { name, email, score, correctAnswers } = this.props;
    const player = { player: {
      name,
      assertions: correctAnswers,
      score,
      gravatarEmail: email,
    } };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { name, email, score } = this.props;

    this.sendToLocalStorage();

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          // gravatar
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="gravatar-profile-pic"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <p data-testid="header-score">{score}</p>
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  correctAnswers: state.game.correctAnswers,
});

export default connect(mapStateToProps)(GameHeader);

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
};
