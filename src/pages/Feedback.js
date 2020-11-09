import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    const state = JSON.parse(localStorage.getItem('state'));
    this.state = {
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
        <p>
          Você acertou
          <span data-testid="feedback-total-question">{ answers }</span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">{ score }</span>
          pontos
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
        <h2 data-testid="feedback-text">
          {(assertions >= numberOfAnswers) ? this.ggMessage() : this.bgMessage()}
        </h2>
        {this.gameFeedback(assertions, score)}
        <div>
          <Link to="/ranking" data-testid="btn-ranking">VER RANKING</Link>
        </div>
        <div>
          <Link to="/" data-testid="btn-play-again">JOGAR NOVAMENTE</Link>
        </div>
      </main>
    );
  }
}

export default Feedback;
