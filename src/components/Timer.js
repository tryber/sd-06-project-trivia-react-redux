import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.decreaseTime = this.decreaseTime.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer() {
    const oneSec = 1000;
    setInterval(() => this.decreaseTime(), oneSec);
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
            {time > 0 ? time : 0}
          </span>
        </p>
      </div>
    );
  }
}

export default Timer;
