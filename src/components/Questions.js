import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import timer from '../redux/reducers/timer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disableBTN: false,
      shuffledQuestions: [],
      shuffled: false,
      answerTime: 0,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.getAnswerTime = this.getAnswerTime.bind(this);
  }

  changeToNextQuestion() {
    const { questionNumber } = this.state;
    const indexLimit = 4;

    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
      disableBTN: false,
      shuffled: false,
    });

    const wrongList = document.querySelectorAll('.wrong-question');
      const rightQuestion = document.querySelector('.right-question');

    if (wrongList && rightQuestion) {
      wrongList.forEach((element) => {
        element.className = 'wquestion';
      });
      rightQuestion.className = 'rquestion';
    }
  }

  shuffleArray() {
    const { gameQuestions } = this.props;
    const { questionNumber } = this.state;
    const magic = 0.5;
    if (gameQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      const INCORRECT_ANSWER = gameQuestions[questionNumber].incorrect_answers;
      const questionsArray = [CORRECT_ANSWER, ...INCORRECT_ANSWER];
      const newArr = questionsArray.sort(() => Math.random() - magic);
      this.setState({
        shuffled: true,
        shuffledQuestions: newArr,
      });
    }
  }

  getAnswerTime({ target }) {
    const time = document.querySelector('.timer');
    if (time && target.className === 'rquestion') {
      const timeInt = parseInt(time.innerHTML);

      return timeInt;
    } else {
      return 0;
    };
  }

  handleAnswer({ target }) {
    if (target.className === 'wquestion' || target.className === 'rquestion') {
      const wrongList = document.querySelectorAll('.wquestion');
      const rightQuestion = document.querySelector('.rquestion');
      wrongList.forEach((element) => {
        element.className = 'wrong-question';
      });
      rightQuestion.className = 'right-question';
      const answerTime = this.getAnswerTime();
      console.log(answerTime)
      
      this.setState({
        disableBTN: true,
        answerTime,
      });
    }
  }

  handleQuestions() {
    const { gameQuestions } = this.props;
    const { questionNumber, disableBTN, shuffledQuestions, shuffled } = this.state;
    const initialIndex = -1;
    let answerIndex = initialIndex;
    if (shuffled && shuffledQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      return (
        <div>
          <h4 data-testid="question-category">
            {gameQuestions[questionNumber].category}
          </h4>
          <p data-testid="question-text">{gameQuestions[questionNumber].question}</p>
          {shuffledQuestions.map((question) => {
            if (question === CORRECT_ANSWER) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleAnswer }
                  className="rquestion"
                  key="correct"
                  disabled={ disableBTN }
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
                onClick={ this.handleAnswer }
                key={ `wrong${answerIndex}` }
                disabled={ disableBTN }
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

    const { shuffled } = this.state;
    const { gameQuestions } = this.props;

    if(!shuffled && gameQuestions) {
      this.shuffleArray();
    }

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
