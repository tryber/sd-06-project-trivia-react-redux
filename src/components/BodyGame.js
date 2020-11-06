import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import '../App.css';

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
      questionsFunction();
    }
  }

  handleAnswerBorderColor() {
    const rightAnswer = document.querySelector('#right-answer');
    rightAnswer.className = 'right-question';
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.className = 'wrong-question';
    });
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
                <button
                  id="right-answer"
                  type="button"
                  data-testid="correct-answer"
                  name="right-answer"
                  onClick={ this.handleAnswerBorderColor }
                >
                  {question.correct_answer}
                </button>
                {question.incorrect_answers.map((item, position) => (
                  <button
                    id="wrong-answer"
                    type="button"
                    key={ position }
                    data-testid={ `wrong-answer-${position}` }
                    name="wrong-answer"
                    onClick={ this.handleAnswerBorderColor }
                  >
                    {item}
                  </button>
                ))}
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
