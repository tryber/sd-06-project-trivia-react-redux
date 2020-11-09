import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { fetchApi, scoreFunction } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.decodeHTML = this.decodeHTML.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      stop: false,
      counter: 0,
      randomNumber: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    this.random();
    const { questionFetch } = this.props;
    questionFetch();
  }

  decodeHTML(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  nextQuestion() {
    const { counter } = this.state;
    this.setState({
      stop: false,
      counter: counter + 1,
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
    [array[0], array[randomNumber]] = [array[randomNumber], array[0]];
    return array;
  }

  render() {
    const { counter, timer, stop } = this.state;
    const { name, email, results, score, scoreSum, assertions, isFetching } = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);
    localStorage.setItem('state', JSON
      .stringify({ player: { name, score, gravatarEmail: email, assertions } }));

    if (isFetching) {
      return <div className="container-game loading">CARREGANDO...</div>;
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
            <div data-testid="question-category">
              CATEGORIA[
              { this.decodeHTML(results[counter].category) }
              ]
            </div>
            <div className="question" data-testid="question-text">
              { this.decodeHTML(results[counter].question) }
            </div>
          </div>
          <div className="buttons">
            { this.shuffle([(
              <button
                key="correct"
                type="button"
                className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                data-testid="correct-answer"
                onClick={
                  () => { scoreSum(timer, counter); this.setState({ stop: true }); }
                }
                disabled={ stop }
              >
                { this.decodeHTML(results[counter].correct_answer) }
              </button>),
            ...results[counter].incorrect_answers.map((answer, index) => (
              <button
                key={ `incorrect-${index}` }
                type="button"
                className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                data-testid={ `wrong-answer-${index}` }
                onClick={ () => { this.setState({ stop: true }); } }
                disabled={ stop }
              >
                { this.decodeHTML(answer) }
              </button>))])}
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
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  email: state.user.player.email,
  isFetching: state.game.isFetching,
  results: state.game.results,
  score: state.game.gameBoard.score,
  assertions: state.game.gameBoard.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
  scoreSum: (timer, counter) => dispatch(scoreFunction(timer, counter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
