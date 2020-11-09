import React, { Component } from 'react';
import { MD5 } from 'crypto-js/md5';
import ButtonHome from '../Components/ButtonHome';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 className="RankingTitle">Ranking</h1>
        {ranking.sort((a, b) => b.score - a.score)
          .map((item, index) => {
            const hash = MD5(item.picture).toString();
            return (
              <div key={ index }>
                <span data-testid={ `player-name-${index}` }>{ item.name }</span>
                <span data-testid={ `player-score-${index}` }>{ item.score }</span>
                <img
                  src={ `https://www.gravatar.com/avatar/${hash}` }
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
