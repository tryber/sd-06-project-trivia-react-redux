import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { count: { assertions } } = this.props;
    const lessThanThree = 'Podia ser melhor...';
    const moreThanThree = 'Mandou bem!';
    const three = 3;
    if (assertions < three) {
      return lessThanThree;
    }
    return moreThanThree;
  }

  render() {
    const { count: { score, assertions } } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackMessage()}</p>
        <p data-testid="feedback-total-score">{`Score: ${score}`}</p>
        <p data-testid="feedback-total-question">
          {`Quantidade de acertos: ${assertions}`}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Raking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.user.player,
});

Feedback.propTypes = {
  count: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
