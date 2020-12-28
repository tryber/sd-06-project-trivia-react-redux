import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaEnvelope, FaUser, FaCheckCircle, FaTimesCircle, FaCog } from 'react-icons/fa';
import { playerLoginAction, fetchTokenAction,
  updateAuthenticationAction } from '../actions';
import './Login.css';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      isDisabled: true,
      emailValidation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggeButton = this.toggeButton.bind(this);
    this.clickButton = this.clickButton.bind(this);
    this.logout = this.logout.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  componentDidMount() {
    this.handleState();
  }

  handleState() {
    if (localStorage.getItem('authentified')) this.setState({ isDisabled: false });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.toggeButton();
    });
  }

  toggeButton() {
    const { gravatarEmail, name } = this.state;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const emailValidation = reg.test(gravatarEmail);
    const isDisabled = (!emailValidation || name === '');
    this.setState((prevState) => {
      const obj = prevState.gravatarEmail !== ''
        ? ({ emailValidation, isDisabled })
        : ({ emailValidation: '', isDisabled });
      return obj;
    });
  }

  clickButton() {
    const { login, createToken, updateAuthentication } = this.props;
    const { name, gravatarEmail } = this.state;
    login({ name, gravatarEmail });
    localStorage.setItem('authentified', true);
    updateAuthentication(true);
    createToken();
  }

  logout() {
    const { history, updateAuthentication } = this.props;
    updateAuthentication(false);
    localStorage.setItem('authentified', false);
    localStorage.clear('state');
    history.push('/');
  }

  render() {
    const { name, gravatarEmail, emailValidation, isDisabled } = this.state;
    const { authenticationStatus, player: { name: loggedPlayerName } } = this.props;
    let validationClass = '';
    if (emailValidation !== '') {
      validationClass = emailValidation ? 'valid' : 'invalid';
    }

    return (
      <div className="main-container">
        <div className="image-container">
          <img src={ logo } alt="logo" />
        </div>
        <form className="form-container">
          <fieldset className="header-area">
            <Link to="/settings">
              <FaCog
                className="settings-button"
                type="button"
                data-testid="btn-settings"
              />
            </Link>
          </fieldset>
          <fieldset className="inputs-container">
            <label
              htmlFor="name-input"
              className="input-label-container"
              hidden={ authenticationStatus }
            >
              Name
              <div className="input-box">
                <FaUser className="icone" />
                <input
                  type="text"
                  id="name-input"
                  onChange={ this.handleChange }
                  value={ name }
                  name="name"
                  placeholder="Enter your name"
                  data-testid="input-player-name"
                />
              </div>
            </label>
            <label
              htmlFor="email-input"
              className="input-label-container"
              hidden={ authenticationStatus }
            >
              Email
              <div className={ `input-box ${validationClass}` }>
                <FaEnvelope className={ `icone ${validationClass}` } />
                <input
                  id="email-input"
                  type="email"
                  onChange={ this.handleChange }
                  value={ gravatarEmail }
                  name="gravatarEmail"
                  placeholder="Enter your email"
                  data-testid="input-gravatar-email"
                />
                { emailValidation && <FaCheckCircle className="icone valid" /> }
                { emailValidation === false
                && <FaTimesCircle className="icone invalid" /> }
              </div>
              <p className={ `text-helper ${validationClass}` }>
              Email should be like user@gmail.com
              </p>
            </label>
            { authenticationStatus
              && <p>{ `Already logged as ${loggedPlayerName}` }</p> }
          </fieldset>
          <fieldset className="buttons-area">
            <Link to="/game">
              <button
                className={ (isDisabled) ? 'play-button-disabled' : 'play-button' }
                type="submit"
                disabled={ isDisabled }
                data-testid="btn-play"
                onClick={ this.clickButton }
              >
                Play Now
              </button>
            </Link>
            { authenticationStatus
              && (
                <Link to="/">
                  <button
                    className="change-account-button"
                    type="button"
                    onClick={ this.logout }
                  >
                    Change account
                  </button>
                </Link>) }
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateAuthentication: (e) => dispatch(updateAuthenticationAction(e)),
  login: (e) => dispatch(playerLoginAction(e)),
  createToken: () => dispatch(fetchTokenAction()),
});

const mapStateToProps = (state) => ({
  authenticationStatus: state.authenticationStatus,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  createToken: PropTypes.func.isRequired,
  updateAuthentication: PropTypes.func.isRequired,
  authenticationStatus: PropTypes.bool.isRequired,
  player: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};
