import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserInfo } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateFields() {
    const { name, email } = this.state;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

    if (emailFormat && name.length !== 0) {
      this.setState({ isDisable: false });
    } else this.setState({ isDisable: true });
  }

  handleInput({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validateFields();
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { setName } = this.props;
    const { name } = this.state;
    setName(name);
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            value={ name }
            name="name"
            placeholder="Nome"
            onChange={ this.handleInput }
            required
            data-testid="input-player-name"
          />
          <input
            type="email"
            value={ email }
            name="email"
            placeholder="Email"
            onChange={ this.handleInput }
            required
            data-testid="input-gravatar-email"
          />
          <button
            type="submit"
            disabled={ isDisable }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setName: (name) => dispatch(setUserInfo(name)),
});

Login.propTypes = {
  setName: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
