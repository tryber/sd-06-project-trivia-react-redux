import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gameTime } from '../actions';

class GameTimer extends Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
    this.handleTimer = this.handleTimer.bind(this);
    this.timerInterval = this.timerInterval.bind(this);
  }

  componentDidMount() {
    this.timerInterval();
  }

  timerInterval() {
    const oneSecond = 1000;
    const timer = setInterval(() => this.handleTimer(), oneSecond);
    return timer;
  }

  handleTimer() {
    const { count } = this.state;
    const { dispatchGameTime } = this.props;
    if (count > 0) {
      this.setState({
        count: count - 1,
      }, () => {
        dispatchGameTime(count);
      });
    } else {
      dispatchGameTime(count);
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div className="timer">
        { count }
      </div>
    );
  }
}

GameTimer.propTypes = {
  dispatchGameTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGameTime: (time) => dispatch(gameTime(time)),
});

export default connect(null, mapDispatchToProps)(GameTimer);
