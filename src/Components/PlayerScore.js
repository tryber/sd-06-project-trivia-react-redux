import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PlayerScore extends Component {
  render() {
    const { correctAnswers, score } = this.props;
    return (
      <section>
        <p>
          Acertos:
          <span>{ correctAnswers }</span>
          de 5
        </p>
        <p>
          Score:
          <span>{ score }</span>
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
