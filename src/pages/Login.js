import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction, questionsThunk } from '../actions';
import trivia from '../images/trivia.png';
import tokenAPI from '../services/tokenAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      disabled: true,
    };

    this.checkInputsValidity = this.checkInputsValidity.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Função responsável por validar os campos de e-mail e username,
  // habilitando o botão quando ambas são validadas.
  checkInputsValidity({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, username } = this.state;
      if (email.length > 0 && username.length > 0) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  // Função responsável por fazer a requisição do token,
  // e guardá-lo no localStorage. Além disso, ela chama as
  // funções de dispatch login() e questions().
  async handleClick() {
    const { email, username } = this.state;
    const { login, questions } = this.props;
    const token = await tokenAPI();
    localStorage.setItem('token', token);
    login(email, username);
    questions();
  }

  render() {
    const { email, username, disabled } = this.state;
    return (
      <div className="login-container">
        <img
          src={ trivia }
          alt="Logo"
          className="img-logo"
        />
        <br />
        <div>
          <Link
            to="/settings"
          >
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
          <br />
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email do Gravatar"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.checkInputsValidity }
            required
          />
          <br />
          <input
            name="username"
            id="username"
            type="username"
            data-testid="input-player-name"
            placeholder="Nome do Jogador"
            value={ username }
            onChange={ this.checkInputsValidity }
            required
          />
          <br />
          <Link
            to="/gamepage"
          >
            <button
              id="button"
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ () => this.handleClick() }
            >
              JOGAR!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, username) => dispatch(loginAction(email, username)),
  questions: () => dispatch(questionsThunk()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  questions: PropTypes.func.isRequired,
};
