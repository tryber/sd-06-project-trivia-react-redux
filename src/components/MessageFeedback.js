import React from 'react';

class MessageFeedback extends React.Component {
  render() {
    const correctAnswers = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = correctAnswers.player;
    const greatNumber = 3;
    let message = '';
    let messageAssertions = '';
    if (assertions >= greatNumber) {
      message = 'Mandou bem!';
      messageAssertions = 'Não acertou nenhuma pergunta';
    } else {
      message = 'Podia ser melhor...';
      messageAssertions = `Acertou ${assertions} perguntas`;
    }
    return (
      <div>
        <h2 data-testid="feedback-text">{ message }</h2>
        <h4 data-testid="feedback-total-score">{ messageAssertions }</h4>
        <h4 data-testid="feedback-total-question">{ `Total ${score} pontos`}</h4>
      </div>
    );
  }
}

export default MessageFeedback;
