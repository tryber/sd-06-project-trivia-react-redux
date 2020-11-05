import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { fetchQuestions } from '../actions';

class Game extends React.Component {
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

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchQuestions: () => dispatch(fetchQuestions()),
// });

// Game.PropTypes = {
//   fetchQuestions: PropTypes.func.isRequired,
// }

export default connect(mapStateToProps, null)(Game);
