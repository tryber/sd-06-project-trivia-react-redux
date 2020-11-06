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
    this.setState({
      loading: false,
      category: questions[index].category,
    });
  }

  handleNext() {
    const { questions } = this.props;
    let { index } = this.state;
    index += 1;
    if(index < questions.length) {
      this.setState({
        index,
        category: questions[index].category,
      })
    }
  }

  render() {
    const { loading, category } = this.state;
    if (loading) {
      return <Loading/>
    }
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
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

