import React from 'react';
import logo from '../trivia.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.verifyFields = this.verifyFields.bind(this);
    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  verifyFields() {
    const { email, name } = this.state;
    let answer = true;
    if (email !== '' && name !== '') {
      answer = false;
    }
    return answer;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="container">
        <img src={ logo } className="App-logo" alt="logo" />
        Email do Gravatar:
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        Nome do Jogador:
        <input
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <button
          type="button"
          className="btn btn-success"
          disabled={ this.verifyFields() }
          data-testid="btn-play"
        >
          JOGAR!
        </button>
      </div>
    );
  }
}

export default Login;
