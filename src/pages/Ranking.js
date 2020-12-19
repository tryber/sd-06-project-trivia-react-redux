import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { resetToPlayAgain } from '../redux/actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.addRankingPlayers();
    this.getLocalStorageRanking();
  }

  getLocalStorageRanking() {
    const storageRanking = JSON.parse(localStorage.getItem('ranking'));
    storageRanking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: [...storageRanking],
    });
  }

  addRankingPlayers() {
    const { name, email, score, correctAnswers } = this.props;
    const img = `https://www.gravatar.com/avatar/${md5(email)}`;
    const storageRanking = JSON.parse(localStorage.getItem('ranking'));
    const newPlayer = { name, score, correctAnswers, img };
    if (storageRanking) {
      const saveRanking = [...storageRanking, newPlayer];
      localStorage.setItem('ranking', JSON.stringify(saveRanking));
    }
    if (!storageRanking && name !== '') {
      localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    }
  }

  render() {
    const { ranking } = this.state;
    const { playAgain } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {ranking.map((player, index) => (
            <div key={ `div${index}` }>
              <span
                key={ `name${index}` }
                data-testid={ `player-name-${index}` }
              >
                { player.name }
              </span>
              <span
                key={ `score${index}` }
                data-testid={ `player-score-${index}` }
              >
                { player.score }
              </span>
              <span
                key={ `answer${index}` }
              >
                {player.correctAnswers}
              </span>
              <img src={ player.img } alt="Palyer Avatar" />
            </div>)) }
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ playAgain }
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(resetToPlayAgain()),
});

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  correctAnswers: state.game.correctAnswers,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  playAgain: PropTypes.func.isRequired,
};
