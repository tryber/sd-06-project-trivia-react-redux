import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class FeedbackComponent extends React.Component {
  constructor() {
    super();

    this.handleFeedback = this.handleFeedback.bind(this);
  }

  handleFeedback() {
    const { correctAnswers } = this.props;
    const three = 3;
    if (correctAnswers > three) {
      return (
        <p data-testid="feedback-text">Mandou bem!</p>
      )
    } else if (correctAnswers === three) {
      return (
        <p data-testid="feedback-text">Mandou bem!</p>
      )
    } else if (correctAnswers < three) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      )
    }
  }

  render() {
    const { name, email, score } = this.props;

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
        <button
          data-testid="btn-play"
          type="button"
        >
          Play
        </button>
        {this.handleFeedback()}
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

export default connect(mapStateToProps)(FeedbackComponent);

FeedbackComponent.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
