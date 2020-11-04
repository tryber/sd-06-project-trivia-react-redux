import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      isDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  checkValidity() {
    const { userName, email } = this.state;

    if (userName.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    } else if (userName.length === 0 || email.length === 0) {
      this.setState({ isDisabled: true });
    }
  }

  async handleInputChange({ target }) {
    const { name, value } = target;

    await this.setState({
      [name]: value,
    });

    this.checkValidity();
  }

  render() {
    const { userName, email, isDisabled } = this.state;

    return (
      <div>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={ email }
            placeholder="Your Gravatar email"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="userName">
          <input
            id="userName"
            name="userName"
            value={ userName }
            placeholder="Your player name"
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
