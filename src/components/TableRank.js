import React from 'react';
import md5 from 'crypto-js/md5';
import '../pages/style_sheets/Ranking.css';

const TableRank = (players) => (
  <table>
    <tbody>
      {players
        .sort((a, b) => b.score - a.score)
        .map((player, index) => (
          <tr key={ index } className="ranking-elements">
            <th>
              <img src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail)}` } alt={ player.name } />
            </th>
            <th data-testid={ `player-name-${index}` }>{player.name}</th>
            Score:
            <th data-testid={ `player-score-${index}` }>{player.score}</th>
          </tr>
        ))}
    </tbody>

  </table>
);

export default TableRank;
