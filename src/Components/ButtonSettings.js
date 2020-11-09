import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class ButtonSettings extends Component {
  render() {
    const { classProps } = this.props;
    return (
      <Link to="/settings" className="ButtonSetting">
        <button data-testid="btn-settings" type="button" className={ classProps }>
          Config
        </button>
      </Link>
    );
  }
}

ButtonSettings.propTypes = {
  classProps: PropTypes.string,
};

ButtonSettings.defaultProps = {
  classProps: '',
};

export default ButtonSettings;
