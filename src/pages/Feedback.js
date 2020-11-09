import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';

class Feedback extends React.Component {
  feedbackScore() {
    const { hits } = this.props;
    const hitsMin = 3;
    if (hits < hitsMin) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    }
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  render() {
    const { hits, score } = this.props;
    return (
      <div>
        <div>
          <HeaderGame />
        </div>
        <div>
          {this.feedbackScore()}
          <h3>
            Voce acertou
            <span data-testid="feedback-total-question">{hits}</span>
            questoes
            <br />
            Pontuacao:
            <span data-testid="feedback-total-score">{score}</span>
          </h3>
        </div>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">VER RANKING</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.pointsReducer.score,
  hits: state.pointsReducer.hits,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  hits: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
