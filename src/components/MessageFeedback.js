import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MessageFeedback extends React.Component {
  render() {
    const { numberCorrectQuestions } = this.props;
    const greatNumber = 3;
    let message = '';
    if (numberCorrectQuestions >= greatNumber) {
      message = 'Mandou bem!';
    } else {
      message = 'Podia ser melhor...';
    }
    return (
      <div data-testid="feedback-text">
        <p>{ message }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberCorrectQuestions: state.userReducer.numberCorrectQuestions,
});

MessageFeedback.propTypes = {
  numberCorrectQuestions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(MessageFeedback);
