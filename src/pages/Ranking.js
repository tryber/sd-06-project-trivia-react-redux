import React, { Component } from 'react';
import { GoHome } from '../components';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
        <GoHome />
      </div>
    );
  }
}

export default Ranking;
