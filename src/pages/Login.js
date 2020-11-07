import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { LoginForm } from '../components';
import { addName, addHash } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleHash = this.handleHash.bind(this);
    this.state = {
      validEmail: false,
      validName: false,
      showSettings: false,
      hash:'',
    };
  }

  validateEmail({ target }) {
    const email = target.value;
    const hash = md5(email);
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (isValid) {
      this.setState({
        validEmail: true,
        hash: hash.words,
      });
      this.handleHash();
    } else {
      this.setState({
        validEmail: false,
        hash: '',
      });
    }
    
  }

  validateName({ target }) {
    const name = target.value;
    const { userName } = this.props;
    const minLength = 2;
    if (name.length >= minLength) {
      this.setState({
        validName: true,
      });
    } else {
      this.setState({
        validName: false,
      });
    }
    userName(name);
  }

  handleSettings() {
    this.setState((prevState) => ({
      showSettings: !prevState.showSettings,
    }));
  }

  handleHash() {
    const { getHash } = this.props;
    const { hash } = this.state;
    if (hash) {
      getHash(...hash)
    }
  }

  render() {
    this.handleHash()
    const { validEmail, validName, showSettings } = this.state;
    return (
      <LoginForm
        handleSettings={ this.handleSettings }
        validateName={ this.validateName }
        validateEmail={ this.validateEmail }
        validName={ validName }
        validEmail={ validEmail }
        showSettings={ showSettings }
        emailToHash={ this.emailToHash }
      />
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userName: (name) => dispatch(addName(name)),
  getHash: (hash) => dispatch(addHash(hash))
});

export default connect(null, mapDispatchToProps)(Login);
