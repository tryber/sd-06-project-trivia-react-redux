import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class QuestionCards extends Component {
  render() {
    const { questionCard } = this.props;
    console.log(questionCard);
    return (
      <div>
        {questionCard
          ? (
            <div>
              <p data-testid="question-category">{questionCard[1].category}</p>
              <p data-testid="question-text">{questionCard[1].question}</p>
              <div>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {questionCard[1].correct_answer}
                </button>
                { questionCard[1].incorrect_answers.map((el, idx) => (
                  <button
                    data-testid={ `wrong-answer-${idx}` }
                    type="button"
                    key="1"
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
          ) : <p>não deu certo</p>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questionCard: state.questionReducer.question.results,
});

QuestionCards.propTypes = {
  questionCard: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(QuestionCards);
