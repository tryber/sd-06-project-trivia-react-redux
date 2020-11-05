import React from 'react';
import { Link } from 'react-router-dom';
import { GrUserSettings } from 'react-icons/gr';

class BtnSettings extends React.Component {
  render() {
    return (
      <div className="btn-settings">
        <button type="button">
          <Link data-testid="btn-settings" to="/settings">
            <GrUserSettings />
          </Link>
        </button>
      </div>
    );
  }
}

export default BtnSettings;
