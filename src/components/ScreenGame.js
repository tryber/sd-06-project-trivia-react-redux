import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propType from 'prop-types';
import {
  nextQuestion,
  answerQuestion,
} from '../actions';
import Header from './Header';
import '../App.css';
import AnswerCard from './AnswerCard';

class ScreenGame extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      timer: 30,
      counter: 1,
    };
    // this.changeColor = this.changeColor.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { answered, answer } = this.props;
    if (timer === 0 || answered) {
      clearInterval(this.myTimer);
      answer();
    }
  }

  /* handleDisable(truex) {
    this.setState({ isDisable: truex, btnNext: false });
  }
  */
  /*
  changeColor() {
    this.setState({
      btnNext: false,
    });
  }
  */

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
    const { question, answered } = this.props;
    const Cinco = 5;
    const { index, counter, timer } = this.state;
    // console.log(question[index].correct_answer);
    if (counter > Cinco) return <Redirect to="/feedback" />;
    return (
      Object.values(question).length > 0 ? (
        <div className="game-container">
          <div className="header">
            <Header />
          </div>
          <div data-testid="question-category">
            {question[index].category}
          </div>
          <div data-testid="question-text">
            {question[index].question}
          </div>
          <AnswerCard
            difficulty={ question[index].difficulty }
            timer={ timer }
            incorrect={ question[index].incorrect_answers }
            correct={ question[index].correct_answer }
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
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      ));
  }
}

const mapStateToProps = (state) => ({
  question: state.tokenReducer.questions.results,
  token: state.tokenReducer.token,
  answered: state.userReducer.answered,
});

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextQuestion()),
  answer: () => dispatch(answerQuestion()),
});

ScreenGame.propTypes = {
  question: propType.arrayOf(Object).isRequired,
  next: propType.func.isRequired,
  answered: propType.bool.isRequired,
  answer: propType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
