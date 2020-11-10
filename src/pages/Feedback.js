import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <p
          data-testid="feedback-text"
        >
          Feedback!
        </p>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
              Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
              Jogar Novamente!
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
