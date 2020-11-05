import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Components/Header';
import { updateScore } from '../../redux/actions';

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

  componentDidMount() {
    const { userEmail, name } = this.props;

    const user = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
    };

    localStorage.setItem('state', JSON.stringify(user));
  }

  handleAnswerClick({ timer, difficulty, correct }) {
    const { setScore } = this.props;

    if (correct) {
      setScore({ timer, difficulty });
    }

    this.setState({
      answered: true,
    });
  }

  timerOut() {
    const { timer, answered } = this.state;
    const oneSecond = 1000;
    if (timer > 0 && !answered) {
      const newTimer = timer - 1;

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
      <div className="trivia" onLoad={ this.timerOut }>
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
            { questions[currentQuestion].answers.map(({ correct, answer }) => {
              const correctAnswerId = 'correct-answer';

              const incorrectIndex = questions[currentQuestion]
                .incorrect_answers.findIndex((a) => a === answer);

              const incorrectAnswerId = `wrong-answer-${incorrectIndex}`;
              const { difficulty } = questions[currentQuestion];

              return (
                <div key={ answer }>
                  <button
                    type="button"
                    className={ answered && (
                      correct ? 'correct-answer' : 'wrong-answer'
                    ) }
                    data-testid={ correct ? correctAnswerId : incorrectAnswerId }
                    onClick={ () => this.handleAnswerClick({
                      timer,
                      correct,
                      difficulty,
                    }) }
                    disabled={ answered }
                  >
                    { answer }
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

function mapDispatchToProps(dispatch) {
  return {
    setScore: ({ difficulty, timer }) => dispatch(updateScore({
      difficulty,
      timer,
    })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

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
