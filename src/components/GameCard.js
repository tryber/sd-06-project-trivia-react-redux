import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GameCard extends Component {
  constructor() {
    super();
    this.state = { addClass: false, timer: 30, disable: false };
    this.handleClick = this.handleClick.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
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
      });
    }
    console.log(timer);
  }

  handleClick() {
    this.setState({ addClass: true });
  }

  render() {
    const { addClass, disable, timer } = this.state;
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
              onClick={ this.handleClick }
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
};

export default GameCard;
