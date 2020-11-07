import React from 'react';
import PropTypes from 'prop-types';
// import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { LoginForm } from '../components';
import { addName } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.state = {
      validEmail: false,
      validName: false,
      showSettings: false,
    };
  }

  validateEmail({ target }) {
    const email = target.value;
    // const hash = md5(email);
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (isValid) {
      this.setState({
        validEmail: true,
        // hash: hash.words,
      });
    } else {
      this.setState({
        validEmail: false,
        // hash: '',
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
      if (!localStorage.player) {
        localStorage.setItem('state', JSON.stringify({
          player: {
            name,
            score: 0,
          },
        }));
      } else {
        localStorage.setItem('state', JSON.stringify({
          player: {
            name,
            score: 0,
          },
        }));
      }
    } else {
      this.setState({
        validName: false,
      });
      localStorage.setItem('state', JSON.stringify({
        player: {
          name: '',
          score: 0,
        },
      }));
    }
    userName(name);
  }

  handleSettings() {
    this.setState((prevState) => ({
      showSettings: !prevState.showSettings,
    }));
  }

  render() {
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
});

export default connect(null, mapDispatchToProps)(Login);
