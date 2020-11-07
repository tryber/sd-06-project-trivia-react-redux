import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      addClass: false,
      timer: 30,
      disable: false,
      hidden: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const thousand = 1000;
    setInterval(this.updateTimer, thousand);
  }

  updateTimer() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({
        disable: true,
        hidden: false,
      });
    }
  }

  handleClick(option, question) {
    this.setState({
      addClass: true,
      hidden: false,
      disable: true,
    });
    const { timer } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);
    let { score, assertions } = state;
    console.log(question);

    if (option === question.correct_answer) {
      assertions += 1;
      let dificuldade = 0;
      const hardScore = 3;
      switch (question.difficulty) {
      case 'easy':
        dificuldade = 1;
        break;
      case 'medium':
        dificuldade = 2;
        break;
      case 'hard':
        dificuldade = hardScore;
        break;
      default:
        dificuldade = 0;
      }

      const baseScore = 10;
      score += baseScore + (timer * dificuldade);
      const player = JSON.parse(localStorage.getItem('state'));
      localStorage.setItem('state', JSON.stringify({ ...player, assertions, score }));
    } else {
      console.log('ERROU');
    }
  }

  handleNextQuestion() {
    const { nextQuestion } = this.props;
    nextQuestion();
    this.setState({
      timer: 30,
      disable: false,
      addClass: false,
      hidden: true,
    });
  }

  render() {
    const { addClass, disable, timer, hidden } = this.state;
    const { question } = this.props;
    const correctAnswer = question.correct_answer;
    const options = [...question.incorrect_answers, correctAnswer].sort();
    return (
      <div>
        <h3 data-testid="question-category">{`Categoria: ${question.category}`}</h3>
        <p data-testid="question-text">{question.question}</p>
        {options.map((option, index) => (
          <div key={ index }>
            <button
              data-testid={
                option === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
              }
              onClick={ () => this.handleClick(option, question) }
              className={ option === correctAnswer
                ? `${addClass ? 'correct' : ''}` : `${addClass ? 'incorrect' : ''}` }
              type="button"
              disabled={ disable }
            >
              {option}
            </button>
            <br />
          </div>
        ))}
        {timer}
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleNextQuestion }
          className={ hidden === true ? 'hidden' : '' }
        >
          Próxima
        </button>
      </div>
    );
  }
}

GameCard.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default GameCard;
