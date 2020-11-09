import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import { saveScoreToState } from '../actions';
import '../styles/Question.css';

class Question extends React.Component {
  constructor(props) {
    super();

    const { getLogin: { name, gravatarEmail } } = props;

    this.checkAnswer = this.checkAnswer.bind(this);
    this.changeDisabled = this.changeDisabled.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.nextIndex = this.nextIndex.bind(this);

    this.state = {
      player: {
        name,
        assertions: '',
        score: 0,
        gravatarEmail,
      },
      answerIndex: 0,
      disabled: false,
      isCorrect: false,
    };
  }

  changeDisabled(disabled) {
    this.setState({ disabled });
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
      nextButton.className = 'btn';
    }

    if (target.id === 'correct-answer') {
      this.setState({ isCorrect: true });
    }
  }

  saveScore(countdown) {
    const { getAnswers, setScore } = this.props;
    const { player } = this.state;
    const { difficulty } = getAnswers[0];
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };
    const points = 10 + (difficultyPoints[difficulty] * countdown);

    const tempPlayer = {
      ...player,
      score: player.score + points,
    };

    localStorage.setItem('state', JSON.stringify({ player: tempPlayer }));
    this.setState({ player: tempPlayer });
    setScore(tempPlayer);
  }

  nextIndex() {
    this.setState((previous) => ({
      ...previous,
      answerIndex: previous.answerIndex + 1,
    }));
  }

  render() {
    const { isCorrect, disabled, answerIndex } = this.state;
    const { getAnswers } = this.props;
    const questions = getAnswers[answerIndex];

    return (
      <div>
        <QuestionCard
          disabled={ disabled }
          checkAnswer={ this.checkAnswer }
          answerIndex={ answerIndex }
          questions={ questions }
        />
        <Timer
          changeDisabled={ this.changeDisabled }
          isCorrect={ isCorrect }
          saveScore={ this.saveScore }
        />
        <button
          type="button"
          data-testid="btn-next"
          className="invisible"
          onClick={ this.nextIndex }
        >
          Próxima
        </button>
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

Question.propTypes = {
  getAnswers: PropTypes.arrayOf(Object).isRequired,
  getLogin: PropTypes.arrayOf(Object).isRequired,
  setScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
