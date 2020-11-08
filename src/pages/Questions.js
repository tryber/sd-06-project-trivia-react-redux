import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion } from '../actions';
import { QuestionCard, Header } from '../components';

class Questions extends React.Component {
  constructor() {
    super();

    this.updateStates = this.updateStates.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);

    this.state = {
      questions: [],
      isFetching: true,
      currentQuestionIdx: 0,
    };
  }

  async componentDidMount() {
    const { token, requestQuestions } = this.props;
    await requestQuestions(token);
    this.updateStates();
  }

  updateQuestion() {
    this.setState((prev) => ({
      currentQuestionIdx: prev.currentQuestionIdx + 1,
    }));
  }

  updateStates() {
    const { questions } = this.props;
    this.setState({
      questions: [...questions],
      isFetching: false,
    });
  }

  renderQuestionCard(questions) {
    const { currentQuestionIdx } = this.state;

    return (
      <QuestionCard
        question={ questions[currentQuestionIdx] }
        updateQuestion={ this.updateQuestion }
      />
    );
  }

  render() {
    const { questions, isFetching } = this.state;
    return (
      <div>
        <Header />
        {isFetching ? <p>Loading...</p> : this.renderQuestionCard(questions)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userLogin.token,
  questions: state.questions.questions.results,
  currentQuestionIdx: state.questions.currentQuestionIdx,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(fetchQuestion(token)),
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  requestQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
