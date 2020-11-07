import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    const state = JSON.parse(localStorage.getItem('state'));
    this.state = {
      // name: state.player.name,
      assertions: state.player.assertions,
      score: state.player.score,
    };
  }

  ggMessage() {
    return (
      <h1>
        Mandou bem!
      </h1>
    );
  }

  bgMessage() {
    return (
      <h1>
        Podia ser melhor...
      </h1>
    );
  }

  gameFeedback(answers, score) {
    return (
      <section>
        <p data-testid="feedback-total-question">
          {`Você acertou ${answers} questões!`}
        </p>
        <p data-testid="feedback-total-score">
          {`Um total de ${score} pontos`}
        </p>
      </section>
    );
  }

  render() {
    const { assertions, score } = this.state;
    const numberOfAnswers = 3;
    return (
      <main>
        <Header />
        <header data-testid="feedback-text">
          {(assertions >= numberOfAnswers) ? this.ggMessage() : this.bgMessage()}
        </header>
        {this.gameFeedback(assertions, score)}
        <Link to="/ranking" data-testid="btn-ranking">VER RANKING</Link>
        <Link to="/" data-testid="btn-play-again">JOGAR NOVAMENTE</Link>
      </main>
    );
  }
}

export default Feedback;
