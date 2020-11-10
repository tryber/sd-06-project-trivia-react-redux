import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GoHome extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para Início
          </button>
        </Link>
      </div>
    );
  }
}

export default GoHome;
