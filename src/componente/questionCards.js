import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import loading from '../image/loading.gif';
import './questionCards.css';

class QuestionCards extends Component {
  constructor() {
    super();

    this.correctAnswer = this.correctAnswer.bind(this);

    this.state = {
      correct: '',
      incorrect: '',
    };
  }

  correctAnswer() {
    this.setState({
      correct: 'buttonTrue',
      incorrect: 'buttonFalse',
    });
  }

  render() {
    const { questionCard } = this.props;
    const { correct, incorrect } = this.state;

    return (
      <div>
        {questionCard
          ? (
            <div>
              <p data-testid="question-category">{questionCard[1].category}</p>
              <p data-testid="question-text">{questionCard[1].question}</p>
              <div>
                <button
                  type="button"
                  data-testid="correct-answer"
                  id="correct"
                  className={ correct }
                  onClick={ this.correctAnswer }
                >
                  {questionCard[1].correct_answer}
                </button>
                {questionCard[1].incorrect_answers.map((el, idx) => (
                  <button
                    data-testid={ `wrong-answer-${idx}` }
                    type="button"
                    key="1"
                    id="incorrect"
                    className={ incorrect }
                    onClick={ this.correctAnswer }
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
          ) : <img src={ loading } alt="loading-api" />}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questionCard: state.questionReducer.question.results,
});

QuestionCards.propTypes = {
  questionCard: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(QuestionCards);
