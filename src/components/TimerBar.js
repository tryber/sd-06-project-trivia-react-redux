import React from 'react';
import { connect } from 'react-redux';
import { timerStart, timerReset } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    }

    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    const { stopTime, resetTime, startTime, startTimer } = this.props;
    const { seconds } = this.state;
    const interval = 1000;
    if (!stopTime, resetTime, !startTime ) {
      this.setState({
        seconds: 30
      })
      startTimer();
      this.myInterval = setInterval(() => {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }, interval);
    }
    if (seconds === 0 ) {
      this.setState({
        seconds: 30
      })
      startTimer();
      this.myInterval = setInterval(() => {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }, interval);
    }
  }

  // componentDidMount() {
  //   const { stopTime, resetTime, startTime } = this.props;
  //   const interval = 1000;

  //   this.myInterval = setInterval(() => {
  //     this.setState(({ seconds }) => ({
  //       seconds: seconds - 1,
  //     }));
  //   }, interval);
  // }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { stopTime, resetTime, startTime } = this.props;

    if (seconds === 0) {
      clearInterval(this.myInterval);
    };
    
    if (stopTime && !resetTime) {
      clearInterval(this.myInterval);
    }
  }

  render() {

    this.handleReset();

    const { seconds } = this.state;
    return(
      <div>
          <p className="timer">{seconds}</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(timerStart()),
  resetTimer: () => dispatch(timerReset()),
})

const mapStateToProps = (state) => ({
  resetTime: state.timer.resetTime,
  stopTime: state.timer.stopTime,
  startTime: state.timer.startTime,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
