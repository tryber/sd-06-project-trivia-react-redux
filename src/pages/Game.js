import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../actions/actionsQuestions';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { fetchQuestion, token } = this.props;
    fetchQuestion(token);
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        {questions.length > 0
          ? questions[0].results.map((question, index) => (
            <Questions key={ index } question={ question } />
          )) : 'Loading...' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  fetchQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
