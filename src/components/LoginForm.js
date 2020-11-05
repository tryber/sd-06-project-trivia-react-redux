import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenAPI } from '../redux/actions';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.emailIsValid = this.emailIsValid.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  handleNameChange({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  handleEmailChange({ target }) {
    const { value } = target;
    const email = this.emailIsValid(value);
    if (email) {
      this.setState({
        email: value,
      });
    } else {
      this.setState({
        email: '',
      });
    }
  }

  render() {
    const { name, email } = this.state;
    const { fetchToken } = this.props;
    return (
      <form>
        <label htmlFor="name-input">
          <input
            data-testid="input-player-name"
            id="name-input"
            placeholder="Seu nome"
            onChange={ this.handleNameChange }
          />
        </label>
        <label htmlFor="email-input">
          <input
            data-testid="input-gravatar-email"
            id="email-input"
            placeholder="Seu email"
            onChange={ this.handleEmailChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !name || !email }
          onClick={ () => fetchToken() }
        >
            Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAPI()),
});

export default connect(null, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};
