import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, QuestionCard, Loading } from '../components';
import { getQuestions, updateScoreAndAssertions } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      timer: 0,
      interval: {},
    };
    this.updateState = this.updateState.bind(this);
    this.startingInterval = this.startingInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  async componentDidMount() {
    const { token, dispatchQuestions, sendScore } = this.props;
    sendScore(0, 0);
    await dispatchQuestions(token);
    this.updateState();
    this.startingInterval();
  }

  startingInterval() {
    this.setState(
      {
        timer: 30,
      },
      () => {
        const mil = 1000;
        const interval = setInterval(() => this.counting(), mil);
        this.setState({ interval });
      },
    );
  }

  clearInterval() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  counting() {
    const { timer } = this.state;
    const timeQuestion = 30;
    if (timer <= timeQuestion && timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.clearInterval();
      const correctAnswer = document.querySelector(
        '[data-testid="correct-answer"]',
      );
      correctAnswer.disabled = true;
    }
  }

  updateState() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading, timer } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <QuestionCard
            timer={ timer }
            startingInterval={ this.startingInterval }
            clearIntervalToProps={ this.clearInterval }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(getQuestions(token)),
  sendScore: (score, assertions) => dispatch(updateScoreAndAssertions(score, assertions)),
});

Game.propTypes = {
  token: PropTypes.array,
  dispatchQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
