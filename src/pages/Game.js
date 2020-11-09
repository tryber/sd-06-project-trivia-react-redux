import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import store from '../store';
import Timer from '../components/timer';
import Questions from '../components/Questions';
import { scoreAction } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);

    const { time } = this.props;
    this.state = {
      answered: false,
      index: 0,
      clicked: false,
      time,
      choice: '',
    };

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.setTimeUpdate = this.setTimeUpdate.bind(this);
  }

  componentDidMount() {
    this.scoreLocalStorage();
  }

  componentDidUpdate(_prev, newState) {
    const { time } = this.props;
    const { answered } = this.state;
    if (newState.answered !== answered) this.handleScore();
    if (newState.time !== time) this.setTimeUpdate(time);
    this.scoreLocalStorage();
  }

  setTimeUpdate(time) {
    this.setState({ time });
  }

  scoreLocalStorage() {
    const { name, email, score, assertions } = this.props;
    const state = JSON.stringify({ player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    } });
    localStorage.setItem('state', state);
  }

  handleAnswer(value) {
    this.setState({
      clicked: true,
      answered: true,
      choice: value,
    });
  }

  handleScore() {
    const { scorePoints, APIQuestions } = this.props;
    const { time, index, choice } = this.state;
    const TEN = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let difficult = 0;
    if (APIQuestions[index].difficulty === 'easy') difficult = easy;
    if (APIQuestions[index].difficulty === 'medium') difficult = medium;
    if (APIQuestions[index].difficulty === 'hard') difficult = hard;
    const points = (TEN + (time * difficult));
    if (choice === 'correct-answer') scorePoints(points);
  }

  render() {
    const { APIQuestions, timeout } = this.props;
    const { index, clicked } = this.state;
    if (APIQuestions.length === 0) {
      return (
        <h3>Carregando...</h3>
      );
    }
    return (
      <section className="game-container">
        <section className="game-header">
          <Header />
        </section>
        <section className="game-question">
          <section className="game-category">
            <h3 data-testid="question-category">
              {APIQuestions[index].category}
            </h3>
          </section>
          <section className="game-text">
            <section data-testid="question-text">
              {APIQuestions[index].question}
            </section>
          </section>
        </section>
        <Questions
          APIQuestions={ APIQuestions }
          indexDinamico={ index }
          disabled={ timeout }
          classCorrect={ clicked ? 'correct-answer' : null }
          classWrong={ clicked ? 'wrong-answer' : null }
          onClickCorrect={ () => this.handleAnswer('correct-answer') }
          onClickWrong={ () => this.handleAnswer('wrong-answer') }
        />
        <section>
          <Provider store={ store }>
            <Timer />
          </Provider>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
  timeout: state.playerData.payload.timeout,
  time: state.playerData.payload.time,
  name: state.login.name,
  email: state.login.email,
  score: state.allQuestions.score,
  assertions: state.allQuestions.assertions,
  APIQuestions: state.allQuestions.results,
});

const mapDispatchToProps = (dispatch) => ({
  scorePoints: (score) => dispatch(scoreAction(score)),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  timeout: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  scorePoints: PropTypes.func.isRequired,
  APIQuestions: PropTypes.arrayOf(
    PropTypes.shape(),
    PropTypes.array,
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
