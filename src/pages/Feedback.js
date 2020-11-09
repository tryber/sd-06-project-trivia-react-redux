import React, { Component } from 'react';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}

export default Feedback;
