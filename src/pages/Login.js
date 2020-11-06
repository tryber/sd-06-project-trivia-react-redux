import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogin, getToken, fetchQuestions } from '../actions';

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

  async handleClick() {
    const {
      getPlayerToken,
      getPlayerLogin,
      getAPIQuestions,
      history,
    } = this.props;
    const { name, email } = this.state;
    await getPlayerToken();
    getPlayerLogin(name, email);
    await getAPIQuestions();
    history.push('/game');
  }

  render() {
    const { handleChange, handleDisableButton, handleClick } = this;
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
          onClick={ handleClick }
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
  getPlayerToken: () => dispatch(getToken()),
  getPlayerLogin: (name, email) => dispatch(getLogin(name, email)),
  getAPIQuestions: () => dispatch(fetchQuestions()),
});

Login.propTypes = {
  getPlayerToken: PropTypes.func.isRequired,
  getPlayerLogin: PropTypes.func.isRequired,
  getAPIQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
