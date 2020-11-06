import React, { Component } from 'react';
import TableRank from '../components/TableRank';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <header>
          <h1>Ranking</h1>
        </header>

        <main>
          {TableRank(ranking)}

        </main>
      </div>
    );
  }
}

export default Ranking;
