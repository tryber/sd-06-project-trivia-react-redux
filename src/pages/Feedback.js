import React, { Component } from 'react';
import Header from '../components/header';
import Mensagem from '../components/Mensagem';
// import PropTypes from 'prop-types';

export default class Feedback extends Component {
  render() {
    return (
      <section className="feedback-container">
        <Header />
        <section>
          <Mensagem />
        </section>
      </section>
    );
  }
}
