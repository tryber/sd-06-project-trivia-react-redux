import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

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
    this.setState(
      {
        [name]: value,
      },
      () => this.verifyNameAndEmail(),
    );
  }

  verifyNameAndEmail() {
    const { name, email } = this.state;
    const { sendName } = this.props;
    this.setState({ isDisabled: !(name !== '' && email !== '') });
    sendName(name);
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        FORM
        <input
          value={ name }
          name="name"
          placeholder="Digite seu nome"
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
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendName: (name) => dispatch(login(name)),
});

Login.propTypes = {
  sendName: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
