import React, { Component } from 'react';

class Header extends Component {
  render() {
    const hash = localStorage.getItem('hash');
    const player = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="gravatar"
        />
        <h2 data-testid="header-player-name">
            Jogador:
          {player.name}
        </h2>

        <h2 data-testid="header-score">
            Pontos:
          {player.score}
        </h2>
      </div>
    );
  }
}
export default Header;
