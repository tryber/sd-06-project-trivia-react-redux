import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { fetchTokenTrivia } from '../services/fetchApi';
import propType from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchApiQuestions, fetchApiToken } from '../actions';
import ButtonConfig from './ButtonConfig';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
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
  handleClick() {
    // const { name, email } = this.state;
    const { getToken } = this.props;
    // getToken()
    //   .then(() => {
    //     getTriviaQuestions(token);
    //     localStorage.setItem('token', token);
    //     console.log(token);
    //   });
    getToken();
    // const responseTrivia = await getTriviaQuestions(token);
    // console.log(responseTrivia);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, redirect } = this.state;
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
            type="button"
            data-testid="btn-play"
            disabled={ !(name && email) }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        <ButtonConfig />
        { redirect ? <Redirect to="/screen" /> : null }
      </div>
    );
  }
}

const mapsDispatchToProps = (dispatch) => ({
  getToken: (e) => dispatch(fetchApiToken(e)),
  getTriviaQuestions: (token) => dispatch(fetchApiQuestions(token)),
});

Login.propTypes = {
  getToken: propType.func.isRequired,
};

export default connect(null, mapsDispatchToProps)(Login);
