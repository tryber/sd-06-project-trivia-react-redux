import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header } from '../components';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { user } = this.props;
    const { assertions } = user;

    const numberLimit = 3;

    if (assertions < numberLimit) {
      return (
        <div>
          <p> Podia ser melhor...</p>
        </div>
      );
    } if (assertions >= numberLimit) {
      return (
        <div>
          <p> Mandou bem!</p>
        </div>
      );
    }
  }

  render() {
    const { user } = this.props;
    const { score, assertions } = user;

    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          {this.feedbackMessage()}
        </div>
        <div>
          <p data-testid="feedback-total-question">
          Você acertou
            {assertions}
          questões!
          </p>
          <p data-testid="feedback-total-score">
            Um total de
            {score}
            pontos.
          </p>
        </div>
        <div>
          <button type="button" data-test-id="btn-ranking">
            <Link to="/ranking">Ver Ranking</Link>
          </button>
          <button type="button"><Link to="/game">JOGAR NOVAMENTE</Link></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Feedback.propTypes = {
  user: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
