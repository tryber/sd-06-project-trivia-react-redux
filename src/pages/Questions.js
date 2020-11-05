import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion } from '../actions';
import { QuestionCard } from '../components';

class Questions extends React.Component {
  componentDidMount() {
    console.log('ola');
    const { token, requestQuestion } = this.props;
    requestQuestion(token);
  }

  render() {
    // const { nomeDoExemploIcaro } = this.props;
    return (
      <div>Hello!</div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
