import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  hash() {
    const { email } = this.props;
    const avatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return avatar;
  }

  render() {
    const { name } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.hash() }
          alt="Foto perfil"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">
          000
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.login.name,
  email: state.user.login.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
