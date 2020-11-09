import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { numAssertions } = this.props;
    const NICE_NUMBER = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {numAssertions < NICE_NUMBER ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numAssertions: state.userLogin.player.assertions,
});

Feedback.propTypes = {
  numAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
