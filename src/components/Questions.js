import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions';

class Questions extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { token } = this.props;
    const { questions } = this.props;
    questions(token);
  }

  render() {
    return (
      <div>
        <div data-testid="question-category">
          <p data-testid="question-text"> xxxxxx </p>
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  questions: (token) => dispatch(getQuestions(token)),
});

Questions.propTypes = {
  token: PropTypes.object,
  question: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
