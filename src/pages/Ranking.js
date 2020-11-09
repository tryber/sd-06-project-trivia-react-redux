import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.map((player, index) => (
          <div key={ index }>
            <h2 data-testid={ `player-name-${index}` }>{player.name}</h2>
            <h2 data-testid={ `player-score-${index}` }>{player.score}</h2>
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
