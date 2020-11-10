import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Scoreboard from '../components/Scoreboard';

class Feedback extends React.Component {

  render() {

    return (
      <div data-testid="feedback-text">
        <Header />
        <Scoreboard asserts={3}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
});

export default connect(mapStateToProps, null)(Feedback);

