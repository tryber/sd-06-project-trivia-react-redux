import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, sendScore, sendAssertions } from '../actions';
import '../App.css';
import Timer from './Timer';

class BodyGame extends Component {
  constructor() {
    super();

    this.disableAnswerButtons = this.disableAnswerButtons.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.handleScoreToLocalStorage = this.handleScoreToLocalStorage.bind(this);
    this.handleQuestionIndex = this.handleQuestionIndex.bind(this);
    this.handleAssertions = this.handleAssertions.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleAnswerBorderColor = this.handleAnswerBorderColor.bind(this);

    this.state = {
      isDisabled: false,
      score: 0,
      counter: 30,
      questionIndex: 0,
      redirect: false,
      assertions: 0,
      answers: [],
    };
  }

  async componentDidMount() {
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
      await questionsFunction();
    }
  }

  async componentDidUpdate(prevProps) {
    const { getToken, questionsFunction, questions } = this.props;
    console.log(questions.length, prevProps.questions.length);
    if (getToken !== prevProps.getToken && getToken !== '') {
      await questionsFunction();
    }
    if (questions.length > 0 && prevProps.questions.length !== questions.length) {
      this.handleShuffle(questions);
    }
  }

  handleAnswerBorderColor() {
    const { counter } = this.state;
    const rightAnswer = document.querySelector('#right-answer');
    rightAnswer.className = 'right-question';
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.className = 'wrong-question';
    });
    const nextButton = document.querySelector('#next-button');
    nextButton.style = 'display: block';
    if (counter > 1) {
      this.handleDisableButtonsOnClick(rightAnswer, wrongAnswers);
    }
  }

  handleDisableButtonsOnClick(rightAnswer, wrongAnswers) {
    rightAnswer.setAttribute('disabled', 'disabled');
    wrongAnswers.forEach((eachWrongAnswer) => {
      eachWrongAnswer.setAttribute('disabled', 'disabled');
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

  handleAssertions() {
    const { assertions } = this.state;
    this.setState({ assertions: assertions + 1 });
  }

  handleQuestionIndex() {
    const { questionIndex } = this.state;
    const lastQuestion = 4;
    if (questionIndex === lastQuestion) {
      this.setState({ redirect: true });
    }
    this.setState({
      questionIndex: questionIndex + 1,
      counter: 30,
      isDisabled: false,
    });
  }

  handleClickScore() {
    const { dispatchScore } = this.props;
    const { score } = this.state;
    dispatchScore(score);
  }

  handleClickAssertions() {
    const { dispatchAssertions } = this.props;
    const { assertions } = this.state;
    dispatchAssertions(assertions);
  }

  handleShuffle() {
    const { questions } = this.props;
    const { answers } = this.state;
    questions.forEach((question, index) => {
      console.log(questions[index]);
      answers[index] = [question.correct_answer, ...question.incorrect_answers];
    });
    for (let i = 0; i < answers.length - 1; i += 1) {
      let currentIndex = answers[i].length;
      let temporaryValue;
      let randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = answers[i][currentIndex];
        answers[i][currentIndex] = answers[i][randomIndex];
        answers[i][randomIndex] = temporaryValue;
      }
      console.log(answers[i]);
    }
  }

  render() {
    const { questions } = this.props;
    const { isDisabled, counter, questionIndex, redirect, answers } = this.state;
    return (
      <div className="container">
        {redirect ? <Redirect to="/feedback" /> : null}
        {answers.map((answer, index) => (
          <div key={ index }>
            <div className="box-question">
              <div className="field-category">
                <h3 data-testid="question-category">{questions[index].category}</h3>
              </div>
              <div className="field-question">
                <p data-testid="question-text">{questions[index].question}</p>
              </div>
            </div>
            <div className="box-alternatives">
              <div>
                <button
                  type="button"
                  id="next-button"
                  data-testid="btn-next"
                  onClick={ () => {
                    this.handleQuestionIndex();
                    this.handleClickScore();
                  } }
                  style={ { display: 'none' } }
                >
                  Próxima
                </button>
                {answer.map((eachAnswer, i) => (
                  (questions[index].correct_answer.includes(eachAnswer)
                    ? (
                      <button
                        id="right-answer"
                        type="button"
                        data-testid="correct-answer"
                        name="right-answer"
                        key={ i }
                        onClick={ () => {
                          this.handleAnswerBorderColor();
                          this.handleScore(questions[index], counter);
                          this.handleAssertions();
                          this.handleClickAssertions();
                        } }
                        disabled={ isDisabled }
                      >
                        {eachAnswer}
                      </button>
                    )
                    : (
                      <button
                        id="wrong-answer"
                        type="button"
                        key={ i }
                        data-testid={ `wrong-answer-${i}` }
                        name="wrong-answer"
                        onClick={ this.handleAnswerBorderColor }
                        disabled={ isDisabled }
                      >
                        {eachAnswer}
                      </button>
                    )
                  )))}
              </div>
            </div>
          </div>
        )).filter((_, index) => index === questionIndex)}
        <Timer
          handleAnswerBorderColor={ this.handleAnswerBorderColor }
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
  dispatchScore: (score) => dispatch(sendScore(score)),
  dispatchAssertions: (assertions) => dispatch(sendAssertions(assertions)),
  questionsFunction: () => dispatch(fetchQuestions()),
});

BodyGame.propTypes = {
  questionsFunction: PropTypes.func,
  getToken: PropTypes.string,
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(BodyGame);
