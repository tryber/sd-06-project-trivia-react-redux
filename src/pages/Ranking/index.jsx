import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
      <div>
        <h1 data-testid="ranking-title">
        Ranking
        </h1>
        <ol>
          { ranking.map((user, index) => (
            <li key={ `${user.picture}-${index}` }>
              <div>
                <img src={ user.picture } alt={ `${user.name}` } />
                <span data-testid={ ` player-name-${index}` }>{ user.name }</span>
                <span data-testid={ `player-score-${index}` }>{ user.score }</span>
              </div>
            </li>
          ))}
        </ol>
        <Link to="/"> Início </Link>
      </div>
    );
  }
}

export default Ranking;
