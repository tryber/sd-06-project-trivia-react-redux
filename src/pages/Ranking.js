import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        Tela de ranking: Nome e pontuação dos jogadores
        <button type="button" data-testid="btn-go-home">
          <Link to="/login">Login</Link>
        </button>
      </div>
    );
  }
}

export default connect(null, null)(Ranking);
