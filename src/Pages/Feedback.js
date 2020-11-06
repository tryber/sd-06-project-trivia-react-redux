import React from 'react';
import ButtonPlayAgain from '../Components/ButtonPlayAgain';
import FeedbackMsg from '../Components/FeedbackMsg';
import Header from '../Components/Header';

import '../Css/Feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <section className="feedback-wrapper">
          <FeedbackMsg correctAnswers="3" />
          <ButtonPlayAgain classProps="green" />
        </section>
      </section>
    );
  }
}

export default Feedback;
