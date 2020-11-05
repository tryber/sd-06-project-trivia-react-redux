import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameHeader extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div>
        <h1>Game</h1>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail)}` }
            alt="gravatar"
          />
          <br />
          <h3 data-testid="header-player-name">{name}</h3>
          <br />
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
