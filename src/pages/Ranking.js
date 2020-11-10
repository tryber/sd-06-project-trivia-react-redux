import React from 'react';

class Ranking extends React.Component {
  render() {
    const ranking = localStorage.getItem('ranking').split(',');
    ranking.sort((a, b) => {
      const scoreA = a.score;
      const scoreB = b.score;
      const minusOne = -1;
      if (scoreA > scoreB) return 1;
      if (scoreA < scoreB) return minusOne;
    });

    return (
      <section>
        <ol>
          {ranking.map((player, index) => {
            const testId = `player-name-${index}`;
            return (
              <li data-testid={ testId } key={ index }>
                <img alt="alt-text" src={ player.avatar } />
                {player.name}
                {player.score}
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}

export default Ranking;
