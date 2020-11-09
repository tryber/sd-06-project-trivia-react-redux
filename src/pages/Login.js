import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, thunkToken, gravatar } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.gravatarTransform = this.gravatarTransform.bind(this);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  handleChange() {
    const inputEmail = document.getElementById('input-gravatar-name').value;
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const inputName = document.getElementById('input-player-name').value;
    const one = 1;
    if (regex.test(inputEmail) === true && inputName.length >= one) {
      this.setState({
        disabled: false,
        name: inputName,
        email: inputEmail,
      });
    } else {
      this.setState({ disabled: true });
    }
  }

  gravatarTransform() {
    const { gravatarData } = this.props;
    const { email } = this.state;
    const hash = md5(email);
    const linkGravatar = `https://www.gravatar.com/avatar/${hash}`;
    gravatarData(linkGravatar);
  }

  async handleClick() {
    const { fetchToken, saveLogin } = this.props;
    await fetchToken();
    saveLogin(this.state);
    this.gravatarTransform();
  }

  render() {
    const { disabled } = this.state;
    return (
      <section>
        <h1>Login - Play Trivia</h1>
        <form>
          <label htmlFor="input-player-name">
            Name:
            <input
              id="input-player-name"
              type="text"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-name">
            E-Mail:
            <input
              id="input-gravatar-name"
              type="text"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game-screen">
            <button
              disabled={ disabled }
              type="button"
              data-testid="btn-play"
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
              Configurações
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  gravatarData: (hash) => dispatch(gravatar(hash)),
  fetchToken: () => dispatch(thunkToken()),
  saveLogin: (info) => dispatch(userLogin(info)),
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  saveLogin: PropTypes.func.isRequired,
  gravatarData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
