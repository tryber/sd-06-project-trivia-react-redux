import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.handlePath = this.handlePath.bind(this);
  }

  handlePath() {
    window.location.replace('http://localhost:3000/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handlePath }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default Ranking;
