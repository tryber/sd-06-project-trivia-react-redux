import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Html5Entities } from 'html-entities';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { updateScore } from '../../redux/actions';

import './styles.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.timerOut = this.timerOut.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);

    this.state = {
      currentQuestion: 0,
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

  handleNextQuestion() {
    const { currentQuestion } = this.state;
    const { history, questions } = this.props;

    const lastQuestion = questions.length - 1;

    if (lastQuestion === currentQuestion) {
      history.push('/results');
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        answered: false,
        timer: 30,
      }, () => {
        this.timerOut();
      });
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, answered, timer } = this.state;

    const tenSeconds = 10;

    if (!questions[currentQuestion]) {
      return (
        <div className="loading-trivia">
          <div className="loading-container">
            <div className="ocean-blue" />
            <div className="continent-blue" />
            <div className="ocean-blue" />
            <div className="continent-blue" />
          </div>
        </div>
      );
    }

    const decoder = new Html5Entities();

    return (
      <div className="trivia-game" onLoad={ this.timerOut }>
        <Header />

        <div className="trivia-container">
          <div className="trivia">
            <p className={ `${timer < tenSeconds ? 'timeup' : ''}` }>
              { timer }
            </p>

            <h2
              data-testid="question-text"
            >
              { decoder.decode(questions[currentQuestion].question) }
            </h2>

            <div className="trivia-category">
              Categoria:
              <span data-testid="question-category">
                { questions[currentQuestion].category }
              </span>
            </div>

            <div className="trivia-questions">
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
                      { decoder.decode(answer) }
                    </button>
                  </div>
                );
              })}
            </div>

            { answered && (
              <Button
                onClick={ this.handleNextQuestion }
                type="button"
                data-testid="btn-next"
              >
                  Proxima
              </Button>
            )}
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
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string.isRequired,
      correct: PropTypes.bool.isRequired,
    })).isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  })).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

  name: PropTypes.string.isRequired,

  userEmail: PropTypes.string.isRequired,

  setScore: PropTypes.func.isRequired,
};
