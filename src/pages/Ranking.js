import React from 'react';
import BtnHome from '../components/BtnHome';

import './Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    const ranking = JSON.parse(localStorage.getItem('players'));
    this.state = {
      ranking,
    };

    this.rankingSorted = this.rankingSorted.bind(this);
  }

  rankingSorted() {
    const { ranking } = this.state;
    return ranking.sort((a, b) => b.player.score - a.player.score);
  }

  render() {
    const playerRanking = this.rankingSorted();
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>
        <table className="table-container">
          <thead className="table-head">
            <th>NOME</th>
            <th>SCORE</th>
          </thead>
          <tbody>
            { playerRanking.map((eachPlayer, index) => (
              <tr key={ index }>
                <td data-testid={ `player-name-${index}` }>
                  { eachPlayer.player.name }
                </td>
                <td data-testid={ `player-score-${index}` }>
                  { eachPlayer.player.score }
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <BtnHome />
      </div>
    );
  }
}

export default Ranking;
