import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion } from '../actions';
import { QuestionCard, Header } from '../components';

class Questions extends React.Component {
  constructor() {
    super();

    this.updateStates = this.updateStates.bind(this);

    this.state = {
      questions: [],
      isFetching: true,
    };
  }

  async componentDidMount() {
    const { token, requestQuestions } = this.props;
    await requestQuestions(token);
    this.updateStates();
  }

  updateStates() {
    const { questions } = this.props;
    this.setState({
      questions: [...questions],
      isFetching: false,
    });
  }

  render() {
    const { questions, isFetching } = this.state;
    return (
      <div>
        <Header />
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <QuestionCard question={ questions[0] } />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userLogin.token,
  questions: state.questions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(fetchQuestion(token)),
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  requestQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
