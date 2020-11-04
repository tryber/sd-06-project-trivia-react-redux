import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">
              <input
                data-testid="input-gravatar-email"
                id="email"
                type="text"
                required
                name="email"
                value={ email }
                onChange={ this.changeHandler }
              />
            </label>
            <label htmlFor="name">
              <input
                data-testid="input-player-name"
                id="name"
                type="text"
                required
                name="name"
                value={ name }
                onChange={ this.changeHandler }
              />
            </label>
            <button
              type="submit"
              data-testid="btn-play"
              onClick={ this.handleSubmit }
              disabled={ !email || !name }
            >
              JOGAR!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, null)(Login);
