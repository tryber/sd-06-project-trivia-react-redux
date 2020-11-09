import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <div>
          <h2 data-testid="ranking-title">Ranking</h2>
        </div>
        <div>
          <Link to="/" data-testid="btn-go-home">
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }
}

export default Ranking;
