import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Timer from '../components/timer';
import Questions from '../components/Questions';
import { scoreAction, answerAction } from '../actions';
// import playerData from '../reducers/playerData';

class Game extends Component {
  constructor(props) {
    super(props);

    const { time, answered } = this.props;
    this.state = {
      answered,
      index: 0,
      clicked: false,
      time,
      choice: '',
      disableNextBtn: false,
    };

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.setTimeUpdate = this.setTimeUpdate.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClickButtonNext = this.handleClickButtonNext.bind(this);
  }

  componentDidMount() {
    this.scoreLocalStorage();
  }

  componentDidUpdate(prev, prevState) {
    // const { time } = this.props;
    // if (prev.time !== prevState.time) this.setTimeUpdate(time);
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
      choice: value,
    });
    this.handleScore();
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
    const points = choice === 'correct-answer' ? (TEN + (time * difficult)) : 0;
    const respondida = {
      answered: true,
      score: points,
      timeout: false,
    };
    scorePoints(respondida);
  }

  handleButton() {
    const { clicked, disableNextBtn } = this.state;

    if (clicked) {
      return (
        <button
          type="button"
          onClick={ () => this.handleClickButtonNext() }
          data-testid="btn-next"
          disabled={ disableNextBtn }
        >
          Próxima
        </button>
      );
    }
  }

  handleClickButtonNext() {

    this.setState(((prevState) => ({
      index: prevState.index + 1,
      clicked: false,
      choice: '',
    })), () => {
      const { index } = this.state;
      // const { history } = this.props;
      const QUATRO = 4;

      if (index === QUATRO) {
        this.setState({ disableNextBtn: true });
        // history.push('/feedback');
      } else {
        this.setState({ disableNextBtn: false });
      }
    });
    const { answeredAction } = this.props;
    const resetTime = {
      time: 30,
      answered: false,
      timeout: false,
    };
    answeredAction(resetTime);
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
          { this.handleButton() }
        </section>
        <section>
          <Timer />
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
  timeout: state.allQuestions.timeout,
  time: state.allQuestions.time,
  name: state.login.name,
  email: state.login.email,
  score: state.allQuestions.score,
  assertions: state.allQuestions.assertions,
  APIQuestions: state.allQuestions.results,
  answered: state.allQuestions.answered,
});

const mapDispatchToProps = (dispatch) => ({
  scorePoints: (score) => dispatch(scoreAction(score)),
  // playerDataReset: (time) => dispatch(playerData(time)),
  answeredAction: (answerTime) => dispatch(answerAction(answerTime)),
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
