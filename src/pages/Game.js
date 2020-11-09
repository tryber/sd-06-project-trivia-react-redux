import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateScore, resetTimer, renderTime } from '../actions';
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
    const startTime = 5000;
    handleLocalStorage('create');
    setTimeout(createInterval(), startTime);
  }

  componentDidUpdate() {
    const { timer } = this.props;
    const { interval } = this.state;
    const { clearIntervalTimer } = this;
    if (timer === 0) {
      clearIntervalTimer(interval);
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
      toUpdateScore,
      timer,
      questions,
    } = this.props;
    const { clearIntervalTimer, handleLocalStorage } = this;
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
      toUpdateScore(addScore);
    }

    handleLocalStorage('update');
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
    const { toResetTimer } = this.props;
    toResetTimer();
    clearIntervalTimer();
    createInterval();
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      answered: false,
      generatedAnswer: false,
    }));
  }

  handleLocalStorage(action) {
    const { name, assertions, score, gravatarEmail } = this.props;

    if (action === 'create') {
      const newPlayerStorage = {
        player: {
          name,
          assertions,
          score,
          gravatarEmail,
        },
      };
      localStorage.setItem('state', JSON.stringify(newPlayerStorage));
    } else if (action === 'update') {
      const currentLocalStorage = JSON.parse(localStorage.getItem('state'));
      currentLocalStorage.player.name = name;
      currentLocalStorage.player.assertions = assertions;
      currentLocalStorage.player.score = score;
      currentLocalStorage.player.gravatarEmail = gravatarEmail;
      localStorage.setItem('state', JSON.stringify(currentLocalStorage));
    }
  }

  renderQuestions() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    return (
      <div>
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
        onClick={ handleScore }
        onKeyUp={ handleScore }
        tabIndex={ 0 }
      >
        {
          answers.map((answer, index) => {
            if (answer === questions[questionNumber].correct_answer) {
              return (
                <button
                  className={ answered ? 'correct-answer' : null }
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
                className={ answered ? 'wrong-answer' : null }
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
        { renderQuestions() }
        { renderAnswers() }
        { renderNext() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  difficulty: state.game.difficulty,
  timer: state.game.timer,
  score: state.game.score,
  assertions: state.game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  toUpdateScore: (score) => dispatch(updateScore(score)),
  toResetTimer: () => dispatch(resetTimer()),
  timeController: () => dispatch(renderTime()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  toUpdateScore: PropTypes.func.isRequired,
  toResetTimer: PropTypes.func.isRequired,
  timeController: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
