import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      this.setState(({ seconds }) => ({
        seconds: seconds > 1 ? seconds - 1 : 0,
      }));
    }, interval);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.myInterval);
    }
  }

  render() {
    const { seconds } = this.state;
    console.log(seconds);
    return (
      <div>
        <p className="timer">{seconds}</p>
      </div>
    );
  }
}

export default Timer;
