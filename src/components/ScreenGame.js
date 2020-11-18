import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propType from 'prop-types';
import {
  nextQuestion,
  answerQuestion,
  fetchApiQuestions,
  resetScore,
} from '../actions';
import Header from './Header';
import AnswerCard from './AnswerCard';

class ScreenGame extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      timer: 30,
      counter: 1,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { getQuestions, token, scoreReset } = this.props;
    if (token) {
      getQuestions(token);
    }
    this.startTimer();
    scoreReset();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { answered, answer } = this.props;
    if (timer === 0 || answered) {
      clearInterval(this.myTimer);
      answer();
    }
  }

  startTimer() {
    const Mil = 1000;
    this.myTimer = setInterval(() => {
      this.setState(({ timer }) => ({
        timer: timer - 1,
      }));
    }, Mil);
  }

  nextQuestion() {
    const { next } = this.props;
    const Cinco = 5;
    const { index, counter } = this.state;
    next();
    this.setState({ timer: 30, index: (index + 1) % Cinco, counter: counter + 1 });
    this.startTimer();
  }

  render() {
    const { questions, answered } = this.props;
    const Cinco = 5;
    const { index, counter, timer } = this.state;
    if (counter > Cinco) return <Redirect to="/feedback" />;
    return (
      !questions ? <div><h1>Loading...</h1></div> : (
        // <div>
        //   { console.log(Object.values(questions)) }
        // </div>
        <div className="game-container">
          <div className="header">
            <Header />
          </div>
          <div data-testid="question-category">
            { questions.results[index].category }
          </div>
          <div data-testid="question-text">
            {questions.results[index].question}
          </div>
          <AnswerCard
            difficulty={ questions.results[index].difficulty }
            timer={ timer }
            incorrect={ questions.results[index].incorrect_answers }
            correct={ questions.results[index].correct_answer }
          />
          { answered ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => this.nextQuestion() }
            >
              Próxima
            </button>
          ) : (
            <div>
              { timer }
            </div>
          )}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.tokenReducer.questions,
  token: state.tokenReducer.token,
  answered: state.userReducer.answered,
});

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextQuestion()),
  answer: () => dispatch(answerQuestion()),
  getQuestions: (token) => dispatch(fetchApiQuestions(token)),
  scoreReset: () => dispatch(resetScore()),
});

ScreenGame.propTypes = {
  questions: propType.arrayOf(Object).isRequired,
  next: propType.func.isRequired,
  answered: propType.bool.isRequired,
  answer: propType.func.isRequired,
  token: propType.string.isRequired,
  getQuestions: propType.func.isRequired,
  scoreReset: propType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
