import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiMail } from 'react-icons/fi';

import { fetchQuestions, loginActionCreator } from '../../redux/actions';

import Button from '../../components/Button';
import Input from '../../components/Input';

import Logo from '../../assets/logo.png';

import './styles.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    const token = localStorage.getItem('token');

    this.state = {
      name: '',
      email: '',
      token,
    };
  }

  handleInputChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleLogin(submitEvent) {
    submitEvent.preventDefault();
    const { email, name, token } = this.state;
    const { logIn, history, loadQuestions, config } = this.props;

    logIn({ name, email });

    loadQuestions(token, config);

    history.push('/trivia');
  }

  render() {
    const { name, email } = this.state;

    return (
      <div className="login-page">
        <div className="login-in-content">
          <img src={ Logo } alt="trivia-logo" />

          <form onSubmit={ this.handleLogin }>
            <h1>Faça seu login</h1>
            <Input
              id="name"
              name="name"
              type="text"
              data-testid="input-player-name"
              autoComplete="off"
              placeholder="Nome"
              value={ name }
              onChange={ ({ target }) => this.handleInputChange(target) }
              icon={ FiUser }
            />
            <Input
              id="email"
              name="email"
              type="text"
              data-testid="input-gravatar-email"
              placeholder="Email"
              autoComplete="off"
              value={ email }
              onChange={ ({ target }) => this.handleInputChange(target) }
              icon={ FiMail }
            />
            <Button
              type="submit"
              disabled={ !name || !email }
              data-testid="btn-play"
            >
              Jogar
            </Button>
          </form>
          <Link to="/settings" data-testid="btn-settings">
            <FiSettings size={ 20 } />
            Configurações
          </Link>
        </div>
        <div className="login-bg" />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: ({ name, email }) => dispatch(loginActionCreator({ name, email })),
    loadQuestions: (token, config) => dispatch(fetchQuestions(token, config)),
  };
}

function mapStateToProps(state) {
  return {
    config: state.trivia.config,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  loadQuestions: PropTypes.func.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

  config: PropTypes.shape({
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    type: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};
