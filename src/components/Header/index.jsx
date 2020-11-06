import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { avatar, name, score } = this.props;
    return (
      <div>
        <img src={ avatar } alt="user-avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        {' '}
        <br />
        <span data-testid="header-score">{ score }</span>
      </div>
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
