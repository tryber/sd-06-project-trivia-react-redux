import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import triviaLogo from '../visual_identity/logo/trivia_logo_noBg2.png';

class FeedbackHeader extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header>
        <img
          src={ triviaLogo }
          width="80px"
          alt="Trivia Logo"
        />
        <div
          data-testid="header-player-name"
          className="player-stats-container"
        >
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail)}` }
            alt="Avatar user from gravatar"
            width="40px"
          />
          <div className="player-stats">
            <h3>{ name }</h3>
            <p
              data-testid="header-score"
              className="player-stats"
            >
              { score }
            </p>
          </div>
        </div>
      </header>
    );
  }
}

FeedbackHeader.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.player.gravatarImage,
  name: state.player.player.name,
  score: state.player.player.score,
});

export default connect(mapStateToProps)(FeedbackHeader);
