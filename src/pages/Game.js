import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';

class Game extends Component {
  constructor() {
    super();
    this.shufflesAnswer = this.shufflesAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      index: 0,
    };
  }

  shufflesAnswer(question) {
    // const { incorrect_answers, correct_answer } = question;
    const allAnswers = question.incorrect_answers.concat(question.correct_answer);
    const sortAnswers = allAnswers.sort();
    let index = 0 - 1;
    return sortAnswers.map((element, countoString) => {
      if (question.correct_answer === element) {
        return (
          <button
            key={ countoString }
            type="button"
            data-testid="correct-answer"
          >
            {element}
          </button>
        );
      }
      index += 1;
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ countoString }
        >
          {element}
        </button>
      );
    });
  }

  nextQuestion() {
    this.setState((state) => ({
      index: state.index + 1,
    }));
  }

  render() {
    const { arrayQuestion } = this.props;
    const { index } = this.state;
    // if (arrayQuestion !== []) {
    // const { category, question } = arrayQuestion[index];
    // }
    if (arrayQuestion.length === 0) {
      return (
        <span>Login não realizado</span>
      );
    }
    return (
      <div>
        <Header />
        <p data-testid="question-category">{ arrayQuestion[index].category }</p>
        <p data-testid="question-text">{ arrayQuestion[index].question }</p>
        {this.shufflesAnswer(arrayQuestion[index])}
        {/*
        <button
          type="button"
          onClick={ () => this.nextQuestion() }
        >
        Próxima
        </button>
        */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayQuestion: state.questionsInformation.arrayQuestion,
});

Game.propTypes = {
  arrayQuestion: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Game);
