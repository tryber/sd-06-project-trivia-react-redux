import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propType from 'prop-types';
import {
  fetchApiQuestions,
  requestQuestionsSuccess,
  nextQuestion,
  answerQuestion,
} from '../actions';
import FeedbackHeader from './FeedbackHeader';
import '../App.css';

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
    const { getTriviaQuestions, getQuestions } = this.props;
    getTriviaQuestions();
    getQuestions();
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
    const { questions } = this.props;
    // answered
    const Cinco = 5;
    const { index, counter } = this.state;
    // isDisable, timer
    if (counter > Cinco) return <Redirect to="/feedback" />;
    return (
      Object.values({ questions }).length > 0 ? (
        <div className="game-container">
          <div className="header">
            <FeedbackHeader />
          </div>
          <div data-testid="question-category">
            {questions[index].category}
          </div>
          <div data-testid="question-text">
            {questions[index].question}
          </div>
        </div>) : (<div><h1>Loading...</h1></div>)
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.tokenReducer.questions,
  token: state.tokenReducer.token,
  answered: state.userReducer.answered,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token) => dispatch(fetchApiQuestions(token)),
  getQuestions: (data) => dispatch(requestQuestionsSuccess(data)),
  next: () => dispatch(nextQuestion()),
  answer: () => dispatch(answerQuestion()),
});

ScreenGame.propTypes = {
  questions: propType.arrayOf(Object).isRequired,
  next: propType.func.isRequired,
  answered: propType.bool.isRequired,
  answer: propType.func.isRequired,
  getTriviaQuestions: propType.func.isRequired,
  getQuestions: propType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
