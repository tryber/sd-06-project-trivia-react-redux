import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import { thunkQuestions } from '../actions';

class GameBody extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      category: '',
      index: 0,
    }
    this.handleNext = this.handleNext.bind(this);
  }

  async componentDidMount() {
    const { getQuestions } = this.props;
    await getQuestions();
    const { questions } = this.props;
    const { index } = this.state;

    if(questions.length > 0  ) {
      this.setState({
        loading: false,
        category: questions[index].category,
        question: questions[index].question,
        correct_answer: questions[index].correct_answer,
        incorrect_answer: questions[index].incorrect_answer,
      });
    }
  }

  handleNext() {
    const { questions } = this.props;
    let { index } = this.state;
    index += 1;
    if(questions.length > 0 && index < questions.length ) {
      this.setState({
        index,
        category: questions[index].category,
        question: questions[index].question,
        correct_answer: questions[index].correct_answer,
        incorrect_answer: questions[index].incorrect_answer,
      })
    }
  }

  render() {
    const { loading, category, question, correct_answer, incorrect_answer } = this.state;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button data-testid="correct-answer">{ correct_answer }</button>
        <button data-testid="wrong-answer-${index}">{ incorrect_answer }</button>
        <button
          onClick={ () => this.handleNext() }
        >
          Next
        </button>
      </div>
    )
  }}

const mapStateToProps = (state) => ({
  questions: state.questionReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(thunkQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);

// data-testid="question-category"
// data-testid="question-text"
// data-testid="correct-answer"
// data-testid="wrong-answer-${index}".

