import React from 'react';

class MessageFeedback extends React.Component {
  render() {
    const correctAnswers = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = correctAnswers.player;
    const greatNumber = 3;
    let message = '';
    if (assertions >= greatNumber) {
      message = 'Mandou bem!';
    } else {
      message = 'Podia ser melhor...';
    }
    return (
      <div>
        <h2 data-testid="feedback-text">{ message }</h2>
        <h4>
          Acertou <span data-testid="feedback-total-question">{ assertions }</span> pergunta(s)
        </h4>
        <h4>Total <span data-testid="feedback-total-score">{score}</span></h4>
      </div>
    );
  }
}

export default MessageFeedback;
