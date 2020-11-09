import React from 'react';
import ButtonPlayAgain from '../Components/ButtonPlayAgain';
import FeedbackMsg from '../Components/FeedbackMsg';
import PlayerResults from '../Components/PlayerScore';
import Header from '../Components/Header';

import '../Css/Feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <section className="feedback-wrapper">
          <FeedbackMsg correctAnswers="3" />
          <PlayerResults />
          <ButtonPlayAgain classProps="green" />
        </section>
      </section>
    );
  }
}

export default Feedback;
