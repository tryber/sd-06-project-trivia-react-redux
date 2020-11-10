import React from 'react';

class MessageFeedback extends React.Component {
  render() {
    const correctAnswers = JSON.parse(localStorage.getItem('state'));
    const { assertions } = correctAnswers.player;
    const greatNumber = 3;
    let message = '';
    if (assertions >= greatNumber) {
      message = 'Mandou bem!';
    } else {
      message = 'Podia ser melhor...';
    }
    return (
      <div data-testid="feedback-text">
        <p>{ message }</p>
      </div>
    );
  }
}

export default MessageFeedback;
