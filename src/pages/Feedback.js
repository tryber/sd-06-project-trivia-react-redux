import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = state.player;
    // const { assertions } = this.props;

    const feedbackMessage = () => (assertions > 2
      ? 'Mandou bem!' : 'Podia ser melhor...');

    return (
      <>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <Header />
        <h1 data-testid="feedback-text">
          {feedbackMessage()}
        </h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.userReducer.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
