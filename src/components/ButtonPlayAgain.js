import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonPlayAgain extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default ButtonPlayAgain;
