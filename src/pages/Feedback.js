import React, { Component } from 'react';
import FeedbackMessage from '../components/FeedbackMessage';
import ButtonPlayAgain from '../components/ButtonPlayAgain';
import RankingButton from '../components/RankingButton';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackMessage />
        <ButtonPlayAgain />
        <RankingButton />
      </div>
    );
  }
}

export default FeedBack;
