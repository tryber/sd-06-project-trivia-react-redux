import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };

    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    const { time } = this.state;
    const { timeUp, activateQuestions } = this.props;
    const TIMEISUP = 30000;
    const INTERVAL = 1000;
    const TIMER = Math.floor(Date.now() / INTERVAL) + time;
    activateQuestions();
    setTimeout(() => timeUp(), TIMEISUP);
    // this.setState({ time });
    this.timer = setInterval(() => this.setState({
      time: Math.floor(Date.now() / INTERVAL) - TIMER < 0
        ? TIMER - Math.floor(Date.now() / INTERVAL)
        : 0,
    }), INTERVAL);
  }

  render() {
    const { time } = this.state;
    const START = time === 0 || null;

    return (
      <div>
        <h3>
          timer:
          { time }
        </h3>
        <button
          type="button"
          onClick={ this.startTimer }
          disabled={ START }
        >
          start
        </button>
      </div>
    );
  }
}

Timer.propTypes = {
  timeUp: PropTypes.func.isRequired,
  activateQuestions: PropTypes.func.isRequired,
};
