import React, { Component } from 'react';
import propTypes from 'prop-types';
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
    return (
      <div>
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
});

// FeedbackMessage.propTypes = {
//   placar: propTypes.string.isRequired,
// };

export default connect(mapStateToProps, null)(FeedbackMessage);
