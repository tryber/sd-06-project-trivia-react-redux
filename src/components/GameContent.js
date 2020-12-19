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

    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.setResult = this.setResult.bind(this);
    this.setPlayerRank = this.setPlayerRank.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.setPlayerScore = this.setPlayerScore.bind(this);
    this.updatePlayerData = this.updatePlayerData.bind(this);
    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.renderCorrectOption = this.renderCorrectOption.bind(this);
    this.renderWrongOption = this.renderWrongOption.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
    this.shuffleQuestions([1, 2, 1 + 2, 2 + 2]);
    this.setTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    this.setTimer(prevState);
    this.resetTimer();
  }

  setNextQuestion() {
    this.setState((prevState) => ({ current: prevState.current + 1 }));
  }

  setTimer(previousState = {}) {
    const { counter, current } = this.state;
    const resetedTimer = 30;

    if (counter === resetedTimer && current !== previousState.current) {
      const second = 1000;
      this.counterId = setInterval(
        () => this.setState((prevState) => ({ counter: prevState.counter - 1 })), second,
      );
    }
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
    localStorage.setItem('ranking', JSON.stringify(copiedPlayers));
  }

  setPlayerScore(questionsDataARR, counter) {
    const { score, assertions } = this.state;
    const { difficulty } = questionsDataARR;
    const ten = 10;
    const difficultyOptions = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const sum = score + (ten + (counter * difficultyOptions[difficulty]));
    const incrementedAssertions = assertions + 1;

    this.updatePlayerData(sum, incrementedAssertions);
  }

  updatePlayerData(sum, incrementedAssertions) {
    const { login, dispatchPlayerResult } = this.props;

    const player = {
      player: {
        name: login.user,
        assertions: incrementedAssertions,
        score: sum,
        gravatarEmail: login.email,
      },
    };
    this.setState({ score: sum, assertions: incrementedAssertions });
    localStorage.setItem('state', JSON.stringify(player));
    dispatchPlayerResult(player);
  }

  resetTimer() {
    const { counter } = this.state;
    if (counter <= 0) {
      clearInterval(this.counterId);
      this.setState({ counter: 30 });
      this.setResult(false);
    }
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

  shuffleQuestions(array) {
    let currentIndex = array.length;
    let randomIndex = 0;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex],
        array[currentIndex]];
    }
    this.setState({ sort: array });
  }

  handleClickNextButton() {
    const { current } = this.state;
    const questionsIndexes = [1, 2, 2 + 1, 2 + 2];
    this.shuffleQuestions(questionsIndexes);
    this.setState({ btnDisabled: false, current: current + 1, answer: false });
  }

  renderCorrectOption(item, index) {
    const { element, current, btnDisabled, sort, answer, counter } = this.state;
    const questionsDataARR = element.results[current];

    return (
      <button
        disabled={ btnDisabled }
        key={ `btn${index}` }
        id={ `order-${sort[index]}` }
        type="button"
        className={ `${answer ? 'correct' : null}` }
        onClick={ (event) => this.handleClickAnswer(event)
          && this.setPlayerScore(questionsDataARR, counter) }
        data-testid="correct-answer"
      >
        {item}
      </button>
    );
  }

  renderWrongOption(item, index) {
    const { btnDisabled, sort, answer } = this.state;

    return (
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
  }

  renderOptions() {
    const { element, current } = this.state;
    const questionsDataARR = element.results[current];
    const correctOption = questionsDataARR.correct_answer;
    const questions = [...questionsDataARR.incorrect_answers, correctOption];

    return (questions.map((question, index) => (
      question === correctOption
        ? this.renderCorrectOption(question, index)
        : this.renderWrongOption(question, index)
    )));
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
      current, isLoading, btnDisabled, counter, redirect } = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }
    if (redirect) return <Redirect to="/" />;
    const questionsDataARR = element.results[current];

    return (
      <div className="father">
        <p data-testid="question-category">{questionsDataARR.category}</p>
        <p data-testid="question-text">{questionsDataARR.question}</p>
        {this.renderOptions()}
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
  dispatchPlayerResult: (result) => dispatch(addResult(result)),
  dispatchRanking: (playerRank) => dispatch(addPlayerRank(playerRank)),
});

GameContent.propTypes = {
  dispatchPlayerResult: PropTypes.func.isRequired,
  dispatchRanking: PropTypes.func.isRequired,
  login: PropTypes.shape().isRequired,
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContent);
