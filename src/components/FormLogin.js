import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../services';
import { fetchToken } from '../actions';

class FormLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyFields = this.verifyFields.bind(this);
    this.handleUserTokenAndEmail = this.handleUserTokenAndEmail.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.verifyFields());
  }

  verifyFields() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleUserTokenAndEmail() {
    const token = getToken();
    const { saveToken } = this.props;
    saveToken(token);
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
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="playerName">
          Nome do Jogador:
            <input
              type="text"
              id="playerName"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleUserTokenAndEmail }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDisPatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(fetchToken(token)),
});

FormLogin.propTypes = {
  saveToken: PropTypes.func.isRequired,
};

export default connect(null, mapDisPatchToProps)(FormLogin);
