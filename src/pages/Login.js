import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { actionLogin, fetchToken } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: false,
    };
  }

  componentDidUpdate(_previouState, newState) {
    const { name, email } = this.state;

    if (newState.name !== name || newState.email !== email) {
      const { token, login } = this.props;
      token();
      login(this.state);
      this.handleChange();
    }
  }

  handleChange() {
    const { name, email } = this.state;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    this.setState({ disabled: reg.test(email) && name.length > 1 });
  }

  render() {
    const { disabled } = this.state;
    return (
      <section>
        <Input
          id="name"
          testId="input-player-name"
          name="name"
          className="input-player-name"
          type="text"
          place="Digite seu Nome"
          onChange={ (e) => this.setState({ name: e.target.value }) }
        />
        <Input
          id="email"
          testId="input-gravatar-email"
          name="email"
          className="input-gravatar-email"
          type="email"
          place="Digite seu Email"
          onChange={ (e) => this.setState({ email: e.target.value }) }
        />
        <Link to="/game">
          <button
            disabled={ !disabled }
            className="btn-play"
            type="button"
            data-testid="btn-play"
            // onClick={ history.push('/game') }
          >
            Jogar
          </button>
        </Link>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
//   info: state,
// });

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(actionLogin(state)),
  token: () => dispatch(fetchToken()),
});

Login.propTypes = {
  // info: PropTypes.objectOf().isRequired,
  login: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
}
export default connect(null, mapDispatchToProps)(Login);
