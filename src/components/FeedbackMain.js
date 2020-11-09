import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { sumCorrectAnswers, score } = this.props;
    const threeHits = 3;
    return (
      <div>
        {
          sumCorrectAnswers < threeHits
            ? <h1><span data-testid="feedback-text">Podia ser melhor...</span></h1>
            : <h1><span data-testid="feedback-text">Mandou bem!</span></h1>
        }
        <p>
          Um total de
          <span data-testid="feedback-total-score">{score}</span>
          pontos!
        </p>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">{sumCorrectAnswers}</span>
          questões!
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  sumCorrectAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  sumCorrectAnswers: state.player.player.correctAnswers,
});

export default connect(mapStateToProps)(Feedback);
