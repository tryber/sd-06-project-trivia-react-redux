import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const {
      APIQuestions,
      indexDinamico,
      disabled,
      classCorrect,
      classWrong,
      onClickCorrect,
      onClickWrong,
    } = this.props;
    const random = 0.5;
    return (
      <section className="game-answers">
        {
          APIQuestions[indexDinamico]
            .incorrect_answers.concat(APIQuestions[indexDinamico].correct_answer)
            .map((question, i) => {
              if (question === APIQuestions[indexDinamico].correct_answer) {
                return (
                  <button
                    type="button"
                    data-testid="correct-answer"
                    value="correct-answer"
                    key={ i }
                    disabled={ disabled }
                    className={ classCorrect }
                    onClick={ onClickCorrect }
                  >
                    {question}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  value="wrong-answer"
                  key={ i }
                  disabled={ disabled }
                  className={ classWrong }
                  onClick={ onClickWrong }
                >
                  {question}
                </button>
              );
            }).sort(() => Math.random() - random)
        }
      </section>
    );
  }
}

Questions.defaultProps = {
  classCorrect: 'btn-answer',
  classWrong: 'btn-answer',
};

Questions.propTypes = {
  indexDinamico: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  classCorrect: PropTypes.string,
  classWrong: PropTypes.string,
  onClickCorrect: PropTypes.func.isRequired,
  onClickWrong: PropTypes.func.isRequired,
  APIQuestions: PropTypes.arrayOf(
    PropTypes.shape(),
    PropTypes.array,
    PropTypes.string,
  ).isRequired,
};

export default Questions;
