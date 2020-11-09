import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const ranking = localStorage.getItem('ranking');
    return (
      <div>
        {ranking.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Ranking;
