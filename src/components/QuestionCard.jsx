import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Timer } from '.';
import './CSS/QuestionCardCSS.css';
import { NextButton } from './NextButton';

export default class QuestionCard extends Component {
  constructor() {
    super();

    this.updateStates = this.updateStates.bind(this);
    this.activateBorders = this.activateBorders.bind(this);
    this.activateQuestions = this.activateQuestions.bind(this);
    this.timeUp = this.timeUp.bind(this);

    this.state = {
      answers: [],
      updatedStates: false,
      answersBorderActive: false,
      playing: false,
      timeIsUp: false,
    };
  }

  componentDidMount() {
    this.updateStates();
  }

  updateStates() {
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

    const answers = [correctAnswer, ...incorrectAnswers];

    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    console.log(answers);

    this.setState({
      answers,
      updatedStates: true,
    });
  }

  activateBorders() {
    // const { answersBorderActive } = this.state;
    this.setState({
      answersBorderActive: true,
    });
  }

  activateQuestions() {
    this.setState({ playing: true });
  }

  timeUp() {
    this.setState({
      timeIsUp: true,
      answersBorderActive: true,
    });
  }

  render() {
    const {
      question: { category, question, correct_answer: correctAnswer },
    } = this.props;
    const { answers, updatedStates, answersBorderActive } = this.state;

    if (!updatedStates) {
      return <p>Loading...</p>;
    }

    const correctAnswerIdx = answers.findIndex(
      (item) => item === correctAnswer,
    );
    const startingIdx = -2;
    let currentIdx = startingIdx + 1;
    return (
      <div className="question-card">
        <p className="category" data-testid="question-category">
          <p className="category-title">Category</p>
          <p className="category-content">{category}</p>
        </p>
        <Timer timeUp={ this.timeUp } activateQuestions={ this.activateQuestions } />
        <div
          className="question-container"
        >
          <p
            className="question"
            data-testid="question-text"
          >
            { question }
          </p>
          <div className="answers">
            {answers.map((item, index) => {
              if (index === correctAnswerIdx) {
                return (
                  <button
                    className={ !answersBorderActive ? 'answers' : 'correct-answer' }
                    data-testid="correct-answer"
                    type="button"
                    onClick={ this.activateBorders }
                  >
                    {correctAnswer}
                  </button>
                );
              }
              currentIdx += 1;
              return (
                <button
                  className={ !answersBorderActive ? 'answers' : 'wrong-answer' }
                  key={ index }
                  data-testid={ `wrong-answer-${currentIdx}` }
                  type="button"
                  onClick={ this.activateBorders }
                >
                  {item}
                </button>
              );
            })}
            <div className="next-button">
              { !answersBorderActive ? null : <NextButton /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
};
