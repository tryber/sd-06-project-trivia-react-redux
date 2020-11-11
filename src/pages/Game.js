import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/header';
import Timer from '../components/timer';
import Questions from '../components/Questions';
import { scoreAction, answerAction, rankingAction } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);

    const { time } = this.props;
    this.state = {
      index: 0,
      choice: '',
      clicked: false,
      disableNextBtn: false,
      time,
    };

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleClickButtonNext = this.handleClickButtonNext.bind(this);
  }

  componentDidMount() {
    this.scoreLocalStorage();
  }

  componentDidUpdate() {
    this.scoreLocalStorage();
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

  scoreStore() {
    const { name, email, score, assertions, scoreRanking } = this.props;
    const state = {
      name,
      score,
      avatar: `https://www.gravatar.com/avatar/${md5(email)}`,
      assertions,
    };
    scoreRanking(state);
  }

  handleAnswer(value) {
    this.setState({
      clicked: true,
      choice: value,
    }, () => {
      this.handleScore();
    });
  }

  handleScore() {
    const { scorePoints, APIQuestions } = this.props;
    const { index, choice, time } = this.state;
    const TEN = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let difficult = 0;
    if (APIQuestions[index].difficulty === 'easy') difficult = easy;
    if (APIQuestions[index].difficulty === 'medium') difficult = medium;
    if (APIQuestions[index].difficulty === 'hard') difficult = hard;
    const points = (choice === 'correct-answer') ? (TEN + (time * difficult)) : 0;
    const assertion = (choice === 'correct-answer') ? 1 : 0;
    const respondida = {
      answered: true,
      score: points,
      timeout: false,
      assertions: assertion,
    };
    scorePoints(respondida);
  }

  handleClickButtonNext() {
    const { index } = this.state;
    const { history } = this.props;
    const QUATRO = 4;
    if (index < QUATRO) {
      this.setState(((prevState) => ({
        index: prevState.index + 1,
        clicked: false,
        choice: '',
      })), () => {
        const { answeredAction } = this.props;
        const resetTime = {
          time: 30,
          answered: false,
          timeout: false,
        };
        answeredAction(resetTime);
        this.setState({ disableNextBtn: false });
      });
    } else {
      this.setState({ disableNextBtn: false, clicked: true });
      this.scoreStore();
      // precisa setar clicked pq é a condição para o btn renderizar aqui - line 138
      return history.push('/feedback');
    }
  }

  render() {
    const { APIQuestions, timeout } = this.props;
    const { index, clicked, disableNextBtn } = this.state;
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
          { clicked
            ? (
              <button
                type="button"
                onClick={ () => this.handleClickButtonNext() }
                data-testid="btn-next"
                disabled={ disableNextBtn }
              >
            Próxima
              </button>
            )
            : (<p />)}
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
  answeredAction: (answerTime) => dispatch(answerAction(answerTime)),
  scoreRanking: (ranking) => dispatch(rankingAction(ranking)),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  timeout: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  answeredAction: PropTypes.func.isRequired,
  scorePoints: PropTypes.func.isRequired,
  scoreRanking: PropTypes.func.isRequired,
  APIQuestions: PropTypes.arrayOf(
    PropTypes.shape(),
    PropTypes.array,
    PropTypes.string,
  ).isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
