import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkQuestions } from '../actions';
import './gameBody.css';

class GameBody extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      answers: [],
      isCorrect: false,
      disabled: true,
    };
    this.handleNext = this.handleNext.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.changeColor = this.changeColor.bind(this);
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
    this.setState({
      isCorrect: false,
      disabled: true,
    });
  }

  changeColor() {
    this.setState({
      isCorrect: true,
      disabled: false,
    });
  }

  render() {
    const { category, question, correctAnswer,
      answers, isCorrect, disabled } = this.state;
    const randomNumber = 0.5;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        {answers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                type="button"
                className={ isCorrect ? 'buttonCorrect' : '' }
                key={ answer }
                data-testid="correct-answer"
                onClick={ () => this.changeColor() }
              >
                { answer }
              </button>);
          }
          return (
            <button
              type="button"
              className={ isCorrect ? 'buttonIncorrect' : '' }
              key={ answer }
              data-testid={ `wrong-answer-${index - 1}` }
              onClick={ () => this.changeColor() }
            >
              { answer }
            </button>);
        }).sort(() => Math.random() - randomNumber) }
        <br />
        <br />
        <button
          type="button"
          disabled={ disabled }
          data-testid={ disabled ? '' : 'btn-next' }
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
