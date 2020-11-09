import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateScoreAndAssertions } from '../actions';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.handleScoreAndAssertions = this.handleScoreAndAssertions.bind(this);
  }

  handleScoreAndAssertions() {
    const { score, questions, dispatchScore } = this.props;
    // const scoreUpdate = score + (timer * dificuldade);
    const scoreUpdate = 1;
    const assertionsUpdate = 1;
    dispatchScore(scoreUpdate, assertionsUpdate);
    console.log('handle')
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    const { category, question } = questions[0];
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
            type="button"
            onClick= { this.handleScoreAndAssertions }
          >
            { questions[0].correct_answer }
          </button>
          {questions[0].incorrect_answers.map((answer, index) => (
            <button data-testid={ `wrong-answer-${index}` } type="button" key={ index }>
              { answer }
            </button>
          ))}
        </div>
        <button type="button">Próxima</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score, assertions) => dispatch(updateScoreAndAssertions(score, assertions)),
});

const mapStateToProps = (state) => ({
  questions: state.game.questions.results,
  score: state.user.score,
});

QuestionCard.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
