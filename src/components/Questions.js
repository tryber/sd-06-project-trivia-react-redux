import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Timer from './Timer';
import './Questions.css';
import NextButton from './NextButton';
import { reqQuestions } from '../services';
import { getQuestions } from '../actions';
// import { fetchAPIQuestions } from '../services';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.fetchAPIQuestions = this.fetchAPIQuestions.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.addClass = this.addClass.bind(this);

    this.state = {
      loading: true,
      checked: false,
      disable: false,
    };
  }

  componentDidMount() {
    const TIMES = 30000;
    this.fetchAPIQuestions();
    setTimeout(() => this.disableButtons(), TIMES);
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

  addClass() {
    this.setState({
      checked: true,
    });
  }

  render() {
    const { loading, checked, disable } = this.state;
    const { questions } = this.props;
    const randomNumber = 0.5;
    const nextButton = <NextButton />;
    const renderNextButton = checked ? nextButton : null;

    if (loading) {
      return <h1>Carregando...</h1>;
    }

    return (
      <div>
        <p data-testid="question-category">{questions[0].category}</p>
        <p data-testid="question-text">{questions[0].question}</p>
        {questions[0].answers.map((answer, index) => {
          if (answer === questions[0].correct_answer) {
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
        }).sort(() => Math.random() - randomNumber)}
        <Timer />
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
  handleApi: propTypes.func.isRequired,
  // timer: propTypes.number.isRequired,
};

const mapStateToProps = (state) => (
  {
    questions: state.game.questions,
    timer: state.game.timer, //  - usar este timer na hora do calculo do score
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    handleApi: (state) => dispatch(getQuestions(state)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
