import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gettingQuestionsThunk } from '../redux/actions';

class Questions extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;

    getQuestions();
  }

  render() {
    const { questions } = this.props;
    const questionNumber = 0;
    return (
      questions === undefined ? <p>Loading...</p> : (
        <div>
          <div data-testid="question-category">
            { questions.results[questionNumber].category }
          </div>
          <div data-testid="question-text">
            { questions.results[questionNumber].question }
          </div>
          <div>
            <button type="button" data-testid="correct-answer">
              { questions.results[questionNumber].correct_answer }
            </button>
            {
              questions.results[questionNumber].incorrect_answers
                .map((answer, index) => (
                  <button
                    data-testid={ `incorrect_answer${index}` }
                    key={ answer }
                    type="button"
                  >
                    { answer }
                  </button>))
            }
          </div>
        </div>
      ));
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)),
};

Questions.defaultProps = {
  questions: undefined,
};

const mapStateToProps = (state) => ({
  questions: state.userReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(gettingQuestionsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
