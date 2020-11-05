import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Components/Header';

import './styles.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);

    const { questions } = this.props;

    this.state = {
      currentQuestion: 0,
      lastQuestion: questions.length - 1,
      answered: false,
    };
  }

  handleAnswerClick() {
    this.setState({
      answered: true,
    });
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, lastQuestion, answered } = this.state;

    console.log(lastQuestion);

    if (!questions[currentQuestion]) {
      return <div>Loading</div>;
    }

    return (
      <div className="trivia">
        <Header />
        <div>
          <span data-testid="question-category">
            { questions[currentQuestion].category }
          </span>

          <p data-testid="question-text">{ questions[currentQuestion].question }</p>

          <div>
            { questions[currentQuestion].answers.map((answer) => {
              const correctAnswerId = 'correct-answer';

              const incorrectIndex = questions[currentQuestion]
                .incorrect_answers.findIndex((a) => a === answer.answer);

              const incorrectAnswerId = `wrong-answer-${incorrectIndex}`;

              return (
                <div key={ answer.answer }>
                  <button
                    type="button"
                    className={ answered && (
                      answer.correct ? 'correct-answer' : 'wrong-answer'
                    ) }
                    data-testid={ answer.correct ? correctAnswerId : incorrectAnswerId }
                    onClick={ this.handleAnswerClick }
                    disabled={ answered }
                  >
                    { answer.answer }
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    avatar: state.user.avatar,
    name: state.user.name,
    questions: state.trivia.questions,
  };
}

export default connect(mapStateToProps, null)(Trivia);

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string.isRequired,
      correct: PropTypes.bool.isRequired,
    })).isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  })).isRequired,
};
