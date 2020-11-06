import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class QuestionCard extends Component {
  render() {
    const { onClick, currentQuestion } = this.props;
    const { category, question } = currentQuestion;
    return (
      <div>
        QUESTION CARD
        <div data-testidclassName="question">
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div className="answers">
          <button
            data-testid="correct-answer"
            type="button"
            onClick={onClick}
          >
            { question.correct_answer }
          </button>
          {question.incorrect_answers.map((answer, index) => (
            <button data-testid={ `wrong-answer-${index}` } type="button" key={ index } onClick={onClick}>
              { answer }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions.results,
});

QuestionCard.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(QuestionCard);
