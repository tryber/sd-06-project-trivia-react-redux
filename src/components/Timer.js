import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { timeFinished } from '../redux/actions';
import './Timer.css';

class Timer extends Component {
  constructor() {
    super();

    this.resetTimer = this.resetTimer.bind(this);

    this.state = {
      timer: 30,
      actualQuestion: 0,
    };
  }

  componentDidMount() {
    const SECONDS = 1000;
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })), SECONDS,
    );
  }

  componentDidUpdate() {
    const { outOfTime } = this.props;
    const { timer } = this.state;
    if (timer === 0) {
      outOfTime(timer);
    }

    this.resetTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  resetTimer() {
    const { questionNumber } = this.props;
    const { actualQuestion, timer } = this.state;

    if (timer === 0) {
      clearInterval(this.interval);
    }

    if (questionNumber !== actualQuestion) {
      this.setState({
        timer: 30,
        actualQuestion: questionNumber,
      });
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="back-color">
        <div className="time-running">
          <p className="counter">{timer}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  outOfTime: (state) => dispatch(timeFinished(state)),
});

Timer.propTypes = {
  outOfTime: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
