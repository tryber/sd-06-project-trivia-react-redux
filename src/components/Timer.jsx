import React, { Component } from 'react'

class Timer extends Component {

  componentDidMount() {
    const { handleTime } = this.props;
    let intervalID = setInterval(handleTime, 1000);
    this.setState({
      intervalID
    }) 
  }

  componentDidUpdate() {
    const { seconds } = this.props;
    const { intervalID } = this.state;
    if(seconds === 0) {
      clearInterval(intervalID);
    }
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
