import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { responseToken } from '../Action/actionToken';

class LoginButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { token } = this.props;

    localStorage.setItem('token', token);
  }

  handleClick() {
    const { requestToken } = this.props;
    requestToken();
  }

  render() {
    const { isDisabled } = this.props;

    return (
      <button
        data-testid="btn-play"
        type="button"
        disabled={ isDisabled }
        onClick={ this.handleClick }
      >
        Jogar
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(responseToken()),
});

const mapStateToProps = (state) => ({
  token: state.reducerLogin.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);

LoginButton.propTypes = {
  requestToken: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
