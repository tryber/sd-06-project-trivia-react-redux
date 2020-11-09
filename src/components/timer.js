import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { answerAction } from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.decreaseTime = this.decreaseTime.bind(this);
    this.setTimeUpdate = this.setTimeUpdate.bind(this);
    const { time } = this.props;

    this.state = {
      timeLeft: time,
    };
  }

  componentDidMount() {
    const { time } = this.props;
    const oneSecond = 1000;
    setTimeout(this.decreaseTime, oneSecond);
    this.setTimeUpdate(time);
  }

  componentDidUpdate() {
    const { timeLeft } = this.state;
    const { answered, answeredAction } = this.props;
    const action = {
      timeout: true,
    };
    const timer = {
      timeout: false,
      time: timeLeft,
      answered: true,
    };
    const oneSecond = 1000;
    const trinta = 30;
    if (answered === false) setTimeout(this.decreaseTime, oneSecond);
    if (timeLeft > 0 && timeLeft <= trinta && answered === true) answeredAction(timer);
    if (timeLeft < 1) answeredAction(action);
  }

  setTimeUpdate(time) {
    this.setState({ timeLeft: time });
  }

  decreaseTime() {
    const { timeLeft } = this.state;
    const trinta = 30;
    if (timeLeft > 0 && timeLeft <= trinta) this.setState({ timeLeft: timeLeft - 1 });
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <h4>
Tempo:
        { timeLeft }
      </h4>
    );
  }
}

Timer.propTypes = {
  answered: propTypes.bool.isRequired,
  time: propTypes.number.isRequired,
  answeredAction: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  answeredAction: (answerTime) => dispatch(answerAction(answerTime)),
});

function mapStateToProps(state) {
  return {
    name: state.login.name,
    score: state.allQuestions.score,
    answered: state.allQuestions.answered,
    time: state.allQuestions.time,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
