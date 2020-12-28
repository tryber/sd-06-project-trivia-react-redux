import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTimerAction } from '../actions';
import './Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { stop, seconds } = this.props;
    if (stop || seconds === 0) this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer() {
    const magicThousand = 1000;
    this.interval = setInterval(() => {
      const { stop, seconds } = this.props;
      if (seconds > 0 && !stop) {
        const { addTimer } = this.props;
        addTimer(seconds - 1);
      } else {
        clearInterval(this.interval);
      }
    }, magicThousand);
  }

  render() {
    const { seconds } = this.props;
    const magicThirty = 30;
    return (
      <div
        className="timer"
      >
        <p
          style={ { background:
            `linear-gradient(90deg, rgb(255,38,116) ${(seconds / magicThirty) * 100}%,
              white ${(seconds / magicThirty) * 100}%,
              white ${100 - (seconds * 100) / magicThirty}%,
              white ${100 - (seconds * 100) / magicThirty}%)` } }
        >
          { `Tempo restante: ${seconds}` }
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTimer: (e) => dispatch(addTimerAction(e)),
});

const mapStateToProps = (state) => ({
  stop: state.timer.stop,
  seconds: state.timer.seconds,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  addTimer: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
};
