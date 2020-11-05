import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import fetchApi from '../services';
import logo from '../trivia.png';
import configLogo from '../img/config.png';
import '../App.css';

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
      <div className="login-container">
        <form className="App">
          <div className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <div className="login-div">
              <label htmlFor="input-player-name">
                <input
                  data-testid="input-player-name"
                  id="input-player-name"
                  onChange={ validateName }
                  type="text"
                  placeholder="Nome"
                />
              </label>
              <label htmlFor="input-player-email">
                <input
                  data-testid="input-gravatar-email"
                  id="input-player-email"
                  onChange={ validateEmail }
                  type="email"
                  placeholder="Email"
                />
              </label>
              <div className="buttons-div">
                <button
                  type="button"
                  data-testid="btn-play"
                  disabled={ !(validName && validEmail) }
                  onClick={ () => fetchApi() }
                >
                  Jogar!
                </button>
                <button
                  className="button-b"
                  type="button"
                  data-testid="btn-settings"
                  onClick={ () => handleSettings() }
                >
                  <img src={ configLogo } width="50" alt="config" />
                </button>
                { showSettings ? <Settings /> : '' }
              </div>
            </div>
          </div>
        </form>
      </div>
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
