import React, { Component } from 'react'

export default class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validadeLogin = this.validadeLogin.bind(this);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.validadeLogin();
  }

  validadeLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });

    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="text"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }

        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}
