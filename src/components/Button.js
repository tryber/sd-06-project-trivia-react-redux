import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { testId, name, className, onClick, id, value } = this.props;
    return (
      <button
        data-testid={ testId }
        type="button"
        name={ name }
        className={ className }
        onClick={ onClick }
        id={ id }
      >
        { value }
      </button>
    );
  }
}

Button.defaultProps = {
  id: 'button',
  value: '',
  className: 'btn',
  name: 'button',
  onClick: () => console.log(),
};

Button.propTypes = {
  testId: propTypes.string.isRequired,
  name: propTypes.string,
  className: propTypes.string,
  id: propTypes.string,
  value: propTypes.string,
  onClick: propTypes.func,
};
