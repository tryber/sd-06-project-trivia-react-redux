import React from 'react';
import PropTypes from 'prop-types';

import '../Css/Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    const { questionObj } = this.props;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questionObj;

    const allAnswers = [...incorrectAnswers, correctAnswer];
    // Shuffle retirado de https://flaviocopes.com/how-to-shuffle-array-javascript/
    const randomNumber = 0.5;
    allAnswers.sort(() => Math.random() - randomNumber);

    this.state = {
      correctAnswer,
      allAnswers,
      timer: 10,
    };

    this.updateAnswers = this.updateAnswers.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const timerInterval = 1000;

    this.activeTimer = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })), timerInterval,
    );
  }

  componentDidUpdate(prevProps) {
    const { questionObj } = this.props;
    const { timer } = this.state;
    // console.log(questionObj);

    if (prevProps.questionObj.question !== questionObj.question) {
      const allAnswers = this.shuffleAnswers(questionObj);
      const timerInterval = 1000;

      this.updateAnswers(questionObj, allAnswers);
      // a solução abaixo foi inspirada nesta thread:
      // https://qastack.com.br/programming/36299174/setinterval-in-a-react-app
      this.activeTimer = setInterval(
        () => this.setState((prevState) => ({
          timer: prevState.timer - 1 })), timerInterval,
      );
    } else if (timer === 0) {
      clearInterval(this.activeTimer);
      const timerTarget = document.getElementById('timer');
      return (timerTarget) ? timerTarget.click() : null;
    }
  }

  stopTimer() {
    clearInterval(this.activeTimer);
  }

  updateAnswers(questionObj, allAnswers) {
    const { correct_answer: correctAnswer } = questionObj;

    this.setState({
      correctAnswer,
      allAnswers,
      timer: 10,
    });
  }

  shuffleAnswers(questionObj) {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questionObj;

    const allAnswers = [...incorrectAnswers, correctAnswer];
    // Shuffle retirado de https://flaviocopes.com/how-to-shuffle-array-javascript/
    const randomNumber = 0.5;
    return allAnswers.sort(() => Math.random() - randomNumber);
  }

  render() {
    const {
      answered,
      handleAnswer,
      questionObj: { category, question } } = this.props;
    const { allAnswers, correctAnswer, timer } = this.state;

    return (
      <div className="main-wrapper">
        <p className="timer">{ timer }</p>
        <h4 data-testid="question-category">{ category }</h4>
        <section className="question-wrapper">
          <p className="question-text" data-testid="question-text">{ question }</p>
          <section className="answers-wrapper">
            {allAnswers.map((answer, index) => (
              answer === correctAnswer
                ? (
                  <button
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    className={ `answer-button
                    ${(answered) ? 'check-correct-answer' : ''}` }
                    onClick={ (e) => {
                      handleAnswer(e, timer);
                      this.stopTimer();
                    } }
                    disabled={ answered }
                  >
                    {answer}
                  </button>)
                : (
                  <button
                    key={ index }
                    type="button"
                    id="timer"
                    data-testid={ `wrong-answer-${index}` }
                    className={ `answer-button
                    ${(answered) ? 'check-incorrect-answer' : ''}` }
                    onClick={ (e) => {
                      handleAnswer(e, timer);
                      this.stopTimer();
                    } }
                    disabled={ answered }
                  >
                    {answer}
                  </button>)
            ))}
          </section>
        </section>
      </div>
    );
  }
}

Questions.propTypes = {
  questionObj: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(String),
  }).isRequired,
  answered: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func,
};

Questions.defaultProps = {
  handleAnswer: () => {},
};

export default Questions;
