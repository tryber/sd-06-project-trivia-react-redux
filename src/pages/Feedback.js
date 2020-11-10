import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Scoreboard from '../components/Scoreboard';
import PlayAgainBtn from '../components/PlayAgainBtn';
import './Feedback.css';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text" className="feed-back-field">
          <Scoreboard asserts={ assertions } score={ score } />
          <PlayAgainBtn />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.gameBoard.assertions,
  score: state.game.gameBoard.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
