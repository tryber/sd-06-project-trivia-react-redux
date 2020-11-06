import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';

class BodyGame extends Component {
  componentDidMount() {
    const { questionsFunction, getToken } = this.props;

    if (getToken !== '') {
      questionsFunction();
    }
  }

  componentDidUpdate(prevProps) {
    const { getToken, questionsFunction } = this.props;

    if (getToken !== prevProps.getToken && getToken !== '') {
      console.log(questionsFunction());
    }
  }

  render() {
    const { questions } = this.props;
    return (
      <div className="container">
        {questions.map((question, index) => (
          <div key={ index }>
            <div className="box-question">
              <div className="field-category">
                <h3 data-testid="question-category">{question.category}</h3>
              </div>
              <div className="field-question">
                <p data-testid="question-text">{question.question}</p>
              </div>
            </div>
            <div className="box-alternatives">
              <div>
                <button type="button" data-testid="correct-answer">
                  {question.correct_answer}
                </button>
                {question.incorrect_answers.map(((iten, position) => (
                  <button
                    type="button"
                    key={ position }
                    data-testid={ `wrong-answer-${position}` }
                  >
                    {iten}
                  </button>
                )))}
              </div>
            </div>
          </div>
        )).filter((_, index) => index === 0)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.apiReducer.token,
  questions: state.apiReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  questionsFunction: () => dispatch(fetchQuestions()),
});

BodyGame.propTypes = {
  questionsFunction: PropTypes.func,
  getToken: PropTypes.string,
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(BodyGame);
