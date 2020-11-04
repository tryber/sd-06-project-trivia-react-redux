import React from 'react';
// import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  // verifyName(e) {
  //   const name = e.target.value;
  //   if (name.length > 0) {
  //     this.setState({
  //       invalidName: false,
  //     });
  //   }
  // }

  // verifyEmail(e) {
  //   const email = e.target.value;
  //   if (email.length > 0) {
  //     this.setState({
  //       invalidEmail: false,
  //     });
  //   }
  // }

  // verifyEmailAndName(e) {
  //   const { invalidEmail, invalidName } = this.state;
  //   if
  // }

  render() {
    const { name, email } = this.state;
    return (
      <div className="container">
        <form className="formLogin">
          <label htmlFor="input-gravatar-email">
            Email
            <input
              type="email"
              data-testid="input-gravatar-email"
              required
              placeholder="Digite aqui seu email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </label>
          <label htmlFor="input-player-name">
            Nome
            <input
              type="text"
              data-testid="input-player-name"
              required
              placeholder="Digite aqui seu nome"
              onChange={ (e) => this.setState({ name: e.target.value }) }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !(name && email) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
