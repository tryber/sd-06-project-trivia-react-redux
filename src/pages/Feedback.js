import React, { Component } from 'react';
import Header from '../components/header';
// import PropTypes from 'prop-types';

export default class Feedback extends Component {
  render() {
    return (
      <section className="feedback-container">
        <Header />
        <header data-testid="feedback-text">
          Resultado.
        </header>
      </section>
    );
  }
}
