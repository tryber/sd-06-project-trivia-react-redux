import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { Icon } from 'semantic-ui-react';
import { fetchApi, scoreFunction } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.decodeHTMLEntities = this.decodeHTMLEntities.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      stop: false,
      counter: 0,
      timer: 30,
      randomNumber: 0,
    };
  }

  async componentDidMount() {
    this.random();
    const { questionFetch } = this.props;
    const miliseconds = 1000;
    await questionFetch();
    this.timerID = setInterval(() => this.timerFunction(), miliseconds);
    this.random();
  }

  timerFunction() {
    const { timer, stop } = this.state;
    if (timer > 0 && !stop) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({ stop: true });
    }
  }

  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  async nextQuestion() {
    const { counter } = this.state;
    await this.setState({
      stop: false,
      counter: counter + 1,
      timer: 30,
    });
    this.random();
  }

  random() {
    const four = 4;
    this.setState({
      randomNumber: Math.floor(Math.random() * (four - 0)) + 0,
    });
  }

  shuffle(array) {
    const { randomNumber } = this.state;
    const index = array.findIndex((e) => e.props['data-testid'] === 'correct-answer');
    [array[index], array[randomNumber]] = [array[randomNumber], array[index]];
    return array;
  }

  render() {
    const { counter, timer, stop } = this.state;
    const { name, email, results, score, scoreSum, assertions } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);
    const five = 5;
    localStorage.setItem('state', JSON
      .stringify({ player: { name, score, gravatarEmail: email, assertions } }));
    if (counter === five) {
      return <Redirect to="/feedback" />;
    }
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
            { score }
          </div>
        </header>
        <div className="container-game">
          <div className="right">
            <div className="timer">
              <Icon fitted name="hourglass half" />
              { timer > 0 ? `TEMPO: ${timer}s` : 'TEMPO ESGOTADO' }
            </div>
            <br />
            <div data-testid="question-category">
              CATEGORIA[
              { results !== '' ? this.decodeHTMLEntities(results[counter].category) : '' }
              ]
            </div>
            <div className="question" data-testid="question-text">
              { results !== ''
                ? this.decodeHTMLEntities(results[counter].question) : 'CARREGANDO...' }
            </div>
          </div>
          <div className="buttons">
            { results !== ''
              ? this
                .shuffle([...results[counter].incorrect_answers.map((answer, index) => (
                  <button
                    key={ `incorrect-${index}` }
                    style={ { border: `${stop ? '3' : '0'}px solid rgb(255, 0, 0)` } }
                    type="button"
                    className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ () => { this.setState({ stop: true }); } }
                    disabled={ stop }
                  >
                    { this.decodeHTMLEntities(answer) }
                  </button>
                )), (
                  <button
                    key="correct"
                    style={ { border: `${stop ? '3' : '0'}px solid rgb(6, 240, 15)` } }
                    type="button"
                    className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                    data-testid="correct-answer"
                    onClick={
                      () => { scoreSum(timer, counter); this.setState({ stop: true }); }
                    }
                    disabled={ stop }
                  >
                    { this.decodeHTMLEntities(results[counter].correct_answer) }
                  </button>)]) : '' }
            <div className="nextbutton">
              <button
                type="button"
                className="btn btn-warning btn-block mt-4"
                data-testid="btn-next"
                style={ stop ? { display: 'block' } : { display: 'none' } }
                onClick={ this.nextQuestion }
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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
  score: PropTypes.number.isRequired,
  scoreSum: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  email: state.user.player.email,
  results: state.game.results,
  score: state.game.game.score,
  assertions: state.game.game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
  scoreSum: (timer, counter) => dispatch(scoreFunction(timer, counter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
