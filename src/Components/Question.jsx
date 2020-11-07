import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Question.css';
import Timer from '../Components/Timer';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
    };

    this.randomQuestions = this.randomQuestions.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.changeDisabled = this.changeDisabled.bind(this);
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

  changeDisabled(disabled) {
    this.setState({ disabled });
  }

  checkAnswer() {
    const button = document.querySelectorAll('.btn');
    Object.values(button).forEach((item) => {
      if (item.id === 'correct-answer') {
        item.classList.add('correct');
      } else {
        item.classList.add('incorrect');
      }
    });
    const nextButton = document.querySelector('.invisible');
    nextButton.className = "btn";
  }

  randomQuestions(ramdomize) {
    const { getQuestions } = this.props;
    const { disabled } = this.state;
    const arrayHTML = getQuestions[0].incorrect_answers.map((incorrect, index) => (
      <button
        id="wrong-answer"
        type="button"
        key={ index }
        disabled={ disabled }
        className="btn"
        data-testid={ `wrong-answer${index}` }
        onClick={ this.checkAnswer }
      >
        {incorrect}
      </button>
    ));
    arrayHTML.push(
      <button
        id="correct-answer"
        type="button"
        key="correct"
        disabled={ disabled }
        className="btn"
        data-testid="correct-answer"
        onClick={ this.checkAnswer }
      >
        {getQuestions[0].correct_answer}
      </button>,
    );

    if (ramdomize) {
      return this.shuffleArray(arrayHTML);
    }
    return arrayHTML;
  }

  render() {
    const { disabled } = this.state;
    const { getQuestions } = this.props;

    return (
      <div>
        <h2 data-testid="question-category">{getQuestions[0].category}</h2>
        <h1 data-testid="question-text">{getQuestions[0].question}</h1>
        <div>{ this.randomQuestions().map((answer) => answer) }</div>
        <Timer changeDisabled={ this.changeDisabled } disabled={ disabled } />
        <button data-testid="btn-next" className="invisible">Vamo ver se vai</button>
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
