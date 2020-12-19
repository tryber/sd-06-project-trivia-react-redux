import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreFeedback extends React.Component {
  render() {
    const { userScore, userAssertions } = this.props;
    const three = 3;
    return (
      <section>
        <p data-testid="feedback-text">
          {userAssertions >= three ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          PONTOS:
          <span data-testid="feedback-total-score">{ userScore }</span>
        </p>
        <p>
          Acertos:
          <span data-testid="feedback-total-question">{ userAssertions }</span>
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userScore: state.scoreReducer.userScore.score,
  userAssertions: state.scoreReducer.userScore.assertions,
});

ScoreFeedback.propTypes = {
  userScore: PropTypes.string.isRequired,
  userAssertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ScoreFeedback);
