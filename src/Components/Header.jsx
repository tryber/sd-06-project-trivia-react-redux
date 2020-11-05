import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { getUser } = this.props;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(getUser.email).toString()}`;
    const score = 0;
    return (
      <header>
        <img
          src={ gravatarUrl }
          alt="avatar"
          width="75px"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{getUser.name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: state.login,
});

export default connect(mapStateToProps, null)(Header);
