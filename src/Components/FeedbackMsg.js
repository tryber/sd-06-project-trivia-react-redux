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
            <span className="feeback-emoji" role="img" aria-label="emoji with tongue out">
              &#128539;
            </span>
          </p>
        </div>
      )
      : (
        <div className="Feedback-Msg green-bg">
          <p>
            Mandou bem!
            <span className="feeback-emoji" role="img" aria-label="emoji with sunglasses">
              &#128526;
            </span>
          </p>
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
