import React, { Component } from 'react';
import { FeedbackHeader, PlayAgain, RankingButton, FeedbackMain } from '../components';
import './style_sheets/Feedback.scss';

class Feedback extends Component {
  render() {
    return (
      <div
        data-testid="feedback-text"
        className="feedback-page"
      >
        <FeedbackHeader />
        <div className="feedback-container">
          <FeedbackMain />
          <div className="feedback-button">
            <RankingButton />
            <PlayAgain />
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
