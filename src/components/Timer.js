import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getTimer } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.downTime = this.downTime.bind(this);
  }

  componentDidMount() {
    this.downTime();
  }

  downTime() {
    const { handleTimer, timer } = this.props;
    const ONE_SECOND = 1000;
    const ALL_TIME = 30000;
    if (timer !== 0) {
      const time = setInterval(() => {
        handleTimer(timer);
      }, ONE_SECOND);
      setTimeout(() => {
        clearInterval(time);
      }, ALL_TIME);
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
      Tempo restante:
        { timer }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.game.timer,
});

const mapDispatchToPros = (dispatch) => ({
  handleTimer: (time) => dispatch(getTimer(time)),
});

Timer.propTypes = {
  timer: propTypes.number.isRequired,
  handleTimer: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToPros)(Timer);
