import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
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

export default connect(mapStateToProps)(Header);
