import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validadeLogin = this.validadeLogin.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  async onRequest() {
    const triviaRequest = await fetch('https://opentdb.com/api_token.php?command=request');
    const triviaJson = await triviaRequest.json();
    const { token } = triviaJson;
    localStorage.setItem('token', token);
  }

  async handleClick() {
    console.log('click');
    const { globalLogin, history } = this.props;
    const { name, email } = this.state;
    globalLogin(name, email);
    history.push('/game');
    await this.onRequest();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.validadeLogin();
  }

  validadeLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="text"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }

        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
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
  globalLogin: (name, email) => dispatch(login(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
