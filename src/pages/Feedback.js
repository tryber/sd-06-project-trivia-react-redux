import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Link to='/'data-testid="btn-play-again">
          Jogar novamente
        </Link>
      </div>
    );
  }
}

export default Feedback;
