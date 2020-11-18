import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CryptoJs from 'crypto-js';
import { Link } from 'react-router-dom';
import './Login.css';
import { GoSettings } from 'react-icons/go';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import ReactAudioPlayer from 'react-audio-player';
import LoginSound from '../audio/007-login.mp3';
import { userHash, userInfo, fetchToken } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isPlaying: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.play = this.play.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    const { name, email } = this.state;
    const { myUser, hashGravatar, requestToken } = this.props;
    const hash = CryptoJs.MD5(email).toString();
    myUser(name, email);
    hashGravatar(hash);
    requestToken();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  play() {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });
  }

  render() {
    const { name, email, isPlaying } = this.state;
    const isEnable = !((name && email));
    let disabled = '';
    if (isEnable) disabled = 'disabled';
    return (
      <div className="form-wrap">
        <form className="login-form">
          <div className="wrap-600">
            <h1>Trivia Game</h1>
            <label htmlFor="email">
              Email do Gravatar:
              <input
                id="email"
                type="email"
                name="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name">
              Nome do Jogador:
              <input
                id="name"
                type="text"
                name="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <div>
              <button
                type="button"
                data-testid="btn-play"
                disabled={ isEnable }
                onClick={ this.onClick }
                className="bt_login"
              >
                <Link to="/game" className={ `bt-jogar ${disabled}` }>
                  <AiFillPlayCircle size="50" />
                </Link>
              </button>
              <Link to="/settings">
                <button
                  type="button"
                  data-testid="btn-settings"
                  className="bt_login"
                >
                  <GoSettings size="50" />
                </button>
              </Link>
              <button type="button" className="bt_login" onClick={ this.play }>
                {(isPlaying) ? <MdVolumeUp size="50" /> : <MdVolumeOff size="50" />}
                {(isPlaying)
                  ? <ReactAudioPlayer autoPlay loop src={ LoginSound } volume={ 0.5 } />
                  : null}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myUser: (name, email) => dispatch(userInfo(name, email)),
  hashGravatar: (hash) => dispatch(userHash(hash)),
  requestToken: () => dispatch(fetchToken()),
});

Login.propTypes = {
  myUser: PropTypes.func.isRequired,
  hashGravatar: PropTypes.func.isRequired,
  requestToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
