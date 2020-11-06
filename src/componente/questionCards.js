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
    this.timeQuestion = this.timeQuestion.bind(this);
    this.count = this.count.bind(this);
    this.clock = this.clock.bind(this);

    this.state = {
      currentIndex: 0,
      correct: '',
      incorrect: '',
      visibility: 'button-visibility',
      isDisabled: false,
      time: 30,
    };
  }

  componentDidMount() {
    const time = 30000;
    const timeclear = 31000;
    setTimeout(this.timeQuestion, time);
    setTimeout(this.clock, timeclear);
    const interval = 1000;
    this.interval = setInterval(() => {
      this.count();
    }, interval);
  }

  correctAnswer() {
    this.setState({
      correct: 'buttonTrue',
      incorrect: 'buttonFalse',
      visibility: '',
    });
  }

  nextQuestion() {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      correct: '',
      incorrect: '',
      visibility: 'button-visibility',
    }))
  }
  
  count() {
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
  }

  clock() {
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
                    data-testid={`wrong-answer-${idx}`}
                    type="button"
                    key={idx}
                    id="incorrect"
                    disabled={ isDisabled }
                    className={ incorrect }
                    onClick={ this.correctAnswer }
                  >
                    {element}
                  </button>
                ))}
                <p>{ time }</p>
              </div>
              { questionCard.length - 1 === currentIndex ?
                <Link to="/feedback">
                  <button className={visibility} type="button">Finalizar</button>
                </Link> :
                <button className={visibility} type="button" data-testid="btn-next" onClick={this.nextQuestion}>Next</button>
              }
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
