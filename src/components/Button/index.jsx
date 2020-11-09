import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Button extends React.Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <button className="custom-button" type="button" { ...rest }>
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
