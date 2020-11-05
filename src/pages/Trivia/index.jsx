import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Components/Header';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    const { questions } = this.props;

    this.state = {
      currentQuestion: 0,
      lastQuestion: questions.length - 1,
    };
  }

  render() {
    const { userEmail, avatar, name, questions } = this.props;
    const { currentQuestion, lastQuestion } = this.state;
    console.log(questions);
    if (!questions[currentQuestion]) {
      return <div>Loading</div>;
    }
    return (
      <div className="trivia">
        <Header />
        <div>
          <span data-testid="question-category">{ questions[currentQuestion].category }</span>
          <p data-testid="question-text">{ questions[currentQuestion].question }</p>
          <div>
            { questions[currentQuestion].answers.map((answer) => {
              const correctAnswerId = 'correct-answer';

              const incorrectIndex = questions[currentQuestion]
                .incorrect_answers.findIndex((a) => a === answer.answer);

              const incorretAnswerId = `wrong-answer-${incorrectIndex}`;

              return (
                <div key={ answer.answer }>
                  <button
                    type="button"
                    data-testid={ answer.correct ? correctAnswerId : incorretAnswerId }
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
  userEmail: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
