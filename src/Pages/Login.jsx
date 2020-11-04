import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkButton = this.checkButton.bind(this);
    this.state = {
      buttonDisable: true,
      name: '',
      email: '',
    }
  }

  checkButton() {
    const inputName = document.getElementById('name-input').value;
    const inputEmail = document.getElementById('email-input').value;
    const regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (inputName !== null && regex.test(inputEmail)) {
      this.setState({
        buttonDisable: false,
        email: inputEmail,
        name: inputName,
      });
    }
  }

  render() {
    const { buttonDisable, email } = this.state;
    const { getEmail } = this.props;
    return (
      <div>
        <label htmlFor="name-input">
          Nome:
          <input id="name-input" type="text" data-testid="input-player-name" onChange={ this.checkButton } />
        </label>
        <label htmlFor="email-input">
          Email:
          <input id="email-input" type="text" data-testid="input-gravatar-email" onChange={ this.checkButton } />
        </label>
        <button type="submit" data-testid="btn-play" disabled={ buttonDisable } onClick={(email) => getEmail(email) }>Jogar</button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(login(email))
})

export default connect(null, mapDispatchToProps)(Login);
