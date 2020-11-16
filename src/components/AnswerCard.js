import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerQuestion, giveScore } from '../actions';

const level = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class AnswerCard extends Component {
  constructor() {
    super();

    this.calculateScore = this.calculateScore.bind(this);
  }

  calculateScore(reply, timer, difficulty) {
    const { score, answer } = this.props;
    const basePoint = 10;
    if (reply) {
      const points = (basePoint + (timer * level[difficulty]));
      score(points);
    }
    answer();
  }

  render() {
    const { correct, incorrect, answered, timer, difficulty } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={ () => this.calculateScore(true, timer, difficulty) }
          className={ answered ? 'certa' : null }
          data-testid="correct-answer"
          disabled={ answered }
        >
          { correct }
        </button>
        { incorrect.map((answer, index) => (
          <button
            type="button"
            onClick={ () => this.calculateScore(false) }
            key={ answer }
            className={ answered ? 'err' : null }
            data-testid={ `wrong-answer-${index}` }
            disabled={ answered }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  answered: state.userReducer.answered,
});

const mapDispatchToProps = (dispatch) => ({
  score: (points) => dispatch(giveScore(points)),
  answer: () => dispatch(answerQuestion()),
});

AnswerCard.propTypes = {
  answered: PropTypes.bool.isRequired,
  score: PropTypes.func.isRequired,
  answer: PropTypes.func.isRequired,
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  timer: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerCard);
