import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import loading from '../image/loading.gif';
import './questionCards.css';

class QuestionCards extends Component {
  constructor() {
    super();

    this.correctAnswer = this.correctAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.counter = this.counter.bind(this);
    this.setDisableTimeout = this.setDisableTimeout.bind(this);
    this.getRate = this.getRate.bind(this);
    this.stateToLocalStorage = this.stateToLocalStorage.bind(this);
    this.setRanking = this.setRanking.bind(this);

    this.state = {
      currentIndex: 0,
      correct: '',
      incorrect: '',
      visibility: 'button-visibility',
      isDisabled: false,
      time: 30,
      score: 0,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.counter();
    this.setDisableTimeout();
  }

  setDisableTimeout() {
    const time = 30000;
    const timeOut = setTimeout(() => (
      this.setState({
        isDisabled: true,
        visibility: '',
      })), time);
    this.timeOut = timeOut;
  }

  getRate() {
    const { questionCard } = this.props;
    const { difficulty } = questionCard[0];
    const { time } = this.state;
    const DEZ = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;

    console.log(time);
    switch (difficulty) {
    case 'hard':
      return this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: prevState.score + (DEZ + (time * hard)),
      }));
    case 'medium':
      return this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: prevState.score + (DEZ + (time * medium)),
      }));
    case 'easy':
      return this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: prevState.score + (DEZ + (time * easy)),
      }));
    default:
      return console.log('não rolou');
    }
  }

  setRanking() {
    const getRanking = localStorage.getItem('ranking');
    const { userName, userImage } = this.props;
    const { score } = this.state;
    if (getRanking === null) {
      localStorage.setItem('ranking', JSON.stringify([
        { name: userName, score, picture: userImage },
      ]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([
        ...JSON.parse(localStorage.getItem('ranking')),
        { name: userName, score, picture: userImage },
      ]));
    }
  }

  stateToLocalStorage() {
    const { assertions, score } = this.state;
    localStorage.setItem('state', JSON.stringify({ player: {
      ...JSON.parse(localStorage.getItem('state')).player,
      assertions,
      score,
    },
    }));
  }

  nextQuestion() {
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex + 1,
      correct: '',
      incorrect: '',
      visibility: 'button-visibility',
      time: 30,
      isDisabled: false,
    }), () => {
      clearTimeout(this.timeOut);
      this.setDisableTimeout();
    });
  }

  async correctAnswer({ target }) {
    const { id } = target;
    await this.setState({
      correct: 'buttonTrue',
      incorrect: 'buttonFalse',
      visibility: '',
    });
    if (id === 'correct') {
      await this.getRate();
      await this.stateToLocalStorage();
    }
  }

  counter() {
    const interval = 1000;
    setInterval(() => {
      this.setState(({ time }) => ({
        time: time ? time - 1 : 0,
      }));
    }, interval);
  }

  render() {
    const { questionCard } = this.props;
    const { correct, incorrect, currentIndex, visibility, isDisabled, time } = this.state;
    return (
      <div>
        {questionCard
          ? (
            <div>
              <p data-testid="question-category">{questionCard[currentIndex].category}</p>
              <p data-testid="question-text">{questionCard[currentIndex].question}</p>
              <div>
                <button
                  type="button"
                  data-testid="correct-answer"
                  id="correct"
                  disabled={ isDisabled }
                  className={ correct }
                  onClick={ this.correctAnswer }
                >
                  {questionCard[currentIndex].correct_answer}
                </button>
                {questionCard[currentIndex].incorrect_answers.map((element, idx) => (
                  <button
                    data-testid={ `wrong-answer-${idx}` }
                    type="button"
                    key={ idx }
                    id="incorrect"
                    disabled={ isDisabled }
                    className={ incorrect }
                    onClick={ this.correctAnswer }
                  >
                    { element }
                  </button>
                ))}
                <p>{ time }</p>
              </div>
              {questionCard.length - 1 === currentIndex
                ? (
                  <Link to="/feedback">
                    <button
                      data-testid="btn-next"
                      className={ visibility }
                      type="button"
                      onClick={ this.setRanking }
                    >
                      Finalizar
                    </button>
                  </Link>
                )
                : (
                  <button
                    className={ visibility }
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                  >
                    Next
                  </button>
                )}
            </div>
          ) : <img src={ loading } alt="loading-api" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionCard: state.questionReducer.question.results,
  userName: state.loginReducer.nome,
  userImage: state.loginReducer.image,
});

QuestionCards.propTypes = {
  questionCard: propTypes.arrayOf(Object).isRequired,
  userName: propTypes.string.isRequired,
  userImage: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(QuestionCards);
