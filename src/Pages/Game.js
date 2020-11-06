import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseQuestions } from '../Action/actionFetchQuestions';
import Questions from '../Components/Questions';
import Header from '../Components/Header';
import GenericButton from '../Components/GenericButton';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isLoading: true,
    };

    this.getTheFetchQuestions = this.getTheFetchQuestions.bind(this);
  }

  componentDidMount() {
    this.getTheFetchQuestions();
  }

  async getTheFetchQuestions() {
    const { fetchQuestions } = this.props;
    await fetchQuestions();
    this.setState({ isLoading: false });
  }

  render() {
    const { questions } = this.props;
    const { index, isLoading } = this.state;
    console.log(questions);

    return (
      <div>
        {isLoading ? <h2>Loading...</h2>
          : <div>
            <Header />
            <Questions questionObj={ questions[index] } />
            <GenericButton
              onClick={ this.handleClick }
              title="Próxima pergunta"
            />
          </div>}
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
