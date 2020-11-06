import React from 'react';
import { connect } from 'react-redux';
import { user, questionsAction } from '../actions';
import getToken from '../service/API';
import '../styles/Login.css';
import music from '../styles/audio/music.mp3';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.checkButton = this.checkButton.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.onClick = this.onClick.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.state = {
      buttonDisable: true,
      name: '',
      email: '',
    };
  }

  async onClick(event) {
    event.preventDefault();
    const { email, name } = this.state;
    const { setUser, history } = this.props;
    setUser(email, name);
    await this.fetchToken();
    history.push('/game');
  }

  async fetchToken() {
    const responseAPI = await getToken();
    localStorage.setItem('token', JSON.stringify(responseAPI));
    await this.fetchQuestions();
  }

  async fetchQuestions() {
    const localToken = JSON.parse(localStorage.getItem('token')).token;
    const questionsAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
    const questions = await questionsAPI.json();
    const { history, setQuestions } = this.props;
    if (questions.response_code === 3) {
      localStorage.removeItem('token');
      window.alert('Erro');
      history.push('/');
    } else {
        setQuestions(questions.results);
    }
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
      <div className="login-box">
        <audio src={ music } autoPlay loop></audio>
        <h1>Login</h1>
        <div className="textbox">
          <i class="fas fa-user"></i>
          <input
            id="name-input"
            type="text"
            data-testid="input-player-name"
            onChange={ this.checkButton }
            placeholder="Name"
          />
        </div>
        <div className="textbox">
          <i class="fas fa-user"></i>
          <input
            id="email-input"
            type="text"
            data-testid="input-gravatar-email"
            onChange={ this.checkButton }
            placeholder="Email"
          />
        </div>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ buttonDisable }
          onClick={ this.onClick }
          className="btn"
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
          className="btn"
        >
          Configurações
        </button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (email, name) => dispatch(user(email, name)),
  setQuestions: (questionsArray) => dispatch(questionsAction(questionsArray)),
});

export default connect(null, mapDispatchToProps)(Login);
