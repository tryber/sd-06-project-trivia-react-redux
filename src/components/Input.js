import React, { Component } from 'react';
import propTypes from 'prop-types';

class Input extends Component {
  render() {
    const { testId, name, className, type, max, min, onChange, place, id } = this.props;
    return (
      <input
        data-testid={ testId }
        type={ type }
        name={ name }
        className={ className }
        maxLength={ max }
        minLength={ min }
        onChange={ onChange }
        placeholder={ place }
        id={ id }
        required
      />
    );
  }
}

Input.defaultProps = {
  max: '40',
  min: '6',
  place: 'Digite aqui',
  id: 'input',
};

Input.propTypes = {
  testId: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  max: propTypes.string,
  min: propTypes.string,
  place: propTypes.string,
  id: propTypes.string,
  onChange: propTypes.func.isRequired,
};

export default Input;
