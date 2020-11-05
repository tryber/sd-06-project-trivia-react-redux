import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonSettings extends Component {
  render() {
    return (
      <div className="ButtonSetting">
        <button data-testid="'tn-settings" type="button">
          <Link to="/Seetings">
            Config
          </Link>
        </button>
      </div>
    );
  }
}
export default ButtonSettings;
