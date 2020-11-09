import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();

    this.renderAssertionsText = this.renderAssertionsText.bind(this);
  }

  renderAssertionsText(assertions) {
    if (assertions > 1) {
      return (
        <h1 data-testid="feedback-total-question">
          { `Acertou ${assertions} perguntas` }
        </h1>
      );
    }

    if (assertions === 1) {
      return (
        <h1 data-testid="feedback-total-question">
          { `Acertou ${assertions} pergunta` }
        </h1>
      );
    }

    return (
      <h1 data-testid="feedback-total-question">
        Não acertou nenhuma pergunta
      </h1>
    );
  }

  render() {
    const { renderAssertionsText } = this;
    const { score, assertions } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <h1 data-testid="feedback-total-score">{ `Placar final: ${score}` }</h1>
        { renderAssertionsText(assertions) }
        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
  assertions: state.game.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(Feedback);
