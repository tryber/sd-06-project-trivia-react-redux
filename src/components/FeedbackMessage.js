import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMessage extends Component {
  choiceOfMessage() {
    // const { placar } = this.props;
    const placar = 3;
    const three = 3;
    if (placar < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    // const { acertos, placar } = this.props;
    return (
      <div>
        <h3 data-testid="feedback-total-score">Placar: </h3>
        <h3 data-testid="feedback-total-question">Você acertou: </h3>
        <h3 data-testid="feedback-text">
          { this.choiceOfMessage() }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  placar: state.user.placar,
  acertos: state.user.acertos,
});

// FeedbackMessage.propTypes = {
//   placar: propTypes.string.isRequired,
//   acertos: propTypes.string.isRequired,
// };

export default connect(mapStateToProps, null)(FeedbackMessage);
