import React from 'react';
import { Link } from 'react-router-dom';
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
