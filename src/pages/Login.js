import React, { Component } from 'react';
// import md5 from 'crypto-js/md5';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../trivia.png';
import { getUserAction, getUserToken } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      nome: '',
      email: '',
      isLoged: false,
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { nome, email } = this.state;
    const regexp = /^[a-zA-Z0-9.!#$%&_-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    this.setState({ [name]: value }, () => {
      let disabled = true;
      if (regexp.test(email) && nome.length) disabled = false;
      this.setState({ disabled });
    });
  }

  handleLogin() {
    const { email, nome } = this.state;
    const { getUserActionDispatched, getUserTokenDispatched } = this.props;

    getUserTokenDispatched();

    getUserActionDispatched(email, nome);
    this.setState({
      isLoged: true,
    });
  }

  render() {
    const { isLoged, disabled } = this.state;
    // const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    if (!isLoged) {
      return (
        <section>
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              id="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="nome">
            Nome do Jogador:
            <input
              id="nome"
              data-testid="input-player-name"
              name="nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleLogin }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </section>
      );
    }
    return (
      <Redirect to="/trivia-game" />
    );
  }
}

Login.defaultProps = {
  getUserActionDispatched: () => {},
  getUserTokenDispatched: () => {},
};

Login.propTypes = {
  getUserActionDispatched: PropTypes.func,
  getUserTokenDispatched: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  getUserActionDispatched: (email, username) => dispatch(getUserAction(email, username)),
  getUserTokenDispatched: () => dispatch(getUserToken()),
});

export default connect(null, mapDispatchToProps)(Login);
