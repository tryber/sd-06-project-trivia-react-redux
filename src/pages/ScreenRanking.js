import React from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js/md5';

function ScreenRanking() {
  const rank = JSON.parse(localStorage.getItem('ranking')).sort(
    (a, b) => b.score - a.score,
  );

  return (
    <div>
      {rank.map((item, index) => {
        const hash = MD5(item.picture).toString();
        return (
          <div key={ index }>
            <span data-testid={ `player-name-${index}` }>{item.name}</span>
            <span data-testid={ `player-score-${index}` }>{item.score}</span>
            <img
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt="gravatar"
            />
          </div>
        );
      })}
      <div data-testid="ranking-title">Ranking: </div>
      <Link to="/">
        <button type="button" data-testid="btn-go-home">
          VOLTAR AO INÍCIO
        </button>
      </Link>
    </div>
  );
}

export default ScreenRanking;
