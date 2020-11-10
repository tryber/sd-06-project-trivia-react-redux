import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Scoreboard from '../components/Scoreboard';

class Feedback extends React.Component {
  render() {
    const { gameBoard } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <Scoreboard asserts={ gameBoard.assertions }/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameBoard: state.game.gameBoard,
});

Feedback.propTypes = {
  gameBoard: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
