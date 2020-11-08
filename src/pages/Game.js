import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { Icon } from 'semantic-ui-react';
import { fetchApi } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.optionChoose = this.optionChoose.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.decodeHTMLEntities = this.decodeHTMLEntities.bind(this);
    this.state = {
      scoreBoard: 0,
      nextButton: 'none',
      counter: 0,
      answers: '',
      borderGreen: 0,
      borderRed: 0,
      timer: 30,
      choice: '',
    };
  }

  async componentDidMount() {
    const { questionFetch } = this.props;
    const miliseconds = 1000;
    await questionFetch();
    this.getAnswers();
    this.timerID = setInterval(() => this.timerFunction(), miliseconds);
  }

  getAnswers() {
    const { results } = this.props;
    const { counter } = this.state;
    const correctAnswer = {
      correction: 'correct-answer',
      result: results[counter].correct_answer,
    };
    const incorrectAnswers = results[counter].incorrect_answers
      .map((e, index) => ({
        correction: `wrong-answer-${index}`,
        result: e,
      }));
    const answers = [correctAnswer, ...incorrectAnswers];
    this.shuffle(answers);
    this.setState({ answers });
  }

  timerFunction() {
    const { timer, choice } = this.state;
    if (timer > 0 && choice === '') {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.changeState();
    }
  }

  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  changeState() {
    this.setState({
      nextButton: 'block',
      borderGreen: '3px solid rgb(6, 240, 15)',
      borderRed: '3px solid rgb(255, 0, 0)',
    });
  }

  async optionChoose(event) {
    await this.setState({
      choice: event.target.id,
    });
    this.changeState();
    this.score();
  }

  async nextQuestion() {
    const { counter } = this.state;
    await this.setState({
      borderGreen: 0,
      borderRed: 0,
      counter: counter + 1,
      nextButton: 'none',
      timer: 30,
      choice: '',
    });
    this.getAnswers();
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  score() {
    const { results } = this.props;
    const { counter, timer, scoreBoard, choice } = this.state;
    let total = scoreBoard;
    const ten = 10;
    const three = 3;
    if (choice === 'correct-answer') {
      switch (results[counter].difficulty) {
      case 'easy':
        total = scoreBoard + ten + (timer * 1);
        console.log(timer);
        break;
      case 'medium':
        total = scoreBoard + ten + (timer * 2);
        break;
      case 'hard':
        total = scoreBoard + ten + (timer * three);
        break;
      default:
        total = scoreBoard;
      }
    }
    this.setState({
      scoreBoard: total,
    });
  }

  render() {
    const { nextButton, counter, answers,
      borderGreen, borderRed, timer, scoreBoard } = this.state;
    const { name, email, results } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);
    const four = 4;
    localStorage.setItem('state', JSON
      .stringify({ player: { name, score: scoreBoard, gravatarEmail: email } }));

    return (
      <div>
        <header className="container-header">
          <div>
            <img
              data-testid="header-profile-picture"
              alt="imagem"
              src={ gravatarLink + emailMD5 }
              className="picture"
            />
          </div>
          <div data-testid="header-player-name">
            Jogador:
            { name }
          </div>
          <div data-testid="header-score">
            Placar:
            { scoreBoard }
          </div>
        </header>
        <div className="container-game">
          <div className="right">
            <div className="timer">
              <Icon fitted name="hourglass half" />
              { timer >= 0 ? `TEMPO: ${timer}s` : 'TEMPO ESGOTADO' }
            </div>
            <br />
            <div data-testid="question-category">
              CATEGORIA[
              { results !== '' ? this.decodeHTMLEntities(results[counter].category) : '' }
              ]
            </div>
            <div className="question" data-testid="question-text">
              { results !== '' ? this.decodeHTMLEntities(results[counter].question) : '' }
            </div>
          </div>
          <div className="buttons">
            { answers !== '' ? answers.map((answer, index) => (
              <button
                key={ index }
                id={ answer.correction }
                style={ answer.correction === 'correct-answer'
                  ? { border: borderGreen } : { border: borderRed } }
                type="button"
                className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                data-testid={ answer.correction }
                onClick={ this.optionChoose }
                disabled={ nextButton === 'block' }
              >
                { this.decodeHTMLEntities(answer.result) }
              </button>
            )) : '' }
            <div className="nextbutton">
              { counter === four ? (
                <Link
                  style={ { textDecoration: 'none' } }
                  to="/feedback"
                >
                  <button
                    type="button"
                    className="btn btn-warning btn-block mt-4"
                    data-testid="btn-next"
                    style={ { display: nextButton } }
                  >
                      PRÓXIMA
                  </button>
                </Link>)
                : (
                  <button
                    type="button"
                    className="btn btn-warning btn-block mt-4"
                    data-testid="btn-next"
                    style={ { display: nextButton } }
                    onClick={ this.nextQuestion }
                  >
                    PRÓXIMA
                  </button>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  email: state.user.player.email,
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
