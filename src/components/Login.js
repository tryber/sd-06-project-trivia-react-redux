import React from 'react';
import { Link } from 'react-router-dom';
import CryptoJs from 'crypto-js';
// import { Redirect } from 'react-router-dom';
// import { fetchTokenTrivia } from '../services/fetchApi';
import propType from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiToken, playerName, receiveHash } from '../actions';
import ButtonConfig from './ButtonConfig';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      // redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    // const { name, email } = this.state;
    const { getToken } = this.props;
    const response = await getToken();
    const { data } = response;
    const { token } = data;
    localStorage.setItem('token', token);
    console.log(token);

    const { name, email } = this.state;
    const { infoUser, hashGravatar } = this.props;
    const hash = CryptoJs.MD5(email).toString();
    console.log(hash);
    infoUser(name, email);
    hashGravatar(hash);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="container">
        <form className="formLogin">
          <label htmlFor="input-gravatar-email">
            Email
            <input
              type="email"
              data-testid="input-gravatar-email"
              required
              placeholder="Digite aqui seu email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </label>
          <label htmlFor="input-player-name">
            Nome
            <input
              type="text"
              data-testid="input-player-name"
              required
              placeholder="Digite aqui seu nome"
              onChange={ (e) => this.setState({ name: e.target.value }) }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(name && email) }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </form>
        <ButtonConfig />
      </div>
    );
  }
}

const mapsDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchApiToken()),
  infoUser: (name, email) => dispatch(playerName(name, email)),
  hashGravatar: (hash) => dispatch(receiveHash(hash)),
});

Login.propTypes = {
  getToken: propType.func.isRequired,
};

export default connect(null, mapsDispatchToProps)(Login);
