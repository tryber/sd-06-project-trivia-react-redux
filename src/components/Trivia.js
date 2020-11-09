import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { renderNextQuestionBtn, toggleShuffled, toggleStopwatch } from '../redux/actions';
import QuestionCard from './QuestionCard';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionID: 0,
    };

    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
  }

  changeToNextQuestion() {
    const { questionID } = this.state;
    const { renderNextQuestion } = this.props;
    this.setState({ questionID: questionID + 1 });
    const { toggleShuffledAction, toggleStopwatchAction } = this.props;
    toggleShuffledAction();
    toggleStopwatchAction();
    renderNextQuestion();
  }

  handleQuestionCard() {
    const { questionID } = this.state;
    const { nextQuestion } = this.props;
    return (
      <div>
        <QuestionCard id={ questionID } />
        {(nextQuestion) ? this.renderNextQuestionBtn() : ''}
      </div>
    );
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
    return (
      <div>
        {this.handleQuestionCard()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nextQuestion: state.trivia.renderNextQuestionBtn,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShuffledAction: () => dispatch(toggleShuffled()),
  toggleStopwatchAction: () => dispatch(toggleStopwatch()),
  renderNextQuestion: () => dispatch(renderNextQuestionBtn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

Trivia.propTypes = {
  toggleShuffledAction: PropTypes.func.isRequired,
  toggleStopwatchAction: PropTypes.func.isRequired,
  nextQuestion: PropTypes.bool.isRequired,
  renderNextQuestion: PropTypes.func.isRequired,
};
