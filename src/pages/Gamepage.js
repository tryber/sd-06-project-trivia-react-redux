import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class Gamepage extends React.Component {
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
            className="img-logo"
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
        <Questions />
        <Link to="/feedback">
          <button
            type="button"
          >
            PRÓXIMA
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

export default connect(mapStateToProps)(Gamepage);

Gamepage.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
