import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  render() {
    return (
      <div>
        FORM
        <input data-testid="input-player-name" />
        <input data-testid="input-gravatar-email" />
        <button type="submit" data-testid="btn-play">Jogar</button>
      </div>
    );
  }
}

export default connect(null, null)(Login);
