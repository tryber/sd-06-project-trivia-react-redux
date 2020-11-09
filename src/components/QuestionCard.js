import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/AnswersButton.css';
import { Link } from 'react-router-dom';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      correct: false,
      incorrect: false,
      clicked: false,
      indexButtonNext: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.nextQuestions = this.nextQuestions.bind(this);
  }

  nextButton() {
    const { clicked, indexButtonNext } = this.state;
    const indexLimit = 4;
    if (clicked === true && indexButtonNext < indexLimit) {
      return (
        <div data-testid="btn-next">
          <button
            type="button"
            onClick={ this.nextQuestions }
          >
            Próxima
          </button>
        </div>
      );
    } if (clicked === true && indexButtonNext === indexLimit) {
      return (
        <div data-testid="btn-next">
          <Link to="/feedback">
            <button
              type="button"
            >
             Próxima
            </button>
          </Link>
        </div>
      );
    }
  }

  nextQuestions() {
    const { indexButtonNext } = this.state;
    this.setState({
      correct: false,
      incorrect: false,
      clicked: false,
      indexButtonNext: indexButtonNext + 1,
    });
  }

  handleClick() {
    this.setState({
      correct: 'correct-answer',
      incorrect: 'wrong-answer',
      clicked: true,
    });
  }

  render() {
    const { questions } = this.props;
    const { indexButtonNext } = this.state;
    const { category, question } = questions[indexButtonNext];
    const { correct, incorrect } = this.state;

    return (
      <div>
        QUESTION CARD
        <div data-testidclassName="question">
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div className="answers">
          <button
            data-testid="correct-answer"
            className={ correct }
            onClick={ this.handleClick }
            type="button"
          >
            { questions[indexButtonNext].correct_answer }
          </button>
          {questions[indexButtonNext].incorrect_answers.map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              key={ index }
              className={ incorrect }
              onClick={ this.handleClick }
            >
              { answer }
            </button>
          ))}
        </div>
        { this.nextButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions.results,
});

QuestionCard.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(QuestionCard);
