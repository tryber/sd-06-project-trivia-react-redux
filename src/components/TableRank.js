import React from 'react';
import md5 from 'crypto-js/md5';

const TableRank = (players) => (
  <table>

    <thead>
      <tr>
        <th>Nome</th>
        <th>Pontuação</th>
      </tr>
    </thead>

    <tbody>
      {players
        .sort((a, b) => b.score - a.score)
        .map((player, index) => (
          <tr key={ index }>
            <th>
              <img src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail)}` } alt={ player.name } />
            </th>
            <th data-testid={ `player-name-${index}` }>{player.name}</th>
            <th data-testid={ `player-score-${index}` }>{player.score}</th>
          </tr>
        ))}
    </tbody>

  </table>
);

export default TableRank;
