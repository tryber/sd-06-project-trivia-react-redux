import React, { Component } from 'react';
import { FeedbackHeader, PlayAgain } from '../components';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <PlayAgain />
      </div>
    );
  }
}

export default Feedback;
