import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import '../Css/FeedbackMsg.css';

class FeedbackMsg extends Component {
  render() {
    const { correctAnswers } = this.props;
    const minimum = 3;
    const feedbackElement = (correctAnswers < minimum)
      ? (
        <div className="Feedback-Msg orange-bg">
          <p data-testid="feedback-text">
            Podia ser melhor...
          </p>
          <span className="feeback-emoji" role="img" aria-label="emoji with tongue out">
            &#128539;
          </span>
        </div>
      )
      : (
        <div className="Feedback-Msg green-bg">
          <p data-testid="feedback-text">
            Mandou bem!
          </p>
          <span className="feeback-emoji" role="img" aria-label="emoji with sunglasses">
              &#128526;
          </span>
        </div>
      );

    return feedbackElement;
  }
}

FeedbackMsg.propTypes = {
  correctAnswers: PropTypes.number,
};

FeedbackMsg.defaultProps = {
  correctAnswers: 0,
};

export default FeedbackMsg;
