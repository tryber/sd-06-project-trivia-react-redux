import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FormLogin extends Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputName: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyFields = this.verifyFields.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.verifyFields());
  }

  verifyFields() {
    const { inputEmail, inputName } = this.state;
    if (inputEmail.length > 0 && inputName.length > 0) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="playerGravatar">
        Email do Gravatar:
            <input
              type="text"
              id="playerGravatar"
              name="inputEmail"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="playerName">
          Nome do Jogador:
            <input
              type="text"
              id="playerName"
              name="inputName"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default FormLogin;
