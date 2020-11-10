import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';
import '../style/ButtonsGame.css';
import { questionScore, questionScorePlayer } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.shufflesAnswer = this.shufflesAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.timer = this.timer.bind(this);
    this.state = {
      index: 0,
      green: '',
      red: '',
      respondeu: false,
      time: 30,
      timeInterval: null,
      disableAnwsers: false,
    };
  }

  componentDidMount() {
    this.timer();
  }

  colorButton(rightAnswer) {
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
        difficultyNumber = 0;
        break;
      }
      const ten = 10;
      const score = ten + (time * difficultyNumber);
      saveScorePlayer(score);
      // saveRanking({
      //   score,
      //   name: user.login.name,
      //   picture: user.login.picture,
      // });
    }
    this.setState({
      green: 'correct-answer',
      red: 'wrong-answer',
      respondeu: true,
    });
  }

  shufflesAnswer(question) {
    // const { incorrect_answers, correct_answer } = question;
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
            className={ green }
            onClick={ () => this.colorButton(true) }
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
          className={ red }
          onClick={ () => this.colorButton(false) }
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
      respondeu: false,
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
          console.log('para tempo encerrado');
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
    const { index, respondeu, time } = this.state;
    // const { category, question } = arrayQuestion[index];
    // console.log('arrayQuestion', arrayQuestion);
    if (arrayQuestion.length === 0) {
      return (
        <span>Login não realizado</span>
      );
    }
    return (
      <div>
        <Header />
        <p data-testid="question-category">{arrayQuestion[index].category}</p>
        <p data-testid="question-text">{arrayQuestion[index].question}</p>
        {this.shufflesAnswer(arrayQuestion[index])}
        {respondeu && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.nextQuestion() }
          >
            Próxima
          </button>
        )}
        <span>{ time }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayQuestion: state.questionsInformation.arrayQuestion,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveRanking: (ranking) => dispatch(questionScore(ranking)),
  saveScorePlayer: (score) => dispatch(questionScorePlayer(score)),
  saveRanking: () => dispatch(questionScore()),
});

Game.propTypes = {
  arrayQuestion: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveScorePlayer: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
