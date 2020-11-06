import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonHome extends Component {
  render() {
    return (
      <div>
        <button data-testid="btn-go-home" type="button">
          <Link to="/">
            Jogar de Novo
          </Link>
        </button>
      </div>
    );
  }
}
export default ButtonHome;
