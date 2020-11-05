import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonConfig extends Component {
  render() {
    return (
      <div>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">config</button>
        </Link>
      </div>
    );
  }
}

export default ButtonConfig;
