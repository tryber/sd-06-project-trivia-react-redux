import React, { Component } from 'react';
import logo from '../trivia.png';
import ButtonSettings from './ButtonSettings'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.validateFields = this.validateFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateFields() {
    const { name, email } = this.state;
    return (name.length > 0 && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)));
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ [target.name]: value });
  }

  render() {
    const validated = this.validateFields();

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form className="login-form">
          <label htmlFor="name-input">
            Your name
            <input
              type="text"
              id="name-input"
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email-input">
            Your email
            <input
              type="email"
              id="email-input"
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          {
            (validated)
              ? (
                <button type="button" data-testid="btn-play">
                  Jogar
                </button>
              )
              : (
                <button type="button" data-testid="btn-play" disabled>
                  Jogar
                </button>
              )
          }
        </form>
        <ButtonSettings />
      </div>
    );
  }
}
export default Login;
