import React, { Component } from 'react';
import { GoHome, TableRank } from '../components';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>

        <main>
          { TableRank(ranking) }
          <GoHome />
        </main>
      </div>
    );
  }
}

export default Ranking;
