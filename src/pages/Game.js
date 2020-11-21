import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveRanking } from '../actions';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currentID: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { currentID } = this.state;
    const questionNumber = 4;
    if (currentID >= questionNumber) {
      const { name, score, hash, saveRankingtoStore, history } = this.props;
      const picture = `https://www.gravatar.com/avatar/${hash}`;
      const player = {
        name,
        picture,
        score,
      };
      saveRankingtoStore(player);
      if (localStorage.getItem('ranking') === null) {
        const ranking = [];
        localStorage.setItem('ranking', JSON.stringify(ranking));
      }
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify(ranking.concat(player)));
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      currentID: prevState.currentID + 1,
    }));
  }

  render() {
    const { currentID } = this.state;
    const { questionsInfo } = this.props;
    const currentCard = questionsInfo[currentID];
    console.log(currentCard);
    if (!currentCard) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <GameCard question={ currentCard } nextQuestion={ this.nextQuestion } />
      </div>
    );
  }
}

Game.propTypes = {
  questionsInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveRankingtoStore: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questionsInfo: state.requestInfo.questionsInfo,
  score: state.player.score,
  name: state.player.name,
  hash: state.requestInfo.hash,
});

const mapDispatchToProps = (dispatch) => ({
  saveRankingtoStore: (playerAtual) => dispatch(saveRanking(playerAtual)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
