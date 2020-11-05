import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchQuestions, loginActionCreator } from '../../redux/actions';

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
    const { logIn, history, loadQuestions } = this.props;

    logIn({ name, email });

    loadQuestions(token);

    history.push('/trivia');
  }

  render() {
    const { name, email } = this.state;

    return (
      <div className="login-in">
        <form onSubmit={ this.handleLogin }>
          <div className="input-container">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              name="name"
              type="text"
              data-testid="input-player-name"
              value={ name }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="text"
              data-testid="input-player-email"
              value={ email }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </div>
          <button
            type="submit"
            disabled={ !name || !email }
          >
            Jogar
          </button>
        </form>
        <Link to="/settings">Configurações</Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: ({ name, email }) => dispatch(loginActionCreator({ name, email })),
    loadQuestions: (token) => dispatch(fetchQuestions(token)),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
