import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { resetGame, addRanking } from '../actions';
import './Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { sendRanking, name, hash } = this.props;
    sendRanking(name, hash);
  }

  feedbackMessage() {
    const { assertions } = this.props;
    const MIN_ASSERTIONS = 3;

    if (assertions < MIN_ASSERTIONS) {
      return (
        <p data-testid="feedback-text"> Podia ser melhor...</p>
      );
    } if (assertions >= MIN_ASSERTIONS) {
      return (
        <p data-testid="feedback-text"> Mandou bem!</p>
      );
    }
  }

  render() {
    const { score, assertions, reset } = this.props;
    return (
      <div className="container-feedback">
        <Header />
        {this.feedbackMessage()}
        <div>
          <p>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
            <br />
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </p>
        </div>
        <div>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ reset }
            >
              VER RANKING
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ reset }
            >
            JOGAR NOVAMENTE
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
  score: state.game.score,
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
  sendRanking: (name, hash) => dispatch(addRanking(name, hash)),
});

Feedback.propTypes = {
  user: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
