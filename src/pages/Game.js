import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import {
  updateLocalStorageAction,
  resetTimer,
  renderTime,
  resetScoreAction,
} from '../actions';
import '../css/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      answered: false,
      generatedAnswer: false,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderNext = this.renderNext.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.chooseNextQuestion = this.chooseNextQuestion.bind(this);
    this.createInterval = this.createInterval.bind(this);
    this.clearIntervalTimer = this.clearIntervalTimer.bind(this);
    this.stopCreatingCorrectAnswer = this.stopCreatingCorrectAnswer.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
  }

  componentDidMount() {
    const { createInterval, handleLocalStorage } = this;
    const { resetScore } = this.props;
    const startTime = 5000;
    handleLocalStorage();
    resetScore();
    setTimeout(createInterval(), startTime);
  }

  componentDidUpdate() {
    const { clearIntervalTimer, chooseAnswer } = this;
    const { interval, answered } = this.state;
    const { timer } = this.props;
    if (timer === 0 && !answered) {
      clearIntervalTimer(interval);
      chooseAnswer();
    }
  }

  createInterval() {
    const { timeController } = this.props;
    const oneSec = 1000;
    this.setState({ interval: setInterval(() => timeController(), oneSec) });
  }

  clearIntervalTimer() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  handleScore({ target: { innerText } }) {
    const {
      difficulty,
      timer,
      questions,
      updateLocalStorage,
    } = this.props;
    const { clearIntervalTimer } = this;
    const { questionNumber } = this.state;
    const baseScore = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;

    let difficultyMultiplier = 0;

    switch (difficulty) {
    case 'medium':
      difficultyMultiplier = medium;
      break;
    case 'hard':
      difficultyMultiplier = hard;
      break;
    default:
      difficultyMultiplier = easy;
    }

    if (innerText === questions[questionNumber].correct_answer) {
      const addScore = baseScore + (timer * difficultyMultiplier);
      updateLocalStorage(addScore);
    }

    clearIntervalTimer();
  }

  chooseAnswer() {
    this.setState({ answered: true });
  }

  stopCreatingCorrectAnswer() {
    this.setState({ generatedAnswer: true });
  }

  chooseNextQuestion() {
    const { createInterval, clearIntervalTimer } = this;
    const { toResetTimer, history } = this.props;
    const { questionNumber } = this.state;
    const lastQuestion = 4;

    toResetTimer();
    clearIntervalTimer();

    if (questionNumber === lastQuestion) {
      history.push('/feedback');
    } else {
      createInterval();
      this.setState((prevState) => ({
        questionNumber: prevState.questionNumber + 1,
        answered: false,
        generatedAnswer: false,
      }));
    }
  }

  handleLocalStorage() {
    const { name, gravatarEmail } = this.props;
    const newPlayerStorage = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(newPlayerStorage));
  }

  renderQuestions() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    return (
      <div className="game-question-texts">
        <h4 data-testid="question-category">{ questions[questionNumber].category }</h4>
        <h4 data-testid="question-text">{ questions[questionNumber].question }</h4>
      </div>
    );
  }

  renderAnswers() {
    const { questionNumber, answered, generatedAnswer } = this.state;
    const {
      chooseAnswer,
      stopCreatingCorrectAnswer,
      handleScore,
    } = this;
    const { questions, timer } = this.props;
    const correctAnswerPosition = Math
      .floor(Math
        .random() * questions[questionNumber].incorrect_answers.length + 1);
    const answers = questions[questionNumber].incorrect_answers;

    if (!generatedAnswer) {
      answers.splice(correctAnswerPosition, 0, questions[questionNumber].correct_answer);
      stopCreatingCorrectAnswer();
    }

    return (
      <div
        role="button"
        className="answers-container"
        onClick={ handleScore }
        onKeyUp={ handleScore }
        tabIndex={ 0 }
      >
        {
          answers.map((answer, index) => {
            if (answer === questions[questionNumber].correct_answer) {
              return (
                <button
                  className={ answered ? 'correct-answer' : 'regular-answer' }
                  type="button"
                  onClick={ chooseAnswer }
                  data-testid="correct-answer"
                  name="correct"
                  key={ index }
                  disabled={ (timer === 0 || answered) }
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                className={ answered ? 'wrong-answer' : 'regular-answer' }
                type="button"
                onClick={ chooseAnswer }
                data-testid={ `wrong-answer-${index}` }
                name="wrong"
                key={ index }
                disabled={ (timer === 0 || answered) }
              >
                { answer }
              </button>
            );
          })
        }
      </div>
    );
  }

  renderNext() {
    const { answered } = this.state;
    const { chooseNextQuestion } = this;
    if (answered) {
      return (
        <div>
          <button
            type="button"
            data-testid="btn-next"
            className="next-question-button"
            onClick={ chooseNextQuestion }
          >
            Próxima
          </button>
        </div>
      );
    }
  }

  render() {
    const { renderAnswers, renderQuestions, renderNext } = this;
    const { timer } = this.props;

    return (
      <div>
        <div>
          <Header />
          <div>
            Tempo:
            { timer }
          </div>
        </div>
        <div className="game-question-container">
          { renderQuestions() }
        </div>
        { renderAnswers() }
        { renderNext() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  questions: state.game.questions,
  difficulty: state.game.difficulty,
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  updateLocalStorage: (score) => dispatch(updateLocalStorageAction(score)),
  toResetTimer: () => dispatch(resetTimer()),
  timeController: () => dispatch(renderTime()),
  resetScore: () => dispatch(resetScoreAction()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateLocalStorage: PropTypes.func.isRequired,
  toResetTimer: PropTypes.func.isRequired,
  timeController: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
