import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveScoreToState } from '../actions';

class QuestionCard extends Component {
  constructor(props) {
    super();

    const { questions } = props;
    const answersArray = [...questions.incorrect_answers, questions.correct_answer];
    answersArray.sort(() => 0.5 - Math.random());

    this.renderButtons = this.renderButtons.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.setCountdown = this.setCountdown.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetCountdown = this.resetCountdown.bind(this);

    this.state = {
      answersArray,
      timerInterval: {},
      countdown: 30,
      disabled: false,
      isCorrect: false,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.saveToStorage();
    const timerInterval = setInterval(this.setCountdown, 1000);
    this.storeTimerInSate(timerInterval);
  }

  componentDidUpdate(prevProps) {
    const { answerIndex } = this.props;
    if (prevProps.answerIndex !== answerIndex) {
      this.updateAnswerIndex();
      this.resetCountdown();
    }
  }

  setCountdown() {
    const { countdown, timerInterval, isCorrect } = this.state;
    if (isCorrect) {
      clearInterval(timerInterval);
    }

    if (countdown > 0) {
      return this.setState((previous) => ({
        ...previous,
        countdown: previous.countdown - 1,
      }));
    }

    clearInterval(timerInterval);
    this.setState({
      countdown: 0,
    });
    this.changeDisabled(true);
  }

  resetCountdown() {
    this.setState({
      countdown: 30,
      timerInterval: {},
      isCorrect: false,
    });

    const timerInterval = setInterval(this.setCountdown, 1000);
    this.storeTimerInSate(timerInterval);
  }

  saveToStorage() {
    const { getLogin: { name, gravatarEmail } } = this.props;
    if (!localStorage.state) {
      const player = {
        name,
        score: 0,
        assertions: this.state.assertions,
        gravatarEmail,
      };
      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  changeDisabled(disabled) {
    this.setState({ disabled });
  }

  storeTimerInSate(timerInterval) {
    this.setState({ timerInterval });
  }

  updateAnswerIndex() {
    const { questions } = this.props;
    const tempArray = [...questions.incorrect_answers, questions.correct_answer];
    tempArray.sort(() => 0.5 - Math.random());

    this.setState({
      answersArray: tempArray,
      disabled: false,
    });
  }

  decode(text) {
    const element = document.createElement('textarea');
    element.innerHTML = text;
    return element.value;
  }

  checkAnswer({ target }) {
    const button = document.querySelectorAll('.btn');
    Object.values(button).forEach((item) => {
      if (item.id === 'correct-answer') {
        item.classList.add('correct');
      }
      if (item.id === 'wrong-answer') {
        item.classList.add('incorrect');
      }
    });

    const nextButton = document.querySelector('.invisible');
    if (nextButton) {
      nextButton.classList.replace('invisible', 'btn');
    }

    if (target.id === 'correct-answer') {
      const point = this.state.assertions + 1;
      this.setState({ 
        isCorrect: true,
        assertions: point,
       },() => this.saveScore());
     // this.saveScore();
    }

    this.changeDisabled(true);
  }

  saveScore() {
    const { countdown } = this.state;
    const { questions, setScore, getLogin: { name, gravatarEmail } } = this.props;
    const { difficulty } = questions;
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };
    const points = 10 + (difficultyPoints[difficulty] * countdown);

    if (localStorage.state) {
      const { player: { score: prevScore } } = JSON.parse(localStorage.getItem('state'));
      const newScore = prevScore + points;
      const player = {
        name,
        assertions: this.state.assertions,
        score: newScore,
        gravatarEmail,
      };
      localStorage.setItem('state', JSON.stringify({ player }));
      setScore(player);
    } else {
      localStorage.setItem('state', JSON.stringify({
        player: {
          name,
          assertions: this.state.assertions,
          score: 0,
          gravatarEmail,
        },
      }));
    }
  }

  renderButtons(index, question, className) {
    const { disabled } = this.state;
    const text = this.decode(question);

    return (
      <button
        id={ className }
        type="button"
        key={ index }
        disabled={ disabled }
        className="btn"
        data-testid={
          className === 'wrong-answer' ? `wrong-answer${index}` : 'correct-answer'
        }
        onClick={ this.checkAnswer }
      >
        {text}
      </button>
    );
  }

  render() {
    const { answersArray, countdown } = this.state;
    const { questions } = this.props;
    const { category, question, correct_answer: correctAnswer } = questions;

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h2 data-testid="question-text">{this.decode(question)}</h2>
        <div>
          { answersArray.map((answer, index) => {
            if (answer === correctAnswer) {
              return this.renderButtons(index, answer, 'correct-answer');
            }
            return this.renderButtons(index, answer, 'wrong-answer');
          }) }
        </div>
        <p>{ countdown }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getAnswers: state.questions.questionsArray,
  getLogin: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(saveScoreToState(score)),
});

QuestionCard.propTypes = {
  answerIndex: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  getLogin: PropTypes.arrayOf(Object).isRequired,
  setScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
