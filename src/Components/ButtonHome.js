import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonHome extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            Jogar de Novo
          </button>
        </Link>
      </div>
    );
  }
}
export default ButtonHome;
