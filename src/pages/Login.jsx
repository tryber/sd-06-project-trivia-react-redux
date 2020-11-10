import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUsers } from '../actions';
import { solicitacaoToken, solicitacaoQuestoes } from '../actions';
// import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.validadorDeCampos = this.validadorDeCampos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enviaDados = this.enviaDados.bind(this);
  }

  validadorDeCampos() {
    const { name, email } = this.state;
    this.setState({ isDisable: !(name.length > 0 && email.length > 0) });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.validadorDeCampos();
    });
  }

  enviaDados() {
    console.log('teste');
    const { dispatchDados, dispatchToken, dispatchPerguntas, history, token } = this.props;
    const { name, email } = this.state;
    dispatchDados(name, email);
    dispatchToken();
    dispatchPerguntas(token);
    history.push('/jogo');
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header> */}
        <form>
          <label htmlFor="input-player-name">
            <input
              type="text"
              placeholder="nome"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <input
              type="email"
              placeholder="email"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.enviaDados }
          >
            Jogar
          </button>
          <Link to="/configuracoes">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerAPI.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDados: (name, email) => dispatch(loginUsers(name, email)),
  dispatchToken: () => dispatch(solicitacaoToken()),
  dispatchPerguntas: (token) => dispatch(solicitacaoQuestoes(token)),
});

Login.propTypes = ({
  dispatchDados: propTypes.func.isRequired,
  dispatchToken: propTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
