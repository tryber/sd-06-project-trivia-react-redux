import React from 'react';
import { connect } from 'react-redux';
import { playerData } from '../actions';
// import propTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();

    this.decreaseTime = this.decreaseTime.bind(this);

    this.state = {
      timeLeft: 30,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    setTimeout(this.decreaseTime, oneSecond);
  }

  componentDidUpdate() {
    const { timeLeft } = this.state;
    const action = { timeout: true };
    const oneSecond = 1000;
    if (timeLeft === 0) {
      playerData(action);
    }
    setTimeout(this.decreaseTime, oneSecond);
  }

  decreaseTime() {
    const { timeLeft } = this.state;
    this.setState({ timeLeft: timeLeft - 1 });
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <h4> Tempo: {timeLeft} </h4>
    );
  }
}

// Timer.propTypes = {
// };

const mapDispatchToProps = {
  playerData,
};

export default connect(null, mapDispatchToProps)(Timer);
