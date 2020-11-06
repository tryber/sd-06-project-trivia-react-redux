import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      disable: false,
      // resposta: '',
      // dificuldade: '',
      tempo: 30,
      currentQuestion: 0,
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

  choosed(e) {
    this.setState({
      disable: true,
    }, this.setState({
      resposta: e.target.value,
    }));
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

  // Lógica do Timer:
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
        {tempo}
      </div>
    );
  }

  render() {
    const { currentQuestion, disable } = this.state;
    const { question } = this.props;
    const timer = this.timer();
    if (currentQuestion === question.length) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        {timer}
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
