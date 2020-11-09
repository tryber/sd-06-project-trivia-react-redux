import React from 'react';
import { connect } from 'react-redux';
import { timerStart, timerReset, timerLost } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    }

    this.handleReset = this.handleReset.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
  }

  handleReset() {
    const { stopTime, resetTime, startTime, startTimer } = this.props;
    const { seconds } = this.state;
    const interval = 1000;
    if (!stopTime && resetTime && !startTime && seconds !== 0) {
      this.setState({
        seconds: 30
      });

      startTimer();

      this.myInterval = setInterval(() => {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }, interval);
    }
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { stopTime, resetTime } = this.props;

    if (seconds === 0) {
      clearInterval(this.myInterval);
    };
    
    if (stopTime && !resetTime) {
      clearInterval(this.myInterval);
    }
  }

  handleLoss() {
    const { stopTime, lostTime } = this.props;
    const { seconds } = this.state;

    if (!seconds && !stopTime) {
      lostTime();
      const timeOver = <p className="failed">Tempo Esgotado.</p>;
      return timeOver;
    } else {
      const sreenTimer = <p className="timer">{seconds}</p>;
      return sreenTimer;
    }
  }

  render() {

    this.handleReset();

    return(
      <div>
        { this.handleLoss() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(timerStart()),
  resetTimer: () => dispatch(timerReset()),
  lostTime: () => dispatch(timerLost()),
});

const mapStateToProps = (state) => ({
  resetTime: state.timer.resetTime,
  stopTime: state.timer.stopTime,
  startTime: state.timer.startTime,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
