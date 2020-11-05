import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Components/Header';

import './styles.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.timerOut = this.timerOut.bind(this);

    const { questions } = this.props;

    this.state = {
      currentQuestion: 0,
      lastQuestion: questions.length - 1,
      answered: false,
      timer: 30,
    };
  }

  handleAnswerClick() {
    this.setState({
      answered: true,
    });
  }

  timerOut() {
    const { timer } = this.state;
    const oneSecond = 1000;
    if (timer > 0) {
      newTimer = timer - 1;

      this.setState({
        timer: timer - 1,
        answered: (newTimer === 0),
      });

      setTimeout(this.timerOut, oneSecond);
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, lastQuestion, answered, timer } = this.state;

    console.log(lastQuestion);

    if (!questions[currentQuestion]) {
      return <div>Loading</div>;
    }

    return (
      <div className="trivia" onLoad={ timerOut }>
        <Header />
        <div>
          <p>
            { timer }
          </p>
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
