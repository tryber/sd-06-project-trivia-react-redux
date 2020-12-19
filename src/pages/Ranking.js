import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Ranking.css';

class Ranking extends React.Component {
  compareRanking(a, b) {
    return b.score - a.score;
  }

  render() {
    const { players } = this.props;
    const copyPlayers = [...players];
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {copyPlayers.sort(this.compareRanking).map((player, index) => (
          <div key={ `${player.name}${index}` }>
            <span>{player.gravatar}</span>
            <span
              className="ranking-data"
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </span>
            <span
              className="ranking-data"
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </span>
            {' '}
          </div>

        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
          Inicio
          </button>
        </Link>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  players: state.ranking.players,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
};
