import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchGameQuestions from '../services/fetchGameQuestions';
import './style_sheets/Game.css';
import { GameHeader, GameTimer } from '../components';
import { randomizeAnswers, createLocalStore, calculateScore } from '../utils';
import { saveScore, saveCorrectAnswers } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.saveQuestionsToState = this.saveQuestionsToState.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);

    this.state = {
      questions: [],
      index: 0,
      isLoading: true,
      nextButtonClass: 'button-invisible',
      answerColor: false,
      score: 0,
      correctAnswers: 0,
      currentQuestion: {},
      currentAnswers: [],
      isAnswered: false,
      isCorrect: false,
    };
  }

  async componentDidMount() {
    const API_RESPONSE = await fetchGameQuestions();
    const QUESTIONS = API_RESPONSE.results;

    await this.saveQuestionsToState(QUESTIONS);
    this.setCurrentQuestion();
  }

  setCurrentQuestion() {
    const { questions, index } = this.state;
    const nextQuestion = questions[index];
    const { correct_answer: correct, incorrect_answers: incorrect } = nextQuestion;
    const randomizedAnswers = randomizeAnswers(correct, incorrect);
    this.setState({ currentAnswers: randomizedAnswers, currentQuestion: nextQuestion });
  }

  saveQuestionsToState(questions) {
    this.setState({ questions, isLoading: false });
  }

  async nextButton() {
    let { index } = this.state;
    index += 1;

    const maxQuestions = 4;
    if (index > maxQuestions) {
      const { history } = this.props;
      history.push('/feedback');
    }

    await this.setState({ index, answerColor: false, isAnswered: false });
    this.setCurrentQuestion();
  }

  async handleClick({ target }) {
    this.setState({ nextButtonClass: 'button-visible', isAnswered: true });
    const { id } = target;

    if (id === 'correct-answer') {
      const { currentQuestion: { difficulty } } = this.state;
      const { time, dispatchSaveScore, dispatchCorrectAnswers } = this.props;
      const questionScore = calculateScore(time, difficulty);

      await this.setState((currentState) => ({
        ...currentState,
        answerColor: true,
        score: currentState.score + questionScore,
        correctAnswers: currentState.correctAnswers + 1,
      }));

      const { score, correctAnswers } = this.state;
      dispatchSaveScore(score);
      dispatchCorrectAnswers(correctAnswers);
      createLocalStore(null, score);
    } else {
      this.setState({
        answerColor: true,
      });
    }
  }

  renderGameBoard() {
    const {
      currentAnswers,
      currentQuestion,
      answerColor,
      nextButtonClass,
      isAnswered } = this.state;
    const { time } = this.props;

    return (
      <main className="game-board">
        <section className="game-board-container">
          <div className="question-category" data-testid="question-category">
            {currentQuestion.category}
          </div>
          <div className="question-text" data-testid="question-text">
            {currentQuestion.question}
          </div>
        </section>
        <section className="game-board-container">
          <div className="game-answers">
            {currentAnswers.map((answer) => (
              answer.isCorrect
                ? <button
                  type="button"
                  id="correct-answer"
                  data-testid="correct-answer"
                  className={ answerColor ? 'correct-answer' : null }
                  onClick={ this.handleClick }
                  disabled={ (time === 0 || isAnswered) ? true : null }
                >
                  {answer.correctAnswer}
                </button>
                : <button
                  type="button"
                  id="wrong-answer"
                  data-testid={ `wrong-answer-${answer.index}` }
                  className={ answerColor ? 'wrong-answer' : null }
                  onClick={ this.handleClick }
                  disabled={ (time === 0 || isAnswered) ? true : null }
                >
                  {answer.answer}
                </button>
            ))}
          </div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextButton }
            className={ nextButtonClass }
          >
            Próxima
          </button>
        </section>
      </main>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <GameHeader />
        {isLoading ? <p>Loading</p> : this.renderGameBoard()}
        <GameTimer />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  dispatchSaveScore: PropTypes.func.isRequired,
  dispatchCorrectAnswers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.game.time,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveScore: (score) => dispatch(saveScore(score)),
  dispatchCorrectAnswers: (correctAnswers) => dispatch(saveCorrectAnswers(correctAnswers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
