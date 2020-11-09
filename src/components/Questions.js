import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      tempo: 30,
      currentQuestion: 0,
      assertions: 0,
    };
    this.timerFunction = this.timerFunction.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.timerFunction();
  }

  nextQuestion() {
    this.setState((prev) => (
      {
        currentQuestion: prev.currentQuestion + 1,
        disable: false,
        tempo: 30,
      }
    ));
    this.timerFunction();
    const buttonsWrong = document.querySelectorAll('[value=WrongAnswer]');
    const buttonsCorrect = document.querySelectorAll('[value=CorrectAnswer]');
    buttonsCorrect.forEach((button) => {
      button.style.border = '';
    });
    buttonsWrong.forEach((button) => {
      button.style.border = '';
    });
  }

  scored() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { tempo, currentQuestion, assertions } = this.state;
    const { question } = this.props;
    const dez = 10;
    const tres = 3;
    let dif;

    switch (question[currentQuestion].difficulty) {
    case 'easy':
      dif = 1;
      break;
    case 'medium':
      dif = 2;
      break;
    case 'hard':
      dif = tres;
      break;
    default:
      break;
    }

    let soma = state.player.score;
    soma = soma + dez + (dif * tempo);
    localStorage.setItem(
      'state',
      JSON.stringify({ player: { ...state.player, score: soma, assertions } }),
    );
  }

  choosed(e) {
    if (e.target.value === 'CorrectAnswer') {
      this.setState((prev) => ({ disable: true, assertions: prev.assertions + 1 }),
        () => this.scored());
    } else {
      this.setState({ disable: true });
    }
    this.stopCounter();
    const buttonsWrong = document.querySelectorAll('[value=WrongAnswer]');
    const buttonsCorrect = document.querySelectorAll('[value=CorrectAnswer]');
    buttonsCorrect.forEach((button) => {
      button.style.border = '3px solid rgb(6, 240, 15)';
    });
    buttonsWrong.forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  stopCounter() {
    window.clearInterval(this.interval);
  }

  timerFunction() {
    const sec = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        tempo: prevState.tempo - 1,
      }
      ));
      const { tempo } = this.state;
      if (tempo < 1) {
        this.stopCounter();
        this.setState({
          resposta: 'WrongAnswer',
          disable: true,
        });
      }
    }, sec);
  }

  timer() {
    const { tempo } = this.state;
    return (
      <div>
        {tempo }
      </div>
    );
  }

  render() {
    const { currentQuestion, disable } = this.state;
    const { question } = this.props;
    const timer = this.timer();
    if (currentQuestion === question.length) {
      const state = JSON.parse(localStorage.state);
      const email = md5(state.player.gravatarEmail);
      if (localStorage.ranking) {
        localStorage.ranking = JSON.stringify([
          ...JSON.parse(localStorage.ranking),
          {
            name: state.player.name,
            score: state.player.score,
            picture: `https://www.gravatar.com/avatar/${email}`,
          },
        ]);
      } else {
        localStorage.ranking = JSON.stringify([
          {
            name: state.player.name,
            score: state.player.score,
            picture: `https://www.gravatar.com/avatar/${email}`,
          },
        ]);
      }
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        {timer }
        <h3 data-testid="question-category">
          Categoria:
          { question[currentQuestion].category }
        </h3>

        <p data-testid="question-text">
          Pergunta:
          { question[currentQuestion].question }
        </p>

        <p>Alternativas:  </p>
        {question[currentQuestion].respostas.map((resposta, index) => (
          <button
            key={ index }
            type="button"
            value={ resposta.value }
            data-testid={ resposta.dataTestid }
            disabled={ disable }
            onClick={ (event) => this.choosed(event) }
          >
            { resposta.resposta }
          </button>
        )) }
        {
          (disable
            && (
              <button
                data-testid="btn-next"
                onClick={ this.nextQuestion }
                type="button"
              >
                Próxima
              </button>))
        }
      </div>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.objectOf(Object).isRequired,
};

export default Questions;
