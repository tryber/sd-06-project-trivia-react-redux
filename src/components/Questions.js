import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  timerReset,
  timerStop,
  getPlayerScore,
  correctAnswerCounter,
} from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disableBTN: false,
      shuffledQuestions: [],
      shuffled: false,
      feedback: false,
      hideNext: true,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.getAnswerTime = this.getAnswerTime.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);
    this.renderNext = this.renderNext.bind(this);
  }

  getAnswerTime() {
    const time = document.querySelector('.timer');
    const timeInt = parseInt(time.innerHTML, 10);
    return timeInt;
  }

  shuffleArray() {
    const { gameQuestions } = this.props;
    const { questionNumber } = this.state;
    const magic = 0.5;
    if (gameQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      const INCORRECT_ANSWER = gameQuestions[questionNumber].incorrect_answers;
      const questionsArray = [CORRECT_ANSWER, ...INCORRECT_ANSWER];
      const newArr = questionsArray.sort(() => Math.random() - magic);
      this.setState({
        shuffled: true,
        shuffledQuestions: newArr,
      });
    }
  }

  changeToNextQuestion() {
    const { questionNumber } = this.state;
    const { resetTimer } = this.props;
    const indexLimit = 4;
    const wrongList = document.querySelectorAll('.wrong-question');
    const rightQuestion = document.querySelector('.right-question');

    resetTimer();

    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
      disableBTN: false,
      shuffled: false,
      hideNext: true,
    });

    if (wrongList && rightQuestion) {
      wrongList.forEach((element) => {
        element.className = 'wquestion';
      });
      rightQuestion.className = 'rquestion';
    }
  }

  handleTime() {
    const { disableBTN } = this.state;
    const { lostTime } = this.props;

    if (lostTime && !disableBTN) {
      this.setState({
        disableBTN: true,
      });
    }
  }

  checkDifficulty(difficulty) {
    const hardValue = 3;
    const mediumValue = 2;
    const easyValue = 1;

    switch (difficulty) {
    case 'hard':
      return hardValue;
    case 'medium':
      return mediumValue;
    default:
      return easyValue;
    }
  }

  handleAnswer({ target }, difficulty) {
    const { questionNumber } = this.state;
    const { stopTimer, sendScore, countAnswer } = this.props;
    const wrongList = document.querySelectorAll('.wquestion');
    const rightQuestion = document.querySelector('.rquestion');

    stopTimer();

    if (target.className === 'rquestion') {
      const getTime = this.getAnswerTime();
      const mutiplier = 10;
      const difValue = this.checkDifficulty(difficulty);
      const playerScore = mutiplier + (getTime * difValue);
      sendScore(playerScore);
      countAnswer();

      wrongList.forEach((element) => {
        element.className = 'wrong-question';
      });
      rightQuestion.className = 'right-question';

      this.setState({
        disableBTN: true,
        hideNext: false,
      });
    }

    if (target.className === 'wquestion') {
      wrongList.forEach((element) => {
        element.className = 'wrong-question';
      });
      rightQuestion.className = 'right-question';

      this.setState({
        disableBTN: true,
        hideNext: false,
      });
    }

    const questionIndexLimit = 4;

    if (questionNumber === questionIndexLimit) {
      this.setState({
        feedback: true,
        hideNext: false,
      });
    }
  }

  handleQuestions() {
    const { gameQuestions } = this.props;
    const { questionNumber, disableBTN, shuffledQuestions, shuffled } = this.state;
    const initialIndex = -1;
    let answerIndex = initialIndex;
    if (shuffled && shuffledQuestions) {
      const { difficuty } = gameQuestions[questionNumber];
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      return (
        <div>
          <h4 data-testid="question-category">
            {gameQuestions[questionNumber].category}
          </h4>
          <p data-testid="question-text">{gameQuestions[questionNumber].question}</p>
          {shuffledQuestions.map((question) => {
            if (question === CORRECT_ANSWER) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ (e) => this.handleAnswer(e, difficuty) }
                  className="rquestion"
                  key="correct"
                  disabled={ disableBTN }
                >
                  {question}
                </button>
              );
            }
            const wrongButton = (
              <button
                type="button"
                data-testid={ `wrong-answers-${answerIndex += 1}` }
                className="wquestion"
                onClick={ this.handleAnswer }
                key={ `wrong${answerIndex}` }
                disabled={ disableBTN }
              >
                {question}
              </button>
            );
            return wrongButton;
          })}
        </div>
      );
    }
    return <p>Loading</p>;
  }

  renderNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.changeToNextQuestion }
      >
        Next Question
      </button>
    );
  }

  renderFeedback() {
    return (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.changeToNextQuestion }
        >
          Next Question
        </button>
      </Link>
    );
  }

  render() {
    const { shuffled, hideNext, feedback } = this.state;
    const { gameQuestions } = this.props;

    if (!shuffled && gameQuestions) {
      this.shuffleArray();
    }

    this.handleTime();

    return (
      <div>
        {this.handleQuestions()}
        {!hideNext && !feedback ? this.renderNext() : ''}
        {!hideNext && feedback ? this.renderFeedback() : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.game.questions,
  lostTime: state.timer.lostTime,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetTimer: () => dispatch(timerReset()),
  stopTimer: () => dispatch(timerStop()),
  sendScore: (score) => dispatch(getPlayerScore(score)),
  countAnswer: () => dispatch(correctAnswerCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  lostTime: PropTypes.bool.isRequired,
  sendScore: PropTypes.func.isRequired,
  countAnswer: PropTypes.func.isRequired,
};
