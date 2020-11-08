import React from 'react';
import PropTypes from 'prop-types';

import '../Css/Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
    };
  }

  render() {
    const { answered } = this.state;
    const { questionObj } = this.props;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questionObj;

    const allAnswers = [...incorrectAnswers, correctAnswer];
    // Shuffle retirado de https://flaviocopes.com/how-to-shuffle-array-javascript/
    const randomNumber = 0.5;
    allAnswers.sort(() => Math.random() - randomNumber);

    return (
      <div className="main-wrapper">
        <h4 data-testid="question-category">{ category }</h4>
        <section className="question-wrapper">
          <p data-testid="question-text">{ question }</p>
          <section className="answers-wrapper">
            {allAnswers.map((answer, index) => (
              answer === correctAnswer
                ? (
                  <button
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    className={ `answer-button
                    ${(answered) ? 'check-correct-answer' : ''}` }
                  >
                    {answer}
                  </button>)
                : (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    className={ `answer-button
                    ${(answered) ? 'check-incorrect-answer' : ''}` }
                  >
                    {answer}
                  </button>)
            ))}
          </section>
        </section>
      </div>
    );
  }
}

Questions.propTypes = {
  questionObj: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(String),
  }).isRequired,
};

export default Questions;
