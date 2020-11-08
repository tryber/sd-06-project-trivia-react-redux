import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {
    const { disableAnswerButtons, handleAnswerBorderColor } = this.props;
    const mil = 1000;
    this.timer = setInterval(() => {
      const { counter, handleCounter } = this.props;
      if (counter > 0) {
        handleCounter();
      } else {
        disableAnswerButtons();
        handleAnswerBorderColor();
        clearInterval(this.timer);
      }
    }, mil);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { counter } = this.props;
    return (
      <h2>
        tempo:
        {' '}
        {counter}
      </h2>
    );
  }
}

Timer.propTypes = {
  disableAnswerButtons: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  handleCounter: PropTypes.func.isRequired,
  handleAnswerBorderColor: PropTypes.func.isRequired,
};

export default Timer;
