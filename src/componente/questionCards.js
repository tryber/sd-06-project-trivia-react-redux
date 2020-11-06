import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import loading from '../image/loading.gif';
import './questionCards.css';

class QuestionCards extends Component {
  constructor() {
    super();

    this.correctAnswer = this.correctAnswer.bind(this);
    this.timeQuestion = this.timeQuestion.bind(this);
    this.count = this.count.bind(this);
    this.relo = this.relo.bind(this);

    this.state = {
      correct: '',
      incorrect: '',
      isDisabled: false,
      time: 30,
    };
  }

  componentDidMount() {
    const time = 30000;
    const timeclear = 31000;
    setTimeout(this.timeQuestion, time);
    setTimeout(this.relo, timeclear);
    const interval = 1000;
    this.interval = setInterval(() => {
      this.count();
    }, interval);
  }

  correctAnswer() {
    this.setState({
      correct: 'buttonTrue',
      incorrect: 'buttonFalse',
    });
  }

  count() {
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
  }

  relo() {
    clearInterval(this.interval);
  }

  timeQuestion() {
    clearInterval(this.relogio);
    this.setState({
      isDisabled: true,
    });
  }

  render() {
    const { questionCard } = this.props;
    const { correct, incorrect, isDisabled, time } = this.state;

    return (
      <div>
        {questionCard
          ? (
            <div>
              <p data-testid="question-category">{questionCard[1].category}</p>
              <p data-testid="question-text">{questionCard[1].question}</p>
              <div>
                <button
                  type="button"
                  data-testid="correct-answer"
                  id="correct"
                  disabled={ isDisabled }
                  className={ correct }
                  onClick={ this.correctAnswer }
                >
                  {questionCard[1].correct_answer}
                </button>
                {questionCard[1].incorrect_answers.map((el, idx) => (
                  <button
                    data-testid={ `wrong-answer-${idx}` }
                    type="button"
                    key="1"
                    id="incorrect"
                    disabled={ isDisabled }
                    className={ incorrect }
                    onClick={ this.correctAnswer }
                  >
                    {el}
                  </button>
                ))}
                <p>{ time }</p>
              </div>
            </div>
          ) : <img src={ loading } alt="loading-api" />}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questionCard: state.questionReducer.question.results,
});

QuestionCards.propTypes = {
  questionCard: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(QuestionCards);
