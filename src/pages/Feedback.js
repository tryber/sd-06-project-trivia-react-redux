import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const RESULT_NUMBER = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions >= RESULT_NUMBER ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
            Ver Ranking
        </button>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            localStorage.removeItem('questions');
            history.push('/');
            // window.location.reload(true);
          } }
        >
            Jogar novamente
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.state.player.assertions,
  score: state.state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
