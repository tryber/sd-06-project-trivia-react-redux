import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Settings from './Settings';
// import fetchApi from '../services';

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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(validName && validEmail) }
          // onClick={ () => fetchApi() }
        >
          Jogar!
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => handleSettings() }
        >
          Configurações
        </button>
        { showSettings ? <Settings /> : '' }
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSettings: PropTypes.func.isRequired,
  validateName: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validName: PropTypes.bool.isRequired,
  validEmail: PropTypes.bool.isRequired,
  showSettings: PropTypes.bool.isRequired,
};

export default LoginForm;
