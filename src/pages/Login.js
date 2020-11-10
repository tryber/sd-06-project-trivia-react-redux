import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiToken } from '../services/request';
import { questions, scoreReset, tokenLogin, user } from '../redux/actions';
import configuration from '../images/configuration.png';
import logo from '../images/logo.jpg';
import '../style/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isDisable: true,
      email: '',
      name: '',
    };
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.confirmEmail();
    });
  }

  confirmEmail() {
    const { email, name } = this.state;
    const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    if (name !== '' && checkEmail) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  async handleClick() {
    const { history, saveToken, saveQuestion, saveUser, resetPlayer } = this.props;
    const objTokenQuestion = await apiToken();
    saveUser(this.state);
    saveToken(objTokenQuestion.token);
    saveQuestion(objTokenQuestion.questions);
    resetPlayer();
    history.push('/game');
  }

  render() {
    const { isDisable, name, email } = this.state;
    return (
      <div className="div-conf">
        <Link to="/configuration">
          <button
            className="bttn-config"
            type="button"
            data-testid="btn-settings"
          >
            <img className="img-conf" src={ configuration } alt="Configurações" />
          </button>
        </Link>
        <div className="div-login">
          <h1 className="nome-logo">Show do Tio Patinhas</h1>
          <img className="img-logo" src={ logo } alt="Tio patinhas" />
          <label htmlFor="name">
            <input
              className="input"
              type="name"
              data-testid="input-player-name"
              name="name"
              placeholder="Digite seu nome"
              required
              value={ name }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="email">
            <input
              className="input"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              placeholder="Digite seu e-mail"
              required
              value={ email }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <button
            className="bttn-play"
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(tokenLogin(token)),
  saveQuestion: (question) => dispatch(questions(question)),
  saveUser: (login) => dispatch(user(login)),
  resetPlayer: () => dispatch(scoreReset()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveToken: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  resetPlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
