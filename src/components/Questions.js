import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Questions.css';
import { reqQuestions } from '../services';
import {
  getQuestions,
  stopTimer,
  getTimer,
  resetTimer,
  getAssertion,
  getScore,
} from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.fetchAPIQuestions = this.fetchAPIQuestions.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.addClass = this.addClass.bind(this);
    this.countQuestionsAndRedirect = this.countQuestionsAndRedirect.bind(this);
    this.downTime = this.downTime.bind(this);
    this.handleInterval = this.handleInterval.bind(this);

    this.state = {
      loading: true,
      checked: false,
      disable: false,
      questionsAnswer: 0,
      answers: [],
      timeInterval: {},
      timingOut: '',
      isCorrect: false,
    };
  }

  componentDidMount() {
    this.fetchAPIQuestions();
    this.downTime();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionsAnswer } = this.state;
    const { questions, history } = this.props;
    const five = 5;
    if (prevState.questionsAnswer !== questionsAnswer
      || prevProps.questions.length !== questions.length) {
      this.callRandomQuestions();
    }
    if (questionsAnswer > five) history.push('/feedback');
  }

  componentWillUnmount() {
    this.downTime();
  }

  async fetchAPIQuestions() {
    const { handleApi } = this.props;
    const tokenStorage = localStorage.getItem('token');
    const token = JSON.parse(tokenStorage);
    const apiQuestions = await reqQuestions(token);
    const limite = 3;
    const questionsAPI = apiQuestions.results.map((el) => (
      {
        ...el, answers: [...el.incorrect_answers, el.correct_answer],
      }));
    if (apiQuestions.response_code === limite) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    } else {
      handleApi(questionsAPI);
      this.setState({
        loading: false,
      });
    }
  }

  disableButtons() {
    this.setState({ disable: true });
  }

  countQuestionsAndRedirect() {
    const { questionsAnswer, timingOut, isCorrect } = this.state;
    const answerTime = 30;
    const lastQuestion = 4;
    const { resetTime, history, saveScore, questions, timer } = this.props;
    clearTimeout(timingOut);
    resetTime(answerTime);
    this.setState({
      checked: false,
    });

    if (questionsAnswer === lastQuestion) history.push('/feedback');
    if (questionsAnswer < lastQuestion) {
      this.setState({ questionsAnswer: questionsAnswer + 1 });
    }
    this.downTime();
    this.setState({ disable: false });
    const playserScore = this.calculate(timer, questions[questionsAnswer].difficulty);
    if (isCorrect) {
      saveScore(playserScore);
    }
  }

  randomQuestions() {
    const { questionsAnswer } = this.state;
    const randomNumber = 0.5;
    const { questions } = this.props;
    const answerAPI = questions[questionsAnswer].answers
      .sort(() => Math.random() - randomNumber);
    return answerAPI;
  }

  callRandomQuestions() {
    this.setState({
      answers: this.randomQuestions(),
    });
  }

  handleInterval() {
    const ONE_SECOND = 1000;
    const { timer } = this.props;
    const time = setInterval(() => {
      const { sendTimer } = this.props;
      sendTimer(timer);
    }, ONE_SECOND);
    this.setState({ timeInterval: time });
  }

  downTime() {
    const ALL_TIME = 30000;
    console.log('atualziando');
    this.handleInterval();
    const loading = setTimeout(() => {
      this.disableButtons();
      this.setState({ checked: true });
    }, ALL_TIME);
    this.setState({
      timingOut: loading,
    });
  }

  addClass({ target }) {
    const { timeInterval, questionsAnswer } = this.state;
    const { questions, timer, handleAssertion } = this.props;
    clearInterval(timeInterval);
    this.setState({
      checked: true,
    });
    if (target.id === 'correct-answer') {
      const total = this.calculate(timer, questions[questionsAnswer].difficulty);
      const newScore = JSON.parse(localStorage.getItem('state'));
      newScore.player.score += total;
      newScore.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(newScore));
      handleAssertion(newScore.player.assertions);
      this.setState({
        isCorrect: true,
      });
    } else {
      this.setState({
        isCorrect: false,
      });
    }
  }

  calculate(timer, difficulty) {
    const total = 10;
    const hard = 3;
    const grade = () => {
      switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      default:
        return hard;
      }
    };
    const totalScore = total + (timer * grade());
    return totalScore;
  }

  render() {
    const {
      loading,
      checked,
      disable,
      questionsAnswer,
      answers,
      timeInterval } = this.state;
    const { questions, timer } = this.props;
    if (timer === 0) {
      clearInterval(timeInterval);
    }
    const nextButton = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.countQuestionsAndRedirect }
      >
        Próxima
      </button>);
    const renderNextButton = checked ? nextButton : null;

    if (loading) {
      return <h1>Carregando...</h1>;
    }

    return (
      <div>
        <p data-testid="question-category">{questions[questionsAnswer].category}</p>
        <p data-testid="question-text">{questions[questionsAnswer].question}</p>
        {answers.map((answer, index) => {
          if (answer === questions[questionsAnswer].correct_answer) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
                key={ answer }
                id="correct-answer"
                onClick={ this.addClass }
                disabled={ disable }
                className={ checked ? 'correctAnswer' : null }
              >
                {answer}
              </button>);
          }
          return (
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              key={ answer }
              id="wrong-answer"
              onClick={ this.addClass }
              disabled={ disable }
              className={ checked ? 'incorrectAnswer' : null }
            >
              {answer}
            </button>);
        })}
        <div>
        Tempo restante:
          { timer }
        </div>
        <div>
          {renderNextButton}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  timer: propTypes.number.isRequired,
  handleApi: propTypes.func.isRequired,
  sendTimer: propTypes.func.isRequired,
  resetTime: propTypes.func.isRequired,
  handleAssertion: propTypes.func.isRequired,
  saveScore: propTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    questions: state.questions,
    timer: state.timer,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    handleApi: (state) => dispatch(getQuestions(state)),
    sendTimer: (state) => dispatch(getTimer(state)),
    handleTimer: (state) => dispatch(stopTimer(state)),
    resetTime: () => dispatch(resetTimer()),
    handleAssertion: (assertion) => dispatch(getAssertion(assertion)),
    saveScore: (score) => dispatch(getScore(score)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
