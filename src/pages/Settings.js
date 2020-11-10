import React from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import { FaHome } from 'react-icons/fa';

export default class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title" className="h1">Settings</h1>
        <h4 className="h4">
          Em Desenvolvimento...
          <div>
            <Link to="/">
              <button type="button" className="btn btn-info home">
                <FaHome />
              </button>
            </Link>
          </div>
        </h4>
      </div>
    );
  }
}
