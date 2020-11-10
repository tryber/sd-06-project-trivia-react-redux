import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import './GameContent.css';
import { addResult } from '../actions/game';
import { addPlayerRank } from '../actions/ranking';

class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: {},
      isLoading: true,
      current: 0,
      answer: false,
      sort: [],
      redirect: false,
      results: [],
      btnDisabled: false,
      score: 0,
      assertions: 0,
      counter: 30,
    };

    this.shuffle = this.shuffle.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.setResult = this.setResult.bind(this);
    this.setPlayerRank = this.setPlayerRank.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
  }

  componentDidMount() {
    this.fetchApi();

    this.shuffle([1, 2, 1 + 2, 2 + 2]);
    this.setTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const resetedTimer = 30;
    const { counter, current } = this.state;

    if (counter === resetedTimer && current !== prevState.current) {
      this.setTimer();
    }

    if (counter <= 0) {
      this.resetTimer();
      this.setResult(false);
    }
  }

  setNextQuestion() {
    this.setState((prevState) => ({ current: prevState.current + 1 }));
  }

  setTimer() {
    const second = 1000;
    this.setState({ answer: false });
    this.counterId = setInterval(
      () => this.setState((prevState) => ({ counter: prevState.counter - 1 })), second,
    );
  }

  setResult(result) {
    const { results } = this.state;
    this.setState(() => ({ answer: true }), () => {
      this.setState({ results: [...results, result], btnDisabled: true });
    });
  }

  setPlayerRank(login, sum, copiedPlayers, dispatchRanking) {
    const playerRank = {
      name: login.user,
      score: sum,
      email: login.email,
    };
    dispatchRanking(playerRank);
    localStorage.setItem('ranking', copiedPlayers);
  }

  resetTimer() {
    clearInterval(this.counterId);
    this.setState({ counter: 30 });
  }

  async fetchApi() {
    const token = localStorage.getItem('token');
    const tokenExpiredErr = 3;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    await fetch(url)
      .then((response) => response.json())
      .then((a) => this.setState({ element: a, isLoading: false, answer: false }))
      .catch((err) => {
        if (err.response_code === tokenExpiredErr) this.setState({ redirect: true });
      });
  }

  async handleClickAnswer(event) {
    const { target } = event;
    const result = target.className === 'correct';
    this.setResult(result);
    this.resetTimer();
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue = 0;
    let randomIndex = 0;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({ sort: array });
  }

  handleClickNextButton() {
    const { current } = this.state;
    const questionsIndexes = [1, 2, 2 + 1, 2 + 2];
    this.shuffle(questionsIndexes);
    this.setState({ btnDisabled: false, current: current + 1 });
  }

  handleScore(questionsDataARR, counter) {
    const { score, assertions } = this.state;
    const { difficulty } = questionsDataARR;
    let difficultyNumber = 0;
    const ten = 10;
    if (difficulty === 'easy') { difficultyNumber = 1; }
    if (difficulty === 'medium') { difficultyNumber = 2; }
    if (difficulty === 'hard') { difficultyNumber = 1 + 2; }
    const sum = score + (ten + (counter * difficultyNumber));
    const incrementedAssertions = assertions + 1;
    this.setState({ score: sum, assertions: incrementedAssertions });

    this.handleLocalStorage(sum, incrementedAssertions);
  }

  handleLocalStorage(sum, attAssertions) {
    const { login, dispatchResults } = this.props;
    const player = {
      player: {
        name: login.user,
        assertions: attAssertions,
        score: sum,
        gravatarEmail: login.email,
      },
    };
    const jsonAux = JSON.stringify(player);
    localStorage.setItem('state', jsonAux);
    dispatchResults(player);
  }

  renderNextButton() {
    const { btnDisabled, results, score } = this.state;
    const { login, players, dispatchRanking } = this.props;
    const copiedPlayers = [...players];
    const maxAnswers = 5;
    if (results.length < maxAnswers) {
      return (
        <button
          disabled={ !btnDisabled }
          className={ `${!btnDisabled ? 'btnDisplay' : null}` }
          type="button"
          onClick={ () => this.handleClickNextButton() }
          data-testid="btn-next"
        >
          Proxima pergunta
        </button>
      );
    }
    return (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.setPlayerRank(
            login, score, copiedPlayers, dispatchRanking,
          ) }
        >
          ver pontuação
        </button>
      </Link>
    );
  }

  render() {
    const { element,
      current, isLoading, answer, sort, btnDisabled, counter, redirect } = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }
    if (redirect) return <Redirect to="/" />;
    const questionsDataARR = element.results[current];
    const correctQuestion = questionsDataARR.correct_answer;
    const questions = [...questionsDataARR.incorrect_answers, correctQuestion];
    const correctAnswer = (item, index) => (
      <button
        disabled={ btnDisabled }
        key={ `btn${index}` }
        id={ `order-${sort[index]}` }
        type="button"
        className={ `${answer ? 'correct' : null}` }
        onClick={ (event) => this.handleClickAnswer(event)
          && this.handleScore(questionsDataARR, counter) }
        data-testid="correct-answer"
      >
        {item}
      </button>
    );
    const wrongAnswer = (item, index) => (
      <button
        disabled={ btnDisabled }
        key={ `btn${index}` }
        id={ `order-${sort[index]}` }
        type="button"
        className={ ` ${answer ? 'incorrect' : null}` }
        onClick={ (event) => this.handleClickAnswer(event) }
        data-testid={ `wrong-answer-${index}` }
      >
        {item}
      </button>);
    return (
      <div className="father">
        <p data-testid="question-category">{questionsDataARR.category}</p>
        <p data-testid="question-text">{questionsDataARR.question}</p>
        {questions.map((item, index) => (
          item === questionsDataARR.correct_answer
            ? correctAnswer(item, index)
            : wrongAnswer(item, index)
        ))}
        <div className="counter">
          {!btnDisabled && <span>{counter}</span>}
        </div>
        {this.renderNextButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login.player,
  players: state.ranking.players,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResults: (result) => dispatch(addResult(result)),
  dispatchRanking: (playerRank) => dispatch(addPlayerRank(playerRank)),
});

GameContent.propTypes = {
  dispatchResults: PropTypes.func.isRequired,
  dispatchRanking: PropTypes.func.isRequired,
  login: PropTypes.shape().isRequired,
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContent);
