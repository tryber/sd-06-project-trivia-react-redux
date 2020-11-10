import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import Header from './Header';
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

    const nextButton = document.querySelector('.next');
    if (nextButton) {
      nextButton.classList.replace('btn', 'invisible');
    }

    if (answerIndex < 4) {
      return this.setState((previous) => ({
        ...previous,
        answerIndex: previous.answerIndex + 1,
      }));
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { answerIndex } = this.state;
    const { getAnswers } = this.props;
    const questions = getAnswers[answerIndex];

    return (
      <div>
        <Header />
        <QuestionCard
          answerIndex={ answerIndex }
          questions={ questions }
        />
        <button
          type="button"
          data-testid="btn-next"
          className="invisible next"
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
  history: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Question);
