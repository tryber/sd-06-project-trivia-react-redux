import React from 'react';
import { userLogin } from '../actions';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange() {
    const inputEmail = document.getElementById('input-gravatar-name').value;
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const inputName = document.getElementById('input-player-name').value;
    const one = 1;
    if (regex.test(inputEmail) === true && inputName >= one) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
    this.setState({ email: inputEmail, name: inputName });
  }


  render() {
    const { disabled } = this.state;
    return (
      <section>
        <h1>Login - Play Trivia</h1> 
        <form>
          <label htmlFor="input-player-name"> Name
            <input
              id ="input-player-name"
              type="text"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-name"> E-Mail
            <input
              id="input-gravatar-name"
              type="text"
              name="email"
              data-testid="input-gravatar-name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
      </section>
    );
  };
}

// mapStateToProps, mapDispatchToProps

export default connect(
  null,
  null)(Login);
