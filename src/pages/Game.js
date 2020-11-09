import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { fetchApi } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.firstClick = this.firstClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.decodeHTMLEntities = this.decodeHTMLEntities.bind(this);
    this.state = {
      placar: 0,
      nextButton: 'none',
      counter: 0,
      answers: '',
      time: 30,
      intervalConst: 0,
      disableAnwsers: false,
    };
  }

  async componentDidMount() {
    const { questionFetch } = this.props;
    await questionFetch();
    this.getAnswers();
    this.timer();
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

  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  firstClick() {
    this.setState({
      nextButton: 'block',
    });
  }

  async nextQuestion() {
    const { counter } = this.state;
    await this.setState({
      counter: counter + 1,
      nextButton: 'none',
    });
    const { intervalConst } = this.state;
    clearInterval(intervalConst);
    this.getAnswers();
    this.timer();
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

  // myTimer(time) {
  //   const atualTime = time - 1;
  //   console.log(atualTime);
  //   return atualTime;
  // }

  timer() {
    const oneSecond = 1000;
    const intervalConst = setInterval(() => {
      const { time } = this.state;
      console.log(time);
      this.setState(() => ({
        time: time - 1,
      }),
      () => {
        if (time <= 1) {
          console.log('time out');
          this.setState({
            disableAnwsers: true,
          });
          clearInterval(intervalConst);
        }
      });
    }, oneSecond);
  }

  render() {
    const { placar, nextButton, counter, answers, time, disableAnwsers } = this.state;
    const { name, email, results } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);

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
            { placar }
          </div>
        </header>
        <div className="container-game">
          <div className="right">
            <div data-testid="question-category">
              CATEGORIA[
              { results !== '' ? this.decodeHTMLEntities(results[counter].category) : '' }
              ]
            </div>
            <div className="question" data-testid="question-text">
              { results !== '' ? this.decodeHTMLEntities(results[counter].question) : '' }
            </div>
            <div className="timer">
              Tempo:
              { time }
            </div>
          </div>
          <div className="buttons">
            { answers !== '' ? answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                data-testid={ answer.correction }
                onClick={ this.firstClick }
                disabled={ disableAnwsers }
              >
                { this.decodeHTMLEntities(answer.result) }
              </button>
            )) : '' }
            <div className="nextbutton">
              <button
                type="button"
                className="btn btn-warning btn-block mt-4"
                data-testid="btn-next"
                style={ { display: nextButton } }
                onClick={ this.nextQuestion }
                disabled={ disableAnwsers }
              >
                PRÓXIMA
              </button>
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
