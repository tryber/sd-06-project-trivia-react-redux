import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericButton extends Component {
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

GenericButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

GenericButton.defaultProps = {
  disabled: false,
};

export default GenericButton;
