import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Feedback.css';

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
      <h1 className="h1">
        Mandou bem!
      </h1>
    );
  }

  bgMessage() {
    return (
      <h1 className="h1">
        Podia ser melhor...
      </h1>
    );
  }

  gameFeedback(answers, score) {
    return (
      <section className="section">
        <p>
          <span>Você acertou </span>
          <span data-testid="feedback-total-question">{ answers }</span>
          <span> questões!</span>
        </p>
        <p>
          <span>Um total de </span>
          <span data-testid="feedback-total-score">{ score }</span>
          <span> pontos</span>
        </p>
      </section>
    );
  }

  render() {
    const { assertions, score } = this.state;
    const numberOfAnswers = 3;
    return (
      <div className="feedback-container">
        <main className="section">
          <Header />
          <h2 data-testid="feedback-text">
            {(assertions >= numberOfAnswers) ? this.ggMessage() : this.bgMessage()}
          </h2>
          {this.gameFeedback(assertions, score)}
          <div>
            <Link
              className="link"
              to="/ranking"
              data-testid="btn-ranking"
            >
              VER RANKING
            </Link>
          </div>
          <div>
            <Link
              className="link"
              to="/"
              data-testid="btn-play-again"
            >
            JOGAR NOVAMENTE
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

export default Feedback;
