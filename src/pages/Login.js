import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayer, gettingTokenThunk } from '../redux/actions';
import BtnSettings from '../components/BtnSettings';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validFields = this.validFields.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);

    this.state = {
      name: '',
      email: '',
      validFieldsOk: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { tokenLocalStorage } = this.props;
    if (prevProps.tokenLocalStorage !== tokenLocalStorage) {
      this.setLocalStorage();
    }
  }

  setLocalStorage() {
    const { tokenLocalStorage } = this.props;
    localStorage.setItem('token', tokenLocalStorage);
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
    const { name, email, validFieldsOk } = this.state;
    return (
      <div>
        <h1>Project Trivia</h1>
        <BtnSettings />
        <form>
          <input
            type="text"
            value={ name }
            name="name"
            placeholder="Enter your name"
            data-testid="input-player-name"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <input
            type="text"
            value={ email }
            name="email"
            placeholder="Enter your email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(validFieldsOk) }
            onClick={ this.handleOnClick }
          >
            Jogar
          </button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
