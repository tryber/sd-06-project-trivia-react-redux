import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import '../App.css';
import Timer from './Timer';

class BodyGame extends Component {
  constructor() {
    super();

    this.disableAnswerButtons = this.disableAnswerButtons.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.handleScoreToLocalStorage = this.handleScoreToLocalStorage.bind(this);

    this.state = {
      isDisabled: false,
      score: 0,
      counter: 30,
    };
  }

  componentDidMount() {
    const { email, name } = this.props;
    const { score } = this.state;
    const assertions = 1;
    const localStoragePlayerInfo = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(localStoragePlayerInfo));
    const { questionsFunction, getToken } = this.props;

    if (getToken !== '') {
      questionsFunction();
    }
  }

  componentDidUpdate(prevProps) {
    const { getToken, questionsFunction } = this.props;

    if (getToken !== prevProps.getToken && getToken !== '') {
      questionsFunction();
    }
  }

  handleAnswerBorderColor() {
    const rightAnswer = document.querySelector('#right-answer');
    rightAnswer.className = 'right-question';
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.className = 'wrong-question';
    });
  }

  disableAnswerButtons() {
    this.setState({
      isDisabled: true,
    });
  }

  handleCounter() {
    const { counter } = this.state;
    this.setState(() => ({
      counter: counter - 1,
    }));
  }

  handleScore(question, counter) {
    const { score } = this.state;
    const mininumScore = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    switch (question.difficulty) {
    case 'easy':
      this.setState({
        score: score + mininumScore + (counter * easy),
      }, () => {
        this.handleScoreToLocalStorage();
      });
      break;
    case 'medium':
      this.setState({
        score: score + mininumScore + (counter * medium),
      }, () => {
        this.handleScoreToLocalStorage();
      });
      break;
    case 'hard':
      this.setState({
        score: score + mininumScore + (counter * hard),
      }, () => {
        this.handleScoreToLocalStorage();
      });
      break;
    default:
      return score;
    }
  }

  handleScoreToLocalStorage() {
    const { email, name } = this.props;
    const { score } = this.state;
    const assertions = 1;
    const localStoragePlayerInfo = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(localStoragePlayerInfo));
  }

  render() {
    const { questions } = this.props;
    const { isDisabled, counter } = this.state;
    return (
      <div className="container">
        {questions.map((question, index) => (
          <div key={ index }>
            <div className="box-question">
              <div className="field-category">
                <h3 data-testid="question-category">{question.category}</h3>
              </div>
              <div className="field-question">
                <p data-testid="question-text">{question.question}</p>
              </div>
            </div>
            <div className="box-alternatives">
              <div>
                <button
                  id="right-answer"
                  type="button"
                  data-testid="correct-answer"
                  name="right-answer"
                  onClick={ () => {
                    this.handleScore(question, counter);
                    this.handleAnswerBorderColor();
                  } }
                  disabled={ isDisabled }
                >
                  {question.correct_answer}
                </button>
                {question.incorrect_answers.map((item, position) => (
                  <button
                    id="wrong-answer"
                    type="button"
                    key={ position }
                    data-testid={ `wrong-answer-${position}` }
                    name="wrong-answer"
                    onClick={ this.handleAnswerBorderColor }
                    disabled={ isDisabled }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )).filter((_, index) => index === 0)}
        <Timer
          counter={ counter }
          handleCounter={ this.handleCounter }
          disableAnswerButtons={ this.disableAnswerButtons }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.apiReducer.token,
  questions: state.apiReducer.questions,
  name: state.userReducer.name,
  email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  questionsFunction: () => dispatch(fetchQuestions()),
});

BodyGame.propTypes = {
  questionsFunction: PropTypes.func,
  getToken: PropTypes.string,
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(BodyGame);
