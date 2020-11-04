import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, avatar } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ avatar }
            alt="Imagem gravatar"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  avatar: state.user.avatar,
});

Header.propTypes = {
  name: propTypes.string.isRequired,
  avatar: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
