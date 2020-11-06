import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { playerName, email } = this.props;
    const hashGravatar = md5(email);
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashGravatar}` }
            alt="User Gravatar"
          />
          <h4 data-testid="header-player-name">{ playerName }</h4>
          <h6 data-testid="header-score">0</h6>
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
