import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import './Feedback.css';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { score } = this.props;
    const badPerformance = <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
    const goodPerformance = <h1 data-testid="feedback-text">Mandou bem!</h1>;
    const expectHits = 3;
    if (score > expectHits) {
      return goodPerformance;
    }
    return badPerformance;
  }

  render() {
    // const { email, username, score, feedbackMessage } = this.props;
    // const hash = md5(email);
    return (
      <div className="feedback-container">
        <Header />
        {/* <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="gravatar"
            data-testid="header-profile-picture"
            className="img-logo"
          />
          <p data-testid="header-player-name">
            {username}
          </p>
          <span data-testid="header-score">
            {`Placar:${score}`}
          </span>
        </header> */}
        <p data-testid="feedback-text">
          {this.feedbackMessage()}
        </p>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
              Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
              Jogar Novamente!
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  username: state.login.username,
  score: state.score.score,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
