import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { questionObj } = this.props;
    const { category, question } = questionObj;
    const correctAnswer = questionObj.correct_answer;
    const incorrectAnswers = questionObj.incorrect_answers;
    let allAnswers = [...incorrectAnswers, correctAnswer];
    // Shuffle retirado de https://flaviocopes.com/how-to-shuffle-array-javascript/
    const number = 0.5;
    allAnswers = allAnswers.sort(() => Math.random() - number);

    return (
      <div>
        <h4 data-testid="question-category">{category}</h4>
        <p data-testid="question-text">{question}</p>
        {allAnswers.map((answer, index) => (
          answer === correctAnswer
            ? (
              <button
                key={ index }
                type="button"
                data-testid="correct-answer"
              >
                {answer}
              </button>)
            : (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>)
        ))}
      </div>
    );
  }
}

export default Questions;

Questions.propTypes = {
  questionObj: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(String),
  }).isRequired,
};
