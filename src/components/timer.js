import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { playerData } from '../actions';

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
    const { name, score, playerDataAction } = this.props;
    const action = {
      timeout: true,
      name,
      score,
      time: timeLeft,
    };
    const timer = {
      timeout: false,
      score,
      time: timeLeft,
    };
    const oneSecond = 1000;
    const trinta = 30;
    if (timeLeft > 0 && timeLeft <= trinta) playerDataAction(timer);
    if (timeLeft < 1) playerDataAction(action);
    setTimeout(this.decreaseTime, oneSecond);
  }

  decreaseTime() {
    const { timeLeft } = this.state;
    const trinta = 30;
    if (timeLeft > 0 && timeLeft <= trinta) this.setState({ timeLeft: timeLeft - 1 });
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <h4>
Tempo:
        { timeLeft }
      </h4>
    );
  }
}

Timer.defaultProps = {
  name: 'Player',
  score: 0,
};

Timer.propTypes = {
  name: propTypes.string,
  score: propTypes.number,
  playerDataAction: propTypes.func.isRequired,
};

const mapDispatchToProps = {
  playerDataAction: playerData,
};

function mapStateToProps(state) {
  return {
    name: state.login.name,
    score: state.playerData.payload.score,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
