import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

import logo from '../trivia.png';

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
    this.setState({
      [name]: value,
    }, () => {
      // console.log(this.state);
      const { email, playerName } = this.state;
      // Found function of test to validate email on:
      // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const validateEmail = (/\S+@\S+\.\S+/).test(email);
      const validatePlayer = 3;
      if (validateEmail && validatePlayer <= playerName.length) {
        this.setState(
          { disabled: false },
        );
      } else {
        this.setState(
          { disabled: true },
        );
      }
    });
  }

  render() {
    const { email, playerName, disabled } = this.state;
    // Destruturate my login action as a props
    const { saveUserEmail } = this.props;

    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
        SUA VEZ
        </p>
      </header>
      // <div>
      //   <label for="email">Email do Gravatar:</label>
      //   <input
      //     id="email"
      //     data-testid="email-input"
      //     type="text"
      //     placeholder="Enter Email"
      //     name="email"
      //     value={ email }
      //     onChange={ this.handleOnChange }
      //   />
      //   <br />
      //   <label for="playerName">Nome do Jogador:</label>
      //   <input
      //     data-testid="playerName-input"
      //     type="text"
      //     placeholder="Enter your name"
      //     name="playerName"
      //     value={ playerName }
      //     onChange={ this.handleOnChange }
      //   />
      //   <br />
      //   <Link
      //     to="/questions"
      //   >
      //     <button
      //       type="button"
      //       disabled={ disabled }
      //       // Clicking at button disparates dispatch function to save state email at /actions/index
      //       onClick={ () => saveUserEmail(email) }
      //     >
      //       Entrar
      //     </button>
      //   </Link>
      // </div>
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
