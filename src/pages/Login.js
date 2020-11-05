import React from 'react';
import { Link } from 'react-router-dom';
import CryptoJs from 'crypto-js';
import fetchToken from '../services/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  hash() {
    const { email } = this.state;
    const hash = CryptoJs.MD5(email).toString().trim().toLowerCase();
    console.log(hash);
    localStorage.setItem('hash', hash);
  }

  player() {
    const { name, email } = this.state;
    const state = {
      player: {
        // assertions,
        name,
        // score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, email } = this.state;
      if (name && email) {
        this.setState({ btnDisabled: false });
      } else {
        this.setState({ btnDisabled: true });
      }
    });
  }

  async handleClick() {
    const token = await fetchToken();
    localStorage.setItem('token', token);
    this.player();
    this.hash();
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <Link to="/settings" data-testid="btn-settings">
          Configurações
        </Link>
        <form>
          <label htmlFor="name">
          Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              onChange={ this.handleChange }
              name="name"
            />
          </label>
          <label htmlFor="email">
          Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="text"
              onChange={ this.handleChange }
              name="email"
            />
          </label>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
            >
            Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
