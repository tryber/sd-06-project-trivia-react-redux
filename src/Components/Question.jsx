import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Question.css';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      classCorrect: 'btn',
      classIncorrect: 'btn',
      question: [],
      countdown: 30,
      disabled: false,
    };

    this.randomQuestions = this.randomQuestions.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.setCountdown = this.setCountdown.bind(this);
    this.handleRandomQuestion = this.handleRandomQuestion.bind(this);
  }

  componentDidMount() {
    this.handleRandomQuestion();
    setInterval(this.setCountdown, 1000);
  }

  setCountdown() {
    const { countdown } = this.state;
    if (countdown > 0) {
      this.setState((previous) => ({
        ...previous,
        countdown: previous.countdown - 1,
      }));
    } else {
      this.setState({
        countdown: 0,
        disabled: true,
      });
    }
  }

  handleRandomQuestion() {
    const { getQuestions } = this.props;
    const question = this.randomQuestions(getQuestions);
    this.setState({ question });
  }

  shuffleArray(array) {
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

  checkAnswer() {
    this.setState(() => ({
      classCorrect: 'btn-correct',
      classIncorrect: 'btn-incorrect',
    }));
  }

  randomQuestions() {
    const { getQuestions } = this.props;
    const { classIncorrect, classCorrect, disabled } = this.state;
    const arrayHTML = getQuestions[0].incorrect_answers.map((incorrect, index) => {
      return (
        <button
          id="wrong-answer"
          type="button"
          key={ index }
          disabled={ disabled }
          className={ classIncorrect }
          data-testid={ `wrong-answer${index}` }
          onClick={ this.checkAnswer }
        >
          {incorrect}
        </button>
      );
    });
    arrayHTML.push(
      <button
        id="correct-answer"
        type="button"
        key="correct"
        disabled={ disabled }
        className={ classCorrect }
        data-testid="correct-answer"
        onClick={ this.checkAnswer }
      >
        {getQuestions[0].correct_answer}
      </button>,
    );
    const newArray = this.shuffleArray(arrayHTML);
    return newArray;
  }

  render() {
    const { countdown, question } = this.state;
    const { getQuestions } = this.props;
    console.log(this.state);
    return (
      <div>
        <h2 data-testid="question-category">{getQuestions[0].category}</h2>
        <h1 data-testid="question-text">{getQuestions[0].question}</h1>
        <div>{ question.map((answer) => answer) }</div>
        <span>{countdown}</span>
      </div>
    );
  }
}

Question.propTypes = {
  getQuestions: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  getQuestions: state.questions.questionsArray,
});

export default connect(mapStateToProps, null)(Question);
