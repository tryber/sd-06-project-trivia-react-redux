import React, { Component } from 'react';
import { GoHome, TableRank } from '../components';
import './style_sheets/Ranking.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">
          Ranking
        </h1>

        <main>
          { TableRank(ranking) }
          <GoHome />
        </main>
      </div>
    );
  }
}

export default Ranking;
