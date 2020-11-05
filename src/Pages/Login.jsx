import React from 'react';
import { connect } from 'react-redux';
import user from '../actions';
import getToken from '../service/API';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkButton = this.checkButton.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      buttonDisable: true,
      name: '',
      email: '',
    };
  }

  onClick(event) {
    event.preventDefault();
    const { email } = this.state;
    const { getUser, history } = this.props;
    getUser(email);
    this.fetchToken();
    history.push('/game');
  }

  async fetchToken() {
    const responseAPI = await getToken();
    localStorage.setItem('token', JSON.stringify(responseAPI));
  }

  checkButton() {
    const inputName = document.getElementById('name-input').value;
    const inputEmail = document.getElementById('email-input').value;
    const regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (inputName !== '' && regex.test(inputEmail)) {
      return this.setState({
        buttonDisable: false,
        email: inputEmail,
        name: inputName,
      });
    }

    return this.setState({
      buttonDisable: true,
    });
  }

  render() {
    const { history } = this.props;
    const { buttonDisable } = this.state;
    return (
      <div>
        <label htmlFor="name-input">
          Nome:
          <input
            id="name-input"
            type="text"
            data-testid="input-player-name"
            onChange={ this.checkButton }
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            id="email-input"
            type="text"
            data-testid="input-gravatar-email"
            onChange={ this.checkButton }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ buttonDisable }
          onClick={ this.onClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  getUser: (email) => dispatch(user(email))
})

export default connect(null, mapDispatchToProps)(Login);
