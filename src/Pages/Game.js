import React from 'react';
import { connect } from 'react-redux';
import { responseQuestions } from '../Action/actionFetchQuestions';

class Game extends React.Component {
  componentDidMount() {
    this.consoleFetch();
  }

  async consoleFetch() {
    const { fetchQuestions } = this.props;
    const exemplo = await fetchQuestions();
    console.log(exemplo);
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <div>página do game</div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   questions: state.reducerQuestions.questions,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(responseQuestions()),
});

export default connect(null, mapDispatchToProps)(Game);
