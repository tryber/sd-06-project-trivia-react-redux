import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken, getLogin } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  validateEmail(email) {
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

    return validateEmailRegex.test(email);
  }

  validateName(name) {
    const minimumNameLength = 2;

    return (name.length >= minimumNameLength);
  }

  handleDisableButton() {
    const { email, name } = this.state;
    const { validateEmail, validateName } = this;

    return (!validateEmail(email) || !validateName(name));
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { getGlobalLogin, history } = this.props;
    const { email, name } = this.state;
    getGlobalLogin(name, email);
    history.push('/game');
  }

  render() {
    const { getPlayerToken } = this.props;
    const { handleChange, handleDisableButton } = this;
    const { email, name } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          Digite seu e-mail do Gravatar:
          <input
            type="text"
            name="email"
            id="email-input"
            value={ email }
            onChange={ handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name-input">
          Digite seu nome:
          <input
            type="text"
            name="name"
            id="name-input"
            value={ name }
            onChange={ handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ handleDisableButton() }
          onClick={ getPlayerToken() && this.handleClick }
        >
            Jogar
        </button>
        <div>
          <Link data-testid="btn-settings" to="/settings">
            Configurações
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(getToken),
  getGlobalLogin: (name, email) => dispatch(getLogin(name, email)),
});

Login.propTypes = {
  getPlayerToken: PropTypes.func.isRequired,
  getGlobalLogin: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,

};

export default connect(null, mapDispatchToProps)(Login);
