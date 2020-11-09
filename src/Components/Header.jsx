import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { score, getUser: { gravatarEmail, name } } = this.props;

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
  score: PropTypes.number.isRequired,
  getUser: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
