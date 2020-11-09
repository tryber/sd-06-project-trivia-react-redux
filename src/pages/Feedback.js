import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <section data-testid="feedback-text">
          {assertions < three ? <h3>Podia ser melhor...</h3> : <h3>Mandou bem!</h3>}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
