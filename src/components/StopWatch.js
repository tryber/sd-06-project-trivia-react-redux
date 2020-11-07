import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTimeLeft } from '../redux/actions';

class StopWatch extends React.Component {
  componentDidMount() {
    const { saveTime } = this.props;
    const startSeconds = 30;
    let seconds = startSeconds;
    const interval = 1000;
    if (seconds > 1) {
      this.myInterval = setInterval(() => {
        if (seconds > 0) seconds -= 1;
        saveTime(seconds);
      }, interval);
    }
  }

  componentDidUpdate() {
    const { seconds } = this.props;
    if (seconds === 0) {
      clearInterval(this.myInterval);
    }
  }

  render() {
    const { seconds } = this.props;
    return (
      <div>
        <span>{seconds}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.timer.seconds,
  // timerOn: state.stopwatch.timerOn,
  // timeStart: state.stopwatch.timeStart,
});

const mapDispatchToProps = (dispatch) => ({
  saveTime: (seconds) => dispatch(saveTimeLeft(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);

StopWatch.propTypes = {
  saveTime: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};
