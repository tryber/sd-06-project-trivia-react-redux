import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyNameAndEmail = this.verifyNameAndEmail.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyNameAndEmail());
  }

  verifyNameAndEmail() {
    const { name, email } = this.state;
    this.setState({ isDisabled: !(name !== '' && email !== '') });
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        FORM
        <input
          value={ name }
          name="name"
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <input
          value={ email }
          name="email"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <button disabled={ isDisabled } type="submit" data-testid="btn-play">
          Jogar
        </button>
      </div>
    );
  }
}

export default connect(null, null)(Login);
