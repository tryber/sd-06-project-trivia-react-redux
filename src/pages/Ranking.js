import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  sortfunction(a, b) {
    return (b.score - a.score);
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort(this.sortfunction);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.map((player, i) => (
          <div key={ i }>
            <h2 data-testid={ `player-name-${i}` }>{player.name}</h2>
            <h2 data-testid={ `player-score-${i}` }>{player.score}</h2>
          </div>
        ))}
        <Link to="/" data-testid="btn-go-home">
            Voltar para home
        </Link>
      </div>
    );
  }
}

export default Ranking;
