import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { giveScore, answerQuestions } from '../actions';

const dif = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class AnswerQuestions extends Component {
  constructor() {
    super();

    this.answerQuestion = this.answerQuestion.bind(this);
  }

  answerQuestion(resposta, timer, difficulty) {
    const { score, answer } = this.props;
    const point = 10;
    if (resposta) {
      const value = (point + (timer * dif[difficulty]));
      score(value);
    }
    answer();
  }

  render() {
    const { correct, incorrect, respondido, timer, difficulty } = this.props;
    console.log(respondido);
    return (
      <div>
        <button
          type="button"
          onClick={ () => this.answerQuestion(true, timer, difficulty) }
          className={ respondido ? 'certa' : null }
          data-testid="correct-answer"
          disabled={ respondido }
        >
          { correct }
        </button>

        { incorrect.map((answer, index) => (
          <button
            type="button"
            onClick={ () => this.answerQuestion(false) }
            key={ answer }
            className={ respondido ? 'err' : null }
            data-testid={ `wrong-answer-${index}` }
            disabled={ respondido }
          >
            { answer }
          </button>

        ))}

      </div>
    );
  }
}

const mapDispatchToProps = {
  score: giveScore,
  answer: answerQuestions,
};

const mapStateToProps = (state) => ({
  respondido: state.userReducer.respondido,
  state: state.user,
});

AnswerQuestions.propTypes = {
  score: PropTypes.func.isRequired,
  answer: PropTypes.func.isRequired,
  respondido: PropTypes.bool.isRequired,
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  timer: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestions);
