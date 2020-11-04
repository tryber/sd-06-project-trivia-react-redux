import React from 'react';

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
      <div>
        <div>
          <label htmlFor="input-player-name">
            Nome:
            <input
              data-testid="input-player-name"
              id="input-player-name"
              onChange={ this.validateName }
              type="text"
            />
          </label>
          <label htmlFor="input-player-email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="input-player-email"
              onChange={ this.validateEmail }
              type="email"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(validName && validEmail) }
        >
          Jogar!
        </button>
      </div>
    );
  }
}

export default Login;
