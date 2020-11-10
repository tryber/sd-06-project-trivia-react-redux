import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import '../styles/Question.css';

class Question extends React.Component {
  constructor() {
    super();

    this.nextIndex = this.nextIndex.bind(this);

    this.state = {
      answerIndex: 0,
    };
  }

  nextIndex() {
    const { answerIndex } = this.state;
    const { history } = this.props;
    const button = document.querySelectorAll('.btn');

    Object.values(button).forEach((item) => (
      item.classList.remove('correct', 'incorrect')
    ));

    if (answerIndex < 4) {
      return this.setState((previous) => ({
        ...previous,
        answerIndex: previous.answerIndex + 1,
      }));
    }

    /* history.push('/feedback'); */
  }

  render() {
    const { answerIndex } = this.state;
    const { getAnswers } = this.props;
    const questions = getAnswers[answerIndex];

    return (
      <div>
        <QuestionCard
          answerIndex={ answerIndex }
          questions={ questions }
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
});

Question.propTypes = {
  getAnswers: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Question);
