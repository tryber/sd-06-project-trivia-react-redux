import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.validFields = this.validFields.bind(this);

    this.state = {
      name: '',
      email: '',
      validFieldsOk: false,
    };
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

  render() {
    const { name, email, validFieldsOk } = this.state;
    return (
      <div>
        <h1>Project Trivia</h1>
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
            placeholder="Enter your name"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(validFieldsOk) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
