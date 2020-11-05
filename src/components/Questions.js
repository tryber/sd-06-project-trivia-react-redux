import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gettingQuestionsThunk } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = { questions : [], };
  }  

  componentDidMount() {
    const { getQuestions } = this.props;

    getQuestions();
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;

    if( prevProps.questions !== questions ) {
      this.setState({ questions: questions.results });
    }
  }

  render () {
    const { questions } = this.state;
    const categories = questions.map((question) => question.category);
    const tasks = questions.map((question) => question.question);
    const correct_answer = questions.map((question) => question.correct_answer);
    const incorrect_answers = questions.map((question) => question.incorrect_answers);
    const questionNumber = 0;
    console.log(questions);

    return (
      <div>
        <div data-testid="question-category">
          { categories[questionNumber] }
        </div>
        <div data-testid="question-text">
          { tasks[questionNumber] }
        </div>
        <div>
          <button data-testid="correct-answer">{ correct_answer[questionNumber] }</button>
          <button>{ incorrect_answers[questionNumber] }</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.userReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(gettingQuestionsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);