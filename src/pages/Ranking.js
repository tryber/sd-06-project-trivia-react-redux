import React, { Component } from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();
    this.handlePath = this.handlePath.bind(this);
  }

  getAvatar() {
    const { email } = this.props;
    const avatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return avatar;
  }

  handlePath() {
    window.location.replace('http://localhost:3000/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          JSON.parse(localStorage.ranking)
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div key={ index }>
                <img src={ this.getAvatar() } alt="avatar" />
                <h5 data-testid={ `player-name-${index}` }>
                  { player.name }
                </h5>
                <h6>
                  Pontos:
                  <span data-testid={ `player-score-${index}` }>
                    {player.score}
                  </span>
                </h6>

              </div>
            ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handlePath }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  email: propTypes.string.isRequired,
};

export default Ranking;
