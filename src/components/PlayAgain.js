import React from 'react';
import { Link } from 'react-router-dom';

class PlayAgain extends React.Component {
  render() {
    return (
      <Link to="/">
        <button
          className="btn-play-again"
          type="button"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </Link>
    );
  }
}

export default PlayAgain;
