import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsStore, scoreStore } = this.props;
    const resultado = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertionsStore < resultado ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
        <p data-testid="feedback-total-score">{ scoreStore }</p>
        <p data-testid="feedback-total-question">{ assertionsStore }</p>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsStore: state.user.assertions,
  scoreStore: state.user.score,
});

export default connect(mapStateToProps)(Feedback);
