import React from 'react';

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer30: 30,
      timer5: 5,
    };
  }

  componentDidMount() {
    const miliseconds = 1000;
    setInterval(() => this.countdown(), miliseconds);
  }

  countdown() {
    const { timer30 } = this.state;
    const { timer5 } = this.state;
    const timetesting = 30;
    if (timer30 <= timetesting && timer30 > 0 && timer5) {
      this.setState((localtimer) => ({
        timer30: localtimer.timer30 - 1,
      }));
    }
  }

  render() {
    const { timer30 } = this.state;
    return (
      <div>
        {timer30}
      </div>
    );
  }
}

export default CountdownTimer;
