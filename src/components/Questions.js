import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Howl } from 'howler';
import Acertou from '../sounds/acertou.mp3';
import Errou from '../sounds/errou.mp3';
import { gettingQuestionsThunk, getScore } from '../redux/actions';
import Timer from './Timer';
import './Questions.css';

const acertouSound = new Howl({
  src: [Acertou],
});

const errouSound = new Howl({
  src: [Errou],
});

class Questions extends Component {
  constructor() {
    super();

    this.nextQuestion = this.nextQuestion.bind(this);
    this.disableAllButtons = this.disableAllButtons.bind(this);
    this.gettingLevel = this.gettingLevel.bind(this);
    this.scoreBoard = this.scoreBoard.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.state = {
      questionNumber: 0,
      time: false,
      level: '',
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  componentDidUpdate(prevProps) {
    const { timeIsOver } = this.props;

    if (prevProps.timeIsOver !== timeIsOver) {
      this.disableAllButtons();
    }
  }

  gettingLevel(question, questionNumber) {
    const level = question.results[Number(questionNumber)].difficulty;
    this.setState({ level }, () => this.scoreBoard());
  }

  checkAnswer(correctAnswer) {
    const btnArray = document.getElementsByTagName('button');
    const btnNext = document.getElementById('next');

    for (let x = 0; x < btnArray.length; x += 1) {
      if (btnArray[x].id === 'correct') {
        btnArray[x].className = 'correct';
      } else if (btnArray[x].id !== 'next') {
        btnArray[x].className = 'incorrect';
      }
    }

    btnNext.style.display = 'block';

    if (correctAnswer === true) {
      acertouSound.play();
    } else {
      errouSound.play();
    }
  }

  disableAllButtons() {
    const btnNext = document.getElementById('next');

    this.setState({ time: true });
    btnNext.style.display = 'block';
  }

  scoreBoard() {
    const { getUserScore } = this.props;
    const { level } = this.state;
    const timeValue = Number(document.getElementsByClassName('counter')[0].innerHTML);
    const userInfo = JSON.parse(localStorage.getItem('state'));
    let prevScore = Number(userInfo.player.score);
    let assertions = Number(userInfo.player.assertions);
    let levelValue = 0;
    const hardLevel = 3;
    const mediumLevel = 2;
    const easyLevel = 1;
    const baseValue = 10;

    if (level === 'easy') {
      levelValue = easyLevel;
    } else if (level === 'medium') {
      levelValue = mediumLevel;
    } else {
      levelValue = hardLevel;
    }
    const score = baseValue + (timeValue * levelValue);
    prevScore += score;
    assertions += 1;
    userInfo.player.score = prevScore;
    getUserScore(prevScore);
    userInfo.player.assertions = assertions;
    localStorage.setItem('state', JSON.stringify(userInfo));
  }

  handleOnClick(question, questionNumber, correctAnswer) {
    correctAnswer = true;
    this.gettingLevel(question, questionNumber);
    this.checkAnswer(correctAnswer);
  }

  randomizeAnswers(correctAnswer) {
    const { questions } = this.props;
    const { questionNumber, time } = this.state;
    const answersArray = [];

    if (questions !== undefined) {
      const correct = (
        <button
          type="button"
          data-testid="correct-answer"
          key="correct-answer"
          id="correct"
          onClick={ () => this.handleOnClick(questions, questionNumber, correctAnswer) }
          disabled={ time }
        >
          { questions.results[Number(questionNumber)].correct_answer }
        </button>
      );
      const incorrect = (questions.results[Number(questionNumber)].incorrect_answers
        .map((answer) => (
          <button
            data-testid="wrong-answer"
            key={ answer }
            type="button"
            onClick={ this.checkAnswer }
            disabled={ time }
          >
            { answer }
          </button>)));

      answersArray.push(...incorrect);
      answersArray.push(correct);

      const magicNumber = 5;
      const randomNumber = Math.floor(Math.random() * magicNumber + 1);
      const newArray = [];

      if (randomNumber % 2 === 0) {
        newArray.push(answersArray[3], answersArray[2], answersArray[1], answersArray[0]);
      } else {
        newArray.push(answersArray[1], answersArray[3], answersArray[0], answersArray[2]);
      }
      return newArray;
    }
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const feedback = 4;

    if (questionNumber === feedback) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        questionNumber: prevState.questionNumber + 1,
        time: false,
      }), () => {
        const btnArray = document.getElementsByTagName('button');
        const btnNext = document.getElementById('next');

        btnNext.style.display = 'none';

        for (let x = 0; x < btnArray.length; x += 1) {
          btnArray[x].className = '';
        }
      });
    }
  }

  render() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const correctAnswer = false;
    return (
      questions === undefined ? <p>Loading...</p> : (
        <div>
          <div data-testid="question-category">
            { questions.results[Number(questionNumber)].category }
          </div>
          <div data-testid="question-text">
            { questions.results[Number(questionNumber)].question }
          </div>
          <div>
            { this.randomizeAnswers(correctAnswer) }
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-next"
              id="next"
              className="next"
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>
          </div>
          <Timer questionNumber={ questionNumber } />
        </div>
      ));
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.string, PropTypes.number])),
  timeIsOver: PropTypes.number,
  history: PropTypes.string.isRequired,
  getUserScore: PropTypes.func.isRequired,
};

Questions.defaultProps = {
  questions: undefined,
  timeIsOver: '',
};

const mapStateToProps = (state) => ({
  questions: state.userReducer.questions,
  timeIsOver: state.timerReducer.timeQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(gettingQuestionsThunk()),
  getUserScore: (score) => dispatch(getScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
