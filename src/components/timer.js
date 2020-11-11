import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { answerAction } from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.decreaseTime = this.decreaseTime.bind(this);

    const { time } = this.props;
    this.state = {
      timeLeft: time,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    setTimeout(this.decreaseTime, oneSecond);
  }

  componentDidUpdate() {
    const { timeLeft } = this.state;
    const { answered, answeredAction } = this.props;
    const action = {
      timeout: true,
    };
    const oneSecond = 1000;
    if (answered === false) setTimeout(this.decreaseTime, oneSecond);
    if (timeLeft < 1) answeredAction(action);
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
        {' '}
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
