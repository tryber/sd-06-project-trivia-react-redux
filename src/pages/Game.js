import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';
import '../style/Game.css';
import { questionScore, questionScorePlayer } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.shufflesAnswer = this.shufflesAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.timer = this.timer.bind(this);
    this.testQuestion = this.testQuestion.bind(this);
    this.state = {
      index: 0,
      green: '',
      red: '',
      answered: false,
      time: 30,
      timeInterval: null,
      disableAnwsers: false,
    };
  }

  componentDidMount() {
    this.timer();
  }

  testQuestion(rightAnswer) {
    if (rightAnswer) {
      const { time, index } = this.state;
      const { arrayQuestion, saveScorePlayer } = this.props;
      const objQuestion = arrayQuestion[index];
      let difficultyNumber = 0;
      const three = 3;
      switch (objQuestion.difficulty) {
      case 'hard':
        difficultyNumber = three;
        break;
      case 'medium':
        difficultyNumber = 2;
        break;
      case 'easy':
        difficultyNumber = 1;
        break;
      default:
        break;
      }
      const ten = 10;
      const score = ten + (time * difficultyNumber);
      saveScorePlayer(score);
    }
    this.colorButton();
  }

  colorButton() {
    this.setState({
      green: 'correct-answer',
      red: 'wrong-answer',
      answered: true,
    });
  }

  shufflesAnswer(question) {
    const { green, red, disableAnwsers } = this.state;
    const allAnswers = question.incorrect_answers.concat(question.correct_answer);
    const sortAnswers = allAnswers.sort();
    let index = 0 - 1;
    return sortAnswers.map((element, countoString) => {
      if (question.correct_answer === element) {
        return (
          <button
            key={ countoString }
            type="button"
            data-testid="correct-answer"
            className={ `bttn-question ${green}` }
            onClick={ () => this.testQuestion(true) }
            disabled={ disableAnwsers }
          >
            {element}
          </button>
        );
      }
      index += 1;
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ countoString }
          className={ `bttn-question ${red}` }
          onClick={ () => this.testQuestion(false) }
          disabled={ disableAnwsers }
        >
          {element}
        </button>
      );
    });
  }

  nextQuestion() {
    const { index } = this.state;
    const four = 4;
    if (index === four) {
      const { history, saveRanking } = this.props;
      saveRanking();
      history.push('feedback');
    }
    this.setState((state) => ({
      index: state.index + 1,
      green: '',
      red: '',
      answered: false,
      time: 30,
      disableAnwsers: false,
    }), () => {
      const { timeInterval } = this.state;
      clearInterval(timeInterval);
      this.timer();
    });
  }

  timer() {
    const countTime = 1000;
    const timeInterval = setInterval(() => {
      this.setState((state) => ({
        time: state.time - 1,
      }), () => {
        const { time } = this.state;
        if (time <= 0) {
          this.setState({
            disableAnwsers: true,
          });
          clearInterval(timeInterval);
          this.colorButton();
        }
      });
    }, countTime);
    this.setState({
      timeInterval,
    });
  }

  render() {
    const { arrayQuestion } = this.props;
    const { index, answered, time } = this.state;
    if (arrayQuestion.length === 0) {
      return (
        <span>Login não realizado</span>
      );
    }
    return (
      <div>
        <Header />
        <div className="game">
          <p className="text-category" data-testid="question-category">
            {arrayQuestion[index].category}
          </p>
          <p className="text-question" data-testid="question-text">
            {arrayQuestion[index].question}
          </p>
          {this.shufflesAnswer(arrayQuestion[index])}
          {answered && (
            <button
              className="bttn-next"
              type="button"
              data-testid="btn-next"
              onClick={ () => this.nextQuestion() }
            >
              Próxima
            </button>
          )}
          <span className="timer">{`${time} seg`}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayQuestion: state.questionsInformation.arrayQuestion,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveRanking: () => dispatch(questionScore()),
  saveScorePlayer: (score) => dispatch(questionScorePlayer(score)),
});

Game.propTypes = {
  arrayQuestion: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveScorePlayer: PropTypes.func.isRequired,
  saveRanking: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
