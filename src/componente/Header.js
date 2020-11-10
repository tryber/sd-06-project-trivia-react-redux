import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './questionCards.css';

class Header extends Component {
  totalScore() {
    return JSON.parse(localStorage.getItem('state')).player.score;
  }

  render() {
    const { userName, userImage } = this.props;

    return (
      <header>
        <img
          alt="user login"
          data-testid="header-profile-picture"
          src={ userImage }
        />
        <h3
          data-testid="header-player-name"
        >
          {userName}
        </h3>
        <h3 data-testid="header-score">{ this.totalScore() }</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.nome,
  userImage: state.loginReducer.image,
});

Header.propTypes = {
  userName: propTypes.string.isRequired,
  userImage: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
