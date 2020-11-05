import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion } from '../actions';
import { QuestionCard } from '../components';
import Header from '../components/Header';

class Questions extends React.Component {
  async componentDidMount() {
    const { token, requestQuestion } = this.props;
    await requestQuestion(token);
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <QuestionCard question={ questions } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userLogin.token.token,
  questions: state.questions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestion: (token) => dispatch(fetchQuestion(token)),
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  requestQuestion: PropTypes.func.isRequired,
  questions: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
