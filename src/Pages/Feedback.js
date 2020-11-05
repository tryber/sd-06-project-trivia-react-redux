import React from 'react';
import FeedbackMsg from '../Components/FeedbackMsg';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <FeedbackMsg correctAnswers="3" />
      </section>
    );
  }
}

export default Feedback;
