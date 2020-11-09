import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackHeader extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail)}` }
          alt="Avatar user from gravatar"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          { score }
        </span>
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
