import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import './Feedback.css';

// Componente que renderiza a página de feedback.
class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  // Função responsável por captar as assertions e avaliar: se for menor que 3 retorna
  // "Podia ser melhor", e se for maior ou igual que 3 retorna "Mandou bem!".
  feedbackMessage() {
    const { assertions } = this.props;
    const badPerformance = <p data-testid="feedback-text">Podia ser melhor...</p>;
    const goodPerformance = <p data-testid="feedback-text">Mandou bem!</p>;
    const expectHits = 3;
    if (assertions >= expectHits) {
      return goodPerformance;
    }
    return badPerformance;
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div className="feedback-container">
        <Header />
        {this.feedbackMessage()}
        <div>
          <p>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            de um total de 5 questões!
            <br />
            Vocês somou
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos!
          </p>
        </div>
        <div>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar Novamente!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score.score,
  assertions: state.assertions.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
