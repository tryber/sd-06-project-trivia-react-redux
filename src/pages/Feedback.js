import React, { Component } from 'react';
import { FeedbackHeader, FeedbackMain } from '../components';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMain />
        Feedback
      </div>
    );
  }
}

export default Feedback;
