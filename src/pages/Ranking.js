import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/"><button data-testid="btn-go-home">Jogar novamente?</button></Link>
      </>
    )
  }
}

export default Ranking;