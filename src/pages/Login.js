import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { login, handleToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyNameAndEmail = this.verifyNameAndEmail.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
    const { sendUser, getToken, history } = this.props;
    getToken();
    const { name, email } = this.state;
    const hash = md5(email).toString();
    sendUser({ name, email, hash });
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.verifyNameAndEmail(),
    );
  }

  verifyNameAndEmail() {
    const { name, email } = this.state;
    this.setState({ isDisabled: !(name !== '' && email !== '') });
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        FORM
        <form onSubmit={ this.handleSignUp }>
          <input
            value={ name }
            name="name"
            placeholder="Your name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
          <input
            value={ email }
            name="email"
            placeholder="Your email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          <button disabled={ isDisabled } type="submit" data-testid="btn-play">
            Jogar
          </button>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUser: (dataUser) => dispatch(login(dataUser)),
  getToken: () => dispatch(handleToken()),
});

Login.propTypes = {
  sendName: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
