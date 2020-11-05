import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Settings from './Settings';
import { fetchApi } from '../actions';
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
      fetchToken,
    } = this.props;
    return (
      <div className="login-container">
        <form className="App">
          <div className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <div className="config-login-div">
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
                  <Link to="/game">
                    <button
                      type="button"
                      data-testid="btn-play"
                      disabled={ !(validName && validEmail) }
                      onClick={ () => fetchToken() }
                    >
                      Jogar!
                    </button>
                  </Link>
                  <button
                    className="button-b"
                    type="button"
                    data-testid="btn-settings"
                    onClick={ () => handleSettings() }
                  >
                    <img src={ configLogo } width="50" alt="config" />
                  </button>
                </div>
              </div>
              { showSettings ? <Settings /> : '' }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchApi()),
});

LoginForm.propTypes = {
  handleSettings: PropTypes.func.isRequired,
  validateName: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validName: PropTypes.bool.isRequired,
  validEmail: PropTypes.bool.isRequired,
  showSettings: PropTypes.bool.isRequired,
  fetchToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
