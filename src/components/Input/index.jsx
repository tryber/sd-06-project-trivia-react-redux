import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Input extends React.Component {
  render() {
    const { value, icon: Icon, ...rest } = this.props;

    return (
      <div
        className={ `input-container ${value ? 'has-text' : ''}` }
      >
        { Icon && <Icon size={ 20 } /> }

        <input
          value={ value }
          { ...rest }
        />
      </div>
    );
  }
}

Input.defaultProps = {
  icon: null,
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.func,
};

export default Input;
