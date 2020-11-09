import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonRanking extends Component {
  render() {
    return (
      <div className="ButtonRanking">
        <button data-testid="btn-ranking" type="button">
          <Link to="/Ranking">
            Ver Ranking
          </Link>
        </button>
      </div>
    );
  }
}
export default ButtonRanking;
