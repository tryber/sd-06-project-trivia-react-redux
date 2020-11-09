import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonPlayAgain from '../Components/ButtonPlayAgain';
import FeedbackMsg from '../Components/FeedbackMsg';
import PlayerResults from '../Components/PlayerScore';
import Header from '../Components/Header';
import ButtonRanking from '../Components/ButtonRanking';

import '../Css/Feedback.css';

class Feedback extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <section>
        <Header />
        <section className="feedback-wrapper">
          <FeedbackMsg correctAnswers={ player.assertions } />
          <PlayerResults correctAnswers={ player.assertions } score={ player.score } />
          <ButtonPlayAgain classProps="green" />
          <ButtonRanking />
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.reducerLogin.player,
});

Feedback.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
