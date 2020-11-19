import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  getFromStorage() {
    if (localStorage.state) {
      const { player: { score } } = JSON.parse(localStorage.getItem('state'));
      return score;
    }
    return 0;
  }

  render() {
    const { getUser: { gravatarEmail, name } } = this.props;
    const score = this.getFromStorage();

    return (
      <header>
        <img
          src={ gravatarEmail }
          alt="avatar"
          width="75px"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: state.login,
  score: state.player.score,
});

Header.propTypes = {
  getUser: PropTypes.arrayOf(Object).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
