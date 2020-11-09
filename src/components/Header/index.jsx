import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '../../assets/logo.png';

import './styles.css';

class Header extends Component {
  render() {
    const { avatar, name, score } = this.props;
    return (
      <header className="app-header">
        <img src={ Logo } alt="app-logo"/>
        <span className="player-score">
          <span>Score: </span>
          <span data-testid="header-score">{ score }</span>
        </span>
        <div className="header-content">
          <img src={ avatar } alt="user-avatar" data-testid="header-profile-picture" />
          <span className="player-name" data-testid="header-player-name">{ name }</span>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    avatar: state.user.avatar,
    name: state.user.name,
    score: state.user.score,
  };
}

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
