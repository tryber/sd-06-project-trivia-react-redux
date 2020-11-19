import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  getAvatar() {
    const { email } = this.props;
    const avatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return avatar;
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ this.getAvatar() }
            alt="Imagem gravatar"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
});

Header.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
