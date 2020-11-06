import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';
import '../style/ButtonsGame.css';

class Game extends Component {
  constructor() {
    super();
    this.shufflesAnswer = this.shufflesAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.state = {
      index: 0,
      green: '',
      red: '',
      respondeu: false,
    };
  }

  colorButton() {
    this.setState({
      green: 'correct-answer',
      red: 'wrong-answer',
      respondeu: true,
    });
  }

  shufflesAnswer(question) {
    // const { incorrect_answers, correct_answer } = question;
    const { green, red } = this.state;
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
            onClick={ () => this.colorButton() }
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
          onClick={ () => this.colorButton() }
        >
          {element}
        </button>
      );
    });
  }

  nextQuestion() {
    this.setState((state) => ({
      index: state.index + 1,
      green: '',
      red: '',
      respondeu: false,
    }));
  }

  render() {
    const { arrayQuestion } = this.props;
    const { index, respondeu } = this.state;
    // const { category, question } = arrayQuestion[index];
    if (arrayQuestion.length === 0) {
      return (
        <span>Login não realizado</span>
      );
    }
    return (
      <div>
        <Header />
        <p data-testid="question-category">{ arrayQuestion[index].category }</p>
        <p data-testid="question-text">{ arrayQuestion[index].question }</p>
        {this.shufflesAnswer(arrayQuestion[index])}
        {respondeu && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.nextQuestion() }
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayQuestion: state.questionsInformation.arrayQuestion,
});

Game.propTypes = {
  arrayQuestion: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Game);
