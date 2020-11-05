import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      loading: true,
    }

    this.renderAnswers = this.renderAnswers.bind(this);
  }

  async componentDidMount() {
    const { getAPIQuestions } = this.props;
    await getAPIQuestions();
    this.setState({ loading: false })
  }

  renderQuestions() {
    
  }

  renderAnswers() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const correctAnswerPosition = Math
    .floor(Math
      .random() * questions[questionNumber].incorrect_answers.length + 1);
    const answers = questions[questionNumber].incorrect_answers;
    answers.splice(correctAnswerPosition, 0, questions[questionNumber].correct_answer);
    return (
      <div>{ answers.map((answer) => <h4>{ answer }</h4>) }</div>
    );
  }

  render() {
    const { renderAnswers } = this;
    const { loading } = this.state;
    const index = 0;
    if (loading) {return (<p>loading...</p>)};
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <div data-testid="question-category">Category</div>
          <div data-testid="question-text">Question</div>
        </div>
        <div>
          { renderAnswers() }
          <button type="button" data-testid="correct-answer">true</button>
          <button type="button" data-testid={ `wrong-answer-${index}` }>false</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game: { questions } }) => ({
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  getAPIQuestions: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  getAPIQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
