import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateScoreAndAssertions } from '../actions';
import './QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
      isDisabled: false,
      indexQuestion: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.question = this.question.bind(this);
    this.nextQuestions = this.nextQuestions.bind(this);
    this.calculatesScore = this.calculatesScore.bind(this);
  }

  nextQuestions() {
    const { answered, indexQuestion } = this.state;
    const { startingInterval, clearIntervalToProps } = this.props;
    if (answered === true) {
      this.setState({
        isDisabled: false,
        answered: false,
        indexQuestion: indexQuestion + 1,
      });
    }
    clearIntervalToProps();
    startingInterval();
  }

  calculatesScore() {
    const { indexQuestion } = this.state;
    const { questions, timer, score, assertions, sendScore } = this.props;
    const levelName = questions[indexQuestion].difficulty;
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
      answered: true,
      isDisabled: true,
    });
    if (target.className === 'correct-answer') this.calculatesScore();
  }

  question() {
    const { questions, timer } = this.props;
    const { indexQuestion, isDisabled } = this.state;
    const { category, question } = questions[indexQuestion];
    return (
      <div>
        <p>
          {' '}
Timer:
          {timer}
        </p>
          Category:
        <span data-testid="question-category">{category}</span>
        <p data-testid="question-text">{question}</p>
        <div className="answers">
          <button
            data-testid="correct-answer"
            onClick={ this.handleClick }
            type="button"
            disabled={ isDisabled }
            className="correct-answer"
          >
            {questions[indexQuestion].correct_answer}
          </button>
          {questions[indexQuestion].incorrect_answers.map((answer, index) => (
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
      </div>
    );
  }

  render() {
    const QUESTIONS_ANSWERED = 5;
    const { answered, indexQuestion } = this.state;
    return (
      <div>
        {indexQuestion >= QUESTIONS_ANSWERED ? (
          <Redirect to="/feedback" />
        ) : (
          this.question()
        )}
        <button
          disabled={ !answered }
          hidden={ !answered }
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestions }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions.results,
  score: state.game.score,
  assertions: state.game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score, assertions) => dispatch(updateScoreAndAssertions(score, assertions)),
});

QuestionCard.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
