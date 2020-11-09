import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseQuestions } from '../Action/actionFetchQuestions';
import { playerScore } from '../Action/actionUpdateScore';
import Questions from '../Components/Questions';
import Header from '../Components/Header';
import GenericButton from '../Components/GenericButton';

import '../Css/Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    const { player } = this.props;

    this.state = {
      index: 0,
      isLoading: true,
      answered: false,
      player,
    };

    this.getTheFetchQuestions = this.getTheFetchQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    const { player } = this.state;

    this.getTheFetchQuestions();

    localStorage.setItem('state', JSON.stringify({ player }));
  }

  componentDidUpdate() {
    const { answered, index } = this.state;
    const { history } = this.props;
    const lastQuestion = 4;

    if (answered === true && index === lastQuestion) {
      history.push('/feedback');
    }
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

  handleAnswer({ target }, timer) {
    const { questions, updateScore } = this.props;
    const { index } = this.state;
    const correct = (target.textContent === questions[index].correct_answer);

    this.setState({ answered: true });

    if (correct) {
      const localStorageState = JSON.parse(localStorage.getItem('state'));
      const { player } = localStorageState;
      const questionTags = { easy: 1, medium: 2, hard: 3 };
      const { difficulty } = questions[index];
      const baseScore = 10;
      const newScore = player.score + (baseScore + (timer * questionTags[difficulty]));

      player.score = newScore;
      player.assertions += 1;

      localStorage.setItem('state', JSON.stringify({ player }));
      updateScore(player.score, player.assertions);
    }
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
                    title="Próxima"
                    className="advance-button"
                    disabled={ !answered }
                    hidden={ !answered }
                    testid="btn-next"
                  />)
                : (
                  <GenericButton
                    onClick={ this.handleNextQuestion }
                    title="Ver resultado!"
                    className="advance-button"
                    disabled={ !answered }
                    hidden={ !answered }
                    testid="btn-next"
                  />) }
            </div>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuestions.questions,
  player: state.reducerLogin.player,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(responseQuestions()),
  updateScore: (score, assertions) => dispatch(playerScore(score, assertions)),
});

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
