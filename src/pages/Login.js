import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTokenAndLogin } from '../actions';

import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      email: '',
      playerName: '',
      disabled: true,
    };
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { email, playerName } = this.state;

        if (email.length > 0 && playerName.length > 0) {
          this.setState({ disabled: false });
        } else {
          this.setState({ disabled: true });
        }
      },
    );
  }

  render() {
    const { email, playerName, disabled } = this.state;
    // Destruturate my login action as a props
    const { requestToken } = this.props;

    return (
      <div>
        <div>
          <Link to="/config">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </div>
        <div>
          <img src={ logo } alt="Logo do Trivia" width="400" />
        </div>
        <div>
          <label htmlFor="playerName">
          Player:
            <input
              data-testid="input-player-name"
              type="text"
              placeholder="Enter your name"
              name="playerName"
              value={ playerName }
              onChange={ this.handleOnChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              data-testid="input-gravatar-email"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={ email }
              onChange={ this.handleOnChange }
            />
          </label>
        </div>
        <br />
        <br />
        <Link to="/questions">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            // Clicking at button disparates dispatch function to save state email at /actions/index
            onClick={ () => requestToken(email, playerName) }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

// Function that make dispatch to my /actions/index
const mapDispatchToProps = (dispatch) => ({
  requestToken: (email, playerName) => dispatch(fetchTokenAndLogin(email, playerName)),
});

Login.propTypes = {
  requestToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
