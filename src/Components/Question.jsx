import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Question.css';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      classCorrect: 'btn',
      classIncorrect: 'btn',
    }

    this.randomQuestions = this.randomQuestions.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  checkAnswer() {
    this.setState(() => {
      return {
        classCorrect: 'btn-correct',
        classIncorrect: 'btn-incorrect'
      }
    });
  }

  randomQuestions() {
    const { getQuestions } = this.props;
    const arrayHTML = getQuestions[0].incorrect_answers.map((incorrect, index) => {
      return (
        <button
          id="wrong-answer"
          type="button"
          key={index}
          className={this.state.classIncorrect}
          data-testid={`wrong-answer`}
          onClick={this.checkAnswer}
        >
          {incorrect}
        </button>
      );
    });
    arrayHTML.push(
      <button
        id="correct-answer"
        type="button"
        key="correct"
        className={this.state.classCorrect}
        data-testid="correct-answer"
        onClick={this.checkAnswer}
      >
        {getQuestions[0].correct_answer}
      </button>
    );
    const newArray = this.shuffleArray(arrayHTML);
    return newArray;
  }

  render() {
    const { getQuestions } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{getQuestions[0].category}</h2>
        <h1 data-testid="question-text">{getQuestions[0].question}</h1>
        { this.randomQuestions().map((answer) => answer) }
      </div>
    );
  }
}

Question.propTypes = {
  getQuestions: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  getQuestions: state.questions.questionsArray,
});

export default connect(mapStateToProps, null)(Question);
