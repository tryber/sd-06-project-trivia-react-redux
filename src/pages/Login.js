import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, email } = this.state;
      if (name && email) {
        this.setState({ btnDisabled: false });
      } else {
        this.setState({ btnDisabled: true });
      }
    });
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <Link to="/settings" data-testid="btn-settings">
          Configurações
        </Link>
        <form>
          <label htmlFor="name">
          Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              onChange={ this.handleChange }
              name="name"
            />
          </label>
          <label htmlFor="email">
          Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="text"
              onChange={ this.handleChange }
              name="email"
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ btnDisabled }
          >
          Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
