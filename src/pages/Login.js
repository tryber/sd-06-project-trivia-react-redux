import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomInput from '../components/CustomInput';
import loginRequirements from '../services/loginRequirements';
import { tokenFetcher } from '../actions/actionsFetchToken';

class FormLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      Nome: '',
      Email: '',
      Disabled: true,
    };
    this.stateUpdater = this.stateUpdater.bind(this);
    this.disableCheck = this.disableCheck.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
  }

  settingsButton() {
    return (
      <div>
        <Link to="settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </div>
    );
  }

  setLocalStorage() {
    const { Nome, Email } = this.state;
    const stateInicial = {
      player: {
        name: Nome,
        gravatarEmail: Email,
        assertions: 0,
        score: 0,
      },
    };

    document.getElementById('play-button').addEventListener(
      'click',
      localStorage.setItem('state', JSON.stringify(stateInicial)),
    );
  }

  disableCheck() {
    const { Nome, Email } = this.state;
    if (Nome !== '' && Email !== '') {
      this.setState(() => ({ Disabled: false }));
    } else {
      this.setState(() => ({ Disabled: true }));
    }
  }

  async stateUpdater({ target }) {
    const { name, value } = target;
    await this.setState(() => ({ [name]: value }));
    this.disableCheck();
  }

  render() {
    const { Disabled, Nome, Email } = this.state;
    return (
      <div>
        <h1>Faça login para jogar</h1>
        <form>
          {
            loginRequirements.map(({ name, type, dataTestId }) => (
              <CustomInput
                key={ name }
                name={ name }
                value={ name === 'Nome' ? Nome : Email }
                type={ type }
                dataTestId={ dataTestId }
                onChange={ this.stateUpdater }
              />
            ))
          }
        </form>
        <Link to="gamepage">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ Disabled }
            onClick={ this.setLocalStorage }
            id="play-button"
          >
            Jogar!!
          </button>
        </Link>
        {this.settingsButton() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(tokenFetcher()),
});

FormLogin.propTypes = {
  fetchToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(FormLogin);
