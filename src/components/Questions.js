import React from 'react';
import PropTypes from 'prop-types';
import questionsAPI from '../services/questionAPI';


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonBorder: false,
      timer30: 30,
    };
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.questionsGet();
    const miliseconds = 1000;
    let aux;
    this.aux = setInterval(this.countdown, miliseconds);
    console.log("o que é aux" + aux);
    this.countdown(aux);
  }

  async questionsGet() {
    const tokenLocal = localStorage.getItem('token');
    await questionsAPI(tokenLocal);
  }

  countdown(aux) {
    const { timer30 } = this.state;
    console.log("o que é aux depois" + aux);
     if (timer30 > 0) {
      this.setState((localtimer) => ({
        timer30: localtimer.timer30 - 1,
       }));
    } 
     else {
       console.log(" o tempo acabou");
       this.handleClick();
      clearInterval(this.aux);
     }
  }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
  }

  render() {
    const { buttonBorder } = this.state;
    const { questionAtual } = this.props;
    const { timer30 } = this.state;
    // const testeObjectQuestion = Object.assign(questionAtual);
    console.log('question atual no componente Questions:', questionAtual);
    return (
      <div>
        <div>
        {timer30}
      </div>
        <div className="gamepage-questions">
          <div
            data-testid="question-category"
            className="question-category"
          >
            Categoria:
            {questionAtual && questionAtual.category}
            <br />
          </div>
          <div
            data-testid="question-text"
            className="question-text"
          >
            Pergunta:
            <br />
            {questionAtual && questionAtual.question}
          </div>
        </div>
        <div className="gamepage-answer">
          {questionAtual && questionAtual.incorrect_answers
            .map((result, i) => (
              <div key={ result }>
                <button
                  className={ !buttonBorder ? 'none-answer' : 'wrong' }
                  onClick={ this.handleClick }
                  data-testid={ `wrong-answer-${i}` }
                  type="button"
                  disabled={ buttonBorder }
                >
                  {result}
                </button>
              </div>
            ))}
          <button
            className={ !buttonBorder ? 'none-answer' : 'correct' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
            disabled={ buttonBorder }
          >
            {questionAtual && questionAtual.correct_answer}
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questionAtual: PropTypes.arrayOf(Object).isRequired,
};

export default Questions;
