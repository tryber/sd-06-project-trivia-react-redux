import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
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
    return this.setState({ disabled: true });
  }

  render() {
    const { disabled, user, email } = this.state;
    const { infoSave } = this.props;
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
        <Link to="/game">
          <button
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
            onClick={ () => infoSave(user, email) }
          >
            Entrar
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
  infoSave: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
