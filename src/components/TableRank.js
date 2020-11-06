import React from 'react';

export default TableRank = (players) => (
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
          <tr key={ player.name }>
            <th>
              <img src={ player.picture } alt={ player.name } />
            </th>
            <th data-testeid={ `player-name-${index}` }>{player.name}</th>
            <th data-testeid={ `player-score-${index}` }>{player.score}</th>
          </tr>
        ))}
    </tbody>

  </table>
);
