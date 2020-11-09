import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import store from '../store';
import Timer from '../components/timer';
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
  }

  componentDidMount() {
    this.scoreLocalStorage();
  }

  componentDidUpdate(_prev, newState) {
    const { answered } = this.state;
    if (newState.answered !== answered
      && newState.choice === 'correct-answer') this.handleScore();
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

  handleAnswer(value) {
    this.setState({
      clicked: true,
      answered: true,
      choice: value,
    });
  }

  handleScore() {
    const { scorePoints, APIQuestions } = this.props;
    const { time, index } = this.state;
    const TEN = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let difficult = 0;
    if (APIQuestions[index].difficulty === 'easy') difficult = easy;
    if (APIQuestions[index].difficulty === 'medium') difficult = medium;
    if (APIQuestions[index].difficulty === 'hard') difficult = hard;
    const points = (TEN + (time * difficult));
    scorePoints(points);
  }

  render() {
    const { APIQuestions, timeout } = this.props;
    const { index, clicked, choice } = this.state;
    const random = 0.5;
    if (APIQuestions.length === 0) {
      return (
        <h3>Carregando...</h3>
      );
    }
    console.log(choice);
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
        <section className="game-answers">
          {
            APIQuestions[index]
              .incorrect_answers.concat(APIQuestions[index].correct_answer)
              .map((question, i) => {
                if (question === APIQuestions[index].correct_answer) {
                  return (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      value="correct-answer"
                      key={ i }
                      disabled={ timeout }
                      className={ clicked ? 'correct-answer' : null }
                      onClick={ () => this.handleAnswer('correct-answer') }
                    >
                      {question}
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    value="wrong-answer"
                    key={ i }
                    disabled={ timeout }
                    className={ clicked ? 'wrong-answer' : null }
                    onClick={ () => this.handleAnswer('wrong-answer') }
                  >
                    {question}
                  </button>
                );
              }).sort(() => Math.random() - random)
          }
        </section>
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
