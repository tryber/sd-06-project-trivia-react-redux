import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NextButton } from '../components';
import fetchQuestions from '../services';
import profile from '../img/profile.png';
import { addScore, correctAnswer } from '../actions';

class Game extends React.Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      questions: [],
      seconds: '30',
      points: '0',
      difficulty: '1',
      btnDisable: false,
      indexNextQuestion: 0,
      click: false,
      feedback: 0,
      correct: 0,
    };
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  async componentDidMount() {
    const { userToken } = this.props;
    const { click, seconds } = this.state;
    const questions = await fetchQuestions(userToken);
    this.getQuestions(questions.results);
    if (click === false && seconds > '0') {
      this.timer();
    }
  }

  getQuestions(questions) {
    this.setState({
      questions: [questions],
    });
  }

  handleClick({ target }) {
    const { points, seconds, difficulty, correct } = this.state;
    const { scoreAdd, userName } = this.props;
    const ten = 10;
    const correctButton = document.querySelector('.correct-answer');
    const correctClass = correctButton.className;
    const wrongButton = document.querySelectorAll('.wrong-answer');
    const wrongClass = wrongButton.className;
    if (correctClass.includes('correct-answer') || wrongClass.includes('wrong-answer')) {
      correctButton.classList.add('correct');
      correctButton.disabled = true;
      wrongButton.forEach((element) => {
        element.classList.add('wrong');
        element.disabled = true;
      });
      this.setState({
        btnDisable: true,
      });
    }
    if (target.className.includes('correct-answer')) {
      if (!localStorage.state) {
        localStorage.setItem('player', JSON.stringify({
          player: {
            name: userName,
            score: 0,
          },
        }));
      }
      const newScore = Number(points)
      + (Number(ten)
      + (Number(seconds)
      * Number(difficulty)));

      this.setState({
        points: newScore,
        correct: correct + 1,
      });
      const state = JSON.parse(localStorage.getItem('state'));
      let { score } = state.player;
      score = (Number(points)
      + (Number(ten)
      + (Number(seconds)
      * Number(difficulty))));

      localStorage.state = JSON.stringify({
        player: {
          name: userName,
          score,
        },
      });
    } else {
      localStorage.setItem('state', JSON.stringify({
        player: {
          name: userName,
          score: 0,
        },
      }));
      scoreAdd('0');
    }
    this.setState({
      click: true,
    });
  }

  correctAnswer() {
    const correctButton = document.querySelector('.correct-answer');
    const correctClass = correctButton.className;
    const wrongButton = document.querySelectorAll('.wrong-answer');
    const wrongClass = wrongButton.className;
    if (correctClass.includes('correct-answer') || wrongClass.includes('wrong-answer')) {
      correctButton.classList.add('correct');
      correctButton.disabled = true;
      wrongButton.forEach((element) => {
        element.classList.add('wrong');
        element.disabled = true;
      });
    }
  }

  timer() {
    const correctButton = document.querySelector('.correct-answer');
    const wrongButton = document.querySelectorAll('.wrong-answer');
    const interval = 1000;
    setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0 && correctButton.disabled === false) {
        this.setState({
          seconds: seconds - 1,
        });
      }
      if (seconds < 1) {
        this.correctAnswer();
        correctButton.disabled = true;
        wrongButton.forEach((element) => {
          element.disabled = true;
        });
        clearInterval();
      }
    }, interval);
  }

  async handleNextQuestion() {
    const { scoreAdd, addCorrect } = this.props;
    const { indexNextQuestion, points, correct } = this.state;
    const correctButton = document.querySelector('.correct-answer');
    const wrongButton = document.querySelectorAll('.wrong-answer');
    this.setState((previousState) => ({
      indexNextQuestion: previousState.indexNextQuestion + 1,
    }));
    const { userToken } = this.props;
    const questions = await fetchQuestions(userToken);
    this.getQuestions(questions.results);
    if (correctButton.disabled === true) {
      correctButton.classList.remove('correct');
      correctButton.disabled = false;
      wrongButton.forEach((element) => {
        element.classList.remove('wrong');
        element.disabled = false;
      });
      this.setState({
        seconds: '30',
      });
    }
    if (indexNextQuestion > 2) {
      scoreAdd(points);
      addCorrect(correct);
      this.setState({
        feedback: '/feedback',
      });
    }
  }

  render() {
    const { questions, seconds, points, btnDisable, feedback } = this.state;
    const { userName } = this.props;
    return (
      <div className="game-container">
        {questions.map((element, index) => (
          <div className="square" key={ index }>
            <header className="profile-header">
              <div className="profile-div">
                <div className="profile-rightside">
                  <img
                    data-testid="header-profile-picture"
                    alt="profile"
                    src={ profile }
                    width="120"
                  />
                  <p data-testid="header-player-name">
                    Jogador:
                    { userName ? <span>{userName}</span> : <span>Rodrigo Leite</span>}
                  </p>
                </div>
              </div>
              <h1 className="score">
                <p data-testid="header-score">
                  Placar
                  <span>{ points }</span>
                </p>
              </h1>
            </header>
            <div className="questions-answers-container">
              <div className="questions">
                <h3 data-testid="question-category">{element[index].category}</h3>
                <p data-testid="question-text">{element[index].question}</p>
              </div>
              <div className="answers">
                <button
                  type="button"
                  data-testid="correct-answer"
                  className="each-answer correct-answer"
                  onClick={ this.handleClick }
                >
                  {element[index].correct_answer}
                </button>
                {element[index].incorrect_answers.map((answer, key) => (
                  <button
                    type="button"
                    key={ key }
                    className="each-answer wrong-answer"
                    data-testid={ `wrong-answer-${key}` }
                    onClick={ this.handleClick }
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
            <footer className="timer-and-next-div">
              <div className="timer">
                <p>Tempo:</p>
                <p>{seconds}</p>
              </div>
              <div className="next-div">
                {btnDisable
                ? <Link to={ feedback }>
                    <NextButton handleNextQuestion={ this.handleNextQuestion } />
                  </Link>
                  : null}
              </div>
            </footer>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.user.token,
  userName: state.user.player.name,
  scoreAdd: state.user.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  scoreAdd: (score) => dispatch(addScore(score)),
  addCorrect: (correct) => dispatch(correctAnswer(correct)),
});

Game.propTypes = {
  userToken: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  scoreAdd: PropTypes.func.isRequired,
  addCorrect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
