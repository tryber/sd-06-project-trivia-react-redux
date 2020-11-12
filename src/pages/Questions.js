import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionsAPI } from '../servicesAPI';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestion: 0,
      selectedAnswer: '',
      assertions: 0,
      answersDisabled: false,
      repeatCount: true,
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleUniqueAnswer = this.handleUniqueAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.count = this.count.bind(this);
  }

  componentDidMount() {
    const { tokenObj: { token } } = this.props;
    const questionsQuantity = 5;
    questionsAPI(questionsQuantity, token)
      .then((r) => this.setState({ questions: r }))
      .catch((r) => this.setState({ questions: r }));
  }

  handleAnswers(questionObj) {
    const incorrectAnswers = questionObj.incorrect_answers
      .map((incorrect) => ({ ans: incorrect, type: 'incorrect' }));
    const correctAnswer = { ans: questionObj.correct_answer, type: 'correct' };
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const numberOfAnswers = allAnswers.length;
    const allAnswersRandom = [];
    for (let i = 0; i < numberOfAnswers; i += 1) {
      const indexRandom = Math.round(Math.random() * (allAnswers.length - 1));
      allAnswersRandom[i] = allAnswers[indexRandom];
      allAnswers.splice(indexRandom, 1);
    }

    let indexOfIncorrectAnswers = 0;
    return allAnswersRandom.map((answer, index) => {
      const { ans, type } = answer;
      const testId = (type === 'correct')
        ? 'correct-answer' : `wrong-answer-${indexOfIncorrectAnswers}`;
      indexOfIncorrectAnswers = (type === 'incorrect')
        ? indexOfIncorrectAnswers + 1 : indexOfIncorrectAnswers;
      const { answersDisabled, selectedAnswer } = this.state;
      return (
        <button
          key={ index }
          type="button"
          data-testid={ testId }
          className={ (selectedAnswer === '') ? '' : `${type}-answer` }
          onClick={ () => this.handleUniqueAnswer(type) }
          disabled={ answersDisabled }
        >
          { ans }
        </button>
      );
    });
  }

  handleQuestion(questionObj) {
    const buttonNext = (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.handleNext }
      >
        Próxima
      </button>);
    const interval = 30000;
    const { repeatCount, selectedAnswer } = this.state;
    if (repeatCount) this.count(interval);
    return (
      <article>
        <p data-testid="question-category">{ questionObj.category }</p>
        <p data-testid="question-text">{ questionObj.question }</p>
        <div>
          { this.handleAnswers(questionObj) }
        </div>
        { (selectedAnswer !== '') ? buttonNext : '' }
      </article>
    );
  }

  count(interval) {
    const thousand = 1000;
    let timer = interval / thousand;
    let id = '';
    const frame = () => {
      if (timer === 0) {
        this.handleUniqueAnswer('incorrect');
        clearInterval(id);
      } else {
        document.getElementById('timer').innerHTML = timer;
        timer -= 1;
      }
    };
    id = setInterval(frame, thousand);
  }

  handleUniqueAnswer(type) {
    const point = (type === 'correct') ? 1 : 0;
    this.setState((actualState) => ({
      selectedAnswer: type,
      assertions: actualState.assertions + point,
      repeatCount: false,
      answersDisabled: true,
    }));
  }

  handleNext() {
    this.setState((actualState) => ({
      actualQuestion: actualState.actualQuestion + 1,
      selectedAnswer: '',
      answersDisabled: false,
    }));
  }

  render() {
    const { questions, actualQuestion } = this.state;
    return (
      <div>
        <p id="timer" />
        { (questions === 'ERROR_QUESTIONS') ? 'Sem Questões' : '' }

        { (questions !== 'ERROR_QUESTIONS' && questions.length > 0)
          ? this.handleQuestion(questions[actualQuestion]) : <h1>Carregando...</h1> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenObj: state.tokenObj,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  tokenObj: PropTypes.objectOf(PropTypes.string).isRequired,
};
