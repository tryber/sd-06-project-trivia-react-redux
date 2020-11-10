import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class ButtonSettings extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    localStorage.removeItem('number');
    localStorage.removeItem('category');
    localStorage.removeItem('typeAPI');
    localStorage.removeItem('difficulty');
  }

  render() {
    const { classProps } = this.props;
    return (
      <Link to="/settings" className="ButtonSetting">
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClick }
          className={ classProps }
        >
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
