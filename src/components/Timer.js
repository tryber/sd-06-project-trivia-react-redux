import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.decreaseTime = this.decreaseTime.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.state = {
      time: 5,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer() {
    const { time } = this.state;
    const oneSec = 1000;
    const timer = setInterval(() => this.decreaseTime(), oneSec);
    if (time === 0) {
      clearInterval(timer);
    }
  }

  decreaseTime() {
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

export default Timer;
