import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <div className="game-container">
        <div className="square">
          <header>
            <img
              data-testid="header-profile-picture"
              alt="profile"
            />
            <p data-testid="header-player-name">Nome da pessoa</p>
            <p data-testid="header-score">0</p>
          </header>

        </div>
      </div>
    );
  }
}

export default Game;
