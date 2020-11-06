import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gettingQuestionsThunk } from '../redux/actions';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = { questionNumber: 0 };
  }

  componentDidMount() {
    const { getQuestions } = this.props;

    getQuestions();
  }

  checkAnswer() {
    const btnArray = document.getElementsByTagName('button');
    const btnNext = document.getElementById('next');

    for (let x = 0; x < btnArray.length; x += 1) {
      if (btnArray[x].id === 'correct') {
        btnArray[x].className = 'correct';
      } else if (btnArray[x].id !== 'next') {
        btnArray[x].className = 'incorrect';
      }
    }

    btnNext.style.display = 'block';
  }

  randomizeAnswers() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const answersArray = [];

    if (questions !== undefined) {
      const correct = (
        <button
          type="button"
          data-testid="correct-answer"
          key="correct-answer"
          id="correct"
          onClick={ this.checkAnswer }
        >
          { questions.results[Number(questionNumber)].correct_answer }
        </button>
      );

      const incorrect = (questions.results[Number(questionNumber)].incorrect_answers
        .map((answer) => (
          <button
            data-testid="wrong-answer"
            key={ answer }
            type="button"
            onClick={ this.checkAnswer }
          >
            { answer }
          </button>)));

      answersArray.push(...incorrect);
      answersArray.push(correct);

      const magicNumber = 5;
      const randomNumber = Math.floor(Math.random() * magicNumber + 1);
      const newArray = [];

      if (randomNumber % 2 === 0) {
        newArray.push(answersArray[3], answersArray[2], answersArray[1], answersArray[0]);
      } else {
        newArray.push(answersArray[1], answersArray[3], answersArray[0], answersArray[2]);
      }
      return newArray;
    }
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
    }), () => {
      const btnArray = document.getElementsByTagName('button');
      const btnNext = document.getElementById('next');

      btnNext.style.display = 'none';

      for (let x = 0; x < btnArray.length; x += 1) {
        btnArray[x].className = '';
      }
    });
  }

  render() {
    const { questions } = this.props;
    const { questionNumber } = this.state;

    return (
      questions === undefined ? <p>Loading...</p> : (
        <div>
          <div data-testid="question-category">
            { questions.results[Number(questionNumber)].category }
          </div>
          <div data-testid="question-text">
            { questions.results[Number(questionNumber)].question }
          </div>
          <div>
            { this.randomizeAnswers() }
          </div>
          <div>
            <button
              type="button"
              data-testid="btn-next"
              id="next"
              className="next"
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>
          </div>
        </div>
      ));
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.string, PropTypes.number])),
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
