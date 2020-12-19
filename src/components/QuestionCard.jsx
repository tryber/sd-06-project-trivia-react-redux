import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CSS/QuestionCardCSS.css';
import { NextButton } from './NextButton';
import { sendScore } from '../actions';

class QuestionCard extends Component {
  constructor() {
    super();

    this.saveInfoToLocalStorage = this.saveInfoToLocalStorage.bind(this);
    this.updateStates = this.updateStates.bind(this);
    this.activateBorders = this.activateBorders.bind(this);
    this.activateQuestions = this.activateQuestions.bind(this);
    this.timeUp = this.timeUp.bind(this);
    this.handleChosenAnswer = this.handleChosenAnswer.bind(this);
    this.updateNextQuestion = this.updateNextQuestion.bind(this);

    this.state = {
      answers: [],
      updatedStates: false,
      answersBorderActive: false,
      timeIsUp: false,
      time: 32,
      hasChosen: false,
      correctAnswer: '',
      chosenAnswer: '',
    };
  }

  componentDidMount() {
    this.saveInfoToLocalStorage();
    this.updateStates();
    this.startTimer();
  }

  componentDidUpdate() {
    this.saveInfoToLocalStorage();
  }

  saveInfoToLocalStorage() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const playerInfo = JSON.stringify({
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    });
    localStorage.setItem('state', playerInfo);
  }

  updateStates() {
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

    const answers = [correctAnswer, ...incorrectAnswers];

    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    this.setState({
      answers,
      updatedStates: true,
      correctAnswer,
    });
  }

  resetStates() {
    this.setState(
      {
        answersBorderActive: false,
        timeIsUp: false,
        time: 32,
        hasChosen: false,
      },
      () => {
        this.updateStates();
        this.startTimer();
      },
    );
  }

  handleChosenAnswer(chosenAnswer, difficulty) {
    this.setState(
      {
        hasChosen: true,
        answersBorderActive: true,
        chosenAnswer,
      },
      () => {
        this.stopTimer();
        const { time } = this.state;
        this.calculateScore(time, difficulty);
      },
    );
  }

  calculateScore(time, difficulty) {
    const { correctAnswer, chosenAnswer } = this.state;
    const { addScore } = this.props;
    const scoreMultiplier = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const SCORE_OFFSET = 10;

    const score = correctAnswer === chosenAnswer
      ? SCORE_OFFSET + time * scoreMultiplier[difficulty]
      : 0;
    addScore(score);
  }

  activateBorders() {
    this.setState({
      answersBorderActive: true,
    });
  }

  activateQuestions() {
    this.setState({ playing: true });
  }

  startTimer() {
    const INTERVAL = 1000;
    this.timer = setInterval(() => {
      this.setState(
        (prev) => ({
          ...prev,
          time: prev.time - 1,
        }),
        () => {
          const { time } = this.state;
          if (time === 0) {
            this.stopTimer();
            this.timeUp();
          }
        },
      );
    }, INTERVAL);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  timeUp() {
    this.setState({
      timeIsUp: true,
      answersBorderActive: true,
    });
  }

  updateNextQuestion() {
    const { updateQuestion } = this.props;
    updateQuestion();
    this.resetStates();
  }

  render() {
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        difficulty,
      },
    } = this.props;
    const {
      answers,
      updatedStates,
      answersBorderActive,
      timeIsUp,
      hasChosen,
      chosenAnswer,
      time,
    } = this.state;

    if (!updatedStates) {
      return <p>Loading...</p>;
    }

    const correctAnswerIdx = answers.findIndex(
      (item) => item === correctAnswer,
    );
    const startingIdx = -2;
    let currentIdx = startingIdx + 1;
    return (
      <div className="question-card">
        <p className="category" data-testid="question-category">
          <p className="category-title">Category</p>
          <p className="category-content">{category}</p>
        </p>
        <div>
          <h3>
            Timer:
            {time}
          </h3>
        </div>
        <div className="question-container">
          <p className="question" data-testid="question-text">
            {question}
          </p>
          <div className="answers">
            {answers.map((item, index) => {
              if (index === correctAnswerIdx) {
                return (
                  <button
                    className={
                      !answersBorderActive ? 'answers' : 'correct-answer'
                    }
                    data-testid="correct-answer"
                    type="button"
                    onClick={ () => this.handleChosenAnswer(correctAnswer, difficulty) }
                    disabled={ timeIsUp || hasChosen }
                  >
                    {correctAnswer}
                  </button>
                );
              }
              currentIdx += 1;
              return (
                <button
                  className={ !answersBorderActive ? 'answers' : 'wrong-answer' }
                  key={ index }
                  data-testid={ `wrong-answer-${currentIdx}` }
                  type="button"
                  onClick={ () => this.handleChosenAnswer(item, difficulty) }
                  disabled={ timeIsUp || hasChosen }
                >
                  {item}
                </button>
              );
            })}
            <div className="next-button">
              {!answersBorderActive ? null : (
                <NextButton updateQuestion={ this.updateNextQuestion } />
              )}
            </div>
          </div>
        </div>
        {hasChosen && chosenAnswer === correctAnswer ? (
          <h2>Certa resposta!</h2>
        ) : (
          hasChosen && <h2>Errou!</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userLogin.player.name,
  score: state.userLogin.player.score,
  gravatarEmail: state.userLogin.player.gravatarEmail,
  assertions: state.userLogin.player.assertions,
  questions: state.questions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  addScore: (score) => dispatch(sendScore(score)),
});

QuestionCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  addScore: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
