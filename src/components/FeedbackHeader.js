import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { MD5 } from 'crypto-js/md5';
import PropTypes from 'prop-types';

export class FeedbackHeader extends Component {
  render() {
    const { hash, name } = this.props;
    const score = 0;
    console.log(name);
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
  name: state.name,
  hash: state.hash,
  score: state.user.player.score,
});

FeedbackHeader.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackHeader);
