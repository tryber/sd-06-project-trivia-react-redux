import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { saveRanking } from '../actions';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, hash, saveRankingtoStore } = this.props;
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const playerAtual = {
      name,
      picture,
      score,
    };
    saveRankingtoStore(playerAtual);
    const { ranking } = this.props;
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  reset() {
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
            onClick={ this.reset() }
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
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveRankingtoStore: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
