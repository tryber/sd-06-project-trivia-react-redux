import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/AnswersButton.css';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      correct: false,
      incorrect: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      correct: 'correct-answer',
      incorrect: 'wrong-answer',
    });
  }

  render() {
    const { questions } = this.props;
    const { category, question } = questions[0];
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
            { questions[0].correct_answer }
          </button>
          {questions[0].incorrect_answers.map((answer, index) => (
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
        <button type="button">Próxima</button>
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
