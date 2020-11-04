import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.inputValidate();
  }

  inputValidate() {
    const { email, password } = this.state;
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
    const validPassword = (/.{5,}/).test(password);
    if (validEmail && validPassword === true) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  render() {
    const { disabled, email } = this.state;
    const { emailSaving } = this.props;
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <button
        //  onClick={ () => emailSaving(email) }
          disabled={ disabled }
          onClick={ () => emailSaving(email) }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   emailSaving: (email) => dispatch(login(email)),
// });
// export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailSaving: PropTypes.func.isRequired,
};

export default Login;
