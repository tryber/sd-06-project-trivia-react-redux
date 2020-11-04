import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
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
    const { email, user } = this.state;
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
    const userValid = (/.{0,}/).test(user);
    if (validEmail && userValid === true) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  render() {
    const { disabled, email } = this.state;
    const { emailSaving } = this.props;
    return (
      <div>
        <label htmlFor="user">
          User:
          <input
            name="user"
            type="text"
            data-testid="input-player-name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <label htmlFor="email">
          E-mail:
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <br />
        <button
          disabled={ disabled }
          onClick={ () => emailSaving(email) }
          type="button"
          data-test="btn-play"
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
