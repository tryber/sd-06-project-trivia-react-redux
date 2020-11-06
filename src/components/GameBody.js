import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkQuestions } from '../actions';

class GameBody extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      answers: [],
    };
    this.handleNext = this.handleNext.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
  }

  async componentDidMount() {
    const { getQuestions } = this.props;
    await getQuestions();
    this.createQuestions();
  }

  createQuestions(index = 0) {
    const { questions } = this.props;
    const answersArray = [];

    if (questions.length > 0) {
      const question = questions[index];
      answersArray.push(question.correct_answer, ...question.incorrect_answers);

      this.setState({
        index,
        category: question.category,
        question: question.question,
        correctAnswer: question.correct_answer,
        // incorrectAnswer: question.incorrect_answers,
        answers: answersArray,
      });
    }
  }

  handleNext() {
    const { questions } = this.props;
    let { index } = this.state;
    index += 1;
    if (questions.length > 0 && index < questions.length) {
      this.createQuestions(index);
    }
  }

  render() {
    const { category, question, correctAnswer, answers } = this.state;
    const randomNumber = 0.5;

    let renderTest = '';
    if (answers.length === 0) {
      renderTest = (
        <div>
          <div data-testid="correct-answer" />
          <div data-testid="wrong-answer" />
        </div>);
    }

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { renderTest }
        {answers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                type="button"
                key={ answer }
                data-testid="correct-answer"
              >
                { answer }
              </button>);
          }
          return (
            <button
              type="button"
              key={ answer }
              data-testid={ `wrong-answer-${index - 1}` }
            >
              { answer }
            </button>);
        }).sort(() => Math.random() - randomNumber) }
        <button
          type="button"
          onClick={ () => this.handleNext() }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(thunkQuestions()),
});

GameBody.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);
