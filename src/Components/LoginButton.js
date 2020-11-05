import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginButton extends Component {
  render() {
    const { disabled, onClick, title } = this.props;

    return (
      <button
        data-testid="btn-play"
        type="button"
        disabled={ disabled }
        onClick={ onClick }
      >
        { title }
      </button>
    );
  }
}

export default LoginButton;

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
