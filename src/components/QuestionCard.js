import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateScoreAndAssertions } from '../actions';
import './QuestionCard.css';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
      clicked: false,
      indexButtonNext: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.nextQuestions = this.nextQuestions.bind(this);
    this.calculatesScore = this.calculatesScore.bind(this);
  }

  nextButton() {
    const { clicked, indexButtonNext } = this.state;
    const indexLimit = 4;
    if (clicked === true && indexButtonNext < indexLimit) {
      return (
        <div data-testid="btn-next">
          <button type="button" onClick={ this.nextQuestions }>
            Próxima
          </button>
        </div>
      );
    }
    if (clicked === true && indexButtonNext === indexLimit) {
      return (
        <div data-testid="btn-next">
          <Link to="/feedback">
            <button type="button">Próxima</button>
          </Link>
        </div>
      );
    }
  }

  nextQuestions() {
    const { indexButtonNext } = this.state;
    const { startingInterval, clearIntervalToProps } = this.props;
    this.setState({
      isDisabled: false,
      clicked: false,
      indexButtonNext: indexButtonNext + 1,
    });
    clearIntervalToProps();
    startingInterval();
  }

  calculatesScore() {
    const { indexButtonNext } = this.state;
    const { questions, timer, score, assertions, sendScore } = this.props;
    const levelName = questions[indexButtonNext].difficulty;
    const three = 3;
    const ten = 10;
    let levelPoint = 1;

    if (levelName === 'easy') levelPoint = 1;
    if (levelName === 'medium') levelPoint = 2;
    if (levelName === 'hard') levelPoint = three;

    const result = score + (ten + timer * levelPoint);
    sendScore(result, assertions + 1);
  }

  handleClick({ target }) {
    this.setState({
      isDisabled: true,
      clicked: true,
    });
    if (target.className === 'correct-answer') this.calculatesScore();
  }

  render() {
    const { questions } = this.props;
    const { indexButtonNext, isDisabled } = this.state;
    const { category, question } = questions[indexButtonNext];

    return (
      <div>
        QUESTION CARD
        <div>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
        </div>
        <div className="answers">
          <button
            data-testid="correct-answer"
            onClick={ this.handleClick }
            type="button"
            disabled={ isDisabled }
            className="correct-answer"
          >
            {questions[indexButtonNext].correct_answer}
          </button>
          {questions[indexButtonNext].incorrect_answers.map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              key={ index }
              onClick={ this.handleClick }
              disabled={ isDisabled }
              className="incorrect-answer"
            >
              {answer}
            </button>
          ))}
        </div>
        {this.nextButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions.results,
  score: state.user.score,
  assertions: state.user.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score, assertions) => dispatch(updateScoreAndAssertions(score, assertions)),
});

QuestionCard.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
