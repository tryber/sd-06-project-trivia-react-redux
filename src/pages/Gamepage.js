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
      player: {
        name: '',
        assertions: 0,
        score: 10,
        gravatarEmail: '',
      },
    };

    this.changeQuestion = this.changeQuestion.bind(this);
    this.changePage = this.changePage.bind(this);
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
    this.countdown = this.countdown.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.scorePoint = this.scorePoint.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
  }

  async componentDidMount() {
    const tokenLocal = localStorage.getItem('token');
    await this.questionsGet(tokenLocal);
    this.timer();
    const { name, gravatarEmail } = this.props;
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

  // testing score
  scorePoint() {
    console.log('função placar');
    const { questionIndex, timer30 } = this.state;
    const { questions } = this.props;
    const difficultyLevel = questions[questionIndex].difficulty;
    console.log(difficultyLevel);
    const three = 3;
    const ten = 10;
    let levelPoint = 1;

    if (difficultyLevel === 'easy') levelPoint = 1;
    if (difficultyLevel === 'medium') levelPoint = 2;
    if (difficultyLevel === 'hard') levelPoint = three;

    let result;
    console.log('o que é level point', levelPoint);
    console.log('o que é timer', timer30);
    result = (ten + (timer30 * levelPoint));
    console.log(result);
    return result;
  }

  // testing score
  handleUniqueAnswer(event) {
    const valueTextButton = event.target.innerHTML;
    const { questionIndex, player } = this.state;
    console.log('o que é player', player);
    const { score } = player;
    console.log('o que é score', score);
    const { questions } = this.props;
    const correctAnswer = questions[questionIndex].correct_answer;
    console.log('o que é class name', valueTextButton);
    console.log('qual resposta é a certa', correctAnswer);
    const atualPoints = (valueTextButton === correctAnswer) ? this.scorePoint() : 0;
    console.log('soma atual de pontos', atualPoints);

    // localStorage.setItem('state', JSON.stringify(player));
    console.log('estado score antes', score);
    this.setState((state) => ({
      score: state.score + atualPoints,
    }));
    console.log('score depois', score);
  }

  changeQuestion() {
    const { questions } = this.props;
    const { questionIndex, player } = this.state;
    const number = 4;
    if (questionIndex === number) {
      this.changePage();
    }
    this.setState((state) => ({
      questionIndex: (state.questionIndex + 1) % questions.length,
      buttonBorder: false,
      timer30: 30,
    }));
    this.timer();
    localStorage.setItem('state', JSON.stringify(player));
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

  handleClick(event) {
    this.handleUniqueAnswer(event);
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
            { username }
          </p>
          <div className="timer">
            <span>
              Timer:
            </span>
            { timer30 }
          </div>
          <span
            data-testId="header-score"
          >
            Placar:
          </span>
          { score }
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
            { questionAtual && questionAtual.question }
            { /* {questionAtual && questionAtual.difficulty} !! */ }
          </div>
        </div>
        <div className="gamepage-answer">
          { questionAtual && questionAtual.incorrect_answers
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
            id="correct"
            disabled={ buttonBorder }
          >
            { questionAtual && questionAtual.correct_answer }
          </button>
          { this.showNextButton() }
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
