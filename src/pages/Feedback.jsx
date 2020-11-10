import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsStore } = this.props;
    const resultado = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertionsStore < resultado ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
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
});

export default connect(mapStateToProps)(Feedback);
