import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { assertions } = this.props;
    return (assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...');
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score } = state.player;
    const { assertions, name, email } = this.props;

    return (
      <>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="Avatar"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">{score}</h2>
        <h1 data-testid="feedback-text">
          {this.feedbackMessage()}
        </h1>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.userReducer.assertions,
  score: state.userReducer.score,
  name: state.userReducer.name,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
