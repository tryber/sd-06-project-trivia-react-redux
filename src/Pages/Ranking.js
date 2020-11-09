import React, { Component } from 'react';
import ButtonHome from '../Components/ButtonHome';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 className="RankingTitle" data-testid="ranking-title">Ranking</h1>
        {ranking.sort((a, b) => parseInt(b.score, 10) - parseInt(a.score, 10))
          .map((item, index) => {
            return (
              <div key={ index }>
                <span data-testid={ `player-name-${index}` }>{ item.name }</span>
                <span data-testid={ `player-score-${index}` }>{ item.score }</span>
                <img
                  src={ item.picture }
                  alt="gravatar"
                />
              </div>
            );
          })}
        <ButtonHome />
      </div>
    );
  }
}
export default Ranking;
