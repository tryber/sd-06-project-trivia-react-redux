import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionCard extends Component {
  constructor() {
    super();

    this.updateStates = this.updateStates.bind(this);

    this.state = {
      answers: [],
      updatedStates: false,
    };
  }

  componentDidMount() {
    this.updateStates();
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

    console.log(answers);

    this.setState({
      answers,
      updatedStates: true,
    });
  }

  render() {
    const {
      question: { category, question, correct_answer: correctAnswer },
    } = this.props;
    const { answers, updatedStates } = this.state;

    if (!updatedStates) {
      return <p>Loading...</p>;
    }

    const correctAnswerIdx = answers.findIndex(
      (item) => item === correctAnswer,
    );
    const startingIdx = -2;
    let currentIdx = startingIdx + 1;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h5 data-testid="question-text">{question}</h5>
        <div>
          {answers.map((item, index) => {
            if (index === correctAnswerIdx) {
              return (
                <button data-testid="correct-answer" type="button">
                  {correctAnswer}
                </button>
              );
            }
            currentIdx += 1;
            return (
              <button
                key={ index }
                data-testid={ `wrong-answer-${currentIdx}` }
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
};
