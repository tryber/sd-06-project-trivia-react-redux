import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { sumCorrectAnswers, score } = this.props;
    const threeHits = 3;
    return (
      <div className="feedback-main-container">
        {
          sumCorrectAnswers < threeHits
            ? <h1>
              <span
                data-testid="feedback-text"
                className="feedback-answer"
              >
                Podia ser melhor...
              </span>
            </h1>
            : <h1>
              <span
                data-testid="feedback-text"
                className="feedback-answer"
              >
                Mandou bem!
              </span>
            </h1>
        }
        <div className="feedback-score">
          <p className="feedback-text">
            Um total de
            <span
              data-testid="feedback-total-score"
              className="feedback-total"
            >
              { score }
            </span>
            pontos!
          </p>
          <p className="feedback-text">
            Você acertou
            <span
              data-testid="feedback-total-question"
              className="feedback-total"
            >
              { sumCorrectAnswers }
            </span>
            questões!
          </p>
        </div>
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
  score: state.player.player.score,
});

export default connect(mapStateToProps)(Feedback);
