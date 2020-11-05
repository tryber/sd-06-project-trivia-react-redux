import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackHeader extends Component {
  render() {
    const { image, name, score } = this.props;
    return (
      <header>
        <span
          data-testid="header-profile-picture"
        >
          { image }
        </span>
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
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.player.gravatarImage,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedbackHeader);
