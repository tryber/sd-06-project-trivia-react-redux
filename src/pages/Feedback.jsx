import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../components/Header';
import { resetGame, addRanking } from '../actions';
import FeedbackSound from '../audio/feedback.mp3';

class Feedback extends React.Component {
  componentDidMount() {
    const { ranking, name, hash } = this.props;
    ranking(name, hash);
  }

  feedScore() {
    const { assertions } = this.props;
    const MIN_QUESTIONS = 3;
    if (assertions < MIN_QUESTIONS) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    }
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  render() {
    const { assertions, score, reset } = this.props;
    return (
      <div className="content-wrap">
        <ReactAudioPlayer autoPlay src={ FeedbackSound } volume={ 0.5 } />
        <div>
          <Header />
        </div>
        <div>
          {this.feedScore()}
          <h3>
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
          </h3>
        </div>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ reset }
            className="bt_margin"
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
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
  assertions: state.game.assertions,
  name: state.user.name,
  hash: state.token.hash,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
  ranking: (name, hash) => dispatch(addRanking(name, hash)),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  ranking: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
