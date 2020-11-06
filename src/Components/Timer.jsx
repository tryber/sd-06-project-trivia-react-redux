import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.setCountdown = this.setCountdown.bind(this);
    this.state = { countdown: 30 };
  }

  componentDidMount() {
    setInterval(this.setCountdown, 1000);
  }

  setCountdown() {
    const { countdown } = this.state;
    const { changeDisabled } = this.props;
    if (countdown > 0) {
      this.setState((previous) => ({
        ...previous,
        countdown: previous.countdown - 1,
      }));
    } else {
      this.setState({
        countdown: 0,
      });
      changeDisabled(true);
    }
  }

  render() {
    const { countdown } = this.state;
    return (
      <div>
        <span>{ countdown }</span>
      </div>
    );
  }
}

export default Timer;
