import React, { Component } from 'react';
import { getToken } from '../services';

class Game extends Component {
  handleToken() {
    const token = getToken();
    console.log(token);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={ this.handleToken }>
          click
        </button>
      </div>
    );
  }
}

export default Game;
