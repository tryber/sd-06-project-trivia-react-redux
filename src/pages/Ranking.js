import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ORDENATIONAUX = -1;
    const ordenateRanking = ranking.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return ORDENATIONAUX;
      }
      return 0;
    });
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ordenateRanking.map((player, index) => (
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
