import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const { disabled, onClick, title, className } = this.props;

    return (
      <button
        data-testid="btn-play"
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        className={ className }
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
};

GenericButton.defaultProps = {
  disabled: false,
  className: '',
};

export default GenericButton;
