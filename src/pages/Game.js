import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchGameQuestions from '../services/fetchGameQuestions';
import './style_sheets/Game.css';
import GameHeader from '../components/GameHeader';
// teste
class Game extends Component {
  constructor() {
    super();

    this.saveQuestionsToState = this.saveQuestionsToState.bind(this);
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      questions: [],
      index: 0,
      isLoading: true,
      nextButtonClass: 'button-invisible',
      answerColor: false,
    };
  }

  async componentDidMount() {
    const API_RESPONSE = await fetchGameQuestions();
    const QUESTIONS = API_RESPONSE.results;

    this.saveQuestionsToState(QUESTIONS);
  }

  saveQuestionsToState(questions) {
    this.setState({ questions, isLoading: false });
  }

  insertIndexIntoAnswers(array) {
    const arrayWithIndexes = [];

    array.forEach((item, index) => {
      const newItem = { answer: item, index };
      arrayWithIndexes.push(newItem);
    });

    return arrayWithIndexes;
  }

  randomizeAnswers(correctAnswer, wrongAnswers) {
    const withIndex = this.insertIndexIntoAnswers(wrongAnswers);

    const RANDOM_ANSWERS = [{ correctAnswer, isCorrect: true }, ...withIndex];

    for (let i = RANDOM_ANSWERS.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = RANDOM_ANSWERS[i];
      RANDOM_ANSWERS[i] = RANDOM_ANSWERS[j];
      RANDOM_ANSWERS[j] = temp;
    }

    return RANDOM_ANSWERS;
  }

  nextButton() {
    let { index } = this.state;
    index += 1;
    const numberFour = 4;
    if (index > numberFour) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({ index });
  }

  handleClick({ target }) {
    this.setState({ nextButtonClass: 'button-visible' });
    const { id } = target;
    if (id === 'correct-answer') {
      this.setState({
        answerColor: true,
      });
    } else {
      this.setState({
        answerColor: true,
      });
    }
  }

  renderGameBoard() {
    const { questions, index, answerColor, nextButtonClass } = this.state;
    const currentQuestion = questions[index];
    const { correct_answer: correct, incorrect_answers: incorrect } = currentQuestion;
    const randomizedAnswers = this.randomizeAnswers(correct, incorrect);

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
            {randomizedAnswers.map((answer) => (
              answer.isCorrect
                ? <button
                  type="button"
                  id="correct-answer"
                  data-testid="correct-answer"
                  className={ answerColor ? 'correct-answer' : null }
                  onClick={ this.handleClick }
                >
                  {answer.correctAnswer}
                </button>
                : <button
                  type="button"
                  id="wrong-answer"
                  data-testid={ `wrong-answer-${answer.index}` }
                  className={ answerColor ? 'wrong-answer' : null }
                  onClick={ this.handleClick }
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
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Game;
