import React, { Component } from 'react';
import Header from './components/Header';

class Feedback extends Component {
  render() {
    // constructor() {
    //   super();
    //   // this.feedbackMessage = this.feedbackMessage.bind(this)
    // }
    // feedbackMessage() {
    //   const correctAnswer = 2;
    //   const lessThanThree = "Podia ser melhor..."
    //   const moreThanThree = "Mandou bem!";
    //   const
    //   if(correctAnswer <= 3) {
    //     return lessThanThree;
    //   } else {
    //     moreThanThree
    //   }
    // }
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">msg</p>
        <p data-testid="feedback-total-score">msg</p>
        <p data-testid="feedback-total-question">msg</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;

// CRIE A MENSAGEM DE FEEDBACK PARA SER EXIBIDA A PESSOA USUÁRIA
// PRIORIDADE 1 - A tela de feedback deve exibir uma mensagem relacionada ao desempenho da pessoa que jogou

// Observações técnicas

// A mensagem deve ser "Podia ser melhor..." caso a pessoa acerte menos de 3 perguntas
// A mensagem deve ser "Mandou bem!" caso a pessoa acerte 3 perguntas ou mais
// O elemento da mensagem de feedback deve possuir o atributo data-testid com o valor feedback-text

// O que será avaliado

// Acertou menos de 3 perguntas

// Acertou 3 perguntas
// Acertou mais de 3 perguntas
