import React from 'react';
import propTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSession } from '../services/api';

import { fetchToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
      disabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.inputValidate();
  }

  inputValidate() {
    const { email, user } = this.state;
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
    const userValid = (/.{2,}/).test(user);
    if (validEmail && userValid === true) {
      return this.setState({ disabled: false });
    }
    this.setState({ disabled: true });
  }

  async handleRedirect() {
    const { user, email } = this.state;
    await getSession()
      .then((json) => json.token)
      .then((token) => localStorage.setItem('token', token));
    const { history } = this.props;
    const player = {
      player: {
        name: user,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
    history.push('/game');
    return <Redirect to="/game" />;
  }

  render() {
    const { disabled, user, email, redirect } = this.state;
    const { infoSave } = this.props;
    if (redirect) {
      this.handleRedirect();
    }
    return (
      <div>
        <label htmlFor="user">
          User:
          <input
            name="user"
            type="text"
            data-testid="input-player-name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <label htmlFor="email">
          E-mail:
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <button
          disabled={ disabled }
          type="button"
          data-testid="btn-play"
          onClick={ () => infoSave(user, email) && this.setState({ redirect: true }) }
        >
          Entrar
        </button>
        <br />
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  infoSave: (user, email) => dispatch(fetchToken(user, email)),
});

Login.propTypes = {
  infoSave: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
