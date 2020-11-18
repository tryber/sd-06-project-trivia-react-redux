import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { playerLoginAction, fetchTokenAction } from '../actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggeButton = this.toggeButton.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.toggeButton();
    });
  }

  toggeButton() {
    const { gravatarEmail, name } = this.state;
    const isDisabled = (gravatarEmail === '' || name === '');
    this.setState({ isDisabled });
  }

  clickButton() {
    const { login, createToken } = this.props;
    const { name, gravatarEmail } = this.state;
    login({ name, gravatarEmail });
    createToken();
  }

  render() {
    const { name, gravatarEmail, isDisabled } = this.state;
    return (
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            onChange={ this.handleChange }
            value={ name }
            name="name"
            placeholder="nome"
            data-testid="input-player-name"
          />
          <input
            type="email"
            onChange={ this.handleChange }
            value={ gravatarEmail }
            name="gravatarEmail"
            placeholder="email"
            data-testid="input-gravatar-email"
          />
        </div>
        <div className="buttons-container">
          <Link to="/game" className="buttons">
            <button
              type="submit"
              disabled={ isDisabled }
              data-testid="btn-play"
              onClick={ this.clickButton }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings" className="button">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(playerLoginAction(e)),
  createToken: () => dispatch(fetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  createToken: PropTypes.func.isRequired,
};
