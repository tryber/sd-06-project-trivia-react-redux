import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { FaTrophy, FaMedal } from 'react-icons/fa';

import './styles.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    const ranking = JSON.parse(localStorage.getItem('ranking'));

    this.state = {
      ranking,
    };
  }

  render() {
    const { ranking } = this.state;

    const podiumLimit = 3;

    return (
      <div className="ranking-page">
        <Link data-testid="btn-go-home" to="/">
          <FiHome size={ 20 } />
          Início
        </Link>

        <h1 data-testid="ranking-title">
          <FaTrophy />
Ranking

        </h1>

        <div className="ranking-list">
          { ranking.map((user, index) => (
            <div key={ `${user.picture}-${index}` }>
              <div className="user-rank">
                {index < podiumLimit && (
                  <div className="medal-container">
                    <FaMedal className={ `podium-${index + 1}` } />
                  </div>
                )}
                <span>{`${index + 1}.`}</span>
                <img src={ user.picture } alt={ `${user.name}` } />
                <span data-testid={ ` player-name-${index}` }>{ user.name }</span>
                <span data-testid={ `player-score-${index} ` }>
                  { `${user.score} pts` }
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

export default Ranking;
