import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { saveToken, saveName, saveEmail, saveScore } from '../actions';
import './style_sheets/Login.scss';
import triviaLogo from '../visual_identity/logo/trivia_logo_noBg.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      isDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const { dispatchResetScore } = this.props;
    dispatchResetScore(0);
  }

  componentWillUnmount() {
    const currentRanking = localStorage.getItem('ranking');
    if (currentRanking === null) {
      const emptyRanking = JSON.stringify([]);
      localStorage.setItem('ranking', emptyRanking);
    }
  }

  checkValidity() {
    const { userName, email } = this.state;

    if (userName.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    } else if (userName.length === 0 || email.length === 0) {
      this.setState({ isDisabled: true });
    }
  }

  async handleInputChange({ target }) {
    const { name, value } = target;

    await this.setState({
      [name]: value,
    });

    this.checkValidity();
  }

  async handleButtonClick() {
    const API_RESPONSE = await fetchToken();
    const TOKEN = API_RESPONSE.token;

    await localStorage.setItem('token', TOKEN);

    const { dispatchSaveToken, dispatchSaveName, dispatchSaveEmail } = this.props;
    const { userName, email } = this.state;

    await dispatchSaveToken(TOKEN);
    await dispatchSaveName(userName);
    await dispatchSaveEmail(email);
  }

  render() {
    const { userName, email, isDisabled } = this.state;

    return (
      <main className="login-page">
        <header>
          <img src={ triviaLogo } width="140px" alt="trivia-logo" />
          <h1>Trivia Game:</h1>
        </header>

        <div className="inputs-container">
          <input
            id="email"
            name="email"
            value={ email }
            placeholder="Your Gravatar email"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
          />
          <input
            id="userName"
            name="userName"
            value={ userName }
            placeholder="Your player name"
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
          />
        </div>

        <div className="buttons-container">
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleButtonClick }
            >
            Jogar
            </button>
          </Link>

          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
            Configurações
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchSaveToken: propTypes.func.isRequired,
  dispatchSaveName: propTypes.func.isRequired,
  dispatchSaveEmail: propTypes.func.isRequired,
  dispatchResetScore: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveToken: (token) => dispatch(saveToken(token)),
  dispatchSaveName: (name) => dispatch(saveName(name)),
  dispatchSaveEmail: (gravatarEmail) => dispatch(saveEmail(gravatarEmail)),
  dispatchResetScore: (reset) => dispatch(saveScore(reset)),
});

export default connect(null, mapDispatchToProps)(Login);
