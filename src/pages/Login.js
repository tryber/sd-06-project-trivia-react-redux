import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.state = {
      email: '',
      name: '',
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
    this.setState({
      email: target.value,
    });
  }

  validateName({ target }) {
    const name = target.value.length;
    const minLength = 2;
    if (name >= minLength) {
      this.setState({
        name: target.value,
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
          <label>
            Nome:
            <input data-testid="input-player-name" onChange={this.validateName} />
          </label>
          <label>
            Email:
            <input data-testid="input-gravatar-email" onChange={this.validateEmail} />
          </label>
        </div>
        <button data-testid="btn-play" disabled={!(validName && validEmail)}>
          Jogar!
        </button>
      </div>
    );
  }
}

export default Login;
