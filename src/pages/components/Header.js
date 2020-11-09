import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';

class Header extends Component {
  // hash() {
  //   const { picture } = this.props;
  //   const avatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
  //   return avatar;
  // }

  render() {
    const { name, picture, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="Foto perfil"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">
          { score }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  picture: state.user.player.picture,
  score: state.user.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
