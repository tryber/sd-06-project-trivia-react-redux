import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptoJs from 'crypto-js';
import PropTypes from 'prop-types';

class FeedbackHeader extends Component {
  render() {
    const { name, email } = this.props;
    const hash = CryptoJs.MD5(email).toString();
    const score = 0;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name" name="">{name}</span>
        <span data-testid="header-score" name="">{score}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  // score: state.user.player.score,
});

FeedbackHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackHeader);
