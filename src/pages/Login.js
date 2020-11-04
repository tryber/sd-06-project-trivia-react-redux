import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

// import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      email: '',
      playerName: '',
      disabled: true,
    };
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        // console.log(this.state);
        const { email, playerName } = this.state;
        // Found function of test to validate email on:
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        // const validateEmail = (/\S+@\S+\.\S+/).test(email);
        if (email.length > 0 && playerName.length > 0) {
          this.setState({ disabled: false });
        } else {
          this.setState({ disabled: true });
        }
      },
    );
  }

  render() {
    const { email, playerName, disabled } = this.state;
    // Destruturate my login action as a props
    const { saveUserEmail } = this.props;

    return (
      // <header className="App-header">
      //   <img src={ logo } className="App-logo" alt="logo" />
      //   <p>
      //   SUA VEZ
      //   </p>
      // </header>
      <div>
        <label htmlFor="playerName">
        Escreve o nome da pessoa jogadora
          <input
            data-testid="input-player-name"
            type="text"
            placeholder="Enter your name"
            name="playerName"
            value={ playerName }
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="email">
          Email do Gravatar:
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="text"
            placeholder="Enter Email"
            name="email"
            value={ email }
            onChange={ this.handleOnChange }
          />
        </label>
        <br />
        <br />
        <Link to="/questions">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            // Clicking at button disparates dispatch function to save state email at /actions/index
            onClick={ () => saveUserEmail(email) }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

// Function that make dispatch to my /actions/index
const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (inputedEmail) => dispatch(login(inputedEmail)),
});

Login.propTypes = {
  saveUserEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
