import React, { Component } from 'react';
import ButtonHome from '../Components/ButtonHome';

import '../Css/Ranking.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="Ranking-page">
        <ButtonHome className="Button-home" />
        <div className="Ranking-board">
          <h1 className="Ranking-title" data-testid="ranking-title">
            <span
              role="img"
              aria-label="Trophy"
              className="Emoji-trophy"
            >
              &#127942;
            </span>
            Ranking
            <span
              role="img"
              aria-label="Trophy"
              className="Emoji-trophy"
            >
              &#127942;
            </span>
          </h1>
          {ranking.sort((a, b) => parseInt(b.score, 10) - parseInt(a.score, 10))
            .map((item, index) => (
              <div key={ index } className="Player-record">
                <img
                  src={ item.picture }
                  className="Profile-picture"
                  alt="gravatar"
                />
                <span
                  data-testid={ `player-name-${index}` }
                  className="Player-name"
                >
                  { item.name }
                </span>
                <span
                  data-testid={ `player-score-${index}` }
                  className="Player-score"
                >
                  { item.score }
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default Ranking;
