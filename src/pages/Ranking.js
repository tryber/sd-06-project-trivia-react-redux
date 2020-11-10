import React from 'react';

class Ranking extends React.Component {
  render() {
    const ranking = localStorage.getItem('ranking').split(',');
    ranking.sort(() => ranking.score);

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
