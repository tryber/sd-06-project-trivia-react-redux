import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const { disabled, onClick, title, className, testid } = this.props;

    return (
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        className={ className }
        data-testid={ testid }
      >
        { title }
      </button>
    );
  }
}

GenericButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  testid: PropTypes.string,
};

GenericButton.defaultProps = {
  disabled: false,
  className: '',
  testid: '',
};

export default GenericButton;
