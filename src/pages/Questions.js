import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionsAPI } from '../servicesAPI';
import { addStopAction, addTimerAction, playerAddScoreAction } from '../actions';
import Timer from './Timer';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestionIndex: 0,
      selectedAnswer: '',
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.prepareQuestions = this.prepareQuestions.bind(this);
    this.sortRandomAnswers = this.sortRandomAnswers.bind(this);
  }

  componentDidMount() {
    const { tokenObj: { token }, name, gravatarEmail } = this.props;
    const questionsQuantity = 5;
    const gameState = { player: { name, assertions: 0, score: 0, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(gameState));
    const { seconds } = this.props;
    if (seconds === 0) this.handleUniqueAnswer('incorrect');
    questionsAPI(questionsQuantity, token)
      .then((r) => this.prepareQuestions(r))
      .catch((r) => this.setState({ questions: r }));
  }

  prepareQuestions(questions) {
    const questionsPrepared = questions
      .map((question) => this.sortRandomAnswers(question));
    this.setState({ questions: questionsPrepared });
  }

  sortRandomAnswers(questionObj) {
    const incorrectAnswers = questionObj.incorrect_answers
      .map((incorrect) => ({ ans: incorrect, type: 'incorrect' }));
    const correctAnswer = { ans: questionObj.correct_answer, type: 'correct' };
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const numberOfAnswers = allAnswers.length;
    const allAnswersRandom = [];
    for (let i = 0; i < numberOfAnswers; i += 1) {
      const indexRandom = Math.round(Math.random() * (allAnswers.length - 1));
      allAnswersRandom[i] = allAnswers[indexRandom];
      allAnswers.splice(indexRandom, 1);
    }
    questionObj.randomAnswers = allAnswersRandom;
    return questionObj;
  }

  handleQuestion(index) {
    const { questions, selectedAnswer } = this.state;
    const { seconds } = this.props;
    const actualQuestion = questions[index];
    const buttonNext = (
      <button
        className="next-button"
        data-testid="btn-next"
        type="button"
        onClick={ this.handleNext }
      >
        Próxima
      </button>);
    return (
      <article className="question-container">
        <h2
          className="category"
          data-testid="question-category"
        >
          { actualQuestion.category }
        </h2>
        <h1 data-testid="question-text">{ actualQuestion.question }</h1>
        <div className="answers">
          { this.handleAnswers(actualQuestion) }
        </div>
        { (selectedAnswer !== '' || seconds === 0) ? buttonNext : '' }
      </article>
    );
  }

  handleAnswers(question) {
    const { randomAnswers } = question;
    let indexOfIncorrectAnswers = 0;
    return randomAnswers.map((answer, index) => {
      const { ans, type } = answer;
      const testId = (type === 'correct')
        ? 'correct-answer' : `wrong-answer-${indexOfIncorrectAnswers}`;
      indexOfIncorrectAnswers = (type === 'incorrect')
        ? indexOfIncorrectAnswers + 1 : indexOfIncorrectAnswers;
      const { selectedAnswer } = this.state;
      const { seconds } = this.props;
      return (
        <button
          key={ index }
          type="button"
          data-testid={ testId }
          className={ (selectedAnswer !== '' || seconds === 0) ? `${type}-answer` : '' }
          onClick={ () => this.handleUniqueAnswer(type) }
          disabled={ (selectedAnswer !== '' || seconds === 0) }
        >
          { ans }
        </button>
      );
    });
  }

  handleScore(timer) {
    const { questions, actualQuestionIndex } = this.state;
    const { difficulty } = questions[actualQuestionIndex];
    const level = { easy: 1, medium: 2, hard: 3 };
    const difficultyMultiplier = level[difficulty];
    const magicNumberTen = 10;
    const score = magicNumberTen + (timer * difficultyMultiplier);
    return score;
  }

  handleUniqueAnswer(type) {
    const { seconds, addStop, addScore, name, gravatarEmail,
      score, assertions } = this.props;
    const scoreAdd = (type === 'correct') ? this.handleScore(seconds) : 0;
    const assertion = (type === 'correct') ? 1 : 0;
    const playerObj = { player: {
      name,
      gravatarEmail,
      score: score + scoreAdd,
      assertions: assertions + assertion,
    } };
    localStorage.setItem('state', JSON.stringify(playerObj));
    addScore({ score: scoreAdd, assertions: assertion });
    addStop(true);
    this.setState({ selectedAnswer: type });
  }

  handleNext() {
    const { addTimer, addStop } = this.props;
    const magicNumberThirty = 30;
    addTimer(magicNumberThirty);
    addStop(false);
    this.setState((actualState) => ({
      actualQuestionIndex: actualState.actualQuestionIndex + 1,
      selectedAnswer: '',
    }));
  }

  render() {
    const { questions, actualQuestionIndex } = this.state;
    const maximumQuantity = 5;
    const aboutQuestions = () => {
      const loadingOrQuestion = (questions !== 'ERROR_QUESTIONS' && questions.length > 0)
        ? this.handleQuestion(actualQuestionIndex) : (<h1>Carregando...</h1>);
      return loadingOrQuestion;
    };
    return (
      <div>
        <Timer />
        { (questions === 'ERROR_QUESTIONS' && actualQuestionIndex < maximumQuantity)
          ? 'ERROR' : '' }
        { (actualQuestionIndex < maximumQuantity)
          ? aboutQuestions() : <Redirect to="/feedback" /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTimer: (e) => dispatch(addTimerAction(e)),
  addStop: (e) => dispatch(addStopAction(e)),
  addScore: (e) => dispatch(playerAddScoreAction(e)),
});

const mapStateToProps = (state) => ({
  tokenObj: state.tokenObj,
  seconds: state.timer.seconds,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  tokenObj: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  addStop: PropTypes.string.isRequired,
  addScore: PropTypes.string.isRequired,
  addTimer: PropTypes.string.isRequired,
};
