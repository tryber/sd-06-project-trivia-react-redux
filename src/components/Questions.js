import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.applyIndexToIncorrectAnswers = this.applyIndexToIncorrectAnswers.bind(this);
    this.handleAnswerStyle = this.handleAnswerStyle.bind(this);
  }

  changeToNextQuestion() {
    const { questionNumber } = this.state;
    const indexLimit = 4;
    const wrongList = document.querySelectorAll('.wrong-question');
    const rightQuestion = document.querySelector('.right-question');

    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
    });

    wrongList.forEach((element) => {
      element.className = 'wquestion';
    });
    rightQuestion.className = 'rquestion';
  }

  applyIndexToIncorrectAnswers(index) {
    index += 1;
    return index;
  }

  shuffle(array) {
    const magic = 0.5;
    return array.sort(() => Math.random() - magic);
  }

  handleAnswerStyle() {
    const wrongList = document.querySelectorAll('.wquestion');
    const rightQuestion = document.querySelector('.rquestion');
    wrongList.forEach((element) => {
      element.className = 'wrong-question';
    });
    rightQuestion.className = 'right-question';
  }

  handleQuestions() {
    const { gameQuestions } = this.props;
    const { questionNumber } = this.state;
    const initialIndex = -1;
    let answerIndex = initialIndex;

    if (gameQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      const INCORRECT_ANSWER = gameQuestions[questionNumber].incorrect_answers;
      const questionsArray = [CORRECT_ANSWER, ...INCORRECT_ANSWER];
      const newArr = this.shuffle(questionsArray);

      return (
        <div>
          <h4 data-testid="question-category">
            {gameQuestions[questionNumber].category}
          </h4>
          <p data-testid="question-text">{gameQuestions[questionNumber].question}</p>
          {newArr.map((question) => {
            if (question === CORRECT_ANSWER) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleAnswerStyle }
                  className="rquestion"
                  key="correct"
                >
                  {question}
                </button>
              );
            }
            const wrongButton = (
              <button
                type="button"
                data-testid={ `wrong-answers-${answerIndex += 1}` }
                className="wquestion"
                onClick={ this.handleAnswerStyle }
                key={ `wrong${answerIndex}` }
              >
                {question}
              </button>
            );
            return wrongButton;
          })}
        </div>
      );
    }
    return <p>Loading</p>;
  }

  render() {
    return (
      <div>
        {this.handleQuestions()}
        <button type="button" onClick={ this.changeToNextQuestion }>Next Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.game.questions,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
