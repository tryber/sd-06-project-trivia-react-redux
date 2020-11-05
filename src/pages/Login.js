import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import apiToken from '../services/request';
import { tokenLogin } from '../redux/actions';

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
    const { history, saveToken } = this.props;
    history.push('/game');
    const objToken = await apiToken();
    saveToken(objToken.token);
    // Após clicar no botão "Jogar", a pessoa deve ser redirecionada para a tela do jogo
    // Ao clicar no botão "Jogar", um requisição para a API do Trivia deve ser feita para obter o token de jogador
    // O token deve ser armazenado na aplicação e enviado em todas as requisições seguintes.
    // Salve no LocalStorage o token recebido utilizando a chave token
  }

  render() {
    const { isDisable, name, email } = this.state;
    // console.log('login', apiGravatar('anacris.higo@gmail.com'))
    // console.log('token', apiToken())
    return (
      <div>
        <Link to="/configuration">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
        <label htmlFor="name">
          <input
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
          type="button"
          data-testid="btn-play"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(tokenLogin(token)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
