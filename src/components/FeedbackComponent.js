import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { resetToPlayAgain } from '../redux/actions';

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
      );
    }
    if (correctAnswers === three) {
      return (
        <p data-testid="feedback-text">Mandou bem!</p>
      );
    }

    if (correctAnswers < three) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
  }

  render() {
    const { name, email, score, correctAnswers, playAgain } = this.props;

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
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{correctAnswers}</p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ playAgain }
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
        {this.handleFeedback()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(resetToPlayAgain()),
});

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  correctAnswers: state.game.correctAnswers,
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackComponent);

FeedbackComponent.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  playAgain: PropTypes.func.isRequired,
};
