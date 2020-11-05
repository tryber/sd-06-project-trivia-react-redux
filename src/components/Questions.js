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
    const { questions } = this.props;
      const questionNumber = 0;
      return (
        questions === undefined ? <p>Teste</p> : (
        <div>
          <div data-testid="question-category">
            { questions.results[questionNumber].category }
          </div>
          <div data-testid="question-text">
            { questions.results[questionNumber].question }
          </div>
          <div>
            <button data-testid="correct-answer">{ questions.results[questionNumber].correct_answer }</button>
            { questions.results[questionNumber].incorrect_answers.map((answer, index) => <button data-testid={ `incorrect_answer${index}` } key={ answer }>{ answer }</button>) }
          </div>
        </div>
      ));
    }    
}

const mapStateToProps = (state) => ({
  questions: state.userReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(gettingQuestionsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);