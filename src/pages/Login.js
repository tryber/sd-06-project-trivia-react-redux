import React from 'react';
import { LoginForm } from '../components';


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
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (isValid) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
  }

  validateName({ target }) {
    const name = target.value.length;
    const minLength = 2;
    if (name >= minLength) {
      this.setState({
        validName: true,
      });
    } else {
      this.setState({
        validName: false,
      });
    }
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
      />  
    );
  }
}

export default Login;
