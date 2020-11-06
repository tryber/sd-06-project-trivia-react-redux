import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseQuestions } from '../Action/actionFetchQuestions';
import Questions from '../Components/Questions';
import Header from '../Components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    const { questions } = this.props;
    console.log(questions);

    return (
      <div>
        <Header />
        {questions.map((question, index) => (
          <Questions key={ index } questionObj={ question } />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(responseQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
};
