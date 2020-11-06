import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import '../Css/PlayerScore.css';

class PlayerScore extends Component {
  render() {
    const { correctAnswers, score } = this.props;
    return (
      <section className="results">
        <p>
          Acertos:
          <span className="correct-answers" data-testid="feedback-total-question">
            { correctAnswers }
          </span>
          de 5
        </p>
        <p>
          Score:
          <span className="score" data-testid="feedback-total-score">
            { score }
          </span>
        </p>
      </section>
    );
  }
}

PlayerScore.propTypes = {
  score: PropTypes.number,
  correctAnswers: PropTypes.number,
};

PlayerScore.defaultProps = {
  score: 0,
  correctAnswers: 0,
};

export default PlayerScore;
