import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const { question } = this.props;
    const arrayButtons = [
      <button
        key={ 3 }
        type="button"
        data-testid="correct-answer"
      >
        { question.correct_answer }
      </button>,
    ];

    question.incorrect_answers.map((incorret, indexIncorret) => (
      arrayButtons.push(
        <button
          type="button"
          key={ indexIncorret }
          data-testid={ `wrong-answer-${indexIncorret}` }
        >
          { incorret }
        </button>,
      )
    ));

    function shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    return (
      <div>
        <h3 data-testid="question-category">
          Categoria:
          { question.category }
        </h3>

        <p data-testid="question-text">
          Pergunta:
          { question.question }
        </p>

        <p>Alternativas:  </p>
        {shuffle(arrayButtons).map((button) => button) }
      </div>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.objectOf(Object).isRequired,
};

export default Questions;
