import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import logo from '../trivia.png';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-main-container">
        <h1 className="not-found-title">Page not found :(</h1>
        <div className="image-container">
          <img src={ logo } alt="logo" />
        </div>
        <Link className="redirect" to="/">Go Home</Link>
      </div>
    );
  }
}

export default NotFound;
