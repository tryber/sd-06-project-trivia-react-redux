import React from 'react';
import { Link } from 'react-router-dom';
import trivia from '../images/trivia.png';
import triviaAPI from '../services/triviaAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      disabled: true,
    };

    this.checkInputsValidity = this.checkInputsValidity.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  checkInputsValidity({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, username } = this.state;
      if (email.length > 0 && username.length > 0) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  async handleClick() {
    const token = await triviaAPI();
    localStorage.setItem('token', token);
  }

  render() {
    const { email, username, disabled } = this.state;
    return (
      <div className="login-container">
        <img
          src={ trivia }
          alt="Logo"
          className="img-logo"
        />
        <br />
        <div>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email do Gravatar"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.checkInputsValidity }
            required
          />
          <br />
          <input
            name="username"
            id="username"
            type="username"
            data-testid="input-player-name"
            placeholder="Nome do Jogador"
            value={ username }
            onChange={ this.checkInputsValidity }
            required
          />
          <br />
          <Link
            to="/gamepage"
          >
            <button
              id="button"
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ () => this.handleClick() }
            >
              JOGAR!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
