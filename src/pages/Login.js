import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tokenRequest } from '../actions';
import fetchAPI from '../services/fetchAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { myTokenRequest, history } = this.props;
    const requestedToken = (await fetchAPI()).token;
    myTokenRequest(requestedToken);
    const { token } = this.props;
    localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <div>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              Configurações
            </button>
            <label htmlFor="email">
              <input
                data-testid="input-gravatar-email"
                id="email"
                type="text"
                required
                name="email"
                value={ email }
                onChange={ this.changeHandler }
              />
            </label>
            <label htmlFor="name">
              <input
                data-testid="input-player-name"
                id="name"
                type="text"
                required
                name="name"
                value={ name }
                onChange={ this.changeHandler }
              />
            </label>
            <button
              type="submit"
              data-testid="btn-play"
              onClick={ this.handleSubmit }
              disabled={ !email || !name }
            >
              JOGAR!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myTokenRequest: (e) => dispatch(tokenRequest(e)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

Login.propTypes = {
  myTokenRequest: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
