import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaCog } from 'react-icons/fa';
import CustomInput from '../components/CustomInput';
import loginRequirements from '../services/loginRequirements';
import { tokenFetcher } from '../actions/actionsFetchToken';
import './Login.css';
import trivia from '../trivia.png';

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
      <div className="float-right">
        <Link to="settings">
          <button type="button" data-testid="btn-settings" className="btn-set">
            <FaCog size="25" />
          </button>
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

    localStorage.setItem('state', JSON.stringify(stateInicial));
  }

  disableCheck() {
    const { Nome, Email } = this.state;
    if (Nome !== '' && Email !== '') {
      this.setState(() => ({ Disabled: false }));
    } else {
      this.setState(() => ({ Disabled: true }));
    }
  }

  stateUpdater({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), () => this.disableCheck());
  }

  render() {
    const { Disabled, Nome, Email } = this.state;
    return (
      <div className="full-container">
        <div className="login-form">
          <img src={ trivia } alt="trivia" className="text-center trivia-logo" />
          {/* <h1 className="text-center">Trivia</h1> */}
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
          <Link className="link-play" to="/gamepage">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ Disabled }
              onClick={ this.setLocalStorage }
              id="play-button"
              className="btn btn-info btn-block"
            >
              Jogar!!
            </button>
          </Link>
          {this.settingsButton() }
        </div>
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
