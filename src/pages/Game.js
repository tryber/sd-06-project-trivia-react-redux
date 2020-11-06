import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../services';
import profile from '../img/profile.png';

class Game extends React.Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.state = {
      questions: [],
      seconds: '30',
      points: '0',
    };
  }

  async componentDidMount() {
    const maximumTime = 30000;
    const { userToken } = this.props;
    const questions = await fetchQuestions(userToken);
    this.getQuestions(questions.results);
    this.timer();
    setTimeout(this.correctAnswer, maximumTime);
  }

  getQuestions(questions) {
    this.setState({
      questions: [questions],
    });
  }

  correctAnswer() {
    // const { points, seconds } = this.state;
    // const ten = 10;
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
    // if (target.className.includes('correct-answer')) {
    //   this.setState({
    //     points: Number(points) + Number(ten) + Number(seconds),
    //   });
    // }
  }

  timer() {
    const correctButton = document.querySelector('.correct-answer');
    const wrongButton = document.querySelectorAll('.wrong-answer');
    const interval = 1000;
    setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({
          seconds: seconds - 1,
        });
      }
      if (seconds === 0) {
        correctButton.disabled = true;
        wrongButton.forEach((element) => {
          element.disabled = true;
        });
        clearInterval();
      }
    }, interval);
  }

  score() {

  }

  render() {
    const { questions, seconds, points } = this.state;
    return (
      <div className="game-container">
        {questions.map((element, index) => (
          <div className="square" key={ index }>
            <header className="profile-header">
              <div className="profile-div">
                <img
                  data-testid="header-profile-picture"
                  alt="profile"
                  src={ profile }
                  width="120"
                />
                <div className="profile-rightside">
                  <p data-testid="header-player-name">Nome da pessoa:</p>
                  <p data-testid="header-score">Pontuação: 0</p>
                </div>
              </div>
              <h1 className="score">
                <p>Placar</p>
                {points}
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
                  onClick={ this.correctAnswer }
                >
                  {element[index].correct_answer}
                </button>
                {element[index].incorrect_answers.map((answer, key) => (
                  <button
                    type="button"
                    key={ key }
                    className="each-answer wrong-answer"
                    data-testid={ `wrong-answer-${key}` }
                    onClick={ this.correctAnswer }
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
                <button className="next" type="button">
                  <span>Proxima</span>
                </button>
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
});

Game.propTypes = {
  userToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
