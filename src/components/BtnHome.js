import React from 'react';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';

class BtnHome extends React.Component {
  render() {
    return (
      <div className="btn-home">
        <button type="button" className="button-icon">
          <Link data-testid="btn-go-home" to="/">
            <FcHome />
          </Link>
        </button>
      </div>
    );
  }
}

export default BtnHome;
