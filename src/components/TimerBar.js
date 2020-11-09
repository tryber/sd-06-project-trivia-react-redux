import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerStart, timerLost } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { stopTime, resetTime } = this.props;

    if (seconds === 0) {
      clearInterval(this.myInterval);
    }

    if (stopTime && !resetTime) {
      clearInterval(this.myInterval);
    }
  }

  handleReset() {
    const { stopTime, resetTime, startTime, startTimer } = this.props;
    const { seconds } = this.state;
    const interval = 1000;
    if (!stopTime && resetTime && !startTime && seconds !== 0) {
      this.setState({
        seconds: 30,
      });

      startTimer();

      this.myInterval = setInterval(() => {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }, interval);
    }
  }

  handleLoss() {
    const { stopTime, lostTime } = this.props;
    const { seconds } = this.state;
    const sreenTimer = <p className="timer">{seconds}</p>;

    if (!seconds && !stopTime) {
      lostTime();
      const timeOver = <p className="failed">Tempo Esgotado.</p>;
      return timeOver;
    }
    return sreenTimer;
  }

  render() {
    this.handleReset();

    return (
      <div>
        { this.handleLoss() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(timerStart()),
  lostTime: () => dispatch(timerLost()),
});

const mapStateToProps = (state) => ({
  resetTime: state.timer.resetTime,
  stopTime: state.timer.stopTime,
  startTime: state.timer.startTime,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  startTimer: PropTypes.func.isRequired,
  resetTime: PropTypes.bool.isRequired,
  stopTime: PropTypes.bool.isRequired,
  startTime: PropTypes.bool.isRequired,
  lostTime: PropTypes.bool.isRequired,
};
