import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import logo from '../trivia.png';

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
    this.setState({
      isLoged: true,
    });
  }

  render() {
    const { isLoged, disabled, email } = this.state;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    console.log(gravatar);
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
        </section>
      );
    }
    return (
      <Redirect to="/jogar" />
    );
  }
}

export default Login;
