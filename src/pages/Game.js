import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';

class Game extends React.Component {

  componentDidMount() {
    const { getAPIQuestions } = this.props;
    getAPIQuestions();
  }

  render() {
    const index = 0;
    return (
      <div>
        <div>
          <div data-testid="question-category">Category</div>
          <div data-testid="question-text">Question</div>
        </div>
        <div>
          alternatives
          <button type="button" data-testid="correct-answer">true</button>
          <button type="button" data-testid={`wrong-answer-${index}`}>false</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAPIQuestions: () => dispatch(fetchQuestions),
});

Game.propTypes = {
  getAPIQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
