import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { timerReset, timerStop, getPlayerScore } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disableBTN: false,
      shuffledQuestions: [],
      shuffled: false,
      feedback: false,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.getAnswerTime = this.getAnswerTime.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleRedirectFeedback = this.handleRedirectFeedback.bind(this);
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
    const nextButton = document.querySelector('.btn-next');
    const { questionNumber } = this.state;
    const { resetTimer } = this.props;
    const indexLimit = 4;
    const wrongList = document.querySelectorAll('.wrong-question');
    const rightQuestion = document.querySelector('.right-question');
    nextButton.style.visibility = 'hidden';

    resetTimer();

    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
      disableBTN: false,
      shuffled: false,
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
    const { stopTimer, sendScore } = this.props;
    const nextButton = document.querySelector('.btn-next');
    const wrongList = document.querySelectorAll('.wquestion');
    const rightQuestion = document.querySelector('.rquestion');
    nextButton.style.visibility = 'visible';

    stopTimer();

    if (target.className === 'rquestion') {
      const getTime = this.getAnswerTime();
      const mutiplier = 10;
      const difValue = this.checkDifficulty(difficulty);
      const playerScore = mutiplier + (getTime * difValue);
      sendScore(playerScore);

      wrongList.forEach((element) => {
        element.className = 'wrong-question';
      });
      rightQuestion.className = 'right-question';

      this.setState({
        disableBTN: true,
      });
    }

    if (target.className === 'wquestion') {
      wrongList.forEach((element) => {
        element.className = 'wrong-question';
      });
      rightQuestion.className = 'right-question';

      this.setState({
        disableBTN: true,
      });
    }

    const questionIndexLimit = 4;

    if (questionNumber === questionIndexLimit) {
      this.setState({
        feedback: true,
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

  handleRedirectFeedback() {
    const { feedback } = this.state;
    if (!feedback) {
      const nextBtn = (
        <button
          type="button"
          className="btn-next"
          data-testid="btn-next"
          onClick={ this.changeToNextQuestion }
        >
          Next Question
        </button>
      );

      return nextBtn;
    }

    const nextButton = document.querySelector('.btn-next');
    nextButton.style.visibility = 'visible';

    const feedbackBtn = (
      <Link to="/feedback">
        <button
          type="button"
          className="btn-next"
          data-testid="btn-next"
        >
          Next Question
        </button>
      </Link>
    );

    return feedbackBtn;
  }

  render() {
    const { shuffled } = this.state;
    const { gameQuestions } = this.props;

    if (!shuffled && gameQuestions) {
      this.shuffleArray();
    }

    this.handleTime();

    return (
      <div>
        {this.handleQuestions()}
        {this.handleRedirectFeedback()}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  lostTime: PropTypes.bool.isRequired,
  sendScore: PropTypes.func.isRequired,
};
