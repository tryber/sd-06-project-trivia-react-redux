import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stopwatch from './Stopwatch';
import {
  saveShuffledAnswers,
  toggleStopwatch,
  addPoints,
  renderNextQuestionBtn,
} from '../redux/actions';
import '../App.css';

class QuestionCard extends React.Component {
  getUpdatedScore(player, score, points) {
    return {
      player: {
        ...player.player,
        score: score + points,
      },
    };
  }

  handleClick({ target }, difficulty) {
    const { toggleStop, renderNextQuestion } = this.props;
    toggleStop();
    renderNextQuestion();
    if (target.className === 'wAnswer' || target.className === 'rAnswer') {
      const wrongList = document.querySelectorAll('.wAnswer');
      const rightQuestion = document.querySelector('.rAnswer');
      wrongList.forEach((element) => {
        element.className = 'wrong-answer';
      });
      rightQuestion.className = 'right-answer';
    }

    const { secondsLeft, addPts } = this.props;
    const TEN = 10;
    const points = TEN + (secondsLeft * this.checkDifficulty(difficulty));
    if (target.className === 'right-answer') {
      addPts(points);
      const playerObj = JSON.parse(localStorage.getItem('state'));
      const { score } = playerObj.player;
      const updatedPlayerObj = this.getUpdatedScore(playerObj, score, points);
      localStorage.setItem('state', JSON.stringify(updatedPlayerObj));
    }
  }

  shuffleAnswers() {
    const { gameQuestions, id, saveShuffled } = this.props;
    if (gameQuestions) {
      const magicNumber = 0.5;
      const correctAnswer = gameQuestions[id].correct_answer;
      const incorrectAnswers = gameQuestions[id].incorrect_answers;
      const answersArray = [correctAnswer, ...incorrectAnswers];
      const shuffledAnswers = answersArray.sort(() => Math.random() - magicNumber);
      saveShuffled(shuffledAnswers);
    }
  }

  handleQuestion() {
    const { id, gameQuestions, shuffledAnswers, shuffled, disabledBtns } = this.props;
    const initialIndex = -1;
    let wrongAnswerIndex = initialIndex;
    if (gameQuestions && shuffled) {
      return (
        <div>
          <h4 data-testid="question-category">
            {gameQuestions[id].category}
          </h4>
          <p data-testid="question-text">{gameQuestions[id].question}</p>
          {shuffledAnswers.map((answer) => {
            if (answer === gameQuestions[id].correct_answer) {
              const { difficulty } = gameQuestions[id];
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  key="correct"
                  className="rAnswer"
                  disabled={ disabledBtns }
                  onClick={ (e) => this.handleClick(e, difficulty) }
                >
                  {answer}
                </button>
              );
            }
            const wrongButton = (
              <button
                type="button"
                data-testid={ `wrong-answers-${wrongAnswerIndex += 1}` }
                key={ `wrong${wrongAnswerIndex}` }
                className="wAnswer"
                disabled={ disabledBtns }
                onClick={ (e) => this.handleClick(e) }
              >
                {answer}
              </button>
            );
            return wrongButton;
          })}
          <Stopwatch />
        </div>
      );
    }
    return <p>Loading...</p>;
  }

  checkDifficulty(difficulty) {
    const THREE = 3;
    if (difficulty === 'hard') return THREE;
    if (difficulty === 'medium') return 2;
    return 1;
  }

  render() {
    const { shuffled } = this.props;
    if (!shuffled) this.shuffleAnswers();
    return (
      <div>
        {this.handleQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.trivia.questions,
  shuffledAnswers: state.trivia.shuffledAnswers,
  shuffled: state.trivia.shuffled,
  disabledBtns: state.trivia.disabledBtns,
  secondsLeft: state.stopwatch.seconds,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveShuffled:
    (shuffledAnswers) => dispatch(saveShuffledAnswers(shuffledAnswers)),
  toggleStop: () => dispatch(toggleStopwatch()),
  addPts: (points) => dispatch(addPoints(points)),
  renderNextQuestion: () => dispatch(renderNextQuestionBtn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);

QuestionCard.propTypes = {
  toggleStop: PropTypes.func.isRequired,
  saveShuffled: PropTypes.func.isRequired,
  addPts: PropTypes.func.isRequired,
  secondsLeft: PropTypes.number.isRequired,
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  shuffled: PropTypes.bool.isRequired,
  disabledBtns: PropTypes.bool.isRequired,
  renderNextQuestion: PropTypes.func.isRequired,
};
