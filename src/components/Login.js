import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { fetchTokenTrivia } from '../services/fetchApi';
import propType from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchApiQuestions, fetchApiToken } from '../actions';
import ButtonConfig from './ButtonConfig';
import ScreenGame from './ScreenGame';

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

    if (redirect === true) {
      return <ScreenGame />;
    }

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
  getToken: () => dispatch(fetchApiToken()),
  getTriviaQuestions: (token) => dispatch(fetchApiQuestions(token)),
});

Login.propTypes = {
  getToken: propType.func.isRequired,
};

export default connect(null, mapsDispatchToProps)(Login);
