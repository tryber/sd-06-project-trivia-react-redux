import React from 'react';
import { Link } from 'react-router-dom';
import fetchApi from '../services';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.state = {
      validEmail: false,
      validName: false,
    };
  }

  validateEmail({ target }) {
    const email = target.value;
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (isValid) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
  }

  validateName({ target }) {
    const name = target.value.length;
    const minLength = 2;
    if (name >= minLength) {
      this.setState({
        validName: true,
      });
    } else {
      this.setState({
        validName: false,
      });
    }
  }

  render() {
    const { validEmail, validName } = this.state;
    return (
      <div className="login-container">
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <div className="login-div">
              <label htmlFor="input-player-name">
                <input
                  data-testid="input-player-name"
                  id="input-player-name"
                  onChange={ this.validateName }
                  type="text"
                  placeholder="Nome"
                />
              </label>
              <label htmlFor="input-player-email">
                <input
                  data-testid="input-gravatar-email"
                  id="input-player-email"
                  onChange={ this.validateEmail }
                  type="email"
                  placeholder="Email"
                />
              </label>
              <Link to="/game">
                <button
                  type="button"
                  data-testid="btn-play"
                  disabled={ !(validName && validEmail) }
                  onClick={ () => fetchApi() }
                >
                  Jogar!
                </button>
              </Link>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Login;
