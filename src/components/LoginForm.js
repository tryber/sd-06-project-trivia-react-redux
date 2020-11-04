import React, { Component } from 'react';
import { Settings } from '../components';

class LoginForm extends Component {
  render() {
    const {
      handleSettings,
      validateName,
      validateEmail,
      validName,
      validEmail,
      showSettings,
    } = this.props;
    return (
      <form>
        <div>
          <label htmlFor="input-player-name">
            Nome:
            <input
              data-testid="input-player-name"
              id="input-player-name"
              onChange={ validateName }
              type="text"
            />
          </label>
          <label htmlFor="input-player-email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="input-player-email"
              onChange={ validateEmail }
              type="email"
            />
          </label>
        </div>
        <button type="button" data-testid="btn-play" disabled={ !(validName && validEmail) }>
          Jogar!
        </button>
        <button type="button" data-testid="btn-settings" onClick={ () => handleSettings() }>
          Configurações
        </button>
        { showSettings ? <Settings /> : '' }
      </form>
    );
  }
}

export default LoginForm;
