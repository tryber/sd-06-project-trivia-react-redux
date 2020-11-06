import React, { Component } from 'react';
import propTypes from 'prop-types';
import Timer from './Timer';
import './Questions.css';
// import { fetchAPIQuestions } from '../services';
import ReactDOM from 'react-dom';
import NextButton from './NextButton';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.fetchAPIQuestions = this.fetchAPIQuestions.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.addClass = this.addClass.bind(this);
    
    this.state = {
      questions: [],
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
    const tokenStorage = localStorage.getItem('token');
    const token = JSON.parse(tokenStorage);
    const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseQuestions = await apiQuestions.json();
    const limite = 3;
    const questionsAPI = responseQuestions.results.map((el) => (
      {
        ...el, answers: [...el.incorrect_answers, el.correct_answer],
      })); // colocando um array no fim de cada 'question' para randomizar as respostas
    if (responseQuestions.response_code === limite) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({
        questions: questionsAPI,
        loading: false,
      });
    }
  }

  renderNextButton() {
    const nextButton = <NextButton />;
    ReactDOM.render(nextButton, document.getElementById('mae'));

  disableButtons() {
    this.setState({ disable: true });
  }

  addClass() {
    this.setState({
      checked: true,
    });

  }

  render() {
    const { questions, loading, checked, disable } = this.state;
    const randomNumber = 0.5;
    if (loading) {
      return <h1>Carregando...</h1>;
    }
    return (
      <div id="mae">
        <p data-testid="question-category">{questions[1].category}</p>
        <p data-testid="question-text">{questions[1].question}</p>
        {questions[1].answers.map((answer, index) => {
          if (answer === questions[1].correct_answer) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
                key={ answer }
                onClick={ this.renderNextButton }
                disabled={ disable }
                onClick={ this.addClass }
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
              onClick={ this.renderNextButton }
              disabled={ disable }
              onClick={ this.addClass }
              className={ checked ? 'incorrectAnswer' : null }
            >
              {answer}
            </button>);
        }).sort(() => Math.random() - randomNumber)}
        <Timer />
      </div>
    );
  }
}

Questions.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default Questions;
