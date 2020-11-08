import React, { Component } from 'react'

class Timer extends Component {

  componentDidMount() {
    const { handleTime } = this.props;
    setInterval(handleTime, 1000);
  }

  render() {
    const { seconds } = this.props;
    return (
      <div>
        Segundos restantes: { seconds }
      </div>
    )
  }
}

export default Timer;
