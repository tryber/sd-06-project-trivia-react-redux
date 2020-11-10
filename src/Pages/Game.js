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
      finalQuestion: 0,
    };

    this.getTheFetchQuestions = this.getTheFetchQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleFeebackPage = this.handleFeebackPage.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { player } = this.state;
    const responseCode = parseInt(localStorage.getItem('responseCode'), 10);
    const redirectCode = 4;

    if (responseCode === redirectCode) {
      alert('Não há perguntas suficientes para a configuração selecionada!');
      history.push('/settings');
    } else {
      this.getTheFetchQuestions();
      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  async getTheFetchQuestions() {
    const { fetchQuestions } = this.props;

    await fetchQuestions();

    const finalQuestion = parseInt(localStorage.getItem('number'), 10);
    this.setState({ isLoading: false, finalQuestion });
  }

  handleNextQuestion() {
    this.setState((prevState) => ({ index: prevState.index + 1, answered: false }));
  }

  handleFeebackPage() {
    const { history, hash } = this.props;
    const localStorageRanking = JSON.parse(localStorage.getItem('ranking'));
    const { player } = JSON.parse(localStorage.getItem('state'));
    const newScore = { name: player.name, score: player.score, picture: (`https://www.gravatar.com/avatar/${hash}`) };

    if (!localStorageRanking) {
      localStorage.setItem('ranking', JSON.stringify([newScore]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...localStorageRanking, newScore]));
    }

    history.push('/feedback');
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
    const { index, isLoading, answered, finalQuestion } = this.state;

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
              { (index < finalQuestion - 1)
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
                    onClick={ this.handleFeebackPage }
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
  hash: state.reducerLogin.hash,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(responseQuestions()),
  updateScore: (score, assertions) => dispatch(playerScore(score, assertions)),
});

Game.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
