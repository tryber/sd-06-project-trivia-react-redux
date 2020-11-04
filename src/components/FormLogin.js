import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import login from '../actions'

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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const { dispatchEmail } = this.props;
    const { inputEmail } = this.state;

    dispatchEmail(inputEmail);
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
              onClick={ this.handleClick }
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

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(login(email)),
})

export default connect(null, mapDispatchToProps)(FormLogin);
