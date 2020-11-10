import React from 'react';
import { Link } from 'react-router-dom';

class BtnHome extends React.Component {
  render() {
    return (
      <section>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Voltar ao Início
          </button>
        </Link>
      </section>
    );
  }
}

export default BtnHome;
