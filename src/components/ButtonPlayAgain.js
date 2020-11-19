import React, { Component } from 'react';

class ButtonPlayAgain extends Component {
  constructor() {
    super();
    this.handlePath = this.handlePath.bind(this);
  }

  handlePath() {
    window.location.replace('http://localhost:3000/');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePath }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default ButtonPlayAgain;
