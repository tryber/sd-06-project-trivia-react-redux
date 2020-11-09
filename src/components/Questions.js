import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Timer from './Timer';
import './Questions.css';
// import NextButton from './NextButton';
import { reqQuestions } from '../services';
import { getQuestions } from '../actions';
// import { fetchAPIQuestions } from '../services';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.fetchAPIQuestions = this.fetchAPIQuestions.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.addClass = this.addClass.bind(this);
    this.countQuestionsAndRedirect = this.countQuestionsAndRedirect.bind(this);

    this.state = {
      loading: true,
      checked: false,
      disable: false,
      questionsAnswer: 0,
      answers: [],
    };
  }

  componentDidMount() {
    const TIMES = 30000;
    this.fetchAPIQuestions();
    setTimeout(() => this.disableButtons(), TIMES);
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionsAnswer } = this.state;
    const { questions } = this.props;
    if (prevState.questionsAnswer !== questionsAnswer
      || prevProps.questions.length !== questions.length) {
      this.callRandomQuestions();
    }
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
      })); // colocando um array no fim de cada 'question' para randomizar as respostas
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
    const { questionsAnswer } = this.state;
    const magic = 5;
    const { history } = this.props;
    this.setState({
      checked: false,
    });
    // ZERAR TIMER, SETSTATE(TIMER) = 0 ???????????????????
    if (questionsAnswer === magic) {
      history.push('/feedback');
    }
    if (questionsAnswer < magic) {
      this.setState({ questionsAnswer: questionsAnswer + 1 });
    }
  }

  randomQuestions() {
    const { questionsAnswer } = this.state;
    const randomNumber = 0.5;
    const { questions } = this.props;
    const answerAPI = questions[questionsAnswer].answers
      .sort(() => Math.random() - randomNumber);
    return answerAPI;
    // console.log(questions);
    // console.log(`depois do sort ${teste}`);
  }

  callRandomQuestions() {
    this.setState({
      answers: this.randomQuestions(),
    });
  }

  addClass() {
    this.setState({
      checked: true,
    });
  }

  render() {
    const { loading, checked, disable, questionsAnswer, answers } = this.state;
    const { questions } = this.props;
    // const randomNumber = 0.5;
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
              onClick={ this.addClass }
              disabled={ disable }
              className={ checked ? 'incorrectAnswer' : null }
            >
              {answer}
            </button>);
        })}
        <Timer />
        <div>
          {renderNextButton}
          {/* { this.randomQuestions() } */}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  handleApi: propTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    questions: state.questions.questions,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    handleApi: (state) => dispatch(getQuestions(state)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
