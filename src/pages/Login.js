import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { playerAction, createTokenAction } from '../actions';
import { tokenAPI } from '../servicesAPI';

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

  async clickButton() {
    const { login, createToken } = this.props;
    const { name, gravatarEmail } = this.state;
    login({ name, gravatarEmail });
    const tokenObj = await tokenAPI();
    createToken(tokenObj);
    localStorage.setItem('token', tokenObj.token);

    const gameState = { 
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      }
    }
    localStorage.setItem('state', JSON.stringify(gameState))
  }

  render() {
    const { name, gravatarEmail, isDisabled } = this.state;
    return (
      <>
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
        <Link to="/game">
          <button
            type="submit"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.clickButton }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(playerAction(e)),
  createToken: (e) => dispatch(createTokenAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  createToken: PropTypes.func.isRequired,
};
