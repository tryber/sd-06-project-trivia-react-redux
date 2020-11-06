import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CSS/HeaderCSS.css';

class Header extends Component {
  render() {
    const { playerName, email } = this.props;
    const hashGravatar = md5(email);
    return (
      <header className="header">
        <div className="header-container">
          <img
            className="gravatar-image"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashGravatar}` }
            alt="User Gravatar"
          />
          <p
            className="player-name"
            data-testid="header-player-name"
          >
            { playerName }
          </p>
          <p
            className="score"
            data-testid="header-score"
          >
            Score: 0
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.userLogin.playerName,
  email: state.userLogin.email,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
