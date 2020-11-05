import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonSettings extends Component {
  render() {
    return (
      <div className="ButtonSetting">
        <button data-testid="btn-settings" type="button">
          <Link to="/Settings">
            Config
          </Link>
        </button>
      </div>
    );
  }
}
export default ButtonSettings;
