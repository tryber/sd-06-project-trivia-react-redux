import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
  }

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= three
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </p>
        <p>Pontuação: </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p> Perguntas acertadas: </p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">Ranking</button>
        </Link>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar Novamente</button>
        </Link>
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
};

export default Feedback;
