import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { sumNewPoints } from '../actions';
import './Questions.css';

const INITIAL_TIME = 30;

class Questions extends React.Component {
  constructor() {
    super();
    this.myChoice = this.myChoice.bind(this);
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      questionNumber: 0,
      answered: false,
      isShuffle: false,
      shuffledAnswers: [],
      time: INITIAL_TIME,
    };
  }

  componentDidMount() {
    const { questionNumber } = this.state;
    if (questionNumber === 0) this.startTimer();
    this.setInfoOnLocalStorage();
  }

  componentDidUpdate() {
    this.setInfoOnLocalStorage();
  }

  setInfoOnLocalStorage() {
    const { name, email, score, assertions } = this.props;
    const playerInfo = JSON.stringify({ player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    } });
    localStorage.setItem('state', playerInfo);
  }

  timer() {
    const { time } = this.state;
    if (time === 0) {
      this.setState({
        answered: true,
      });
    } else {
      this.setState((prev) => ({
        time: prev.time - 1,
      }));
    }
  }

  myChoice({ target }) {
    const { results } = this.props;
    const { questionNumber } = this.state;
    const answer = target.value;
    this.setState({
      answered: true,
    });
    if (answer === results[questionNumber].correct_answer) this.pointsCalc();
    clearInterval(this.intervalID);
  }

  class(answer) {
    const { answered, questionNumber } = this.state;
    const { results } = this.props;
    let buttonClass = 'answer';
    if (answered) {
      buttonClass = (answer === results[questionNumber].correct_answer)
        ? 'correct'
        : 'incorrect';
    }
    return buttonClass;
  }

  alternatives(answers, results) {
    const dataIdIndex = [0, 1, 2];
    const { questionNumber, answered } = this.state;
    return (
      <div>
        {answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            value={ answer }
            className={ this.class(answer) }
            disabled={ answered }
            data-testid={
              (answer === results[questionNumber].correct_answer)
                ? 'correct-answer'
                : `wrong-answer-${dataIdIndex.shift()}`
            }
            onClick={ this.myChoice }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  }

  shuffle(array) {
    const { isShuffle } = this.state;
    const FIFTY_PERCENT = 0.5;
    const shuffledAnswers = array.sort(() => Math.random() - FIFTY_PERCENT); // https://javascript.info/task/shuffle
    if (!isShuffle) this.setState({ shuffledAnswers, isShuffle: true });
  }

  question() {
    const { results } = this.props;
    const { answered, shuffledAnswers, questionNumber, time } = this.state;
    const answersBeforeShuffle = [
      results[questionNumber].correct_answer,
      ...results[questionNumber].incorrect_answers,
    ];
    if (!answered) this.shuffle(answersBeforeShuffle);
    return (
      <>
        <Header />
        <h2 data-testid="question-category">
          {`Category: ${results[questionNumber].category}`}
        </h2>
        <h3 data-testid="question-text">
          {`Question: ${results[questionNumber].question}`}
        </h3>
        {this.alternatives(shuffledAnswers, results)}
        <p>{time}</p>
      </>
    );
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(this.timer, ONE_SECOND);
  }

  pointsCalc() {
    const { sumPoints, results } = this.props;
    const { time, questionNumber } = this.state;
    const QUESTION_POINT = 10;
    const level1 = 1;
    const level2 = 2;
    const level3 = 3;
    let level = 0;
    if (results[questionNumber].difficulty === 'easy') level = level1;
    if (results[questionNumber].difficulty === 'medium') level = level2;
    if (results[questionNumber].difficulty === 'hard') level = level3;
    const points = (QUESTION_POINT + (time * level));
    sumPoints(points);
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
      answered: false,
      isShuffle: false,
      time: INITIAL_TIME,
    });
    this.startTimer();
  }

  resetState() {
    this.setState({
      questionNumber: 0,
      answered: false,
      isShuffle: false,
      shuffledAnswers: [],
      time: INITIAL_TIME,
    });
  }

  render() {
    const { results } = this.props;
    const { answered, questionNumber } = this.state;
    const NUMBER_OF_QUESTIONS = 5;
    return (
      <div>
        {(questionNumber === NUMBER_OF_QUESTIONS) ? <Redirect to="/feedback" /> : null}
        {(questionNumber === NUMBER_OF_QUESTIONS) ? this.resetState() : null}
        {(results[questionNumber]) ? this.question() : 'Loading...'}
        <button
          type="button"
          disabled={ !answered }
          hidden={ !answered }
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
  name: state.user.name,
  email: state.user.email,
  score: state.game.score,
  assertions: state.game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  sumPoints: (points) => dispatch(sumNewPoints(points)),
});

Questions.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  sumPoints: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
