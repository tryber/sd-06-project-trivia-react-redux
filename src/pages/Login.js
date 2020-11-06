import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CryptoJs from 'crypto-js';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions } from '../services/api';
import { savePlayerInfo } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.savePlayerInfo = this.savePlayerInfo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, email } = this.state;
      if (name && email) {
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
    this.savePlayerInfo(questionsInfo);
  }

  savePlayerInfo(questionsInfo) {
    const { name, email } = this.state;
    const { savePlayerInfoToStore } = this.props;
    const hash = CryptoJs.MD5(email).toString().trim().toLowerCase();
    savePlayerInfoToStore(name, email, hash, questionsInfo);
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
          <label htmlFor="email">
          Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="text"
              onChange={ this.handleChange }
              name="email"
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
  savePlayerInfoToStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savePlayerInfoToStore: (name, email, hash, questionsInfo) => {
    dispatch(savePlayerInfo(name, email, hash, questionsInfo));
  },
});

export default connect(null, mapDispatchToProps)(Login);
