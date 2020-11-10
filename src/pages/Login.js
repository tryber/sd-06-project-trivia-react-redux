import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import Kahoot from '../sounds/kahoot.mp3';
import Gong from '../sounds/gong.mp3';
import { savePlayer, gettingTokenThunk } from '../redux/actions';
import BtnSettings from '../components/BtnSettings';
import './Login.css';

const kahootTheme = new Howl({
  src: [Kahoot],
  loop: true,
});

const gongSound = new Howl({
  src: [Gong],
});

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validFields = this.validFields.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.setColor = this.setColor.bind(this);

    const minColor = 70;
    const maxColor = 140;
    this.state = {
      name: '',
      email: '',
      validFieldsOk: false,
      cor1: Math.floor(Math.random() * (minColor) + maxColor),
      cor2: Math.floor(Math.random() * (minColor) + maxColor),
      cor3: Math.floor(Math.random() * (minColor) + maxColor),
      incCor1: true,
      incCor2: true,
      incCor3: true,
    };
  }

  componentDidMount() {
    kahootTheme.play();
    const milliseconds = 60;
    this.interval = setInterval(() => { this.setColor(); }, milliseconds);
  }

  componentDidUpdate(prevProps) {
    const { tokenLocalStorage, history } = this.props;
    if (prevProps.tokenLocalStorage !== tokenLocalStorage) {
      this.setLocalStorage();
      history.push('/questions');
    }
  }

  componentWillUnmount() {
    kahootTheme.stop();
    gongSound.play();
    clearInterval(this.interval);
  }

  setColor() {
    let { cor1, cor2, cor3, incCor1, incCor2, incCor3 } = this.state;

    const maxRange = 210;
    const minRange = 50;
    if (incCor1) {
      cor1 += 1;
      if (cor1 > maxRange) {
        incCor1 = false;
      }
    } else {
      cor1 -= 1;
      if (cor1 < minRange) {
        incCor1 = true;
      }
    }

    if (incCor2) {
      cor2 += 1;
      if (cor2 > maxRange) {
        incCor2 = false;
      }
    } else {
      cor2 -= 1;
      if (cor2 < minRange) {
        incCor2 = true;
      }
    }

    if (incCor3) {
      cor3 += 1;
      if (cor3 > maxRange) {
        incCor3 = false;
      }
    } else {
      cor3 -= 1;
      if (cor3 < minRange) {
        incCor3 = true;
      }
    }

    // console.log(cor1, cor2, cor3, incCor1, incCor2, incCor3);

    this.setState({
      cor1, cor2, cor3, incCor1, incCor2, incCor3,
    });
  }

  setLocalStorage() {
    const info = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    const { tokenLocalStorage } = this.props;
    const { name, email } = this.state;
    info.player.name = name;
    info.player.gravatarEmail = email;
    const newInfo = JSON.stringify(info);
    localStorage.setItem('token', tokenLocalStorage);
    localStorage.setItem('state', newInfo);
    const numberOfPlayers = JSON.parse(localStorage.getItem('players'));
    if (!numberOfPlayers) localStorage.setItem('players', JSON.stringify([]));
  }

  handleChange({ name, value }) {
    this.setState({ [name]: value }, () => this.validFields());
  }

  validFields() {
    const { name, email } = this.state;
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (re.test(email.toLowerCase()) && name !== '') {
      return this.setState({ validFieldsOk: true });
    }
    return this.setState({ validFieldsOk: false });
  }

  handleOnClick() {
    const { saveUser, getToken } = this.props;
    const { name, email } = this.state;
    saveUser(name, email);
    getToken();
  }

  render() {
    const { name, email, validFieldsOk, cor1, cor2, cor3 } = this.state;
    return (
      <div
        className="login-page"
        style={ { backgroundColor: `rgb(${cor1}, ${cor2}, ${cor3})` } }
      >
        <h1 className="title">Project Trivia!</h1>
        <form className="form-container">
          <input
            className="input-form-login"
            type="text"
            value={ name }
            name="name"
            placeholder="Enter your name"
            data-testid="input-player-name"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <input
            className="input-form-login"
            type="text"
            value={ email }
            name="email"
            placeholder="Enter your email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <button
            className="button-form-login"
            type="button"
            data-testid="btn-play"
            disabled={ !(validFieldsOk) }
            onClick={ this.handleOnClick }
          >
            Jogar
          </button>
          <BtnSettings />
          <h6 className="footer">Create by Group 15 - Trybe Class 06</h6>
          <h6 className="footer">Terms | Privacy</h6>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (name, email) => dispatch(savePlayer(name, email)),
  getToken: () => dispatch(gettingTokenThunk()),
});

const mapStateToProps = (state) => ({
  tokenLocalStorage: state.userReducer.token.token,
});

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  tokenLocalStorage: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
