import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.decreaseTime = this.decreaseTime.bind(this);
    const number = 1000;
    this.state = {
      time: 30,
      timer: setInterval(() => this.decreaseTime(), number),
    };
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      const { timer } = this.state;
      clearInterval(timer);
    }
  }

  decreaseTime() {
    const { time } = this.state;
    if (time === 1) {
      const { disabledAnswer } = this.props;
      disabledAnswer();
    }
    this.setState((Previous) => ({ time: Previous.time - 1 }));
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <p>
          Tempo:
          <span>
            {time}
          </span>
        </p>
      </div>
    );
  }
}

Timer.propTypes = {
  disabledAnswer: PropTypes.func.isRequired,
};

export default Timer;
