import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayAgain extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default PlayAgain;
