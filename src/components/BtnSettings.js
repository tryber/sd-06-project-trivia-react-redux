import React from 'react';
import { Link } from 'react-router-dom';
import { FcServices } from 'react-icons/fc';

class BtnSettings extends React.Component {
  render() {
    return (
      <div className="button-icon">
        <button type="button">
          <Link data-testid="btn-settings" to="/settings">
            <FcServices />
          </Link>
        </button>
      </div>
    );
  }
}

export default BtnSettings;
