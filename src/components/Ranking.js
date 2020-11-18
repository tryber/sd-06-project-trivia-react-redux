import React from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js';

const Ranking = () => {
  const rank = JSON.parse(localStorage.getItem('ranking'))
    .sort((a, b) => b.player.score - a.player.score);
  console.log(rank.map((play) => play.player.name));

  return (
    <div>
      {rank.map((item, index) => {
        const hash = MD5(item.picture).toString();
        return (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="" />
            <span data-testid={ `player-name-${index}` }>{item.player.name}</span>
            <span data-testid={ `player-score-${index}` }>{item.player.score}</span>
          </div>);
      })}
      <div data-testid="ranking-title">Ranking</div>
      <Link to="/">
        <button type="button" data-testid="btn-go-home">
          Voltar ao inicio
        </button>
      </Link>
    </div>
  );
};

export default Ranking;
