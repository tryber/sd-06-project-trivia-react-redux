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
    };
    const oneSecond = 1000;
    if (timeLeft < 1) {
      playerDataAction(action);
      const buttons = document.getElementsByClassName('answer-button');
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].disabled = true;
      }
      return;
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
      <h4>
Tempo:
        {timeLeft}
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
