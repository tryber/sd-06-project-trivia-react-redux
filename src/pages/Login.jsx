import React from 'react';
// import propTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { loginUsers } from '../actions';
// import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.validadorDeCampos = this.validadorDeCampos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validadorDeCampos() {
    const { name, email } = this.state;
    this.setState({ isDisable: !(name.length > 0 && email.length > 0) });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validadorDeCampos();
    });
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header> */}
        <form>
          <input
            type="text"
            placeholder="nome"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ isDisable }
          >
            Entrar
          </button>
        </form>

      </div>

    );
  }
}

export default Login;
