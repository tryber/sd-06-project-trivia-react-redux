import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { awser } = this.props;
    const tres = 3;
    return (
      <div>
        <Header />
        <section data-testid="feedback-text">
          {awser < tres ? <h3>Podia ser melhor...</h3> : <h3>Mandou bem!</h3>}
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  awser: PropTypes.number.isRequired,
};

export default Feedback;
