import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTimer } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.downTime = this.downTime.bind(this);

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.downTime();
  }

  downTime() {
    const ONE_SECOND = 1000;
    const ALL_TIME = 30000;
    const { timer } = this.state;
    if (timer !== 0) {
      const time = setInterval(() => {
        const { sendTimer } = this.props;
        sendTimer(timer);
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
  timer: state.questions.timer,
});

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (state) => dispatch(getTimer(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
