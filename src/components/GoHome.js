import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../visual_identity/general_styles/buttons.scss';

class GoHome extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="btnDarkBlue"
          >
            Voltar para Início
          </button>
        </Link>
      </div>
    );
  }
}

export default GoHome;
