import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { renderNextQuestionBtn, toggleShuffled, toggleStopwatch } from '../redux/actions';
import QuestionCard from './QuestionCard';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionID: 0,
      feedback: false,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
  }

  changeToNextQuestion() {
    const { questionID } = this.state;
    const { renderNextQuestion, gameQuestions } = this.props;
    if (questionID < gameQuestions.length - 1) {
      this.setState({ questionID: questionID + 1 });
    } else {
      this.setState({ feedback: true });
    }
    const { toggleShuffledAction, toggleStopwatchAction } = this.props;
    toggleShuffledAction();
    toggleStopwatchAction();
    renderNextQuestion();
  }

  handleQuestionCard() {
    const { questionID } = this.state;
    const { nextQuestion, gameQuestions } = this.props;
    if (gameQuestions) {
      return (
        <div>
          <QuestionCard id={ questionID } />
          {(nextQuestion) ? this.renderNextQuestionBtn() : ''}
        </div>
      );
    }
  }

  renderNextQuestionBtn() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.changeToNextQuestion }
      >
        Next Question
      </button>
    );
  }

  render() {
    const { feedback } = this.state;
    if (feedback) return <Redirect to="/feedback" />;
    return (
      <div>
        {this.handleQuestionCard()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.trivia.questions,
  nextQuestion: state.trivia.renderNextQuestionBtn,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShuffledAction: () => dispatch(toggleShuffled()),
  toggleStopwatchAction: () => dispatch(toggleStopwatch()),
  renderNextQuestion: () => dispatch(renderNextQuestionBtn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

Trivia.propTypes = {
  gameQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleShuffledAction: PropTypes.func.isRequired,
  toggleStopwatchAction: PropTypes.func.isRequired,
  nextQuestion: PropTypes.bool.isRequired,
  renderNextQuestion: PropTypes.func.isRequired,
};
