import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken } from '../Action/actionToken';

class LoginButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { requestToken } = this.props;
    requestToken();
  }

  render() {
    const { isDisabled, email } = this.props;

    return (
      <Link to="/play">
        <button
          type="button"
          email={ email }
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(LoginButton);

LoginButton.propTypes = {
  requestToken: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};
