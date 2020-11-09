import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FeedbackMenssage extends Component {
  constructor() {
    super();
    this.menssageAssertions = this.menssageAssertions.bind(this);
  }

  menssageAssertions() {
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
       FEEDBACK
        <div data-testid="feedback-text">
          {this.menssageAssertions()}
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
          <Link to="/ranking"> VER RANKING </Link>
          <button type="button">  JOGAR NOVAMENTE </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

FeedbackMenssage.propTypes = {
  user: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(FeedbackMenssage);
