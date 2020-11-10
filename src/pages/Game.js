import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, QuestionCard, Loading } from '../components';
import { getQuestions, updateScoreAndAssertions } from '../actions';
import './Game.css';

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

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  randowChields() {
    const containerAnswers = document.querySelector('.answers');
    if (containerAnswers !== null) {
      const answersAlternatives = [...containerAnswers.children];
      this.shuffle(answersAlternatives);
      answersAlternatives.map((element) => containerAnswers.appendChild(element));
    }
  }

  startingInterval() {
    this.setState(
      {
        timer: 5,
      },
      () => {
        const mil = 1000;
        const interval = setInterval(() => this.counting(), mil);
        this.setState({ interval });
        this.randowChields();
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
      document.querySelector(
        '[data-testid="wrong-answer-0"]',
      ).click();
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
      <div className="class-game">
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
