import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  render() {
    const { questions } = this.props;
    const { category, question } = questions[0];
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
          >
            { questions[0].correct_answer }
          </button>
          {questions[0].incorrect_answers.map((answer, index) => (
            <button data-testid={ `wrong-answer-${index}` } type="button" key={ index }>
              { answer }
            </button>
          ))}
        </div>
        <button type="button">Próxima</button>
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
