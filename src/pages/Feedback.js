import React, { Component } from 'react';
import FeedbackMessage from '../components/FeedbackMessage';
import ButtonPlayAgain from '../components/ButtonPlayAgain';
import RankingButton from '../components/RankingButton';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <FeedbackMessage />
        <ButtonPlayAgain />
        <RankingButton />
      </div>
    );
  }
}

export default FeedBack;
