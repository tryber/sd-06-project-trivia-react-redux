import React from 'react';
import './Game.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { fetchApi } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
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
    };
  }

  async componentDidMount() {
    const { questionFetch } = this.props;
    await questionFetch();
    this.getAnswers();
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

  render() {
    const { placar, nextButton, counter, answers } = this.state;
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
          </div>
          <div className="buttons">
            { answers !== '' ? answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                className="btn btn-secondary btn-lg mt-4 ml-2 mr-2"
                data-testid={ answer.correction }
                onClick={ this.firstClick }
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
