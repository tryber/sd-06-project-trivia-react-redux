import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPoints, saveTimeLeft } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      timer: false,
      // seconds: 0,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleAnswerStyle = this.handleAnswerStyle.bind(this);
    this.checkTimer = this.checkTimer.bind(this);
    // this.startCount = this.startCount.bind(this);
  }

  componentDidMount() {
    const { saveTime } = this.props;
    const startSeconds = 30;
    let seconds = startSeconds;
    const interval = 1000;
    if (seconds > 1) {
      this.myInterval = setInterval(() => {
        if (seconds > 0) seconds -= 1;
        // console.log(seconds);
        // aqui deveria salvar os segundos que faltam
        saveTime(seconds);
      }, interval);
    }

    if (seconds === 0) {
      // console.log(seconds)
      clearInterval(this.myInterval);
    }
  }

  changeToNextQuestion() {
    const { questionNumber } = this.state;
    const indexLimit = 4;
    const wrongList = document.querySelectorAll('.wrong-question');
    const rightQuestion = document.querySelector('.right-question');

    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
    });

    wrongList.forEach((element) => {
      element.className = 'wquestion';
    });
    rightQuestion.className = 'rquestion';
  }

  shuffle(array) {
    const magic = 0.5;
    return array.sort(() => Math.random() - magic);
  }

  checkDifficulty(difficulty) {
    const THREE = 3;
    if (difficulty === 'hard') return THREE;
    if (difficulty === 'medium') return 2;
    return 1;
  }

  handleAnswerStyle({ target }, difficulty) {
    const { addScore, secondsLeft, name, email } = this.props;
    const wrongList = document.querySelectorAll('.wquestion');
    const rightQuestion = document.querySelector('.rquestion');
    wrongList.forEach((element) => {
      element.className = 'wrong-question';
    });
    rightQuestion.className = 'right-question';

    // o timer deve receber os segundos que faltam
    // não está funcionando
    const TEN = 10;
    const points = TEN + (secondsLeft * this.checkDifficulty(difficulty));
    if (target.className === 'right-question') {
      addScore(points);
      // salvar no local storage
      // falta recuperar, atualizar e enviar
      const { score } = this.props;
      const player = {
        player: {
          name,
          assertions: '',
          score: score + points,
          gravatarEmail: email,
        },
      };
      localStorage.setItem('state', JSON.stringify(player));
    }
  }

  checkTimer() {
    this.setState({ timer: true });
  }

  handleQuestions() {
    const { gameQuestions } = this.props;
    const { questionNumber, timer } = this.state;
    const initialIndex = -1;
    let answerIndex = initialIndex;
    const timerLimit = 30000;
    setTimeout(this.checkTimer, timerLimit);
    // this.startCount();

    if (gameQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      const INCORRECT_ANSWER = gameQuestions[questionNumber].incorrect_answers;
      const questionsArray = [CORRECT_ANSWER, ...INCORRECT_ANSWER];
      const newArr = this.shuffle(questionsArray);
      return (
        <div>
          <h4 data-testid="question-category">
            {gameQuestions[questionNumber].category}
          </h4>
          <p data-testid="question-text">{gameQuestions[questionNumber].question}</p>
          {newArr.map((question) => {
            if (question === CORRECT_ANSWER) {
              const { difficulty } = gameQuestions[questionNumber];
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ (e) => this.handleAnswerStyle(e, difficulty) }
                  className="rquestion"
                  disabled={ timer }
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
                onClick={ this.handleAnswerStyle }
                key={ `wrong${answerIndex}` }
                disabled={ timer }
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

  render() {
    // const { seconds } = this.state;
    return (
      <div>
        {this.handleQuestions()}
        <button type="button" onClick={ this.changeToNextQuestion }>Next Question</button>
        {/* <p className="timer">{seconds}</p> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.game.questions,
  secondsLeft: state.timer.seconds,
  score: state.game.score,
  name: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addScore: (points) => dispatch(addPoints(points)),
  saveTime: (seconds) => dispatch(saveTimeLeft(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveTime: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  secondsLeft: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
