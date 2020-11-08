import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseQuestions } from '../Action/actionFetchQuestions';
import Questions from '../Components/Questions';
import Header from '../Components/Header';
import GenericButton from '../Components/GenericButton';

import '../Css/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isLoading: true,
      answered: false,
    };

    this.getTheFetchQuestions = this.getTheFetchQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    this.getTheFetchQuestions();
  }

  async getTheFetchQuestions() {
    const { fetchQuestions } = this.props;

    await fetchQuestions();
    this.setState({ isLoading: false });
  }

  handleNextQuestion() {
    const { index } = this.state;
    const { history } = this.props;
    const finalQuestion = 4;

    return (index < finalQuestion)
      ? this.setState((prevState) => ({ index: prevState.index + 1, answered: false }))
      : history.push('/feedback');
  }

  handleAnswer() {
    this.setState({ answered: true });
  }

  render() {
    const { questions } = this.props;
    const { index, isLoading, answered } = this.state;

    const finalQuestion = 4;

    return (
      <div>
        { isLoading
          ? <h2>Loading...</h2>
          : (
            <div>
              <Header />
              <Questions
                questionObj={ questions[index] }
                answered={ answered }
                handleAnswer={ this.handleAnswer }
              />
              { (index < finalQuestion)
                ? (
                  <GenericButton
                    onClick={ this.handleNextQuestion }
                    title="Próxima pergunta"
                    className="advance-button"
                    disabled={ !answered }
                  />)
                : (
                  <GenericButton
                    onClick={ this.handleNextQuestion }
                    title="Ver resultado!"
                    className="advance-button"
                    disabled={ answered }
                  />) }
            </div>) }
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

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
