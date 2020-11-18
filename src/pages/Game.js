import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchGameQuestions from '../services/fetchGameQuestions';
import './style_sheets/Game.scss';
import { GameHeader, GameTimer } from '../components';
import {
  randomizeAnswers,
  createLocalStore,
  calculateScore,
  saveRankingLocalStorage } from '../utils';
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
    const { difficulty, category, type } = this.props;
    const API_RESPONSE = await fetchGameQuestions(difficulty, category, type);
    const QUESTIONS = API_RESPONSE.results;

    await this.saveQuestionsToState(QUESTIONS);
    await this.setCurrentQuestion();
  }

  componentWillUnmount() {
    const { name, email, score } = this.props;
    saveRankingLocalStorage(name, score, email);
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
      const { time, dispatchSaveScore, dispatchCorrectAnswers, name, email } = this.props;
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
      createLocalStore(name, score, email, correctAnswers);
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
      <section>
        <h2 className="question-category" data-testid="question-category">
          {currentQuestion.category}
        </h2>
        <main className="game-board">
          <section className="game-board-inner-container-top">
            <div className="question-text" data-testid="question-text">
              {currentQuestion.question}
            </div>
          </section>
          <section className="game-board-inner-container-bottom">
            <div className="game-answers">
              {currentAnswers.map((answer, index) => (
                answer.isCorrect
                  ? <button
                    type="button"
                    key={ index }
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
                    key={ index }
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
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="game-page">
        <GameHeader />
        <div className="game-board-container">
          {isLoading ? <p>Loading</p> : this.renderGameBoard()}
          <GameTimer />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  time: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatchSaveScore: PropTypes.func.isRequired,
  dispatchCorrectAnswers: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.game.time,
  name: state.player.player.name,
  email: state.player.player.gravatarEmail,
  score: state.player.player.score,
  category: state.settings.category,
  type: state.settings.type,
  difficulty: state.settings.difficulty,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveScore: (score) => dispatch(saveScore(score)),
  dispatchCorrectAnswers:
    (correctAnswers) => dispatch(saveCorrectAnswers(correctAnswers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
