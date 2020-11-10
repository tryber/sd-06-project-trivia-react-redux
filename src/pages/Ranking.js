import React from 'react';
import { Link } from 'react-router-dom';

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
        {/* LÓGICA ABAIXO PRECISA SER REFEITA! */}
        <button
          type="button"
          data-testid="correct-answer"
        >
          test 1
        </button>
        <button
          type="button"
          data-testid="btn-next"
        >
          test 2
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
        >
          test 3
        </button>
        {/* LÓGICA ACIMA PRECISA SER REFEITA! */}
      </div>
    );
  }
}

export default Ranking;
