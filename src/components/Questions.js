import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPoints, saveTimeLeft, updateQuestionNumber } from '../redux/actions';
import StopWatch from './StopWatch';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disableBTN: false,
      shuffledQuestions: [],
      shuffled: false,
      // timer: false,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleAnswerStyle = this.handleAnswerStyle.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.checkTimer = this.checkTimer.bind(this);
  }

  changeToNextQuestion() {
    const { questionNumber } = this.state;
    const indexLimit = 4;

    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
      disableBTN: false,
      shuffled: false,
    });

    const wrongList = document.querySelectorAll('.wrong-question');
    const rightQuestion = document.querySelector('.right-question');
    if (wrongList && rightQuestion) {
      wrongList.forEach((element) => {
        element.className = 'wquestion';
      });
      rightQuestion.className = 'rquestion';
    }
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

  checkDifficulty(difficulty) {
    const THREE = 3;
    if (difficulty === 'hard') return THREE;
    if (difficulty === 'medium') return 2;
    return 1;
  }

  handleAnswerStyle({ target }, difficulty) {
    if (target.className === 'wquestion' || target.className === 'rquestion') {
      const wrongList = document.querySelectorAll('.wquestion');
      const rightQuestion = document.querySelector('.rquestion');
      wrongList.forEach((element) => {
        element.className = 'wrong-question';
      });
      rightQuestion.className = 'right-question';

      this.setState({
        disableBTN: true,
      });
    }

    // o timer recebe os segundos que faltam
    // porém ainda não zera a cada pergunta
    const { secondsLeft, addScore, email, name } = this.props;
    const TEN = 10;
    const points = TEN + (secondsLeft * this.checkDifficulty(difficulty));
    if (target.className === 'right-question') {
      addScore(points);

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
    this.setState({ disableBTN: true });
  }

  handleQuestions() {
    const { gameQuestions } = this.props;
    const { disableBTN, shuffled, shuffledQuestions, questionNumber } = this.state;
    const initialIndex = -1;
    let answerIndex = initialIndex;
    const timeLimit = 30000;
    setTimeout(this.checkTimer, timeLimit);

    if (shuffled && shuffledQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      return (
        <div>
          <h4 data-testid="question-category">
            {gameQuestions[questionNumber].category}
          </h4>
          <p data-testid="question-text">{gameQuestions[questionNumber].question}</p>
          {shuffledQuestions.map((question) => {
            if (question === CORRECT_ANSWER) {
              const { difficulty } = gameQuestions[questionNumber];
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ (e) => this.handleAnswerStyle(e, difficulty) }
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
                onClick={ this.handleAnswerStyle }
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

  render() {
    const { shuffled } = this.state;
    const { gameQuestions } = this.props;

    if (!shuffled && gameQuestions) {
      this.shuffleArray();
    }

    return (
      <div>
        {this.handleQuestions()}
        <button type="button" onClick={ this.changeToNextQuestion }>Next Question</button>
        <StopWatch />
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
  updateQuestionNumber: (question) => dispatch(updateQuestionNumber(question)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // saveTime: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  secondsLeft: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
