import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLocalStore } from '../utils';
import triviaLogo from '../visual_identity/logo/trivia_logo_noBg2.png';

class GameHeader extends Component {
  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;

    createLocalStore(name, score, gravatarEmail);
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <img src={ triviaLogo } width="80px" alt="Trivia Logo" />

        <div className="player-stats-container">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail)}` }
            alt="gravatar"
            width="40px"
          />
          <div className="player-stats">
            <h3 data-testid="header-player-name">{ name }</h3>
            <p data-testid="header-score">{ `Score: ${score}` }</p>
          </div>
        </div>
      </header>
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
