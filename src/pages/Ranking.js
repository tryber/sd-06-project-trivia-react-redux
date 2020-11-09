import React from 'react';
import BtnHome from '../componente/BtnHome';

class Ranking extends React.Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">
          Ranking list
        </h1>
        <BtnHome />
      </section>
    );
  }
}

export default Ranking;
