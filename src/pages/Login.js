import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const three = 4;

    this.setState({ [name]: value }, () => {
      let disabled = true;

      if (regexp.test(email) && nome.length <= three ) disabled = false;

      this.setState({ disabled });
    });
  }

  handleLogin() {
    
    this.setState({
      isLoged: true,
    });
  }

  render() {
    const { isLoged, disabled } = this.state;

    if (!isLoged) {
      return (
        <section>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <label>
            Email do Gravatar:
            <input data-testid="input-gravatar-email" name="email" onChange={ this.handleChange } />
          </label>
          <label>
            Nome do Jogador:
            <input data-testid="input-player-name" name="nome" onChange={this.handleChange} />
          </label>
          <button
            disabled={disabled}
            type="button"
            data-testid="btn-play"
            onClick={this.handleLogin}
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
