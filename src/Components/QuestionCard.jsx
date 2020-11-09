import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  constructor(props) {
    super();

    const { questions } = props;
    const answersArray = [...questions.incorrect_answers, questions.correct_answer];
    answersArray.sort(() => 0.5 - Math.random());

    this.renderButtons = this.renderButtons.bind(this);

    this.state = { answersArray };
  }

  decode(text) {
    const element = document.createElement('textarea');
    element.innerHTML = text;
    return element.value;
  }

  renderButtons(index, question, className) {
    const { disabled, checkAnswer } = this.props;
    const text = this.decode(question);

    return (
      <button
        id={ className }
        type="button"
        key={ index }
        disabled={ disabled }
        className="btn"
        data-testid={
          className === 'wrong-answer' ? `wrong-answer${index}` : 'correct-answer'
        }
        onClick={ checkAnswer }
      >
        {text}
      </button>
    );
  }

  render() {
    const { answersArray } = this.state;
    const { questions } = this.props;
    const { category, question, correct_answer: correctAnswer } = questions;

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h2 data-testid="question-text">{this.decode(question)}</h2>
        <div>
          { answersArray.map((answer, index) => {
            if (answer === correctAnswer) {
              return this.renderButtons(index, answer, 'correct-answer');
            }
            return this.renderButtons(index, answer, 'wrong-answer');
          }) }
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  disabled: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
