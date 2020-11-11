import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { actionLogin, fetchToken, resetScoreAction } from '../actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: false,
    };
  }

  componentDidUpdate(_previouState, newState) {
    const { name, email } = this.state;
    if (newState.name !== name || newState.email !== email) {
      this.handleChange();
    }
  }

  handleClick() {
    const { history, actionToken, resetScore } = this.props;
    actionToken();
    resetScore();
    return history.push('/game');
  }

  handleChange() {
    const { name, email } = this.state;
    const { login } = this.props;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    login(this.state);
    this.setState({ disabled: reg.test(email) && name.length > 1 });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <section>
            <Input
              id="name"
              testId="input-player-name"
              name="name"
              className="input-player-name"
              type="text"
              place="Digite seu Nome"
              onChange={ (e) => this.setState({ name: e.target.value }) }
            />
            <Input
              id="email"
              testId="input-gravatar-email"
              name="email"
              className="input-gravatar-email"
              type="email"
              place="Digite seu Email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
            <button
              onClick={ () => this.handleClick() }
              disabled={ !disabled }
              className="btn-play"
              type="button"
              data-testid="btn-play"
            >
            Jogar
            </button>
            <Link to="/settings">
              <button
                className="btn-settings"
                type="button"
                data-testid="btn-settings"
              >
            Configurações
              </button>
            </Link>
          </section>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.token.response,
});

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(actionLogin(state)),
  actionToken: () => dispatch(fetchToken()),
  resetScore: () => dispatch(resetScoreAction()),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  actionToken: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
