import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptoJs from 'crypto-js';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = CryptoJs.MD5(gravatarEmail).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name" name="">
          { name }
        </span>
        <span data-testid="header-score" name="">
          { score }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  gravatarEmail: state.userReducer.email,
  score: state.userReducer.player.score,
  // assertions: state.userReducer.player.assertions,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  // assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
