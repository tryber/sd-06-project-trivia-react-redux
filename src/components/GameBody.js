import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkQuestions, freezeTimer, score } from '../actions';
import './gameBody.css';
import Timer from './Timer';

class GameBody extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      answers: [],
      isCorrect: false,
      disabled: true,
      disabledAnswer: false,
      renderTimer: false,
      userAssertions: 0,
      userScore: 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.disabledAnswer = this.disabledAnswer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.saveScoreLocalState = this.saveScoreLocalState.bind(this);
  }

  async componentDidMount() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.createQuestions();
  }

  async createQuestions(index = 0) {
    const { questions } = this.props;
    const answersArray = [];
    await this.handleTimer();
    if (questions.length > 0) {
      const question = questions[index];
      answersArray.push(question.correct_answer, ...question.incorrect_answers);

      this.setState({
        index,
        category: question.category,
        question: question.question,
        correctAnswer: question.correct_answer,
        // incorrectAnswer: question.incorrect_answers,
        answers: answersArray,
      });
    }
  }

  stopTimer() {
    const { stopTime } = this.props;
    stopTime(true);
  }

  disabledAnswer() {
    this.setState({
      disabledAnswer: true,
      disabled: false,
    });
  }

  async handleNext() {
    await this.handleTimer();
    const { questions, stopTime } = this.props;
    stopTime(false);
    let { index } = this.state;
    index += 1;
    if (questions.length > 0 && index < questions.length) {
      this.createQuestions(index);
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({
      isCorrect: false,
      disabled: true,
      disabledAnswer: false,
    });
  }

  sumScore() {
    const { questions } = this.props;
    const { userAssertions, userScore, index } = this.state;
    const { difficulty } = questions[index];
    let difficultyLevel = 1;
    if (difficulty === 'medium') { difficultyLevel += 1; }
    if (difficulty === 'hard') { difficultyLevel += 2; }
    const timeNumber = parseFloat(document.getElementById('time-remain').textContent);
    const fixedScore = 10;
    const questionScore = (fixedScore + (timeNumber * difficultyLevel));
    const totalScore = userScore + questionScore;
    const totalAssertions = userAssertions + 1;
    this.setState({
      userAssertions: totalAssertions,
      userScore: totalScore,
    });
    this.saveScoreLocalState(totalScore, totalAssertions);
  }

  saveScoreLocalState(totalScore, totalAssertions) {
    const { userName, userEmail, userScore } = this.props;
    const userInfo = {
      score: totalScore,
      assertions: totalAssertions,
    };
    const playerInfo = {
      player: {
        name: userName,
        assertions: totalAssertions,
        score: totalScore,
        gravatarEmail: userEmail,
      },
    };
    userScore(userInfo);
    localStorage.setItem('state', JSON.stringify(playerInfo));
  }

  changeColor() {
    this.setState({
      isCorrect: true,
      disabled: false,
    });
  }

  handleTimer() {
    const { renderTimer } = this.state;
    if (renderTimer === false) {
      this.setState({ renderTimer: true });
    } else if (renderTimer === true) {
      this.setState({ renderTimer: false });
    }
  }

  render() {
    const { category, question, correctAnswer,
      answers, isCorrect, disabled, disabledAnswer, renderTimer } = this.state;
    const randomNumber = 0.5;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        {answers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                type="button"
                disabled={ disabledAnswer }
                className={ isCorrect ? 'buttonCorrect' : '' }
                key={ answer }
                data-testid="correct-answer"
                onClick={ () => {
                  this.changeColor();
                  this.stopTimer();
                  this.sumScore();
                } }
              >
                { answer }
              </button>);
          }
          return (
            <button
              type="button"
              disabled={ disabledAnswer }
              className={ isCorrect ? 'buttonIncorrect' : '' }
              key={ answer }
              data-testid={ `wrong-answer-${index - 1}` }
              onClick={ () => { this.changeColor(); this.stopTimer(); } }
            >
              { answer }
            </button>);
        }).sort(() => Math.random() - randomNumber) }
        <br />
        <br />
        <button
          type="button"
          disabled={ disabled }
          data-testid={ disabled ? '' : 'btn-next' }
          onClick={ () => this.handleNext() }
        >
          Next
        </button>
        <div>
          {renderTimer === true ? <Timer disabledAnswer={ this.disabledAnswer } /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionReducer.questions,
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(thunkQuestions()),
  stopTime: (condition) => dispatch(freezeTimer(condition)),
  userScore: (scoreInfo) => dispatch(score(scoreInfo)),
});

GameBody.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  stopTime: PropTypes.func.isRequired,
  userScore: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);
