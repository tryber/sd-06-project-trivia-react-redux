import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTimeLeft, toggleBtns } from '../redux/actions';

class Stopwatch extends React.Component {
  componentDidMount() {
    const { saveTime, seconds } = this.props;
    let time = seconds;
    const interval = 1000;
    if (time > 1) {
      this.myInterval = setInterval(() => {
        if (time > 0) time -= 1;
        saveTime(time);
      }, interval);
    }
  }

  componentDidUpdate() {
    const { seconds, toggleButtons } = this.props;
    if (seconds < 1) {
      clearInterval(this.myInterval);
      toggleButtons();
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  stopWatch() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds, clock } = this.props;
    if (!clock) this.stopWatch();
    return (
      <div>
        <span>{seconds}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.stopwatch.seconds,
  clock: state.stopwatch.clock,
});

const mapDispatchToProps = (dispatch) => ({
  saveTime: (seconds) => dispatch(saveTimeLeft(seconds)),
  toggleButtons: () => dispatch(toggleBtns()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

Stopwatch.propTypes = {
  saveTime: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
  clock: PropTypes.bool.isRequired,
  toggleButtons: PropTypes.func.isRequired,
};
