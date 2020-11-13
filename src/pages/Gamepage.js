import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import questionsAPI from '../services/questionAPI';

class Gamepage extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      buttonBorder: false,
      timer30: 30,
      score: 0,
    };

    this.changeQuestion = this.changeQuestion.bind(this);
    this.changePage = this.changePage.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
    this.countdown = this.countdown.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.scorePoint = this.scorePoint.bind(this);
  }

  async componentDidMount() {
    const tokenLocal = localStorage.getItem('token');
    await this.questionsGet(tokenLocal);
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.aux);
  }

  async questionsGet(tokenLocal) {
    await questionsAPI(tokenLocal);
  }

  timer() {
    const miliseconds = 1000;
    this.aux = setInterval(this.countdown, miliseconds);
  }

  changePage() {
    const { history } = this.props;
    history.push('/feedback');
  }

  //testing score
  scorePoint() {
    const { questionIndex } = this.state;
    const { score } = localStorage;
    const { questions, timer30 } = this.props;
    const difficultyLevel = questions[questionIndex].difficulty;
    console.log(difficultyLevel);
    const three = 3;
    const ten = 10;
    let levelPoint = 1;

    if (difficultyLevel === 'easy') levelPoint = 1;
    if (difficultyLevel === 'medium') levelPoint = 2;
    if (difficultyLevel === 'hard') levelPoint = three;
    /*
    A fórmula para cálculo dos pontos por pergunta é: 
    10 + (timer * dificuldade), onde timer é o tempo 
    restante no contador de tempo e dificuldade é hard:
     3, medium: 2, easy: 1, dependendo da pergunta. 
     Exemplo: Se no momento da resposta correta o 
     timer estiver contando 17 segundos, e a dificuldade
      da pergunta é 2 (média), a pontuação deve ser: 
      10 + (17 * 2) = 44 */
      const result = 0;
    result = score + (ten + (timer30 * levelPoint));
    score = result;
  }

  // testing score

  changeQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const number = 4;
    const levelName = questions[questionIndex].difficulty;
    console.log(" o que é o question", levelName);
    if (questionIndex === number) {
      this.changePage();
    }
    this.setState((state) => ({
      questionIndex: (state.questionIndex + 1) % questions.length,
      buttonBorder: false,
      timer30: 30,
    }));
    this.timer();
  }

  countdown() {
    const { timer30 } = this.state;
    const { buttonBorder } = this.state;
    this.setState({
      timer30: timer30 - 1,
    });
    if (timer30 <= 0) {
      clearInterval(this.aux);
      this.setState({
        buttonBorder: !buttonBorder,
        timer30,
      });
    }
  }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
    clearInterval(this.aux);
  }

  showNextButton() {
    const { buttonBorder } = this.state;
    if (buttonBorder) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.changeQuestion() }
        >
          PRÓXIMA
        </button>
      );
    }
  }

  render() {
    const { email, username, questions } = this.props;
    const { questionIndex } = this.state;
    const questionAtual = questions[questionIndex];
    const hash = md5(email);
    const { buttonBorder } = this.state;
    const { timer30 } = this.state;
    const { score } = this.state;
    return questions && questions.length && (
      <div className="gamepage-container">
        <header className="gamepage-header">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="gravatar"
            data-testid="header-profile-picture"
            className="img-logo"
          />
          <p
            data-testid="header-player-name"
          >
            {username}
          </p>
          <div className="timer">
            <span>
              Timer:
            </span>
            {timer30}
          </div>
          <span
            data-testId="header-score"
          >
            Placar:
          </span>
          {score}
        </header>
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
            {/* {questionAtual && questionAtual.difficulty} !!*/}
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
          {this.showNextButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  username: state.login.username,
  questions: state.question.questions,
});

export default connect(mapStateToProps)(Gamepage);

Gamepage.propTypes = {
  questionAtual: PropTypes.arrayOf(Object).isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
}.isRequired;
