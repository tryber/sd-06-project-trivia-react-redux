import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { playerName, avatar } = this.props;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={avatar} alt="Imagem gravatar" />
          <p data-testid="header-player-name">{playerName}</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

export default Header;
