import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    const { email, username } = this.props;
    const hash = md5(email);
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <p
            data-testid="header-player-name"
          >
            {username}
          </p>
          <span
            data-testid="header-score"
          >
            Placar: 0
          </span>
        </header>
        <p
          data-testid="feedback-text"
        >
          Feedback!
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
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
