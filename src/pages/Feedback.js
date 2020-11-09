import React, { Component } from 'react';
import { FeedbackHeader, PlayAgain, RankingButton, FeedbackMain } from '../components';

class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <FeedbackHeader />
        <FeedbackMain />
        <RankingButton />
        <PlayAgain />
      </div>
    );
  }
}

export default Feedback;
