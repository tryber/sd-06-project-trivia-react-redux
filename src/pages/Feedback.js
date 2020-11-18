import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';

function Feedback(props) {
  const feedback = {
    ltThree: 'Podia ser melhor...',
    geThree: 'Mandou bem!',
  };
  const { score, assertions } = props;
  const threeCorrectAnswers = 3;
  return (
    <div>
      <Header />
      <div>
        <p data-testid="feedback-text">
          { assertions >= threeCorrectAnswers ? feedback.geThree : feedback.ltThree }
        </p>
        <h2>
          Pontuação total:
          <span data-testid="feedback-total-score">{score}</span>
        </h2>
        <h2>
          Total de acertos:
          <span data-testid="feedback-total-question">{assertions}</span>
        </h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
