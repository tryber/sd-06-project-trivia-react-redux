import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { avatar, name, score } = this.props;

    return (
      <header>
        <img alt="alt-text" data-testid="header-profile-picture" src={ avatar } />
        <h3 data-testid="header-profile-name">{name}</h3>
        <h4 data-testid="header-score">{score}</h4>
      </header>
    );
  }
}

Header.propTypes = {
  avatar: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    avatar: state.login.imageProfile,
    name: state.login.name,
    score: state.playerData.payload.score,
  };
}

export default connect(mapStateToProps)(Header);
