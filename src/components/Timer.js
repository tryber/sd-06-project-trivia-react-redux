import React, { Component } from 'react';

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
        this.setState((last) => ({ timer: last.timer - 1 }));
      }, ONE_SECOND);
      setTimeout(() => {
        clearInterval(time);
      }, ALL_TIME);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
      Tempo restante:
        { timer }
      </div>
    );
  }
}

export default Timer;
