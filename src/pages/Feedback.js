import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { saveGameScore, saveNameEmail, saveRanking } from '../actions';

class Feedback extends Component {
  constructor() {
    super();

    this.resetScore = this.resetScore.bind(this);
  }

  componentDidMount() {
    const { name, score, hash, saveRankingtoStore } = this.props;
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const ranking = {
      name,
      picture,
      score,
    };
    saveRankingtoStore(ranking);
    localStorage.setItem('ranking', JSON.stringify({ ranking }));
  }

  resetScore() {
    const { resetNameEmail, resetGameScore } = this.props;
    resetNameEmail('', '');
    resetGameScore(0, 0);
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
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.resetScore }
          >
          Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  saveRankingtoStore: PropTypes.func.isRequired,
  resetNameEmail: PropTypes.func.isRequired,
  resetGameScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  ranking: state.ranking,
  hash: state.requestInfo.hash,
});

const mapDispatchToProps = (dispatch) => ({
  saveRankingtoStore: (playerAtual) => dispatch(saveRanking(playerAtual)),
  resetNameEmail: (name, email) => dispatch(saveNameEmail(name, email)),
  resetGameScore: (score, assertions) => dispatch(saveGameScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
