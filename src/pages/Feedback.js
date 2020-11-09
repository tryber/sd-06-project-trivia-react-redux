import React, { Component } from 'react';
import { FeedbackHeader, PlayAgain, RankingButton } from '../components';

class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <FeedbackHeader />
        <RankingButton />
        <PlayAgain />
      </div>
    );
  }
}

export default Feedback;
