import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const { disabled, onClick, title, className, testid, hidden } = this.props;

    return (
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        className={ `${className} ${hidden ? 'hidden' : ''}` }
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
  hidden: PropTypes.bool,
};

GenericButton.defaultProps = {
  disabled: false,
  className: '',
  testid: '',
  hidden: false,
};

export default GenericButton;
