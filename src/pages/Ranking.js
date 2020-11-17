import React from 'react';
import { Link } from 'react-router-dom';

// Renderiza o componente de configurações (ainda não implementado).
class Ranking extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao início!
          </button>
        </Link>
        <h1
          data-testid="ranking-title"
        >
          Ranking!
        </h1>
      </div>
    );
  }
}

export default Ranking;
