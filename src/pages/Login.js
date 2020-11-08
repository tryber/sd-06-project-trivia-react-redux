import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CryptoJs from 'crypto-js';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions } from '../services/api';
import { saveNameEmail, saveRequestInfo } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      name: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.storePlayerAndRequestInfo = this.storePlayerAndRequestInfo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, gravatarEmail } = this.state;
      if (name && gravatarEmail) {
        this.setState({ btnDisabled: false });
      } else {
        this.setState({ btnDisabled: true });
      }
    });
  }

  async handleClick() {
    const token = await fetchToken();
    localStorage.setItem('token', token);
    const getQuestions = await fetchQuestions(token);
    const questionsInfo = getQuestions.results;
    this.storePlayerAndRequestInfo(questionsInfo);
  }

  storePlayerAndRequestInfo(questionsInfo) {
    const { name, gravatarEmail } = this.state;
    const { storeNameEmail, storeRequestInfo } = this.props;
    const hash = CryptoJs.MD5(gravatarEmail).toString().trim().toLowerCase();
    storeNameEmail(name, gravatarEmail);
    storeRequestInfo(hash, questionsInfo);
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <Link to="/settings" data-testid="btn-settings">
          Configurações
        </Link>
        <form>
          <label htmlFor="name">
          Nome:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              onChange={ this.handleChange }
              name="name"
            />
          </label>
          <label htmlFor="gravatarEmail">
          Email:
            <input
              data-testid="input-gravatar-email"
              id="gravatarEmail"
              type="text"
              onChange={ this.handleChange }
              name="gravatarEmail"
            />
          </label>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
            >
            Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  storeNameEmail: PropTypes.func.isRequired,
  storeRequestInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  storeNameEmail: (name, gravatarEmail) => dispatch(saveNameEmail(name, gravatarEmail)),
  storeRequestInfo:
    (hash, questionsInfo) => dispatch(saveRequestInfo(hash, questionsInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
