import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();
    this.randomQuestions = this.randomQuestions.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
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

  randomQuestions() {
    const { getQuestions } = this.props;
    const arrayHTML = getQuestions[0].incorrect_answers.map((incorrect, index) => {
      return (
        <button
          key={index}
          className="btn"
          data-testid={`wrong-answer`}
        >
          {incorrect}
        </button>
      );
    });
    arrayHTML.push(
      <button
        type="button"
        key="correct"
        className="btn"
        data-testid="correct-answer"
      >
        {getQuestions[0].correct_answer}
      </button>
    );
    const newArray = this.shuffleArray(arrayHTML);
    return newArray;
  }

  render() {
    const { getQuestions } = this.props;
    if (getQuestions[0] === undefined) {
      return (<span>'loading...'</span>);
    }
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
