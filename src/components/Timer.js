import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    const { disableAnswerButtons } = this.props;
    const mil = 1000;
    this.timer = setInterval(() => {
      const { counter } = this.state;
      if (counter > 0) {
        this.setState(() => ({
          counter: counter - 1,
        }));
      } else {
        disableAnswerButtons();
        clearInterval(this.timer);
      }
    }, mil);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { counter } = this.state;
    return (
      <h2>
tempo:
        {' '}
        {counter}
      </h2>
    );
  }
}

Timer.propTypes = {
  disableAnswerButtons: PropTypes.func.isRequired,
};

export default Timer;
