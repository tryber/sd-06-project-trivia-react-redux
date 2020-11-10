import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetPlayerInfo, resetRequestInfo } from '../actions';

class Feedback extends Component {
  constructor() {
    super();

    this.resetScore = this.resetScore.bind(this);
  }

  resetScore() {
    const { resetPlayerStore, resetRequestStore } = this.props;
    resetPlayerStore();
    resetRequestStore();
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
  resetPlayerStore: PropTypes.func.isRequired,
  resetRequestStore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  ranking: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerStore: () => dispatch(resetPlayerInfo()),
  resetRequestStore: () => dispatch(resetRequestInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
