import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLocalStore } from '../utils';

class GameHeader extends Component {
  componentDidMount() {
    const { name, gravatarEmail } = this.props;

    createLocalStore(name, 0, gravatarEmail);
  }

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
          <h3 data-testid="header-player-name">{ name }</h3>
          <br />
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.player.name,
  gravatarEmail: state.player.player.gravatarEmail,
  score: state.player.player.score,
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
