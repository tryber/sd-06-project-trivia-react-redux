import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

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
    console.log(storageRanking);
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
    if (!storageRanking) {
      localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    }
  }

  render() {
    const { ranking } = this.state;
    console.log(ranking);
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
                Nome:
                { player.name }
              </span>
              <span
                key={ `score${index}` }
                data-testid={ `player-score-${index}` }
              >
                Score:
                { player.score }
              </span>
              <span
                key={ `answer${index}` }
              >
                Respostas:
                {player.correctAnswers}
              </span>
              <img src={ player.img } alt="Palyer Avatar" />
            </div>)) }
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  correctAnswers: state.game.correctAnswers,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
};
