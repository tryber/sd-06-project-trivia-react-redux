import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();

    this.setCountdown = this.setCountdown.bind(this);
    this.storeTimerInSate = this.storeTimerInSate.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);

    this.state = {
      countdown: 30,
      timerInterval: undefined,
    };
  }

  componentDidMount() {
    const timerInterval = setInterval(this.setCountdown, 1000);
    this.storeTimerInSate(timerInterval);
  }

  setCountdown() {
    const { countdown, timerInterval } = this.state;
    const { changeDisabled } = this.props;

    this.checkAnswer();

    if (countdown > 0) {
      return this.setState((previous) => ({
        ...previous,
        countdown: previous.countdown - 1,
      }));
    }

    clearInterval(timerInterval);
    this.setState({
      countdown: 0,
    });
    changeDisabled(true);
  }

  storeTimerInSate(timerInterval) {
    this.setState({ timerInterval });
  }

  checkAnswer() {
    const { timerInterval, countdown } = this.state;
    const { isCorrect, saveScore } = this.props;

    if (isCorrect) {
      clearInterval(timerInterval);
      saveScore(countdown);
    }
  }

  render() {
    const { countdown } = this.state;
    return (
      <div>
        <span>{ countdown }</span>
      </div>
    );
  }
}

Timer.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  saveScore: PropTypes.func.isRequired,
  changeDisabled: PropTypes.func.isRequired,
};

export default Timer;
