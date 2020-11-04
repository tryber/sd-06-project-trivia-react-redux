import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Input from '../components/Input';

export default class Login extends Component {
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
        <button
          disabled={ !disabled }
          className="btn-play"
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </section>
    );
  }
}
