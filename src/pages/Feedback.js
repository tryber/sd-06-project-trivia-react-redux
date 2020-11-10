import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Scoreboard from '../components/Scoreboard';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <Scoreboard asserts={ assertions } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.gameBoard.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
