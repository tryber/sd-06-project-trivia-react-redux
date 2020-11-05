import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { enterUser } from '../actions/index';
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
    const { sendFields } = this.props;
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
        <Link
          style={ { textDecoration: 'none' } }
          to="/game"
          onClick={ () => {
            sendFields(name, email);
          } }
        >
          <button
            type="button"
            className="btn btn-success btn-block"
            disabled={ this.verifyFields() }
            data-testid="btn-play"
          >
            JOGAR!
          </button>
        </Link>
        <Link
          style={ { textDecoration: 'none' } }
          to="/settings"
        >
          <button
            type="button"
            className="btn btn-info btn-block"
            data-testid="btn-settings"
          >
            CONFIGURAÇÕES
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendFields: (name, email) => dispatch(enterUser(name, email)),
});

Login.propTypes = {
  sendFields: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
