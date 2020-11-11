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
      disableButton: false,
      buttonBorder: false,
      timer30: 30,
    };
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changePage = this.changePage.bind(this);
    // _________________________________________
    this.handleClick = this.handleClick.bind(this);
    this.questionsGet = this.questionsGet.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.questionsGet();
    const miliseconds = 1000;
    this.aux = setInterval(this.countdown, miliseconds);
    this.countdown(this.aux);
    console.log('test');
  }

  componentWillUnmount() {
    clearInterval(this.aux);
  }

  changePage() {
    console.log('next page');
    const { history } = this.props;
    history.push('/feedback');
  }

  changeQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const number = 4;
    if (questionIndex === number) {
      this.changePage();
      this.setState((state) => (
        {
          questionIndex: (state.questionIndex + 1) % questions.length,
          disableButton: false,
          buttonBorder: false,
          timer30: 30,
        }
      ));
    }
    const miliseconds = 1000;
    this.aux = setInterval(this.countdown, miliseconds);
    this.countdown(this.aux);
  }

  // _________________________________________________

  async questionsGet() {
    const tokenLocal = localStorage.getItem('token');
    await questionsAPI(tokenLocal);
  }

  countdown() {
    const { timer30 } = this.state;
    // if (timer30 >= 0) {
    // clearInterval(this.aux);
    this.setState({
      timer30: timer30 - 1,
    });
    // } else {
    //   this.handleClick();
    // }
    if (timer30 <= 0) {
      clearInterval(this.aux);
      this.handleClick()
    }
    
  }

  handleClick() {
    const { buttonBorder } = this.state;
    this.setState({
      buttonBorder: !buttonBorder,
    });
  }

  render() {
    const { email, username, questions } = this.props;
    // console.log('questions do Redux:', questions);
    const { questionIndex, disableButton } = this.state;
    // console.log('index render:', questionIndex);
    const questionAtual = questions[questionIndex];
    const hash = md5(email);
    // ______________________________________________
    const { buttonBorder } = this.state;
    // const { questionAtual } = this.props;
    const { timer30 } = this.state;
    return (
      <div className="gamepage-container">
        <header className="gamepage-header">
          <div>
            {timer30}
          </div>
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
          <span
            data-testid="header-score"
          >
            Placar: 0
          </span>
          <br />
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
          {/* { disableButton && ( */}
          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => this.changeQuestion() }
          >
            PRÓXIMA
          </button>
          {/* )} */}
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
